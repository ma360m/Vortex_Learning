import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  Menu,
  ShieldCheck,
} from "lucide-react";

import { navLinks, socialLinks } from "@/lib/vortex-data";
import { AIHelpAgent } from "./ai-help-agent";
import { FooterSocialLinks } from "./footer-social-links";
import { VortexLogo } from "./logo";

const portalLinks = [
  ["Dashboard", "/signin?next=/dashboard"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-vortex-border bg-white/92 shadow-[0_12px_40px_rgba(9,29,83,0.05)] backdrop-blur-xl">
      <div className="mx-auto flex h-[4.65rem] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-8">
        <VortexLogo header />
        <nav
          className="hidden items-center gap-1 rounded-full border border-vortex-border bg-white/78 p-1 shadow-sm lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-vortex-slate transition hover:bg-vortex-soft hover:text-vortex-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <details className="relative">
            <summary className="inline-flex h-10 cursor-pointer list-none items-center gap-2 rounded-full border border-vortex-border bg-white px-4 text-sm font-semibold text-vortex-navy shadow-sm transition hover:border-vortex-cyan/50 hover:shadow-md">
              <LayoutDashboard className="size-4 text-vortex-blue" />
              Sign in
              <ChevronDown className="size-4 text-vortex-blue" />
            </summary>
            <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-vortex-border bg-white p-2 shadow-[0_24px_80px_rgba(9,29,83,0.18)]">
              {portalLinks.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-vortex-navy transition hover:bg-vortex-soft"
                >
                  {label}
                  <ArrowRight className="size-4 text-vortex-cyan" />
                </Link>
              ))}
              <div className="mx-3 mb-2 mt-1 flex items-start gap-2 rounded-xl bg-vortex-soft p-3 text-xs leading-5 text-vortex-muted">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-vortex-blue" />
                Portals open according to approved account access.
              </div>
            </div>
          </details>
          <Link
            href="/consultation"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-vortex-navy px-4 text-sm font-semibold text-white shadow-[0_16px_45px_rgba(9,29,83,0.24)] transition hover:bg-vortex-blue"
          >
            Book consultation
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <details className="group relative lg:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-vortex-border bg-white text-vortex-navy shadow-sm">
            <Menu className="size-5" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <div className="absolute right-0 mt-3 w-[min(92vw,340px)] rounded-2xl border border-vortex-border bg-white p-3 shadow-[0_24px_80px_rgba(9,29,83,0.18)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-vortex-navy hover:bg-vortex-soft"
              >
                {link.label}
                <ArrowRight className="size-4 text-vortex-cyan" />
              </Link>
            ))}
            <div className="my-2 h-px bg-vortex-border" />
            {portalLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-vortex-navy hover:bg-vortex-soft"
              >
                {label}
                <LayoutDashboard className="size-4 text-vortex-cyan" />
              </Link>
            ))}
            <Link
              href="/consultation"
              className="mt-2 flex items-center justify-between rounded-xl bg-vortex-navy px-4 py-3 text-sm font-semibold text-white"
            >
              Book consultation
              <ArrowRight className="size-4 text-cyan-100" />
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const footerLinks = [
    {
      title: "Learning",
      links: [
        ["Course catalog", "/courses"],
        ["Training consultancy", "/trainings"],
        ["FAQs", "/faqs"],
      ],
    },
    {
      title: "Company",
      links: [
        ["About", "/about"],
        ["Our team", "/team"],
        ["Blog", "/blog"],
      ],
    },
    {
      title: "Support",
      links: [
        ["Support and community", "/support#community"],
        ["Contact us", "/contact"],
        ["Book consultation", "/consultation"],
        ["Policies", "/policies"],
      ],
    },
  ];

  return (
    <footer className="border-t border-vortex-border bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1fr_1fr]">
        <div className="max-w-xl">
          <VortexLogo />
          <p className="mt-5 text-sm leading-7 text-vortex-muted">
            A premium education operating system for serious students, families,
            teachers, and academic organizations.
          </p>
          <div className="mt-6 grid gap-2 text-sm text-vortex-muted">
            <a href="mailto:support@vortexelearning.com" className="font-semibold text-vortex-blue">
              support@vortexelearning.com
            </a>
            <a href="tel:+923244270697" className="font-semibold text-vortex-blue">
              +92 324 4270697
            </a>
          </div>
          <FooterSocialLinks links={socialLinks} />
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-vortex-navy">{group.title}</h2>
              <div className="mt-4 grid gap-3">
                {group.links.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm text-vortex-muted transition hover:text-vortex-blue"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-vortex-border px-5 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-vortex-muted sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 Vortex Learning- learn without limits.</p>
          <div className="flex gap-4">
            <Link href="/policies/privacy" className="hover:text-vortex-blue">Privacy</Link>
            <Link href="/policies/terms" className="hover:text-vortex-blue">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-vortex-paper text-vortex-navy">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <AIHelpAgent />
    </div>
  );
}
