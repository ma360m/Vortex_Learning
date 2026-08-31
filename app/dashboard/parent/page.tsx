import {
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  UserRound,
  Users,
} from "lucide-react";

import { PortalLiveSummary, PortalRecordEmptyState } from "@/components/vortex/portal-live-data";
import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";

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
      title="Parent dashboard"
      description="Track approved learners, attendance, upcoming lessons, homework, payments, teacher feedback, and messages without searching across separate channels."
      active="Overview"
      user="Parent"
      navItems={navItems}
    >
      <PortalLiveSummary role="parent" />

      <section className="mt-6 rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
        <div className="flex items-start gap-3">
          <Users className="mt-1 size-5 shrink-0 text-vortex-blue" />
          <div>
            <h2 className="text-sm font-semibold text-vortex-navy">Parent data status</h2>
            <p className="mt-2 text-sm leading-7 text-vortex-muted">
              The parent portal pages are built, but live attendance, learner relationships, payments, messages, and reports need approved parent-student links from Supabase before they can show production data.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Learner overview</h2>
            <UserRound className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5">
            <PortalRecordEmptyState
              title="No approved learner links yet"
              description="Once admin approves a parent-student relationship, linked learners, progress, attendance, and reports will appear here from Supabase."
              icon={UserRound}
            />
          </div>
        </section>

        <div className="grid gap-6">
          <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Upcoming lessons</h2>
              <Calendar className="size-5 text-vortex-blue" />
            </div>
            <div className="mt-5 rounded-2xl border border-vortex-border bg-vortex-soft p-4 text-sm leading-7 text-vortex-muted">
              Upcoming sessions for approved linked learners will appear here.
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Teacher feedback</h2>
            <div className="mt-5 rounded-2xl border border-vortex-border bg-vortex-soft p-4 text-sm leading-7 text-vortex-muted">
              Teacher feedback will appear after an instructor adds notes for a linked learner.
            </div>
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
