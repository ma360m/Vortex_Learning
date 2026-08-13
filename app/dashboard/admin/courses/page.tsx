import Link from "next/link";
import { Bot, CreditCard, GraduationCap, Home, Plus, Settings, Ticket, Users } from "lucide-react";

import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: Home },
  { label: "Courses", href: "/dashboard/admin/courses", icon: GraduationCap },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  { label: "AI agents", href: "/dashboard/admin", icon: Bot },
  { label: "Support", href: "/dashboard/admin", icon: Ticket },
  { label: "Settings", href: "/dashboard/admin", icon: Settings },
];

const courses = [
  ["O Level Physics Mastery", "Hybrid", "Dr. Ayesha Rahman", "Published"],
  ["Accelerated Exam Rescue", "Accelerated", "Dr. Ayesha Rahman", "Draft"],
  ["IELTS Academic Band 7+", "Self paced", "Sara Malik", "Review"],
];

export const metadata = { title: "Admin Courses" };

export default function AdminCoursesPage() {
  return (
    <PortalShell role="Admin Console" title="Course operations." description="Review, create, approve, and publish courses from the admin workspace." active="Courses" user="Admin" navItems={navItems}>
      <div className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-vortex-blue">Courses</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">Course catalog and approvals</h2>
          </div>
          <Link href="/dashboard/admin/courses/new" className="btn-primary h-11 px-5">
            <Plus className="size-4" />
            New Course
          </Link>
        </div>
        <div className="mt-6 grid gap-3">
          {courses.map(([title, type, instructor, status]) => (
            <div key={title} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[1fr_0.6fr_0.8fr_auto] lg:items-center">
              <span className="font-semibold text-vortex-navy">{title}</span>
              <span className="text-sm text-vortex-muted">{type}</span>
              <span className="text-sm text-vortex-muted">{instructor}</span>
              <form action="/api/vortex/admin-actions" method="post" className="flex gap-2">
                <input type="hidden" name="returnTo" value="/dashboard/admin/courses" />
                <button name="intent" value="course-submit" className="h-9 rounded-full bg-vortex-navy px-3 text-xs font-semibold text-white">
                  Review
                </button>
                <button name="intent" value="course-publish" className="h-9 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy">
                  {status}
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
