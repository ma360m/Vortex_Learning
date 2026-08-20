import { redirect } from "next/navigation";
import { BadgeCheck, Bot, CreditCard, GraduationCap, Home, KeyRound, Mail, Settings, ShieldCheck, Ticket, UserPlus, Users, Upload } from "lucide-react";

import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";
import { PasswordSettingsPanel } from "@/components/vortex/password-settings-panel";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: Home },
  { label: "Courses", href: "/dashboard/admin/courses", icon: GraduationCap },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  { label: "AI agents", href: "/dashboard/admin/ai-agents", icon: Bot },
  { label: "Support", href: "/dashboard/admin/support", icon: Ticket },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const accountRows = [
  ["Registered learner", "profile-001", "Student", "Course enrolment, licence keys, certificates", "Active"],
  ["Parent access request", "profile-002", "Student", "Guardian visibility pending admin approval", "Needs parent access"],
  ["Instructor candidate", "profile-003", "Student", "Course builder access pending admin approval", "Eligible for instructor"],
  ["Approved instructor", "profile-004", "Instructor", "Course builder, quizzes, assignments, live support", "Teaching"],
  ["Developer seat", "profile-005", "Developer", "Themes, CMS, feature flags, logs", "Restricted"],
  ["SQL approved admin", "profile-006", "Admin", "Full supervision, protected by approved admin email list", "Protected"],
];

const supervisionAreas = [
  "All user profiles and roles",
  "Instructor course drafts",
  "Quizzes and assignments",
  "Resource downloads",
  "Payment slips and licence keys",
  "Certificates and completion",
  "AI agents and support tickets",
  "Audit logs and settings",
];

const payments = [
  ["O Level Physics Mastery", "Demo Student", "Slip uploaded"],
  ["IELTS Academic Band 7+", "Ayesha Khan", "Needs review"],
  ["Accelerated Exam Rescue", "Bilal Ahmed", "Verify now"],
];

const sections = ["users", "payments", "ai-agents", "support", "settings", "password"];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.includes(section)) redirect(`/coming-soon?feature=admin-${section}`);

  const active =
    section === "users"
      ? "Users"
      : section === "payments"
        ? "Payments"
        : section === "ai-agents"
          ? "AI agents"
          : section === "support"
            ? "Support"
            : section === "password"
              ? "Password"
              : "Settings";

  return (
    <PortalShell role="Admin Console" title={`${active} management.`} description="Admin-only operations connected to role promotion, payment verification, and licence-key issuing." active={active} user="Admin" navItems={navItems}>
      {section === "users" ? (
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-vortex-blue">Accounts supervision</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">All accounts and role access</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-vortex-muted">
                Every signed-in user starts as a student. Admin can promote users to parent, instructor, or developer access. Admin access itself remains protected by the SQL approved-admin list.
              </p>
            </div>
            <UserPlus className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3">
            {accountRows.map(([name, profileRef, role, access, status]) => (
              <div key={profileRef} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 xl:grid-cols-[1fr_0.7fr_1.35fr_auto] xl:items-center">
                <div>
                  <p className="font-semibold text-vortex-navy">{name}</p>
                  <p className="text-xs text-vortex-muted">{profileRef}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-vortex-blue">{role}</span>
                <span className="text-sm text-vortex-muted">{access} - {status}</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    ["assign-student", "Student"],
                    ["assign-parent", "Parent"],
                    ["promote-instructor", "Instructor"],
                    ["assign-developer", "Developer"],
                    ["suspend-account", "Suspend"],
                  ].map(([intent, label]) => (
                    <form key={intent} action="/api/vortex/admin-actions" method="post">
                      <input type="hidden" name="intent" value={intent} />
                      <input type="hidden" name="returnTo" value="/dashboard/admin/users" />
                      <input type="hidden" name="profile" value={profileRef} />
                      <button className={`h-9 rounded-full px-3 text-xs font-semibold ${
                        intent === "suspend-account"
                          ? "border border-vortex-border bg-white text-vortex-muted"
                          : "bg-vortex-navy text-white"
                      }`}>
                        {label}
                      </button>
                    </form>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-vortex-border bg-vortex-soft p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-vortex-blue" />
              <h3 className="text-sm font-semibold text-vortex-navy">Admin supervision coverage</h3>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {supervisionAreas.map((area) => (
                <span key={area} className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-vortex-slate">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : section === "payments" ? (
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Bank transfer verification</h2>
            <Upload className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3">
            {payments.map(([course, student, status]) => (
              <div key={`${course}-${student}`} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[1fr_0.7fr_auto_auto] lg:items-center">
                <div>
                  <p className="font-semibold text-vortex-navy">{course}</p>
                  <p className="text-xs text-vortex-muted">{student}</p>
                </div>
                <span className="text-xs font-semibold text-vortex-blue">{status}</span>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="verify-payment" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin/payments" />
                  <button className="h-9 rounded-full bg-vortex-navy px-3 text-xs font-semibold text-white">
                    <BadgeCheck className="mr-1 inline size-3.5" />
                    Verify
                  </button>
                </form>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="email-key" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin/payments" />
                  <button className="h-9 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy">
                    <KeyRound className="mr-1 inline size-3.5 text-vortex-blue" />
                    Email key
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      ) : section === "ai-agents" ? (
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">AI agents</h2>
            <Bot className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {["Course assistant", "Homework helper", "Quiz helper", "Revision planner", "Search assistant", "Support assistant"].map((agent) => (
              <div key={agent} className="rounded-2xl bg-vortex-soft p-4">
                <p className="text-sm font-semibold text-vortex-navy">{agent}</p>
                <p className="mt-2 text-xs leading-6 text-vortex-muted">Connect prompt rules, escalation, logs, and enable/disable state from Supabase.</p>
              </div>
            ))}
          </div>
        </section>
      ) : section === "support" ? (
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Support operations</h2>
            <Ticket className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3">
            {["Payment slip issue", "Course access request", "Parent portal request", "Instructor help escalation"].map((ticket) => (
              <div key={ticket} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <span className="text-sm font-semibold text-vortex-navy">{ticket}</span>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="support-ticket" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin/support" />
                  <button className="h-9 rounded-full bg-vortex-navy px-3 text-xs font-semibold text-white">Open</button>
                </form>
              </div>
            ))}
          </div>
        </section>
      ) : section === "password" ? (
        <PasswordSettingsPanel action="/api/vortex/admin-actions" returnTo="/dashboard/admin/password" />
      ) : (
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Platform settings</h2>
            <Settings className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              [ShieldCheck, "Role approvals", "Admin-only promotion for parent and instructor access."],
              [Mail, "Email queue", "Support, noreply, reminders, licence keys, and certificate emails."],
              [KeyRound, "Licence keys", "Bank transfer verification and course unlock rules."],
            ].map(([Icon, title, text]) => (
              <div key={title as string} className="rounded-2xl bg-vortex-soft p-4">
                <Icon className="size-5 text-vortex-blue" />
                <p className="mt-4 text-sm font-semibold text-vortex-navy">{title as string}</p>
                <p className="mt-2 text-xs leading-6 text-vortex-muted">{text as string}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </PortalShell>
  );
}
