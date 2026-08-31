import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  ClipboardCheck,
  CreditCard,
  Eye,
  FileText,
  GraduationCap,
  Home,
  Mail,
  Plus,
  ScrollText,
  Settings,
  ShieldCheck,
  Ticket,
  UserCog,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

import { AdminPaymentReviews } from "@/components/vortex/admin-payment-reviews";
import { PortalRecordEmptyState } from "@/components/vortex/portal-empty-state";
import { PortalLiveSummary } from "@/components/vortex/portal-live-data";
import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";
import { instructors } from "@/lib/vortex-data";

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

const adminModules: Array<[LucideIcon, string, string, string]> = [
  [GraduationCap, "Courses", "Catalog, modules, resources, quizzes, approvals, live cohorts, and certificates.", "/dashboard/admin/courses"],
  [Users, "Accounts", "Students, parents, instructors, developers, support agents, and role permissions.", "/dashboard/admin/users"],
  [CreditCard, "Payments", "Orders, invoices, refunds, receipts, coupons, and purchase events.", "/dashboard/admin/payments"],
  [ClipboardCheck, "Assignments", "Homework, submissions, grading queues, rubrics, and teacher feedback.", "/dashboard/admin/assignments"],
  [FileText, "Content", "Blogs, guides, resources, FAQs, SEO metadata, and course landing copy.", "/dashboard/admin/content"],
  [Mail, "Email system", "Welcome, reset, purchase, completion, lesson reminders, digest, and newsletter.", "/dashboard/admin/emails"],
  [Bot, "AI agents", "Course assistant, support bot, planner, recommender, and tutor matching.", "/dashboard/admin/ai-agents"],
  [Ticket, "Support tickets", "Live chat, WhatsApp, forms, SLA state, and escalation history.", "/dashboard/admin/support"],
  [UserCog, "Tutor requests", "Consultation bookings, teacher matching, availability, and follow-up.", "/dashboard/admin/tutor-requests"],
  [ScrollText, "Logs", "Audit trails, email events, deploy events, AI usage, and admin activity.", "/dashboard/admin/logs"],
];

export const metadata = {
  title: "Admin Console",
  description:
    "Signed-in Vortex Learning admin console for courses, users, payments, assignments, content, emails, AI agents, support, analytics, settings, and logs.",
};

