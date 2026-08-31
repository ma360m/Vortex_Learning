-- Vortex Learning portal live-data updates
-- Run after database/vortex_learning_schema.sql and database/vortex_course_seed.sql.
-- This file intentionally keeps paid course resources protected.

insert into storage.buckets (id, name, public)
values ('payment-slips', 'payment-slips', false)
on conflict (id) do update
set public = false;

drop policy if exists "users upload own payment slips" on storage.objects;
create policy "users upload own payment slips" on storage.objects
for insert to authenticated
with check (bucket_id = 'payment-slips' and owner = auth.uid());

drop policy if exists "users read own payment slips" on storage.objects;
create policy "users read own payment slips" on storage.objects
for select to authenticated
using (bucket_id = 'payment-slips' and (owner = auth.uid() or public.current_user_is_admin()));

drop policy if exists "admins manage payment slips" on storage.objects;
create policy "admins manage payment slips" on storage.objects
for all to authenticated
using (bucket_id = 'payment-slips' and public.current_user_is_admin())
with check (bucket_id = 'payment-slips' and public.current_user_is_admin());

create table if not exists role_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  requested_role user_role not null check (requested_role in ('parent', 'instructor', 'developer')),
  reason text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references profiles(id) on delete set null,
  reviewed_at timestamptz,
  admin_note text,
  created_at timestamptz not null default now()
);

create unique index if not exists idx_role_requests_one_pending
on role_requests(profile_id, requested_role)
where status = 'pending';

alter table role_requests enable row level security;

drop policy if exists "users create own role requests" on role_requests;
create policy "users create own role requests" on role_requests
for insert to authenticated
with check (
  exists (
    select 1
    from profiles
    where profiles.id = role_requests.profile_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "users read own role requests" on role_requests;
create policy "users read own role requests" on role_requests
for select to authenticated
using (
  public.current_user_is_admin()
  or exists (
    select 1
    from profiles
    where profiles.id = role_requests.profile_id
      and profiles.auth_user_id = auth.uid()
  )
);

drop policy if exists "admins manage role requests" on role_requests;
create policy "admins manage role requests" on role_requests
for all to authenticated
using (public.current_user_is_admin())
with check (public.current_user_is_admin());

create or replace function request_portal_role(
  requested_role user_role,
  reason text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  learner profiles;
  request_id uuid;
begin
  select * into learner
  from profiles
  where auth_user_id = auth.uid()
  limit 1;

  if learner.id is null then
    raise exception 'Sign in required';
  end if;

  if requested_role not in ('parent', 'instructor', 'developer') then
    raise exception 'This role must be assigned by an approved admin';
  end if;

  insert into role_requests (profile_id, requested_role, reason)
  values (learner.id, requested_role, reason)
  on conflict (profile_id, requested_role) where status = 'pending' do update
  set reason = excluded.reason,
      created_at = now()
  returning id into request_id;

  return request_id;
end;
$$;

create or replace function approve_role_request(
  target_request_id uuid,
  review_note text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_profile profiles;
  request_record role_requests;
begin
  select * into admin_profile
  from profiles
  where auth_user_id = auth.uid()
    and role = 'admin'
    and is_approved_admin_email(email)
  limit 1;

  if admin_profile.id is null then
    raise exception 'Only approved admins can approve portal roles';
  end if;

  select * into request_record
  from role_requests
  where id = target_request_id
    and status = 'pending'
  for update;

  if request_record.id is null then
    raise exception 'Pending role request not found';
  end if;

  update profiles
  set role = request_record.requested_role,
      promoted_by = admin_profile.id,
      promoted_at = now(),
      updated_at = now()
  where id = request_record.profile_id;

  if request_record.requested_role = 'instructor' then
    insert into instructors (profile_id, title, verified)
    values (request_record.profile_id, 'Instructor', true)
    on conflict (profile_id) do update
    set verified = true;
  end if;

  update role_requests
  set status = 'approved',
      reviewed_by = admin_profile.id,
      reviewed_at = now(),
      admin_note = review_note
  where id = target_request_id;

  insert into role_promotions (user_id, promoted_to, promoted_by, reason)
  values (request_record.profile_id, request_record.requested_role, admin_profile.id, coalesce(review_note, 'Admin approved portal role request'));

  insert into email_queue (user_id, email, from_email, template_key, payload)
  select profiles.id, profiles.email, 'noreply@vortexelearning.com', 'portal_role_approved',
    jsonb_build_object('role', request_record.requested_role)
  from profiles
  where profiles.id = request_record.profile_id;
end;
$$;

create or replace function request_course_bank_payment_by_slug(
  target_course_slug text,
  requested_amount numeric default null,
  requested_currency text default 'PKR',
  uploaded_slip_url text default null,
  request_note text default null
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
  where lower(slug) = lower(target_course_slug)
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
    provider_ref,
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
    nullif(request_note, ''),
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
      'course_slug', course_record.slug,
      'course_title', course_record.title,
      'payment_id', payment_record_id,
      'slip_uploaded', uploaded_slip_url is not null,
      'request_note', request_note,
      'support_phone', '+92 324 4270697'
    )
  );

  insert into notifications (user_id, title, body)
  values (
    learner.id,
    'Payment registration received',
    'Your payment request for ' || course_record.title || ' is waiting for admin verification.'
  );

  return payment_record_id;
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
  course_record courses;
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

  select * into course_record
  from courses
  where id = key_record.course_id
  limit 1;

  insert into enrollments (student_id, course_id)
  values (learner.id, key_record.course_id)
  on conflict (student_id, course_id) do update
  set enrolled_at = enrollments.enrolled_at
  returning id into enrollment_id;

  update licence_keys
  set status = 'used',
      used_at = now()
  where id = key_record.id;

  insert into email_queue (user_id, email, from_email, template_key, payload)
  values (
    learner.id,
    learner.email,
    'noreply@vortexelearning.com',
    'course_enrollment_confirmation',
    jsonb_build_object(
      'course_id', key_record.course_id,
      'course_slug', course_record.slug,
      'course_title', course_record.title,
      'enrollment_id', enrollment_id
    )
  );

  insert into notifications (user_id, title, body)
  values (
    learner.id,
    'Course unlocked',
    'Your enrollment for ' || coalesce(course_record.title, 'this course') || ' is active.'
  );

  return enrollment_id;
end;
$$;

insert into email_templates (template_key, sender_email, subject, body_html, body_text)
values
  (
    'course_payment_registered',
    'support@vortexelearning.com',
    'Vortex Learning payment registration received',
    '<p>Your payment request has been received. Admin will verify the bank transfer and send the licence key after approval.</p>',
    'Your payment request has been received. Admin will verify the bank transfer and send the licence key after approval.'
  ),
  (
    'course_enrollment_confirmation',
    'noreply@vortexelearning.com',
    'Your Vortex Learning course is unlocked',
    '<p>Your licence key has been accepted and your course enrollment is now active.</p>',
    'Your licence key has been accepted and your course enrollment is now active.'
  ),
  (
    'portal_role_approved',
    'noreply@vortexelearning.com',
    'Your Vortex Learning portal role was approved',
    '<p>Your portal role request has been approved. Sign in to access your updated dashboard.</p>',
    'Your portal role request has been approved. Sign in to access your updated dashboard.'
  )
on conflict (template_key) do update
set sender_email = excluded.sender_email,
    subject = excluded.subject,
    body_html = excluded.body_html,
    body_text = excluded.body_text,
    updated_at = now();

update lessons
set lesson_type = 'text'
where coalesce(nullif(video_url, ''), '') = ''
  and coalesce(nullif(resource_url, ''), '') = '';
