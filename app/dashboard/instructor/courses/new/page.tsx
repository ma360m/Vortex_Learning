import { BookOpen, ClipboardCheck, Home, MessageSquare, Users, Video } from "lucide-react";

import { CourseBuilderStudio } from "@/components/vortex/course-builder-studio";
import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/instructor", icon: Home },
  { label: "My courses", href: "/dashboard/instructor/courses", icon: BookOpen },
  { label: "Live classes", href: "/dashboard/instructor/live", icon: Video },
  { label: "Students", href: "/dashboard/instructor/students", icon: Users },
  { label: "Assignments", href: "/dashboard/instructor/assignments", icon: ClipboardCheck },
  { label: "Discussion", href: "/dashboard/instructor/discussion", icon: MessageSquare },
];

export const metadata = { title: "Instructor Course Builder" };

export default function InstructorCourseBuilderPage() {
  return (
    <PortalShell role="Instructor LMS" title="Instructor course builder" description="Build modules, lessons, resources, live help, assignments, pricing, and submit for admin approval." active="My courses" user="Dr. Ayesha" navItems={navItems}>
      <CourseBuilderStudio owner="instructor" returnTo="/dashboard/instructor/courses/new" />
    </PortalShell>
  );
}
