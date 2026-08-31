-- Vortex Learning admin-editable website content
-- Run after database/vortex_learning_schema.sql.

create table if not exists site_content_blocks (
  id uuid primary key default gen_random_uuid(),
  block_key text unique not null,
  eyebrow text,
  title text not null,
  body text,
  href text,
  metadata jsonb not null default '{}',
  published boolean not null default true,
  updated_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists site_student_feedbacks (
  id uuid primary key default gen_random_uuid(),
  feedback_key text unique not null,
  name text not null,
  role text,
  quote text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  updated_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists site_policy_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  sections jsonb not null default '[]',
  last_updated date,
  published boolean not null default true,
  updated_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists site_social_links (
  id uuid primary key default gen_random_uuid(),
  kind text unique not null,
  label text not null,
  href text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  updated_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_site_content_blocks_published on site_content_blocks(published);
create index if not exists idx_site_feedbacks_published_order on site_student_feedbacks(published, sort_order);
create index if not exists idx_site_policies_published_slug on site_policy_pages(published, slug);
create index if not exists idx_site_social_links_published_order on site_social_links(published, sort_order);

alter table site_content_blocks enable row level security;
alter table site_student_feedbacks enable row level security;
alter table site_policy_pages enable row level security;
alter table site_social_links enable row level security;

drop policy if exists "public reads published site content" on site_content_blocks;
create policy "public reads published site content" on site_content_blocks
for select using (published = true);

drop policy if exists "admins manage site content" on site_content_blocks;
create policy "admins manage site content" on site_content_blocks
for all using (current_user_is_admin()) with check (current_user_is_admin());

drop policy if exists "public reads published feedbacks" on site_student_feedbacks;
create policy "public reads published feedbacks" on site_student_feedbacks
for select using (published = true);

drop policy if exists "admins manage feedbacks" on site_student_feedbacks;
create policy "admins manage feedbacks" on site_student_feedbacks
for all using (current_user_is_admin()) with check (current_user_is_admin());

drop policy if exists "public reads published policies" on site_policy_pages;
create policy "public reads published policies" on site_policy_pages
for select using (published = true);

drop policy if exists "admins manage policies" on site_policy_pages;
create policy "admins manage policies" on site_policy_pages
for all using (current_user_is_admin()) with check (current_user_is_admin());

drop policy if exists "public reads published social links" on site_social_links;
create policy "public reads published social links" on site_social_links
for select using (published = true);

drop policy if exists "admins manage social links" on site_social_links;
create policy "admins manage social links" on site_social_links
for all using (current_user_is_admin()) with check (current_user_is_admin());

insert into site_content_blocks (block_key, eyebrow, title, body, href, metadata)
values
  (
    'home_hero_badge',
    null,
    'Vortex Learning - Learning, structured for your path.',
    null,
    null,
    '{}'
  ),
  (
    'home_feedback',
    'Student feedback',
    'Clear guidance, real progress',
    'Students and families come here for structured courses, practical reminders, teacher support, and a learning path that is easier to follow.',
    '/support#community',
    '{"secondary_href":"/blog","secondary_label":"See our blogs"}'
  ),
  (
    'project_attribution',
    'Phonics Club initiative',
    'Vortex Learning is a project of Phonics Club',
    'Built as a structured digital learning initiative by Phonics Club for students, families, tutors, and academic teams who need organized learning pathways.',
    '/about#phonics-club',
    '{"points":["Academic structure","Parent visibility","Tutor guidance","Student support"]}'
  )
on conflict (block_key) do update
set eyebrow = excluded.eyebrow,
    title = excluded.title,
    body = excluded.body,
    href = excluded.href,
    metadata = excluded.metadata,
    updated_at = now();

insert into site_student_feedbacks (feedback_key, name, role, quote, sort_order)
values
  ('o-level-physics-exam', 'O Level learner', 'Physics exam preparation', 'My papers went extremely well, especially Physics. Mark-scheme practice helped me understand what examiners wanted and shape stronger answers.', 1),
  ('parent-concept-progress', 'Parent feedback', 'Concept clarity and progress', 'She loved studying with Ms Aiyesha and showed clear progress after starting lessons. We are grateful for the care and effort.', 2),
  ('maths-confidence', 'Mathematics learner', 'Confidence before exams', 'My maths exam felt so much easier. Thank you for devoting your time and helping me understand the questions with confidence.', 3),
  ('three-year-journey', 'Long-term learner', 'Three-year journey', 'Ms Aiyesha helped me rise when I had almost given up. Her teaching and encouragement made these exams possible.', 4),
  ('a-level-ready', 'A Level learner', 'Moving forward', 'My family is happy and proud. After O Levels, I feel ready and motivated to begin A Levels with full focus.', 5)
on conflict (feedback_key) do update
set name = excluded.name,
    role = excluded.role,
    quote = excluded.quote,
    sort_order = excluded.sort_order,
    updated_at = now();

insert into site_policy_pages (slug, title, summary, sections, last_updated)
values
  (
    'privacy',
    'Privacy Policy',
    'How Vortex Learning handles account data, learning progress, support requests, payment verification records, and communication preferences.',
    '[["Information we collect","We collect information needed to create accounts, recommend learning paths, operate course access, track progress, and respond to support requests."],["How we use information","We use data to provide courses, live learning, resources, certificates, parent visibility, support, admin operations, and platform security."],["Learning and parent visibility","Progress, attendance, homework, certificates, and teacher feedback may be visible to approved parent or guardian accounts."],["Payment records","Bank transfer slips, verification status, and licence-key records are used only for course access and finance support."],["Contact","For privacy questions, contact support@vortexelearning.com."]]',
    '2026-08-01'
  ),
  (
    'terms',
    'Terms of Use',
    'Rules for using courses, previews, locked resources, dashboards, support tools, and Vortex Learning accounts.',
    '[["Course access","Preview modules may be available before payment. Full access requires approved payment and licence-key activation where applicable."],["Student responsibilities","Students should use lessons, resources, AI support, assignments, and discussions honestly and respectfully."],["Resources","Paid resources are protected. Downloads stay disabled unless admin enables downloading for a course or resource."],["Certificates","Certificates depend on course completion, quiz requirements, assignment review, and active access rules."],["Support","Support requests should include accurate contact details and course information so the team can respond correctly."]]',
    '2026-08-01'
  ),
  (
    'refund',
    'Refund Policy',
    'How Vortex Learning reviews refund requests for course access, duplicate payments, and payment verification issues.',
    '[["Review basis","Refund requests are reviewed against course access status, payment records, resource access, and the reason provided."],["Duplicate payments","Duplicate bank transfers can be reviewed by support when proof of payment is provided."],["Course access issues","If access was not activated after approved payment, support will prioritize resolving access before considering a refund."],["How to request","Email support@vortexelearning.com with the registered email, course name, payment proof, and reason."]]',
    '2026-08-01'
  ),
  (
    'cookies',
    'Cookie Policy',
    'How cookies and local browser storage may be used for sign-in state, preferences, dashboards, and support tools.',
    '[["Essential storage","The platform may use cookies or local browser storage for sign-in state, dashboard routing, and basic preferences."],["Support tools","Chat and support widgets may store conversation state so the user can continue a request."],["Control","Users can clear browser storage, but some account and dashboard features may require signing in again."]]',
    '2026-08-01'
  )
on conflict (slug) do update
set title = excluded.title,
    summary = excluded.summary,
    sections = excluded.sections,
    last_updated = excluded.last_updated,
    updated_at = now();

insert into site_social_links (kind, label, href, sort_order)
values
  ('instagram', 'Instagram', 'https://www.instagram.com/vortex.learning?igsi=ZDNlZDc0MzIxNw==', 1),
  ('youtube', 'YouTube', 'https://youtube.com/@vortex-elearning?si=itlglnaI6To7Msuv', 2)
on conflict (kind) do update
set label = excluded.label,
    href = excluded.href,
    sort_order = excluded.sort_order,
    updated_at = now();
