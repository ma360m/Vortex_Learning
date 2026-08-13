import { notFound } from "next/navigation";
import { BookOpen, Calendar, ClipboardCheck, FileText, HelpCircle, Home, MessageSquare, Send, Users, Video } from "lucide-react";

import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";

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
    title: "Live session scheduler.",
    icon: Calendar,
    items: ["O Level Physics - 7:30 PM Zoom", "Mechanics clinic - Google Meet", "Parent consultation - notes ready"],
  },
  students: {
    active: "Students",
    title: "Student progress.",
    icon: Users,
    items: ["Ayaan Khan - 62% Physics", "Noor Ahmed - 81% Mechanics", "Hamza Ali - 44% revision sprint"],
  },
  assignments: {
    active: "Assignments",
    title: "Assignment review.",
    icon: FileText,
    items: ["Momentum worksheet - 12 submissions", "Electricity quiz - 7 pending", "Past paper review - 3 escalated"],
  },
  discussion: {
    active: "Discussion",
    title: "Instructor help queue.",
    icon: HelpCircle,
    items: ["Ayaan: Momentum worksheet question", "Noor: Book live doubt session", "Hamza: Past paper marking request"],
  },
};

export function generateStaticParams() {
  return Object.keys(content).map((section) => ({ section }));
}

export default async function InstructorSectionPage({ params }: { params: Promise<{ section: keyof typeof content }> }) {
  const { section } = await params;
  const page = content[section];
  if (!page) notFound();
  const Icon = page.icon;

  return (
    <PortalShell role="Instructor LMS" title={page.title} description="Instructor-only workspace for teaching operations and student support." active={page.active} user="Dr. Ayesha" navItems={navItems}>
      <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-3xl font-semibold text-vortex-navy">{page.active}</h2>
          <Icon className="size-5 text-vortex-blue" />
        </div>
        <div className="mt-5 grid gap-3">
          {page.items.map((item) => (
            <div key={item} className="rounded-2xl bg-vortex-soft p-4 text-sm font-semibold text-vortex-navy">{item}</div>
          ))}
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
    </PortalShell>
  );
}
