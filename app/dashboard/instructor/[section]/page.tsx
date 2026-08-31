import { redirect } from "next/navigation";
import { BookOpen, Calendar, ClipboardCheck, FileText, HelpCircle, Home, KeyRound, MessageSquare, Send, Users, Video } from "lucide-react";

import { PortalRecordEmptyState } from "@/components/vortex/portal-empty-state";
import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";
import { PasswordSettingsPanel } from "@/components/vortex/password-settings-panel";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/instructor", icon: Home },
  { label: "My courses", href: "/dashboard/instructor/courses", icon: BookOpen },
  { label: "Live classes", href: "/dashboard/instructor/live", icon: Video },
  { label: "Students", href: "/dashboard/instructor/students", icon: Users },
  { label: "Assignments", href: "/dashboard/instructor/assignments", icon: ClipboardCheck },
  { label: "Discussion", href: "/dashboard/instructor/discussion", icon: MessageSquare },
];

const content = {
  live: {
    active: "Live classes",
    title: "Live session scheduler",
    icon: Calendar,
    items: [],
  },
  students: {
    active: "Students",
    title: "Student progress",
    icon: Users,
    items: [],
  },
  assignments: {
    active: "Assignments",
    title: "Assignment review",
    icon: FileText,
    items: [],
  },
  discussion: {
    active: "Discussion",
    title: "Instructor help queue",
    icon: HelpCircle,
    items: [],
  },
  password: {
    active: "Password",
    title: "Password settings",
    icon: KeyRound,
    items: [],
  },
};

export function generateStaticParams() {
  return Object.keys(content).map((section) => ({ section }));
}

export default async function InstructorSectionPage({ params }: { params: Promise<{ section: keyof typeof content }> }) {
  const { section } = await params;
  const page = content[section];
  if (!page) redirect(`/coming-soon?feature=instructor-${String(section)}`);
  const Icon = page.icon;

  return (
    <PortalShell role="Instructor LMS" title={page.title} description="Instructor-only workspace for teaching operations and student support." active={page.active} user="Instructor" navItems={navItems}>
      {section === "password" ? (
        <PasswordSettingsPanel action="/api/vortex/instructor-actions" returnTo="/dashboard/instructor/password" />
      ) : (
      <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-3xl font-semibold text-vortex-navy">{page.active}</h2>
          <Icon className="size-5 text-vortex-blue" />
        </div>
        <div className="mt-5">
          {page.items.length ? (
            <div className="grid gap-3">
              {page.items.map((item) => (
                <div key={item} className="rounded-2xl bg-vortex-soft p-4 text-sm font-semibold text-vortex-navy">{item}</div>
              ))}
            </div>
          ) : (
            <PortalRecordEmptyState
              title="No live records yet"
              description={`${page.active} will appear here after this instructor profile owns courses, sessions, assignments, or discussion requests in Supabase.`}
              icon={page.icon}
            />
          )}
        </div>
        <form action="/api/vortex/instructor-actions" method="post" className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input type="hidden" name="intent" value={section === "live" ? "instructor-live" : "student-help"} />
          <input type="hidden" name="returnTo" value={`/dashboard/instructor/${section}`} />
          <input name="message" className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder="Add schedule, feedback, or reply..." />
          <button className="btn-primary h-11 px-5">
            <Send className="size-4" />
            Save
          </button>
        </form>
      </section>
      )}
    </PortalShell>
  );
}
