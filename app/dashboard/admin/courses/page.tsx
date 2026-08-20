import Link from "next/link";
import { Bot, CreditCard, Eye, GraduationCap, Home, PlayCircle, Plus, Settings, Ticket, Users } from "lucide-react";

import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";
import { courses } from "@/lib/vortex-data";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: Home },
  { label: "Courses", href: "/dashboard/admin/courses", icon: GraduationCap },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  { label: "AI agents", href: "/dashboard/admin/ai-agents", icon: Bot },
  { label: "Support", href: "/dashboard/admin/support", icon: Ticket },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
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
            <p className="mt-2 text-sm text-vortex-muted">
              Admin can open every published course page and player preview from here.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-vortex-border bg-vortex-soft px-4 py-2 text-xs font-semibold text-vortex-blue">
              {courses.length} courses
            </span>
            <Link href="/dashboard/admin/courses/new" className="btn-primary h-11 px-5">
              <Plus className="size-4" />
              New Course
            </Link>
          </div>
        </div>
        <div className="mt-6 grid max-h-[72rem] gap-3 overflow-auto pr-1">
          {courses.map((course) => (
            <div key={course.slug} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[minmax(0,1fr)_0.55fr_0.8fr_minmax(300px,auto)] lg:items-center">
              <span className="min-w-0">
                <span className="block truncate font-semibold text-vortex-navy">{course.title}</span>
                <span className="mt-1 block text-xs text-vortex-muted">{course.category} - {course.board}</span>
              </span>
              <span className="text-sm text-vortex-muted">{course.mode}</span>
              <span className="text-sm text-vortex-muted">{course.instructor}</span>
              <div className="flex flex-wrap gap-2">
                <Link href={`/courses/${course.slug}`} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-vortex-navy px-3 text-xs font-semibold text-white">
                  <Eye className="size-3.5" />
                  View page
                </Link>
                <Link href={`/player/${course.slug}`} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy">
                  <PlayCircle className="size-3.5 text-vortex-blue" />
                  Player
                </Link>
                <form action="/api/vortex/admin-actions" method="post" className="flex gap-2">
                  <input type="hidden" name="returnTo" value="/dashboard/admin/courses" />
                  <button name="intent" value="course-submit" className="h-9 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy">
                    Review
                  </button>
                  <button name="intent" value="course-publish" className="h-9 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy">
                    Publish
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
