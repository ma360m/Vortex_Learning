import { redirect } from "next/navigation";
import {
  Bot,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  Home,
  KeyRound,
  Mail,
  ScrollText,
  Settings,
  ShieldCheck,
  Ticket,
  UserCog,
  UserPlus,
  Users,
  Upload,
  type LucideIcon,
} from "lucide-react";

import { PortalRecordEmptyState } from "@/components/vortex/portal-empty-state";
import { PortalLiveSummary } from "@/components/vortex/portal-live-data";
import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";
import { AdminPaymentReviews } from "@/components/vortex/admin-payment-reviews";
import { AdminRoleRequests } from "@/components/vortex/admin-role-requests";
import { AdminSiteContentEditor } from "@/components/vortex/admin-site-content-editor";
import { PasswordSettingsPanel } from "@/components/vortex/password-settings-panel";
import {
  blogPosts,
  courses,
  policyPages,
  projectAttribution,
  socialLinks,
  studentFeedbacks,
} from "@/lib/vortex-data";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: Home },
  { label: "Courses", href: "/dashboard/admin/courses", icon: GraduationCap },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  { label: "Assignments", href: "/dashboard/admin/assignments", icon: ClipboardCheck },
  { label: "Content", href: "/dashboard/admin/content", icon: FileText },
  { label: "Emails", href: "/dashboard/admin/emails", icon: Mail },
  { label: "AI agents", href: "/dashboard/admin/ai-agents", icon: Bot },
  { label: "Support", href: "/dashboard/admin/support", icon: Ticket },
  { label: "Tutor requests", href: "/dashboard/admin/tutor-requests", icon: UserCog },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  { label: "Logs", href: "/dashboard/admin/logs", icon: ScrollText },
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

type AdminExtraSection = {
  active: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  intent: string;
  rows: Array<[string, string, string]>;
};

const adminExtraSections: Record<string, AdminExtraSection> = {
  assignments: {
    active: "Assignments",
    eyebrow: "Academic review",
    title: "Assignments, homework, and teacher feedback",
    description:
      "Review submitted homework, pending grading queues, rubric updates, and instructor feedback requests from one admin section.",
    icon: ClipboardCheck,
    intent: "assignment-save",
    rows: [],
  },
  emails: {
    active: "Emails",
    eyebrow: "Communication",
    title: "Email templates and delivery queue",
    description:
      "Supervise welcome emails, purchase receipts, licence keys, reminders, certificates, and support replies.",
    icon: Mail,
    intent: "email-save",
    rows: [],
  },
  "tutor-requests": {
    active: "Tutor requests",
    eyebrow: "Consultation workflow",
    title: "Tutor matching and consultation requests",
    description:
      "Track learner goals, parent requests, instructor availability, and follow-up ownership for consultation handoffs.",
    icon: UserCog,
    intent: "tutor-request-save",
    rows: [],
  },
  logs: {
    active: "Logs",
    eyebrow: "Audit trail",
    title: "Admin activity, access, and event logs",
    description:
      "Review payment verification, role changes, content actions, support escalation, and email activity.",
    icon: ScrollText,
    intent: "log-review",
    rows: [],
  },
};

const sections = [
  "users",
  "payments",
  "assignments",
  "content",
  "emails",
  "ai-agents",
  "support",
  "tutor-requests",
  "settings",
  "logs",
  "password",
];

const activeBySection: Record<string, string> = {
  users: "Users",
  payments: "Payments",
  assignments: "Assignments",
  content: "Content",
  emails: "Emails",
  "ai-agents": "AI agents",
  support: "Support",
  "tutor-requests": "Tutor requests",
  settings: "Settings",
  logs: "Logs",
  password: "Password",
};

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

function AdminExtraSectionPanel({
  section,
  page,
}: {
  section: string;
  page: AdminExtraSection;
}) {
  const Icon = page.icon;

  return (
    <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-vortex-blue">{page.eyebrow}</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">{page.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-vortex-muted">{page.description}</p>
        </div>
        <Icon className="size-5 text-vortex-blue" />
      </div>
      <div className="mt-5">
        {page.rows.length ? (
          <div className="grid gap-3">
            {page.rows.map(([title, meta, status]) => (
              <div key={`${title}-${meta}`} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[1fr_0.8fr_auto] lg:items-center">
                <span className="font-semibold text-vortex-navy">{title}</span>
                <span className="text-sm text-vortex-muted">{meta}</span>
                <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-vortex-blue">{status}</span>
              </div>
            ))}
          </div>
        ) : (
          <PortalRecordEmptyState
            title="No live records yet"
            description={`${page.active} rows will appear here after the related Supabase table has production data.`}
            icon={page.icon}
          />
        )}
      </div>
      <form action="/api/vortex/admin-actions" method="post" className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input type="hidden" name="intent" value={page.intent} />
        <input type="hidden" name="returnTo" value={`/dashboard/admin/${section}`} />
        <input
          name="note"
          className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none"
          placeholder={`Add a note for ${page.active.toLowerCase()}`}
        />
        <button className="btn-primary h-11 px-5">
          Save
        </button>
      </form>
    </section>
  );
}

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.includes(section)) redirect(`/coming-soon?feature=admin-${section}`);

  const active = activeBySection[section] ?? "Settings";

  return (
    <PortalShell role="Admin Console" title={`${active} management`} description="Admin-only operations connected to role promotion, payment verification, and licence-key issuing." active={active} user="Admin" navItems={navItems}>
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
          <div className="mt-5">
            <PortalLiveSummary role="admin" />
            <div className="mt-5">
              <AdminRoleRequests />
            </div>
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
          <div className="mt-5">
            <AdminPaymentReviews />
          </div>
        </section>
      ) : section === "content" ? (
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-vortex-blue">Site content</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">Editable homepage, feedback, policies, and footer content</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-vortex-muted">
                Save public website content into Supabase while keeping the built-in defaults available if the content tables are empty.
              </p>
            </div>
            <FileText className="size-5 text-vortex-blue" />
          </div>

          <div className="mt-6">
            <AdminSiteContentEditor
              heroBadge="Vortex Learning - Learning, structured for your path."
              feedbacks={studentFeedbacks}
              policies={policyPages}
              project={projectAttribution}
              socials={socialLinks}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-vortex-border bg-vortex-soft p-4">
            <h3 className="text-sm font-semibold text-vortex-navy">Linked content inventory</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {[
                [`${courses.length} courses`, "Course catalog"],
                [`${blogPosts.length} posts`, "Blog"],
                [`${policyPages.length} policies`, "Policies"],
                [`${studentFeedbacks.length} feedbacks`, "Homepage"],
              ].map(([value, label]) => (
                <span key={label} className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-vortex-slate">
                  {value} - {label}
                </span>
              ))}
            </div>
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
                <p className="mt-2 text-xs leading-6 text-vortex-muted">Configured for course search, support handoff, revision planning, and admin review.</p>
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
          <div className="mt-5">
            <PortalRecordEmptyState
              title="No support tickets yet"
              description="Support requests will appear here when the support table is connected to the portal forms."
              icon={Ticket}
            />
          </div>
        </section>
      ) : adminExtraSections[section] ? (
        <AdminExtraSectionPanel section={section} page={adminExtraSections[section]} />
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
