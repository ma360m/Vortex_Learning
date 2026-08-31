import { Bot, ClipboardCheck, CreditCard, FileText, GraduationCap, Home, Mail, ScrollText, Settings, Ticket, UserCog, Users } from "lucide-react";

import { CourseBuilderStudio } from "@/components/vortex/course-builder-studio";
import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: Home },
  { label: "Courses", href: "/dashboard/admin/courses", icon: GraduationCap },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  { label: "Assignments", href: "/dashboard/admin/assignments", icon: ClipboardCheck },
  { label: "Content", href: "/dashboard/admin/content", icon: FileText },
  { label: "Emails", href: "/dashboard/admin/emails", icon: Mail },
  { label: "AI agents", href: "/dashboard/admin/ai-agents", icon: Bot },
  { label: "Support", href: "/dashboard/admin/support", icon: Ticket },
  { label: "Tutor requests", href: "/dashboard/admin/tutor-requests", icon: UserCog },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  { label: "Logs", href: "/dashboard/admin/logs", icon: ScrollText },
];

export const metadata = { title: "Admin Course Builder" };

export default function AdminCourseBuilderPage() {
  return (
    <PortalShell role="Admin Console" title="Admin course builder" description="Build courses with media, modules, lessons, pricing, licence-key access, instructor help, and publishing controls." active="Courses" user="Admin" navItems={navItems}>
      <CourseBuilderStudio owner="admin" returnTo="/dashboard/admin/courses/new" />
    </PortalShell>
  );
}
