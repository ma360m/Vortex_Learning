import Link from "next/link";
import { redirect } from "next/navigation";
import { Award, Bookmark, Calendar, HelpCircle, Home, KeyRound, Library, MessageSquare, Send } from "lucide-react";

import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";
import { PasswordSettingsPanel } from "@/components/vortex/password-settings-panel";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/student", icon: Home },
  { label: "My courses", href: "/dashboard/student/courses", icon: Library },
  { label: "Calendar", href: "/dashboard/student/calendar", icon: Calendar },
  { label: "Bookmarks", href: "/dashboard/student/bookmarks", icon: Bookmark },
  { label: "Messages", href: "/dashboard/student/help", icon: MessageSquare },
  { label: "Certificates", href: "/dashboard/student/certificates", icon: Award },
];

const content = {
  courses: {
    active: "My courses",
    title: "Enrolled courses.",
    icon: Library,
    items: ["O Level Physics Mastery - 62%", "IELTS Academic Band 7+ - 48%", "SAT Intensive - 71%"],
  },
  calendar: {
    active: "Calendar",
    title: "Study calendar.",
    icon: Calendar,
    items: ["Today 7:30 PM - Physics practice sprint", "Tomorrow - AI project review", "Friday - IELTS writing feedback"],
  },
  bookmarks: {
    active: "Bookmarks",
    title: "Saved lessons.",
    icon: Bookmark,
    items: ["Momentum formula recap", "IELTS Task 2 examples", "SAT algebra shortcuts"],
  },
  help: {
    active: "Messages",
    title: "Instructor help.",
    icon: HelpCircle,
    items: ["Ask instructor", "Book live help", "Attach homework"],
  },
  certificates: {
    active: "Certificates",
    title: "Certificates.",
    icon: Award,
    items: ["Physics Topic Mastery - ready", "IELTS Writing Sprint - in progress", "SAT Diagnostic - issued"],
  },
  password: {
    active: "Password",
    title: "Password settings.",
    icon: KeyRound,
    items: [],
  },
};

export function generateStaticParams() {
  return Object.keys(content).map((section) => ({ section }));
}

export default async function StudentSectionPage({ params }: { params: Promise<{ section: keyof typeof content }> }) {
  const { section } = await params;
  const page = content[section];
  if (!page) redirect(`/coming-soon?feature=student-${String(section)}`);
  const Icon = page.icon;

  return (
    <PortalShell role="Student LMS" title={page.title} description="Student-only workspace for learning, access, support, and progress." active={page.active} user="Ayaan" navItems={navItems}>
      {section === "password" ? (
        <PasswordSettingsPanel action="/api/vortex/student-actions" returnTo="/dashboard/student/password" />
      ) : (
      <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-3xl font-semibold text-vortex-navy">{page.active}</h2>
          <Icon className="size-5 text-vortex-blue" />
        </div>
        <div className="mt-5 grid gap-3">
          {page.items.map((item) => (
            <div key={item} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <span className="text-sm font-semibold text-vortex-navy">{item}</span>
              {section === "courses" ? (
                <Link href="/player" className="btn-primary h-9 px-4 text-xs">Resume</Link>
              ) : null}
            </div>
          ))}
        </div>

        {section === "help" ? (
          <form action="/api/vortex/student-actions" method="post" className="mt-5 grid gap-3">
            <input type="hidden" name="intent" value="student-help" />
            <input type="hidden" name="returnTo" value="/dashboard/student/help" />
            <input name="subject" className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder="Course or lesson" />
            <textarea name="message" className="min-h-28 rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm outline-none" placeholder="Ask your instructor anything..." />
            <button className="btn-primary h-11 w-fit px-5">
              <Send className="size-4" />
              Send help request
            </button>
          </form>
        ) : null}

        {section === "courses" ? (
          <form action="/api/vortex/student-actions" method="post" className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input type="hidden" name="intent" value="student-unlock" />
            <input type="hidden" name="returnTo" value="/dashboard/student/courses" />
            <input name="licence_key" className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder="Enter licence key" />
            <button className="btn-primary h-11 px-5">
              <KeyRound className="size-4" />
              Unlock course
            </button>
          </form>
        ) : null}
      </section>
      )}
    </PortalShell>
  );
}
