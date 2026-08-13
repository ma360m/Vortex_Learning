-- Vortex Learning core backend schema
-- Target: PostgreSQL / Supabase

create extension if not exists pgcrypto;

do $$
begin
  if exists (select 1 from information_schema.schemata where schema_name = 'storage') then
    insert into storage.buckets (id, name, public)
    values ('course-resources', 'course-resources', false)
    on conflict (id) do update
    set public = false;
  end if;
end;
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum (
      'student',
      'parent',
      'instructor',
      'admin',
      'developer',
      'support'
    );
  end if;
end;
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'course_mode') then
    create type course_mode as enum (
      'live',
      'self_paced',
      'hybrid',
      'bootcamp',
      'accelerated'
    );
  end if;
end;
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'ticket_status') then
    create type ticket_status as enum (
      'open',
      'pending',
      'escalated',
      'resolved',
      'closed'
    );
  end if;
end;
$$;

create table if not exists approved_admin_emails (
  email text primary key,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text not null,
  email text unique not null,
  phone text,
  role user_role not null default 'student',
  promoted_by uuid references profiles(id) on delete set null,
  promoted_at timestamptz,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists parent_students (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references profiles(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  relation text default 'parent',
  unique (parent_id, student_id)
);

create table if not exists instructors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles(id) on delete cascade,
  title text,
  qualifications text,
  experience_years int default 0,
  subjects text[] default '{}',
  availability text,
  rating numeric(2,1) default 0,
  verified boolean not null default false
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  subject text not null,
  board text,
  mode course_mode not null default 'self_paced',
  level text,
  description text,
  instructor_id uuid references instructors(id) on delete set null,
  created_by uuid references profiles(id) on delete set null,
  approval_status text not null default 'draft' check (approval_status in ('draft', 'submitted', 'approved', 'rejected')),
  instructor_help_enabled boolean not null default true,
  live_help_enabled boolean not null default false,
  price numeric(10,2) default 0,
  published boolean not null default false,
  free_module_count int not null default 3,
  requires_payment boolean not null default true,
  download_allowed_default boolean not null default false,
  certificate_requires_final_quiz boolean not null default true,
  source_package text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  description text,
  thumbnail_url text,
  transition_style text default 'fade',
  unlock_animation text default 'progress-ring',
  sort_order int not null default 0,
  is_preview boolean not null default false,
  unique (course_id, title)
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references course_modules(id) on delete cascade,
  title text not null,
  lesson_type text not null default 'video',
  reading_type text,
  video_url text,
  resource_url text,
  transcript text,
  duration_minutes int default 0,
  sort_order int not null default 0,
  is_preview boolean not null default false,
  is_compulsory boolean not null default true,
  published boolean not null default true,
  unique (module_id, title)
);

create table if not exists course_resources (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  module_id uuid references course_modules(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete cascade,
  title text not null,
  resource_type text not null default 'file',
  resource_url text,
  storage_path text,
  original_filename text,
  visibility text not null default 'paid' check (visibility in ('public', 'enrolled', 'paid', 'admin')),
  is_downloadable boolean not null default false,
  flipbook_enabled boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (course_id, original_filename)
);

create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete set null,
  title text not null,
  description text,
  passing_score int not null default 70,
  max_attempts int not null default 3,
  timer_minutes int,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  question text not null,
  question_type text not null default 'mcq',
  options jsonb default '[]',
  correct_answer jsonb default '{}',
  explanation text,
  points int not null default 1,
  sort_order int not null default 0
);

create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  score int not null default 0,
  passed boolean not null default false,
  answers jsonb default '{}',
  submitted_at timestamptz not null default now()
);

create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  progress_percent int not null default 0 check (progress_percent between 0 and 100),
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (student_id, course_id)
);

create table if not exists lesson_progress (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references enrollments(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  watched_seconds int not null default 0,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (enrollment_id, lesson_id)
);

create table if not exists assignments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  instructions text,
  due_at timestamptz,
  points int default 100
);

create table if not exists assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references assignments(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  file_url text,
  answer_text text,
  grade numeric(5,2),
  feedback text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists live_sessions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  instructor_id uuid references instructors(id) on delete set null,
  title text not null,
  meeting_provider text check (meeting_provider in ('zoom', 'google_meet', 'other')),
  meeting_url text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  recording_url text
);

