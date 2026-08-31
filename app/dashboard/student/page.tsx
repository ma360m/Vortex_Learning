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
  Upload,
} from "lucide-react";

import { LicenceKeyRedeemer } from "@/components/vortex/licence-key-redeemer";
import { PortalRecordEmptyState } from "@/components/vortex/portal-empty-state";
import { PortalLiveSummary } from "@/components/vortex/portal-live-data";
import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";
import { RoleRequestForm } from "@/components/vortex/role-request-form";

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
      title="Student dashboard"
      description="Continue learning, review goals, manage bookmarks, redeem licence keys, and keep every lesson tied to your study plan."
      active="Overview"
      user="Student"
      navItems={navItems}
    >
      <PortalLiveSummary role="student" />

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Continue learning</h2>
            <GraduationCap className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5">
            <PortalRecordEmptyState
              title="No enrolled course records yet"
              description="After a licence key is redeemed, your unlocked courses, last lesson, and progress will appear here from Supabase."
              icon={Clock}
            />
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Today</h2>
            <Calendar className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 rounded-2xl border border-vortex-border bg-vortex-soft p-4 text-sm leading-7 text-vortex-muted">
            Live lessons, reminders, and study goals will appear here after they are created in the student account.
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
          <LicenceKeyRedeemer returnHref="/dashboard/student" label="Unlock" />
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
              <p className="mt-2 text-xs leading-6 text-vortex-muted">Your latest upload and verification status will appear here after submission.</p>
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

      <div className="mt-6">
        <RoleRequestForm />
      </div>
    </PortalShell>
  );
}
