import Link from "next/link";
import {
  Award,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
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

import { PortalCard, PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/instructor", icon: Home },
  { label: "My courses", href: "/dashboard/instructor/courses", icon: BookOpen },
  { label: "Live classes", href: "/dashboard/instructor/live", icon: Video },
  { label: "Students", href: "/dashboard/instructor/students", icon: Users },
  { label: "Assignments", href: "/dashboard/instructor/assignments", icon: ClipboardCheck },
  { label: "Discussion", href: "/dashboard/instructor/discussion", icon: MessageSquare },
];

const instructorCourses = [
  ["O Level Physics Mastery", "Hybrid", "412 students", "Published"],
  ["Accelerated Exam Rescue", "Accelerated", "86 students", "Draft"],
  ["A Level Mechanics Clinic", "Live", "124 students", "Review"],
];

const helpRequests = [
  ["Ayaan", "Momentum worksheet question", "Lesson help"],
  ["Noor", "Book a live doubt session", "Live help"],
  ["Hamza", "Past paper marking request", "Assignment"],
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
      title="Teaching studio for Dr. Ayesha"
      description="Manage live sessions, recorded modules, student progress, attendance, homework, teacher notes, discussions, resources, and certificate requirements."
      active="Overview"
      user="Dr. Ayesha"
      navItems={navItems}
    >
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        <PortalCard title="Active courses" value="6" caption="sample courses owned" icon={BookOpen} />
        <PortalCard title="Students" value="412" caption="sample enrolled learners" icon={Users} />
        <PortalCard title="Live today" value="3" caption="classes scheduled" icon={Video} />
        <PortalCard title="To review" value="29" caption="assignments pending" icon={ClipboardCheck} />
      </div>

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
                ["Course title", "A Level Physics Intensive"],
                ["Subject", "Physics"],
                ["Curriculum", "Cambridge / Edexcel / FSc"],
                ["Price", "PKR 18,000"],
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
            {instructorCourses.map(([title, type, students, status]) => (
              <div key={title} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-vortex-navy">{title}</p>
                  <p className="mt-1 text-xs text-vortex-muted">{type} course</p>
                </div>
                <span className="text-xs font-semibold text-vortex-slate">{students}</span>
                <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-vortex-blue">{status}</span>
              </div>
            ))}
            <div className="rounded-2xl border border-vortex-border bg-white p-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="size-5 text-vortex-blue" />
                <h3 className="text-sm font-semibold text-vortex-navy">Instructor help queue</h3>
              </div>
              <div className="mt-3 grid gap-2">
                {helpRequests.map(([student, request, type]) => (
                  <div key={`${student}-${request}`} className="rounded-xl bg-vortex-soft px-3 py-2 text-sm">
                    <span className="font-semibold text-vortex-navy">{student}</span>
                    <span className="text-vortex-muted"> - {request}</span>
                    <span className="ml-2 text-xs font-semibold text-vortex-blue">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Teaching schedule</h2>
            <Calendar className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3">
            {[
              ["5:00 PM", "O Level Physics - Electricity revision", "Zoom ready"],
              ["6:30 PM", "A Level mechanics clinic", "Google Meet"],
              ["8:00 PM", "Parent progress consultation", "Notes prepared"],
            ].map(([time, title, status]) => (
              <div key={title} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[92px_1fr_auto] lg:items-center">
                <span className="rounded-xl bg-white px-3 py-2 text-center text-xs font-semibold text-vortex-blue">{time}</span>
                <span>
                  <span className="block text-sm font-semibold text-vortex-navy">{title}</span>
                  <span className="mt-1 block text-xs text-vortex-muted">{status}</span>
                </span>
                <Link href="/dashboard/instructor/live" className="btn-primary h-10 px-4 text-xs">Open</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Course quality</h2>
            <Award className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3">
            {[
              ["Attendance", "94%", "live-class participation"],
              ["Homework review", "29", "items waiting"],
              ["Discussion", "16", "unanswered questions"],
              ["Certificates", "8", "ready to issue"],
            ].map(([label, value, caption]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-vortex-border px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-vortex-navy">{label}</p>
                  <p className="mt-1 text-xs text-vortex-muted">{caption}</p>
                </div>
                <span className="font-heading text-3xl font-semibold text-vortex-blue">{value}</span>
              </div>
            ))}
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
