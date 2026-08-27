import Link from "next/link";
import { BookOpen, ClipboardCheck, FileQuestion, Home, KeyRound, MessageSquare, Plus, Upload, Users, Video } from "lucide-react";

import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/instructor", icon: Home },
  { label: "My courses", href: "/dashboard/instructor/courses", icon: BookOpen },
  { label: "Live classes", href: "/dashboard/instructor/live", icon: Video },
  { label: "Students", href: "/dashboard/instructor/students", icon: Users },
  { label: "Assignments", href: "/dashboard/instructor/assignments", icon: ClipboardCheck },
  { label: "Discussion", href: "/dashboard/instructor/discussion", icon: MessageSquare },
];

const courses = [
  ["O Level Physics Mastery", "Published", "412 students"],
  ["Accelerated Exam Rescue", "Draft", "86 students"],
  ["A Level Mechanics Clinic", "Submitted", "124 students"],
];

export const metadata = { title: "Instructor Courses" };

export default function InstructorCoursesPage() {
  return (
    <PortalShell role="Instructor LMS" title="My courses" description="Create, submit, and maintain instructor-owned courses." active="My courses" user="Dr. Ayesha" navItems={navItems}>
      <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-vortex-blue">Instructor catalog</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">Courses you can build</h2>
            <p className="mt-2 text-sm leading-7 text-vortex-muted">
              Build course pages, modules, lessons, resources, flipbooks, quizzes, assignments, live help, pricing, and certificate rules before admin approval.
            </p>
          </div>
          <Link href="/dashboard/instructor/courses/new" className="btn-primary h-11 px-5">
            <Plus className="size-4" />
            New Course
          </Link>
        </div>
        <div className="mt-6 grid gap-3">
          {courses.map(([title, status, students]) => (
            <div key={title} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
              <span className="font-semibold text-vortex-navy">{title}</span>
              <span className="text-sm text-vortex-muted">{students}</span>
              <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-vortex-blue">{status}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            [BookOpen, "Course pages"],
            [Upload, "Resources"],
            [FileQuestion, "Quizzes"],
            [ClipboardCheck, "Assignments"],
            [KeyRound, "Access rules"],
          ].map(([Icon, label]) => (
            <div key={label as string} className="rounded-2xl border border-vortex-border bg-white p-4">
              <Icon className="size-5 text-vortex-blue" />
              <p className="mt-3 text-sm font-semibold text-vortex-navy">{label as string}</p>
            </div>
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