create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references live_sessions(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  present boolean not null default false,
  joined_at timestamptz,
  left_at timestamptz,
  unique (session_id, student_id)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete set null,
  amount numeric(10,2) not null,
  currency text not null default 'PKR',
  status text not null default 'pending',
  payment_method text not null default 'bank_transfer' check (payment_method in ('bank_transfer', 'card', 'manual', 'coupon')),
  provider text,
  provider_ref text,
  slip_url text,
  slip_uploaded_at timestamptz,
  verified_by uuid references profiles(id) on delete set null,
  verified_at timestamptz,
  verification_notes text,
  created_at timestamptz not null default now()
);

create table if not exists licence_keys (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  payment_id uuid references payments(id) on delete set null,
  licence_key text unique not null,
  status text not null default 'issued' check (status in ('issued', 'emailed', 'used', 'revoked', 'expired')),
  emailed_to text,
  emailed_at timestamptz,
  used_at timestamptz,
  expires_at timestamptz,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (course_id, user_id)
);

create table if not exists role_promotions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  promoted_to user_role not null,
  promoted_by uuid references profiles(id) on delete set null,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists instructor_help_requests (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  instructor_id uuid references instructors(id) on delete set null,
  lesson_id uuid references lessons(id) on delete set null,
  request_type text not null default 'question' check (request_type in ('question', 'live_session', 'homework_help', 'technical')),
  subject text not null,
  message text not null,
  attachment_url text,
  status text not null default 'open' check (status in ('open', 'answered', 'scheduled', 'closed')),
  live_session_id uuid references live_sessions(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  certificate_url text,
  issued_at timestamptz not null default now(),
  unique (student_id, course_id)
);

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references profiles(id) on delete set null,
  name text,
  email text,
  subject text not null,
  message text not null,
  status ticket_status not null default 'open',
  assigned_to uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists support_ticket_replies (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references support_tickets(id) on delete cascade,
  sender_id uuid references profiles(id) on delete set null,
  message text not null,
  internal boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists email_templates (
  id uuid primary key default gen_random_uuid(),
  template_key text unique not null,
  sender_email text not null default 'support@vortexelearning.com',
  subject text not null,
  body_html text not null,
  body_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists email_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  email text not null,
  from_email text,
  template_key text not null,
  payload jsonb default '{}',
  status text not null default 'queued' check (status in ('queued', 'sent', 'failed')),
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  visitor_email text,
  topic text,
  created_at timestamptz not null default now()
);

create table if not exists ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references ai_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  excerpt text,
  content text,
  author_id uuid references profiles(id) on delete set null,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

alter table courses add column if not exists free_module_count int not null default 3;
alter table courses add column if not exists requires_payment boolean not null default true;
alter table courses add column if not exists download_allowed_default boolean not null default false;
alter table courses add column if not exists certificate_requires_final_quiz boolean not null default true;
alter table courses add column if not exists source_package text;

alter table course_modules add column if not exists is_preview boolean not null default false;

alter table course_resources add column if not exists storage_path text;
alter table course_resources add column if not exists flipbook_enabled boolean not null default true;
alter table course_resources alter column visibility set default 'paid';
alter table course_resources alter column is_downloadable set default false;

alter table email_templates add column if not exists sender_email text not null default 'support@vortexelearning.com';
alter table email_queue add column if not exists from_email text;

create index if not exists idx_profiles_role on profiles(role);
create index if not exists idx_courses_subject on courses(subject);
create index if not exists idx_courses_published on courses(published);
create index if not exists idx_modules_course_order on course_modules(course_id, sort_order);
create index if not exists idx_lessons_module_order on lessons(module_id, sort_order);
create unique index if not exists idx_course_modules_course_title_unique on course_modules(course_id, title);
create unique index if not exists idx_lessons_module_title_unique on lessons(module_id, title);
create unique index if not exists idx_course_resources_course_filename_unique on course_resources(course_id, original_filename);
create index if not exists idx_enrollments_student on enrollments(student_id);
create index if not exists idx_payments_status on payments(status);
create index if not exists idx_payments_method on payments(payment_method);
create index if not exists idx_licence_keys_user on licence_keys(user_id);
create index if not exists idx_help_requests_status on instructor_help_requests(status);
create index if not exists idx_tickets_status on support_tickets(status);
create index if not exists idx_ai_conversations_user on ai_conversations(user_id);

create index if not exists idx_course_resources_course on course_resources(course_id);
create index if not exists idx_quizzes_course on quizzes(course_id);
create index if not exists idx_quiz_attempts_student on quiz_attempts(student_id);
create index if not exists idx_email_queue_status on email_queue(status);
create index if not exists idx_notifications_user on notifications(user_id);

create or replace function is_approved_admin_email(target_email text)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from approved_admin_emails
    where lower(email) = lower(target_email)
  );
$$;

create or replace function current_profile()
returns profiles
language sql
stable
security definer
set search_path = public
as $$
  select *
  from profiles
  where auth_user_id = auth.uid()
  limit 1;
$$;

create or replace function current_user_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from profiles
    where auth_user_id = auth.uid()
      and role = 'admin'
      and is_approved_admin_email(email)
  );