export default function AdminDashboardPage() {
  return (
    <PortalShell
      role="Admin Console"
      title="Institution control center"
      description="A signed-in operations console for managing learning, users, teachers, parents, developers, payments, support, AI agents, analytics, approvals, settings, and logs."
      active="Overview"
      user="Admin"
      navItems={navItems}
    >
      <PortalLiveSummary role="admin" />

      <section className="mt-6 rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1 size-5 shrink-0 text-vortex-blue" />
          <div>
            <h2 className="text-sm font-semibold text-vortex-navy">Data status</h2>
            <p className="mt-2 text-sm leading-7 text-vortex-muted">
              Course, profile, payment, and email counts are read from Supabase for the signed-in admin account. Static site content still uses the local content file until you apply the site-content SQL and connect those admin forms to persisted records.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1fr_1fr]">
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-vortex-blue">Course builder</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">Create a course</h2>
            </div>
            <Plus className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              ["Course title", "Enter course title"],
              ["Subject", "Enter subject"],
              ["Curriculum", "Board or curriculum"],
              ["Instructor", "Approved instructor"],
            ].map(([label, placeholder]) => (
              <label key={label} className="grid gap-2 text-sm font-semibold text-vortex-navy">
                {label}
                <input className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder={placeholder} />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
              Course type
              <select className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none">
                <option>Self paced</option>
                <option>Live</option>
                <option>Hybrid</option>
                <option>Bootcamp</option>
                <option>Accelerated Learning Program</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
              Access
              <select className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none">
                <option>Licence key after payment verification</option>
                <option>Free preview</option>
                <option>Admin approved</option>
              </select>
            </label>
          </div>
          <div className="mt-4 rounded-2xl border border-vortex-border bg-vortex-soft p-4">
            <p className="text-sm font-semibold text-vortex-navy">Builder modules</p>
            <div className="mt-3 grid gap-2">
              {["Overview", "Curriculum", "Resources", "Quizzes", "Assignments", "Instructor help", "Live sessions", "Certificate"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-semibold text-vortex-slate">
                  {item}
                  <Eye className="size-3.5 text-vortex-blue" />
                </div>
              ))}
            </div>
          </div>
          <Link href="/dashboard/admin/courses/new" className="btn-primary mt-5 h-11 px-5">
            <Plus className="size-4" />
            Open course builder
          </Link>
        </section>

        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-vortex-blue">Users and instructors</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">Registered users</h2>
            </div>
            <UserPlus className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5">
            <PortalRecordEmptyState
              title="No profile rows rendered here"
              description="Use the Users section for Supabase-backed role approvals. Accounts start as students; only approved admins can assign parent, instructor, developer, or admin roles."
              icon={UserPlus}
            />
          </div>
          <h3 className="mt-6 text-sm font-semibold text-vortex-navy">Published instructor profiles</h3>
          <div className="mt-3 grid gap-2">
            {instructors.map((instructor) => (
              <Link
                key={instructor.name}
                href="/team#instructors"
                className="grid gap-2 rounded-2xl bg-vortex-soft p-3 text-sm lg:grid-cols-[1fr_1fr_auto_auto] lg:items-center"
              >
                <span className="font-semibold text-vortex-navy">{instructor.name}</span>
                <span className="text-vortex-muted">{instructor.subjects.join(", ")}</span>
                <span className="text-vortex-muted">{instructor.experience}</span>
                <span className="font-semibold text-vortex-blue">{instructor.rating}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-vortex-blue">Payment verification</p>
                <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">Bank slips and licence keys</h2>
              </div>
              <CreditCard className="size-5 text-vortex-blue" />
            </div>
            <p className="mt-3 text-sm leading-7 text-vortex-muted">
              Student uploads a bank-transfer slip. Admin verifies it, then emails the licence key to the user for course access.
            </p>
            <div className="mt-5 grid gap-2 text-sm">
              <a href="mailto:support@vortexelearning.com" className="font-semibold text-vortex-blue">support@vortexelearning.com</a>
              <a href="tel:+923244270697" className="font-semibold text-vortex-blue">+92 324 4270697</a>
            </div>
          </div>
          <div>
            <AdminPaymentReviews compact />
            <Link href="/dashboard/admin/payments" className="btn-secondary mt-4 h-10 px-4 text-xs">
              Open payment section
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Management modules</h2>
            <BarChart3 className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {adminModules.map(([Icon, title, text, href]) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl border border-vortex-border bg-vortex-soft p-4 transition hover:border-vortex-cyan hover:bg-white hover:shadow-[0_14px_45px_rgba(9,29,83,0.08)]"
              >
                <Icon className="size-5 text-vortex-blue" />
                <h3 className="mt-4 flex items-center justify-between gap-3 text-sm font-semibold text-vortex-navy">
                  {title}
                  <ArrowRight className="size-4 text-vortex-cyan transition group-hover:translate-x-1" />
                </h3>
                <p className="mt-2 text-xs leading-6 text-vortex-muted">{text}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Approval queue</h2>
            <div className="mt-5">
              <PortalRecordEmptyState
                title="No live approvals waiting"
                description="Course drafts, role requests, and certificate updates will show here after those records are created in Supabase."
                icon={ClipboardCheck}
              />
            </div>
          </section>
          <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Escalations</h2>
            <div className="mt-5">
              <PortalRecordEmptyState
                title="No escalation records"
                description="Support handoffs, attendance issues, and urgent payment reviews will populate here from live portal activity."
                icon={Ticket}
              />
            </div>
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
