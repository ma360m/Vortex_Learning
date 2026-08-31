import { redirect } from "next/navigation";
import { CheckCircle2, CreditCard, FileText, Home, KeyRound, MessageSquare, Send, TrendingUp, UserRound, Users } from "lucide-react";

import { PortalRecordEmptyState } from "@/components/vortex/portal-empty-state";
import { PortalShell, type PortalNavItem } from "@/components/vortex/portal-shell";
import { PasswordSettingsPanel } from "@/components/vortex/password-settings-panel";

const navItems: PortalNavItem[] = [
  { label: "Overview", href: "/dashboard/parent", icon: Home },
  { label: "Learners", href: "/dashboard/parent/learners", icon: Users },
  { label: "Attendance", href: "/dashboard/parent/attendance", icon: CheckCircle2 },
  { label: "Payments", href: "/dashboard/parent/payments", icon: CreditCard },
  { label: "Messages", href: "/dashboard/parent/messages", icon: MessageSquare },
  { label: "Reports", href: "/dashboard/parent/reports", icon: FileText },
];

const content = {
  learners: {
    active: "Learners",
    title: "Learner profiles",
    icon: UserRound,
    items: [],
  },
  attendance: {
    active: "Attendance",
    title: "Attendance record",
    icon: CheckCircle2,
    items: [],
  },
  payments: {
    active: "Payments",
    title: "Payment history",
    icon: CreditCard,
    items: [],
  },
  messages: {
    active: "Messages",
    title: "Parent messages",
    icon: MessageSquare,
    items: [],
  },
  reports: {
    active: "Reports",
    title: "Progress reports",
    icon: TrendingUp,
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

export default async function ParentSectionPage({ params }: { params: Promise<{ section: keyof typeof content }> }) {
  const { section } = await params;
  const page = content[section];
  if (!page) redirect(`/coming-soon?feature=parent-${String(section)}`);
  const Icon = page.icon;

  return (
    <PortalShell role="Parent Portal" title={page.title} description="Parent-only workspace for learner visibility, payments, attendance, and teacher communication." active={page.active} user="Parent" navItems={navItems}>
      {section === "password" ? (
        <PasswordSettingsPanel action="/api/vortex/parent-actions" returnTo="/dashboard/parent/password" />
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
              description={`${page.active} will appear here after this parent account is connected to student profiles in Supabase.`}
              icon={page.icon}
            />
          )}
        </div>
        {section === "messages" ? (
          <form action="/api/vortex/parent-actions" method="post" className="mt-5 grid gap-3">
            <input type="hidden" name="intent" value="parent-message" />
            <input type="hidden" name="returnTo" value="/dashboard/parent/messages" />
            <input name="subject" className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder="Subject" />
            <textarea name="message" className="min-h-28 rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm outline-none" placeholder="Message teacher or support..." />
            <button className="btn-primary h-11 w-fit px-5">
              <Send className="size-4" />
              Send message
            </button>
          </form>
        ) : null}
        {section === "payments" ? (
          <a href="tel:+923244270697" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-vortex-blue">
            Payment issue? +92 324 4270697
          </a>
        ) : null}
      </section>
      )}
    </PortalShell>
  );
}