$$;

create or replace function prevent_profile_role_self_assignment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not current_user_is_admin() then
    raise exception 'Profile roles can only be changed by approved admins';
  end if;

  if new.role = 'admin' and not is_approved_admin_email(new.email) then
    raise exception 'Admin role can only be used by emails in approved_admin_emails';
  end if;

  if new.email is distinct from old.email and old.role = 'admin' and not is_approved_admin_email(new.email) then
    raise exception 'Admin email must remain in approved_admin_emails';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_profile_role_self_assignment_trigger on profiles;
create trigger prevent_profile_role_self_assignment_trigger
before update on profiles
for each row execute function prevent_profile_role_self_assignment();

create or replace function handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (auth_user_id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    lower(new.email),
    case
      when is_approved_admin_email(new.email) then 'admin'::user_role
      else 'student'::user_role
    end
  )
  on conflict (auth_user_id) do update
  set
    email = excluded.email,
    role = case
      when is_approved_admin_email(excluded.email) then 'admin'::user_role
      else profiles.role
    end,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function handle_new_auth_user();

create or replace function promote_user_to_instructor(
  target_profile_id uuid,
  instructor_title text default 'Instructor',
  instructor_subjects text[] default '{}',
  instructor_qualifications text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_profile profiles;
  instructor_record_id uuid;
begin
  select * into admin_profile
  from profiles
  where auth_user_id = auth.uid()
    and role = 'admin'
    and is_approved_admin_email(email)
  limit 1;

  if admin_profile.id is null then
    raise exception 'Only approved admins can promote instructors';
  end if;

  update profiles
  set role = 'instructor',
      promoted_by = admin_profile.id,
      promoted_at = now(),
      updated_at = now()
  where id = target_profile_id;

  insert into instructors (profile_id, title, qualifications, subjects, verified)
  values (target_profile_id, instructor_title, instructor_qualifications, instructor_subjects, true)
  on conflict (profile_id) do update
  set title = excluded.title,
      qualifications = excluded.qualifications,
      subjects = excluded.subjects,
      verified = true
  returning id into instructor_record_id;

  insert into role_promotions (user_id, promoted_to, promoted_by, reason)
  values (target_profile_id, 'instructor', admin_profile.id, 'Admin promoted registered user to instructor');

  return instructor_record_id;
end;
$$;

create or replace function assign_profile_role(
  target_profile_id uuid,
  target_role user_role,
  note text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_profile profiles;
begin
  select * into admin_profile
  from profiles
  where auth_user_id = auth.uid()
    and role = 'admin'
    and is_approved_admin_email(email)
  limit 1;

  if admin_profile.id is null then
    raise exception 'Only approved admins can assign portal roles';
  end if;

  if target_role = 'admin' then
    raise exception 'Admin role is not assigned manually. Add the email to approved_admin_emails before sign-in.';
  end if;

  update profiles
  set role = target_role,
      promoted_by = admin_profile.id,
      promoted_at = now(),
      updated_at = now()
  where id = target_profile_id;

  if target_role = 'instructor' then
    insert into instructors (profile_id, title, verified)
    values (target_profile_id, 'Instructor', true)
    on conflict (profile_id) do update
    set verified = true;
  end if;

  insert into role_promotions (user_id, promoted_to, promoted_by, reason)
  values (target_profile_id, target_role, admin_profile.id, coalesce(note, 'Admin assigned portal access'));
end;
$$;

create or replace function request_course_bank_payment(
  target_course_id uuid,
  requested_amount numeric default null,
  requested_currency text default 'PKR',
  uploaded_slip_url text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  learner profiles;
  course_record courses;
  payment_record_id uuid;
begin
  select * into learner
  from profiles
  where auth_user_id = auth.uid()
  limit 1;

  if learner.id is null then
    raise exception 'Sign in required';
  end if;

  select * into course_record
  from courses
  where id = target_course_id
    and published = true
  limit 1;

  if course_record.id is null then
    raise exception 'Published course not found';
  end if;

  insert into payments (
    user_id,
    course_id,
    amount,
    currency,
    status,
    payment_method,
    slip_url,
    slip_uploaded_at
  )
  values (
    learner.id,
    course_record.id,
    coalesce(nullif(requested_amount, 0), course_record.price, 0),
    requested_currency,
    'pending',
    'bank_transfer',
    uploaded_slip_url,
    case when uploaded_slip_url is null then null else now() end
  )
  returning id into payment_record_id;

  insert into email_queue (user_id, email, from_email, template_key, payload)
  values (
    learner.id,
    learner.email,
    'support@vortexelearning.com',
    'course_payment_registered',
    jsonb_build_object(
      'course_id', course_record.id,
      'course_title', course_record.title,
      'payment_id', payment_record_id,
      'support_phone', '+92 324 4270697'
    )
  );

  return payment_record_id;
end;
$$;

create or replace function verify_bank_payment_and_issue_licence(
  target_payment_id uuid,
  admin_notes text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_profile profiles;
  payment_record payments;
  issued_key text;
begin
  select * into admin_profile
  from profiles
  where auth_user_id = auth.uid()
    and role = 'admin'
    and is_approved_admin_email(email)
  limit 1;

  if admin_profile.id is null then
    raise exception 'Only approved admins can verify payments';
  end if;

  select * into payment_record
  from payments
  where id = target_payment_id
  for update;

  if payment_record.id is null then
    raise exception 'Payment not found';
  end if;

  issued_key := upper(encode(gen_random_bytes(4), 'hex') || '-' || encode(gen_random_bytes(4), 'hex') || '-' || encode(gen_random_bytes(4), 'hex'));

  update payments
  set status = 'verified',
      verified_by = admin_profile.id,
      verified_at = now(),
      verification_notes = admin_notes
  where id = target_payment_id;

  insert into licence_keys (course_id, user_id, payment_id, licence_key, status, created_by)
  values (payment_record.course_id, payment_record.user_id, target_payment_id, issued_key, 'issued', admin_profile.id)
  on conflict (course_id, user_id) do update
  set licence_key = excluded.licence_key,
      payment_id = excluded.payment_id,
      status = 'issued',
      created_by = excluded.created_by,
      created_at = now()
  returning licence_key into issued_key;

  insert into email_queue (user_id, email, from_email, template_key, payload)
  select payment_record.user_id, profiles.email, 'noreply@vortexelearning.com', 'course_licence_key', jsonb_build_object('licence_key', issued_key, 'course_id', payment_record.course_id)
  from profiles
  where profiles.id = payment_record.user_id;

  return issued_key;
end;
$$;

create or replace function mark_licence_key_emailed(target_licence_key text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not current_user_is_admin() then
    raise exception 'Only approved admins can mark licence emails';
  end if;

  update licence_keys
  set status = 'emailed',
      emailed_at = now(),
      emailed_to = profiles.email
  from profiles
  where licence_keys.user_id = profiles.id
    and licence_keys.licence_key = target_licence_key;
end;
$$;

create or replace function redeem_licence_key(target_licence_key text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  learner profiles;
  key_record licence_keys;
  enrollment_id uuid;
begin
  select * into learner
  from profiles
  where auth_user_id = auth.uid()
  limit 1;

  if learner.id is null then
    raise exception 'Sign in required';
  end if;

  select * into key_record
  from licence_keys
  where licence_key = target_licence_key
    and user_id = learner.id
    and status in ('issued', 'emailed')
  for update;

  if key_record.id is null then
    raise exception 'Invalid or unavailable licence key';
  end if;

  insert into enrollments (student_id, course_id)
  values (learner.id, key_record.course_id)
  on conflict (student_id, course_id) do update
  set enrolled_at = enrollments.enrolled_at
  returning id into enrollment_id;

  update licence_keys
  set status = 'used',
      used_at = now()
  where id = key_record.id;

  return enrollment_id;
end;
$$;

create or replace function issue_certificate_after_final_quiz(target_quiz_attempt_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  attempt_record quiz_attempts;
  quiz_record quizzes;
  certificate_record_id uuid;
begin
  select * into attempt_record
  from quiz_attempts
  where id = target_quiz_attempt_id
  limit 1;

  if attempt_record.id is null or not attempt_record.passed then
    raise exception 'A passed final quiz attempt is required before certificate issue';
  end if;

  select * into quiz_record
  from quizzes
  where id = attempt_record.quiz_id
  limit 1;

  if quiz_record.id is null or lower(quiz_record.title) not like '%final%' then
    raise exception 'Only final quiz attempts can unlock certificates';
  end if;

  insert into certificates (student_id, course_id)
  values (attempt_record.student_id, quiz_record.course_id)
  on conflict (student_id, course_id) do update
  set issued_at = now()
  returning id into certificate_record_id;

  insert into email_queue (user_id, email, from_email, template_key, payload)
  select profiles.id, profiles.email, 'noreply@vortexelearning.com', 'course_completion_certificate', jsonb_build_object('course_id', quiz_record.course_id, 'certificate_id', certificate_record_id)
  from profiles
  where profiles.id = attempt_record.student_id;

  return certificate_record_id;
end;
$$;

alter table profiles enable row level security;
alter table approved_admin_emails enable row level security;
alter table instructors enable row level security;
alter table courses enable row level security;
alter table course_modules enable row level security;
alter table lessons enable row level security;
alter table course_resources enable row level security;
alter table quizzes enable row level security;
alter table quiz_questions enable row level security;
alter table quiz_attempts enable row level security;
alter table enrollments enable row level security;
alter table payments enable row level security;
alter table licence_keys enable row level security;
alter table instructor_help_requests enable row level security;
alter table certificates enable row level security;
alter table support_tickets enable row level security;
alter table email_queue enable row level security;
alter table email_templates enable row level security;

drop policy if exists "profiles read own or admin" on profiles;
create policy "profiles read own or admin" on profiles
for select using (auth_user_id = auth.uid() or current_user_is_admin());

drop policy if exists "profiles update own basic data" on profiles;
create policy "profiles update own basic data" on profiles
for update using (auth_user_id = auth.uid()) with check (auth_user_id = auth.uid());

drop policy if exists "admins manage profiles" on profiles;
create policy "admins manage profiles" on profiles
for all using (current_user_is_admin()) with check (current_user_is_admin());

drop policy if exists "admins manage approved admin emails" on approved_admin_emails;
create policy "admins manage approved admin emails" on approved_admin_emails
for all using (current_user_is_admin()) with check (current_user_is_admin());

drop policy if exists "public can read published courses" on courses;
create policy "public can read published courses" on courses
for select using (published = true or current_user_is_admin());

drop policy if exists "public preview modules or enrolled modules" on course_modules;
create policy "public preview modules or enrolled modules" on course_modules
for select using (
  current_user_is_admin()
  or exists (
    select 1
    from courses
    where courses.id = course_modules.course_id
      and courses.published = true
      and (
        course_modules.is_preview = true
        or exists (
          select 1
          from enrollments
          join profiles on profiles.id = enrollments.student_id
          where enrollments.course_id = courses.id
            and profiles.auth_user_id = auth.uid()
        )
      )
  )
);

drop policy if exists "public preview lessons or enrolled lessons" on lessons;
create policy "public preview lessons or enrolled lessons" on lessons
for select using (
  current_user_is_admin()
  or exists (
    select 1
    from course_modules
    join courses on courses.id = course_modules.course_id
    where course_modules.id = lessons.module_id
      and courses.published = true
      and (
        lessons.is_preview = true
        or course_modules.is_preview = true
        or exists (
          select 1
          from enrollments
          join profiles on profiles.id = enrollments.student_id
          where enrollments.course_id = courses.id
            and profiles.auth_user_id = auth.uid()
        )
      )
  )
);

drop policy if exists "enrolled users read paid resources" on course_resources;
create policy "enrolled users read paid resources" on course_resources
for select using (
  current_user_is_admin()
  or visibility = 'public'
  or exists (
    select 1
    from enrollments
    join profiles on profiles.id = enrollments.student_id
    where enrollments.course_id = course_resources.course_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "enrolled users read course quizzes" on quizzes;
create policy "enrolled users read course quizzes" on quizzes
for select using (
  current_user_is_admin()
  or exists (
    select 1
    from enrollments
    join profiles on profiles.id = enrollments.student_id
    where enrollments.course_id = quizzes.course_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "enrolled users read quiz questions" on quiz_questions;
create policy "enrolled users read quiz questions" on quiz_questions
for select using (
  current_user_is_admin()
  or exists (
    select 1
    from quizzes
    join enrollments on enrollments.course_id = quizzes.course_id
    join profiles on profiles.id = enrollments.student_id
    where quizzes.id = quiz_questions.quiz_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "students create own quiz attempts" on quiz_attempts;
create policy "students create own quiz attempts" on quiz_attempts
for insert with check (
  exists (
    select 1
    from profiles
    where profiles.id = quiz_attempts.student_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "students read own quiz attempts" on quiz_attempts;
create policy "students read own quiz attempts" on quiz_attempts
for select using (
  current_user_is_admin()
  or exists (
    select 1
    from profiles
    where profiles.id = quiz_attempts.student_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "students read own certificates" on certificates;
create policy "students read own certificates" on certificates
for select using (
  current_user_is_admin()
  or exists (
    select 1
    from profiles
    where profiles.id = certificates.student_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "instructors create own courses" on courses;
create policy "instructors create own courses" on courses
for insert with check (
  current_user_is_admin()
  or exists (
    select 1
    from instructors
    join profiles on profiles.id = instructors.profile_id
    where instructors.id = courses.instructor_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "instructors update own courses or admins" on courses;
create policy "instructors update own courses or admins" on courses
for update using (
  current_user_is_admin()
  or exists (
    select 1
    from instructors
    join profiles on profiles.id = instructors.profile_id
    where instructors.id = courses.instructor_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "content owners manage modules" on course_modules;
create policy "content owners manage modules" on course_modules
for all using (
  current_user_is_admin()
  or exists (
    select 1
    from courses
    join instructors on instructors.id = courses.instructor_id
    join profiles on profiles.id = instructors.profile_id
    where courses.id = course_modules.course_id
      and profiles.auth_user_id = auth.uid()
  )
) with check (
  current_user_is_admin()
  or exists (
    select 1
    from courses
    join instructors on instructors.id = courses.instructor_id
    join profiles on profiles.id = instructors.profile_id
    where courses.id = course_modules.course_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "content owners manage lessons" on lessons;
create policy "content owners manage lessons" on lessons
for all using (
  current_user_is_admin()
  or exists (
    select 1
    from course_modules
    join courses on courses.id = course_modules.course_id
    join instructors on instructors.id = courses.instructor_id
    join profiles on profiles.id = instructors.profile_id
    where course_modules.id = lessons.module_id
      and profiles.auth_user_id = auth.uid()
  )
) with check (
  current_user_is_admin()
  or exists (
    select 1
    from course_modules
    join courses on courses.id = course_modules.course_id
    join instructors on instructors.id = courses.instructor_id
    join profiles on profiles.id = instructors.profile_id
    where course_modules.id = lessons.module_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "content owners manage resources" on course_resources;
create policy "content owners manage resources" on course_resources
for all using (
  current_user_is_admin()
  or exists (
    select 1
    from courses
    join instructors on instructors.id = courses.instructor_id
    join profiles on profiles.id = instructors.profile_id
    where courses.id = course_resources.course_id
      and profiles.auth_user_id = auth.uid()
  )
) with check (
  current_user_is_admin()
  or exists (
    select 1
    from courses
    join instructors on instructors.id = courses.instructor_id
    join profiles on profiles.id = instructors.profile_id
    where courses.id = course_resources.course_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "content owners manage quizzes" on quizzes;
create policy "content owners manage quizzes" on quizzes
for all using (
  current_user_is_admin()
  or exists (
    select 1
    from courses
    join instructors on instructors.id = courses.instructor_id
    join profiles on profiles.id = instructors.profile_id
    where courses.id = quizzes.course_id
      and profiles.auth_user_id = auth.uid()
  )
) with check (
  current_user_is_admin()
  or exists (
    select 1
    from courses
    join instructors on instructors.id = courses.instructor_id
    join profiles on profiles.id = instructors.profile_id
    where courses.id = quizzes.course_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "content owners manage quiz questions" on quiz_questions;
create policy "content owners manage quiz questions" on quiz_questions
for all using (
  current_user_is_admin()
  or exists (
    select 1
    from quizzes
    join courses on courses.id = quizzes.course_id
    join instructors on instructors.id = courses.instructor_id
    join profiles on profiles.id = instructors.profile_id
    where quizzes.id = quiz_questions.quiz_id
      and profiles.auth_user_id = auth.uid()
  )
) with check (
  current_user_is_admin()
  or exists (
    select 1
    from quizzes
    join courses on courses.id = quizzes.course_id
    join instructors on instructors.id = courses.instructor_id
    join profiles on profiles.id = instructors.profile_id
    where quizzes.id = quiz_questions.quiz_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "learners read own enrollments" on enrollments;
create policy "learners read own enrollments" on enrollments
for select using (
  current_user_is_admin()
  or exists (select 1 from profiles where profiles.id = enrollments.student_id and profiles.auth_user_id = auth.uid())
);

drop policy if exists "users read own payments" on payments;
create policy "users read own payments" on payments
for select using (
  current_user_is_admin()
  or exists (select 1 from profiles where profiles.id = payments.user_id and profiles.auth_user_id = auth.uid())
);

drop policy if exists "users create own bank payments" on payments;
create policy "users create own bank payments" on payments
for insert with check (
  exists (select 1 from profiles where profiles.id = payments.user_id and profiles.auth_user_id = auth.uid())
);

drop policy if exists "users update own pending bank slips" on payments;
create policy "users update own pending bank slips" on payments
for update using (
  status = 'pending'
  and payment_method = 'bank_transfer'
  and exists (select 1 from profiles where profiles.id = payments.user_id and profiles.auth_user_id = auth.uid())
) with check (
  payment_method = 'bank_transfer'
  and exists (select 1 from profiles where profiles.id = payments.user_id and profiles.auth_user_id = auth.uid())
);

drop policy if exists "admins manage payments" on payments;
create policy "admins manage payments" on payments
for all using (current_user_is_admin()) with check (current_user_is_admin());

drop policy if exists "users read own licence keys" on licence_keys;
create policy "users read own licence keys" on licence_keys
for select using (
  current_user_is_admin()
  or exists (select 1 from profiles where profiles.id = licence_keys.user_id and profiles.auth_user_id = auth.uid())
);

drop policy if exists "students create instructor help" on instructor_help_requests;
create policy "students create instructor help" on instructor_help_requests
for insert with check (
  exists (select 1 from profiles where profiles.id = instructor_help_requests.student_id and profiles.auth_user_id = auth.uid())
);

drop policy if exists "help visible to student instructor admin" on instructor_help_requests;
create policy "help visible to student instructor admin" on instructor_help_requests
for select using (
  current_user_is_admin()
  or exists (select 1 from profiles where profiles.id = instructor_help_requests.student_id and profiles.auth_user_id = auth.uid())
  or exists (
    select 1
    from instructors
    join profiles on profiles.id = instructors.profile_id
    where instructors.id = instructor_help_requests.instructor_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "admins manage email templates" on email_templates;
create policy "admins manage email templates" on email_templates
for all using (current_user_is_admin()) with check (current_user_is_admin());

drop policy if exists "admins manage email queue" on email_queue;
create policy "admins manage email queue" on email_queue
for all using (current_user_is_admin()) with check (current_user_is_admin());

insert into email_templates (template_key, sender_email, subject, body_html, body_text)
values
  (
    'course_payment_registered',
    'support@vortexelearning.com',
    'Vortex Learning payment registration received',
    '<p>Your course registration has been received. Please upload your bank-transfer payment slip for admin verification. If payment gives an issue, contact +92 324 4270697.</p>',
    'Your course registration has been received. Please upload your bank-transfer payment slip for admin verification. If payment gives an issue, contact +92 324 4270697.'
  ),
  (
    'course_licence_key',
    'noreply@vortexelearning.com',
    'Vortex Learning course access licence key',
    '<p>Your payment has been verified. Use the licence key in your student dashboard to unlock the course.</p>',
    'Your payment has been verified. Use the licence key in your student dashboard to unlock the course.'
  ),
  (
    'course_completion_certificate',
    'noreply@vortexelearning.com',
    'Vortex Learning certificate unlocked',
    '<p>Congratulations. Your certificate is available after passing the final quiz.</p>',
    'Congratulations. Your certificate is available after passing the final quiz.'
  )
on conflict (template_key) do update
set
  sender_email = excluded.sender_email,
  subject = excluded.subject,
  body_html = excluded.body_html,
  body_text = excluded.body_text,
  updated_at = now();

insert into approved_admin_emails (email, note)
values ('maryamrrehman@gmail.com', 'Initial approved admin account')
on conflict (email) do nothing;
