import { notFound } from "next/navigation";
import { BadgeCheck, Bot, CreditCard, GraduationCap, Home, KeyRound, Settings, Ticket, UserPlus, Users, Upload } from "lucide-react";

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

const users = [
  ["Registered learner", "profile-001", "Student", "O Level Physics"],
  ["Registered mentor", "profile-002", "Student", "Math mentor"],
  ["Registered guardian", "profile-003", "Student", "2 learners"],
];

const payments = [
  ["O Level Physics Mastery", "Demo Student", "Slip uploaded"],
  ["IELTS Academic Band 7+", "Ayesha Khan", "Needs review"],
  ["Accelerated Exam Rescue", "Bilal Ahmed", "Verify now"],
];

export function generateStaticParams() {
  return [{ section: "users" }, { section: "payments" }];
}

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!["users", "payments"].includes(section)) notFound();

  const active = section === "users" ? "Users" : "Payments";

  return (
    <PortalShell role="Admin Console" title={`${active} management.`} description="Admin-only operations connected to role promotion, payment verification, and licence-key issuing." active={active} user="Admin" navItems={navItems}>
      {section === "users" ? (
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Registered users</h2>
            <UserPlus className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3">
            {users.map(([name, profileRef, role, detail]) => (
              <div key={profileRef} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[1fr_0.8fr_0.7fr_auto_auto] lg:items-center">
                <div>
                  <p className="font-semibold text-vortex-navy">{name}</p>
                  <p className="text-xs text-vortex-muted">{profileRef}</p>
                </div>
                <span className="text-sm text-vortex-muted">{detail}</span>
                <span className="text-xs font-semibold text-vortex-blue">{role}</span>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="promote-instructor" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin/users" />
                  <input type="hidden" name="profile" value={profileRef} />
                  <button className="h-9 rounded-full bg-vortex-navy px-3 text-xs font-semibold text-white">Instructor</button>
                </form>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="assign-parent" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin/users" />
                  <input type="hidden" name="profile" value={profileRef} />
                  <button className="h-9 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy">Parent</button>
                </form>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Bank transfer verification</h2>
            <Upload className="size-5 text-vortex-blue" />
          </div>
          <div className="mt-5 grid gap-3">
            {payments.map(([course, student, status]) => (
              <div key={`${course}-${student}`} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[1fr_0.7fr_auto_auto] lg:items-center">
                <div>
                  <p className="font-semibold text-vortex-navy">{course}</p>
                  <p className="text-xs text-vortex-muted">{student}</p>
                </div>
                <span className="text-xs font-semibold text-vortex-blue">{status}</span>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="verify-payment" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin/payments" />
                  <button className="h-9 rounded-full bg-vortex-navy px-3 text-xs font-semibold text-white">
                    <BadgeCheck className="mr-1 inline size-3.5" />
                    Verify
                  </button>
                </form>
                <form action="/api/vortex/admin-actions" method="post">
                  <input type="hidden" name="intent" value="email-key" />
                  <input type="hidden" name="returnTo" value="/dashboard/admin/payments" />
                  <button className="h-9 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy">
                    <KeyRound className="mr-1 inline size-3.5 text-vortex-blue" />
                    Email key
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      )}
    </PortalShell>
  );
}
