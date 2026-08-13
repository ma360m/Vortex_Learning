import {
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

import { PortalCard, PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/parent", icon: Home },
  { label: "Learners", href: "/dashboard/parent/learners", icon: Users },
  { label: "Attendance", href: "/dashboard/parent/attendance", icon: CheckCircle2 },
  { label: "Payments", href: "/dashboard/parent/payments", icon: CreditCard },
  { label: "Messages", href: "/dashboard/parent/messages", icon: MessageSquare },
  { label: "Reports", href: "/dashboard/parent/reports", icon: FileText },
];

export const metadata = {
  title: "Parent Portal",
  description:
    "Signed-in Vortex Learning parent portal for attendance, payments, progress, lessons, homework, feedback, and messages.",
};

export default function ParentDashboardPage() {
  return (
    <PortalShell
      role="Parent Portal"
      title="Learner progress for the Khan family."
      description="Track attendance, upcoming lessons, homework, payments, teacher feedback, and messages without searching across separate channels."
      active="Overview"
      user="Mrs. Khan"
      navItems={navItems}
    >
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        <PortalCard title="Attendance" value="94%" caption="sample monthly attendance" icon={CheckCircle2} />
        <PortalCard title="Progress" value="68%" caption="sample course average" icon={TrendingUp} />
        <PortalCard title="Payments" value="2" caption="sample pending invoices" icon={CreditCard} />
        <PortalCard title="Messages" value="7" caption="sample unread threads" icon={MessageSquare} />
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Learner overview</h2>
            <UserRound className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-4">
            {[
              ["Physics", "Momentum assignment due", "72%"],
              ["Mathematics", "Calculus quiz completed", "81%"],
              ["IELTS", "Speaking mock scheduled", "64%"],
            ].map(([subject, status, progress]) => (
              <div key={subject} className="rounded-2xl bg-vortex-soft p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-vortex-navy">{subject}</p>
                    <p className="mt-1 text-xs text-vortex-muted">{status}</p>
                  </div>
                  <span className="text-sm font-semibold text-vortex-blue">{progress}</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-vortex-gradient" style={{ width: progress }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Upcoming lessons</h2>
              <Calendar className="size-5 text-vortex-blue" />
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["Thu", "Physics live class", "7:30 PM"],
                ["Fri", "IELTS speaking mock", "6:00 PM"],
                ["Sat", "SAT diagnostic review", "11:00 AM"],
              ].map(([day, title, time]) => (
                <div key={title} className="grid grid-cols-[52px_1fr_auto] items-center gap-3 rounded-2xl bg-vortex-soft p-3">
                  <span className="rounded-xl bg-white px-3 py-2 text-center text-xs font-semibold text-vortex-blue">{day}</span>
                  <span className="text-sm font-semibold text-vortex-navy">{title}</span>
                  <span className="text-xs text-vortex-muted">{time}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Teacher feedback</h2>
            <div className="mt-5 grid gap-3">
              {[
                "Physics: better command-word discipline",
                "Math: strong improvement in timed sections",
                "IELTS: add more examples in Task 2",
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
