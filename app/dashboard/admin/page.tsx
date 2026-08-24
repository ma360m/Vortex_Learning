import Link from "next/link";
import {
  BadgeCheck,
  BarChart3,
  Banknote,
  BookOpen,
  Bot,
  ClipboardCheck,
  CreditCard,
  Eye,
  FileText,
  GraduationCap,
  Home,
  KeyRound,
  Mail,
  Plus,
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

import { PortalCard, PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";
import { blogPosts, courses, instructors, policyPages } from "@/lib/vortex-data";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: Home },
  { label: "Courses", href: "/dashboard/admin/courses", icon: GraduationCap },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  { label: "Content", href: "/dashboard/admin/content", icon: FileText },
  { label: "AI agents", href: "/dashboard/admin/ai-agents", icon: Bot },
  { label: "Support", href: "/dashboard/admin/support", icon: Ticket },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const totalResources = courses.reduce((sum, course) => sum + (course.resourceFiles?.length ?? 0), 0);
const previewModuleCount = courses.reduce((sum, course) => sum + (course.freeModuleCount ?? 0), 0);

const adminModules: Array<[LucideIcon, string, string]> = [
  [GraduationCap, "Courses", "Catalog, modules, resources, quizzes, approvals, live cohorts, and certificates."],
  [Users, "Accounts", "Students, parents, instructors, developers, support agents, and role permissions."],
  [CreditCard, "Payments", "Orders, invoices, refunds, receipts, coupons, and purchase events."],
  [ClipboardCheck, "Assignments", "Homework, submissions, grading queues, rubrics, and teacher feedback."],
  [FileText, "Content", "Blogs, guides, resources, FAQs, SEO metadata, and course landing copy."],
  [Mail, "Email system", "Welcome, reset, purchase, completion, lesson reminders, digest, and newsletter."],
  [Bot, "AI agents", "Course assistant, support bot, planner, recommender, and tutor matching."],
  [Ticket, "Support tickets", "Live chat, WhatsApp, forms, SLA state, and escalation history."],
  [UserCog, "Tutor requests", "Consultation bookings, teacher matching, availability, and follow-up."],
  [ScrollText, "Logs", "Audit trails, email events, deploy events, AI usage, and admin activity."],
];

const registeredUsers = [
  ["Ayaan Khan", "student-001", "Student", courses[0]?.title ?? "Course enrolment", "Active"],
  ["Parent access request", "parent-001", "Parent pending", "2 learners", "Needs approval"],
  ["Instructor candidate", "instructor-001", "Instructor pending", instructors[0]?.subjects.join(", ") ?? "Science", "Review"],
];

const instructorRows = instructors.map((instructor) => [
  instructor.name,
  instructor.subjects.join(", "),
  instructor.experience,
  instructor.rating,
]);

const paymentRows = courses.slice(0, 3).map((course, index) => [
  course.title,
  ["Ayaan Khan", "Parent account", "Entry test learner"][index] ?? "Learner",
  course.paymentMethod ?? "Bank transfer",
  ["Slip uploaded", "Needs review", "Verify now"][index] ?? "Pending",
]);

export const metadata = {
  title: "Admin Console",
  description:
    "Signed-in Vortex Learning admin console for courses, users, payments, assignments, content, emails, AI agents, support, analytics, settings, and logs.",
};

export default function AdminDashboardPage() {
  return (
    <PortalShell
      role="Admin Console"
      title="Institution control center."
      description="A signed-in operations console for managing learning, users, teachers, parents, developers, payments, support, AI agents, analytics, approvals, settings, and logs."
      active="Overview"
      user="Admin"
      navItems={navItems}
    >
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        <PortalCard title="Course records" value={`${courses.length}`} caption="linked course pages" icon={GraduationCap} />
        <PortalCard title="Locked resources" value={`${totalResources}`} caption="attached course files" icon={ShieldCheck} />
        <PortalCard title="Preview modules" value={`${previewModuleCount}`} caption="free module slots" icon={BookOpen} />
        <PortalCard title="Content pages" value={`${blogPosts.length + policyPages.length}`} caption="blogs and policies" icon={FileText} />
      </div>

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
              ["Course title", "Accelerated Chemistry Rescue"],
              ["Subject", "Chemistry"],
              ["Curriculum", "FSc / Cambridge / Edexcel"],
              ["Instructor", "Dr. Ayesha Rahman"],
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
          <div className="mt-5 overflow-hidden rounded-2xl border border-vortex-border">
            {registeredUsers.map(([name, profileRef, role, course, status]) => (
              <div key={profileRef} className="grid gap-3 border-b border-vortex-border p-4 last:border-b-0 lg:grid-cols-[1fr_1fr_0.8fr_auto_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold text-vortex-navy">{name}</p>
                  <p className="text-xs text-vortex-muted">{profileRef}</p>
                </div>
                <p className="text-sm text-vortex-slate">{course}</p>
                <p className="text-xs font-semibold text-vortex-blue">{role} - {status}</p>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="promote-instructor" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin" />
                  <input type="hidden" name="profile" value={profileRef} />
                  <button type="submit" className="h-9 rounded-full border border-vortex-border px-3 text-xs font-semibold text-vortex-navy">
                    Make instructor
                  </button>
                </form>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="assign-parent" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin" />
                  <input type="hidden" name="profile" value={profileRef} />
                  <button type="submit" className="h-9 rounded-full border border-vortex-border px-3 text-xs font-semibold text-vortex-navy">
                    Make parent
                  </button>
                </form>
              </div>
            ))}
          </div>
          <h3 className="mt-6 text-sm font-semibold text-vortex-navy">Instructor data</h3>
          <div className="mt-3 grid gap-2">
            {instructorRows.map(([name, subjects, experience, status]) => (
              <div key={name} className="grid gap-2 rounded-2xl bg-vortex-soft p-3 text-sm lg:grid-cols-[1fr_1fr_auto_auto] lg:items-center">
                <span className="font-semibold text-vortex-navy">{name}</span>
                <span className="text-vortex-muted">{subjects}</span>
                <span className="text-vortex-muted">{experience}</span>
                <span className="font-semibold text-vortex-blue">{status}</span>
              </div>
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
              <Banknote className="size-5 text-vortex-blue" />
            </div>
            <p className="mt-3 text-sm leading-7 text-vortex-muted">
              Student uploads a bank-transfer slip. Admin verifies it, then emails the licence key to the user for course access.
            </p>
            <div className="mt-5 grid gap-2 text-sm">
              <a href="mailto:support@vortexelearning.com" className="font-semibold text-vortex-blue">support@vortexelearning.com</a>
              <a href="tel:+923244270697" className="font-semibold text-vortex-blue">+92 324 4270697</a>
            </div>
          </div>
          <div className="grid gap-3">
            {paymentRows.map(([course, student, method, status]) => (
              <div key={`${course}-${student}`} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[1fr_0.7fr_auto_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold text-vortex-navy">{course}</p>
                  <p className="text-xs text-vortex-muted">{student} - {method}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-vortex-blue">
                  <Upload className="size-4" />
                  {status}
                </span>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="verify-payment" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin" />
                  <input type="hidden" name="course" value={course} />
                  <button type="submit" className="h-9 rounded-full bg-vortex-navy px-3 text-xs font-semibold text-white">
                    <BadgeCheck className="mr-1 inline size-3.5" />
                    Verify
                  </button>
                </form>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="email-key" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin" />
                  <input type="hidden" name="student" value={student} />
                  <button type="submit" className="h-9 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy">
                    <KeyRound className="mr-1 inline size-3.5 text-vortex-blue" />
                    Email key
                  </button>
                </form>
              </div>
            ))}
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
            {adminModules.map(([Icon, title, text]) => (
              <div key={title} className="rounded-2xl border border-vortex-border bg-vortex-soft p-4">
                <Icon className="size-5 text-vortex-blue" />
                <h3 className="mt-4 text-sm font-semibold text-vortex-navy">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-vortex-muted">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Approval queue</h2>
            <div className="mt-5 grid gap-3">
              {[
                "A Level Economics course review",
                "Teacher verification: Computer Science",
                "Coupon campaign approval",
                "Certificate template update",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-navy">
                  {item}
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Escalations</h2>
            <div className="mt-5 grid gap-3">
              {[
                "Parent payment query",
                "Tutor request pending match",
                "AI support handoff",
                "Live class attendance mismatch",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-vortex-border px-4 py-3 text-sm text-vortex-slate">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
