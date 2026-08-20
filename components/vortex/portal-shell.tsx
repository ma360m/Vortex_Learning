import { Suspense } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  KeyRound,
  Menu,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { VortexLogo } from "./logo";
import { SignOutButton } from "./sign-out-button";
import { ActionBanner } from "./action-banner";

export type PortalNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type PortalShellProps = {
  role: string;
  title: string;
  description: string;
  active: string;
  user: string;
  navItems: PortalNavItem[];
  children: React.ReactNode;
};

function passwordHrefForRole(role: string) {
  if (role.includes("Parent")) return "/dashboard/parent/password";
  if (role.includes("Instructor")) return "/dashboard/instructor/password";
  if (role.includes("Admin")) return "/dashboard/admin/password";
  return "/dashboard/student/password";
}

export function PortalShell({
  role,
  title,
  description,
  active,
  user,
  navItems,
  children,
}: PortalShellProps) {
  const passwordHref = passwordHrefForRole(role);

  return (
    <div className="min-h-screen bg-[#eef6ff] text-vortex-navy">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[292px] border-r border-white/12 bg-[#071847] p-4 text-white xl:block">
        <div className="flex h-full flex-col">
          <div className="rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
            <div className="inline-flex rounded-2xl bg-white p-2">
              <VortexLogo compact />
            </div>
            <p className="mt-4 text-sm font-semibold">{role}</p>
            <p className="mt-1 text-xs leading-5 text-cyan-100">Signed-in workspace</p>
          </div>

          <nav className="mt-5 grid gap-1" aria-label={`${role} navigation`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.label === active;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`grid grid-cols-[auto_1fr] items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-white text-vortex-navy shadow-[0_16px_45px_rgba(0,0,0,0.18)]"
                      : "text-cyan-50 hover:bg-white/10"
                  }`}
                >
                  <Icon className={isActive ? "size-4 text-vortex-blue" : "size-4 text-[#47C8F2]"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-[#47C8F2] text-sm font-bold text-vortex-navy">
                {user.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user}</p>
                <p className="text-xs text-cyan-100">Signed-in profile</p>
              </div>
            </div>
            <Link
              href={passwordHref}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-white/15 text-xs font-semibold text-cyan-50 transition hover:bg-white/10"
            >
              <KeyRound className="size-4" />
              Password
            </Link>
            <SignOutButton />
          </div>
        </div>
      </aside>

      <div className="xl:pl-[292px]">
        <header className="sticky top-0 z-30 border-b border-vortex-border bg-white/88 backdrop-blur-xl">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:min-h-20 sm:px-8">
            <div className="hidden min-w-0 xl:block">
              <p className="text-xs font-semibold uppercase text-vortex-blue">{role}</p>
              <h1 className="truncate font-heading text-3xl font-semibold text-vortex-navy">
                {title}
              </h1>
            </div>

            <details className="relative xl:hidden">
              <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-vortex-border bg-white px-4 text-sm font-semibold text-vortex-navy">
                <Menu className="size-4" />
                {role}
                <ChevronDown className="size-4 text-vortex-blue" />
              </summary>
              <div className="absolute left-0 mt-3 w-[min(88vw,340px)] rounded-3xl border border-vortex-border bg-white p-3 shadow-[0_24px_80px_rgba(9,29,83,0.18)]">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-vortex-navy hover:bg-vortex-soft"
                    >
                      <Icon className="size-4 text-vortex-blue" />
                      {item.label}
                    </Link>
                  );
                })}
                <div className="my-2 h-px bg-vortex-border" />
                <Link
                  href={passwordHref}
                  className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-vortex-navy hover:bg-vortex-soft"
                >
                  <KeyRound className="size-4 text-vortex-blue" />
                  Password
                </Link>
              </div>
            </details>

            <div className="hidden h-11 min-w-[320px] max-w-md flex-1 items-center gap-3 rounded-full border border-vortex-border bg-vortex-soft px-4 text-sm text-vortex-muted lg:flex">
              <Search className="size-4 text-vortex-blue" />
              Search dashboard records
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={passwordHref}
                className="grid size-11 place-items-center rounded-full border border-vortex-border bg-white text-vortex-navy transition hover:border-vortex-cyan"
                aria-label="Change password"
              >
                <KeyRound className="size-4" />
              </Link>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full border border-vortex-border bg-white text-vortex-navy transition hover:border-vortex-cyan"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
              </button>
              <div className="hidden items-center gap-2 rounded-full border border-vortex-border bg-white py-1 pl-1 pr-3 sm:flex">
                <span className="grid size-9 place-items-center rounded-full bg-vortex-gradient text-sm font-bold text-white">
                  {user.slice(0, 1)}
                </span>
                <span className="text-sm font-semibold text-vortex-navy">{user}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-8 sm:py-6">
          <Suspense fallback={null}>
            <ActionBanner />
          </Suspense>
          <section className="mb-5 overflow-hidden rounded-[1.7rem] bg-vortex-gradient p-5 text-white shadow-[0_22px_80px_rgba(9,29,83,0.18)] sm:mb-6 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
                  <ShieldCheck className="size-4" />
                  Signed in
                </p>
                <h2 className="mt-3 max-w-4xl font-heading text-3xl font-semibold leading-tight sm:text-5xl">
                  {title}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-cyan-50">{description}</p>
              </div>
              <div className="grid gap-2 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm">
                <span className="text-cyan-100">Workspace</span>
                <span className="text-xl font-semibold">{role}</span>
              </div>
            </div>
          </section>

          {children}
        </main>
      </div>
    </div>
  );
}

export function PortalCard({
  title,
  value,
  caption,
  icon: Icon,
}: {
  title: string;
  value: string;
  caption: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-[1.35rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-vortex-muted">{title}</p>
        <span className="grid size-10 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-5 font-heading text-4xl font-semibold text-vortex-navy">{value}</p>
      <p className="mt-2 text-xs text-vortex-muted">{caption}</p>
    </div>
  );
}
