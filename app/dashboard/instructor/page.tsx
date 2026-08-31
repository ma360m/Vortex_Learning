import Link from "next/link";
import {
  Award,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  MessageSquare,
  NotebookTabs,
  Plus,
  Settings,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

import { PortalRecordEmptyState } from "@/components/vortex/portal-empty-state";
import { PortalLiveSummary } from "@/components/vortex/portal-live-data";
import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/instructor", icon: Home },
  { label: "My courses", href: "/dashboard/instructor/courses", icon: BookOpen },
  { label: "Live classes", href: "/dashboard/instructor/live", icon: Video },
  { label: "Students", href: "/dashboard/instructor/students", icon: Users },
  { label: "Assignments", href: "/dashboard/instructor/assignments", icon: ClipboardCheck },
  { label: "Discussion", href: "/dashboard/instructor/discussion", icon: MessageSquare },
];

const instructorTools: Array<[LucideIcon, string, string]> = [
  [NotebookTabs, "Teacher notes", "Attach private notes to lessons, students, cohorts, and parent updates."],
  [FileText, "Resources", "Upload notes, worksheets, mark schemes, past papers, and transcript files."],
  [MessageSquare, "Discussion", "Answer student questions and escalate sensitive support requests."],
];

export const metadata = {
  title: "Instructor LMS",
  description:
    "Signed-in Vortex Learning instructor LMS for live classes, courses, students, attendance, homework, notes, discussion, and certificates.",
};

export default function InstructorDashboardPage() {
  return (
    <PortalShell
      role="Instructor LMS"
      title="Instructor dashboard"
      description="Manage live sessions, recorded modules, student progress, attendance, homework, teacher notes, discussions, resources, and certificate requirements."
      active="Overview"
      user="Instructor"
      navItems={navItems}
    >
      <PortalLiveSummary role="instructor" />

      <section className="mt-6 rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
        <div className="flex items-start gap-3">
          <GraduationCap className="mt-1 size-5 shrink-0 text-vortex-blue" />
          <div>
            <h2 className="text-sm font-semibold text-vortex-navy">Instructor data status</h2>
            <p className="mt-2 text-sm leading-7 text-vortex-muted">
              The instructor portal pages and builder links are ready. Live courses, assigned students, class schedules, submissions, discussions, and instructor approvals need Supabase records before this dashboard can show production data.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-vortex-blue">Instructor course builder</p>
                <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">Create and manage courses</h2>
              </div>
              <Plus className="size-5 text-vortex-blue" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Course title", "Enter course title"],
                ["Subject", "Enter subject"],
                ["Curriculum", "Board or curriculum"],
                ["Price", "PKR amount"],
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
                Student support
                <select className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none">
                  <option>Instructor questions and live help</option>
                  <option>Questions only</option>
                  <option>Scheduled live sessions only</option>
                </select>
              </label>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {[
                ["Modules", "/dashboard/instructor/courses/new#curriculum"],
                ["Lessons", "/dashboard/instructor/courses/new#curriculum"],
                ["Assignments", "/dashboard/instructor/assignments"],
              ].map(([item, href]) => (
                <Link key={item} href={href} className="inline-flex h-10 items-center justify-center rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy">
                  <Settings className="mr-1 inline size-3.5 text-vortex-blue" />
                  {item}
                </Link>
              ))}
            </div>
            <Link href="/dashboard/instructor/courses/new" className="btn-primary mt-5 h-11 px-5">
              <Plus className="size-4" />
              Open builder
            </Link>
          </div>

          <div className="grid gap-3">
            <h3 className="text-sm font-semibold text-vortex-navy">My course data</h3>
            <PortalRecordEmptyState
              title="No assigned course records yet"
              description="Instructor-owned courses, submissions, students, and help requests will appear here after admin approves the instructor role and assigns or approves courses."
              icon={HelpCircle}
            />
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Teaching schedule</h2>
            <Calendar className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 rounded-2xl border border-vortex-border bg-vortex-soft p-4 text-sm leading-7 text-vortex-muted">
            Live sessions will appear here after they are scheduled in the instructor course workspace.
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Course quality</h2>
            <Award className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 rounded-2xl border border-vortex-border bg-vortex-soft p-4 text-sm leading-7 text-vortex-muted">
            Attendance, homework review, discussion, and certificate readiness will appear from live course records.
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {instructorTools.map(([Icon, title, text]) => (
          <div key={title} className="rounded-[1.35rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            <Icon className="size-5 text-vortex-blue" />
            <h3 className="mt-4 font-heading text-2xl font-semibold text-vortex-navy">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-vortex-muted">{text}</p>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
