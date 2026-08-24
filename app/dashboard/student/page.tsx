import Link from "next/link";
import {
  Award,
  Banknote,
  Bell,
  Bookmark,
  Calendar,
  Clock,
  GraduationCap,
  HelpCircle,
  Home,
  KeyRound,
  Library,
  MessageSquare,
  Phone,
  Target,
  Trophy,
  Upload,
} from "lucide-react";

import { PortalCard, PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/student", icon: Home },
  { label: "My courses", href: "/dashboard/student/courses", icon: Library },
  { label: "Calendar", href: "/dashboard/student/calendar", icon: Calendar },
  { label: "Bookmarks", href: "/dashboard/student/bookmarks", icon: Bookmark },
  { label: "Messages", href: "/dashboard/student/help", icon: MessageSquare },
  { label: "Certificates", href: "/dashboard/student/certificates", icon: Award },
];

export const metadata = {
  title: "Student LMS",
  description:
    "Signed-in Vortex Learning student LMS for lessons, goals, achievements, calendar, certificates, bookmarks, and recommendations.",
};

export default function StudentDashboardPage() {
  return (
    <PortalShell
      role="Student LMS"
      title="Welcome back, Ayaan."
      description="Continue learning, review today's goals, track achievements, manage bookmarks, and keep every lesson tied to your study plan."
      active="Overview"
      user="Ayaan"
      navItems={navItems}
    >
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        <PortalCard title="Continue learning" value="62%" caption="O Level Physics progress" icon={Clock} />
        <PortalCard title="Daily goal" value="42m" caption="18 minutes remaining today" icon={Target} />
        <PortalCard title="Achievements" value="18" caption="sample badges earned" icon={Trophy} />
        <PortalCard title="Certificates" value="4" caption="sample completions" icon={Award} />
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Continue learning</h2>
            <GraduationCap className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3">
            {[
              ["O Level Physics", "Momentum and conservation", "62%"],
              ["IELTS Academic", "Task 2 essay structure", "48%"],
              ["SAT Intensive", "Advanced math diagnostics", "71%"],
            ].map(([course, lesson, progress]) => (
              <div key={course} className="grid gap-4 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold text-vortex-navy">{course}</p>
                  <p className="mt-1 text-xs text-vortex-muted">{lesson}</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-vortex-gradient" style={{ width: progress }} />
                  </div>
                </div>
                <Link href="/preview" className="btn-primary h-10 px-4 text-xs">
                  Resume
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Today</h2>
            <Calendar className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3">
            {[
              ["7:30 PM", "Physics practice sprint"],
              ["8:20 PM", "IELTS writing feedback"],
              ["Tomorrow", "AI project review"],
            ].map(([time, item]) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-vortex-border px-4 py-3">
                <span className="text-sm font-semibold text-vortex-navy">{item}</span>
                <span className="text-xs text-vortex-muted">{time}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              [Bell, "Reminders"],
              [Bookmark, "Saved"],
              [MessageSquare, "Questions"],
            ].map(([Icon, label]) => (
              <div key={label as string} className="rounded-2xl bg-vortex-soft p-4 text-center">
                <Icon className="mx-auto size-5 text-vortex-blue" />
                <p className="mt-3 text-xs font-semibold text-vortex-navy">{label as string}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-vortex-blue">Course access</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">Licence key and payment</h2>
            </div>
            <KeyRound className="size-5 text-vortex-blue" />
          </div>
          <form action="/api/vortex/student-actions" method="post" className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input type="hidden" name="intent" value="student-unlock" />
            <input type="hidden" name="returnTo" value="/dashboard/student" />
            <input
              name="licence_key"
              className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm text-vortex-navy outline-none"
              placeholder="Enter licence key to unlock course"
            />
            <button type="submit" className="btn-primary h-11 px-5 text-xs">
              Unlock
            </button>
          </form>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-vortex-soft p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-vortex-navy">
                <Banknote className="size-4 text-vortex-blue" />
                Bank transfer
              </div>
              <p className="mt-2 text-xs leading-6 text-vortex-muted">
                Upload your payment slip. Admin verifies it and emails your licence key.
              </p>
            </div>
            <div className="rounded-2xl bg-vortex-soft p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-vortex-navy">
                <Upload className="size-4 text-vortex-blue" />
                Slip status
              </div>
              <p className="mt-2 text-xs leading-6 text-vortex-muted">O Level Physics payment slip is waiting for verification.</p>
            </div>
          </div>
          <a href="tel:+923244270697" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-vortex-blue">
            <Phone className="size-4" />
            Payment issue? +92 324 4270697
          </a>
        </section>

        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-vortex-blue">Instructor help</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">Ask, attach, or go live</h2>
            </div>
            <HelpCircle className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3">
            {[
              ["Ask instructor", "Send a course question tied to any lesson."],
              ["Book live help", "Request a one-to-one or group support session."],
              ["Attach homework", "Upload work, screenshots, or past-paper attempts."],
            ].map(([title, text]) => (
              <form key={title} action="/api/vortex/student-actions" method="post">
                <input type="hidden" name="intent" value="student-help" />
                <input type="hidden" name="returnTo" value="/dashboard/student" />
                <input type="hidden" name="request_type" value={title} />
                <button type="submit" className="w-full rounded-2xl border border-vortex-border bg-vortex-soft p-4 text-left transition hover:border-vortex-cyan hover:bg-white">
                  <span className="block text-sm font-semibold text-vortex-navy">{title}</span>
                  <span className="mt-1 block text-xs leading-6 text-vortex-muted">{text}</span>
                </button>
              </form>
            ))}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
