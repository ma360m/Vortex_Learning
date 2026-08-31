import {
  Code,
  Database,
  GitBranch,
  Lock,
  Palette,
  Rocket,
  ScrollText,
  Settings,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import { DashboardHero } from "@/components/vortex/dashboard-kit";
import { PortalGate } from "@/components/vortex/portal-gate";
import { SiteShell } from "@/components/vortex/site-shell";

const developerModules: Array<[LucideIcon, string, string]> = [
  [Code, "Edit pages", "Homepage, course pages, team pages, blog templates, and support surfaces."],
  [Database, "CMS", "Courses, subjects, instructors, posts, resources, FAQs, and landing modules."],
  [Palette, "Themes", "Brand colors, typography, component variants, certificate styles, and email templates."],
  [Rocket, "Deploy changes", "Preview builds, production releases, rollback notes, and launch checklists."],
  [SlidersHorizontal, "Feature flags", "AI assistant rollout, live-class tools, recommendations, and experiments."],
  [Settings, "Environment settings", "Runtime configuration, integrations, notifications, and service keys."],
  [ScrollText, "Developer logs", "Build events, API errors, AI calls, email deliveries, and audit records."],
  [Lock, "Access control", "Developer permissions, admin separation, and protected operational settings."],
];

export const metadata = {
  title: "Developer Panel",
  description:
    "Preview the Vortex Learning developer panel for editing pages, CMS, themes, deploys, feature flags, environment settings, access control, and logs.",
};

export default function DeveloperPage() {
  return (
    <PortalGate allowed={["developer"]}>
      <SiteShell>
        <DashboardHero
          eyebrow="Developer panel"
          title="A separate workspace for building and operating the platform"
          description="Developers can manage content systems, theme tokens, feature flags, deployments, environment settings, access control, and logs without mixing with academic operations."
          cta={{ label: "Admin Console", href: "/signin?next=/dashboard/admin" }}
        />

      <section className="section-wrap">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-3xl font-semibold text-vortex-navy">
                Live developer data
              </h2>
              <ScrollText className="size-5 text-vortex-blue" />
            </div>
            <p className="mt-4 text-sm leading-7 text-vortex-muted">
              Deployment telemetry, feature flag history, CMS activity, and error logs will appear here after the production developer tables or deployment provider integration are connected. No sample operational numbers are shown.
            </p>
            <div className="mt-6 grid gap-3">
              {["Preview builds", "Feature flags", "CMS records", "Error logs"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-vortex-soft px-4 py-3">
                  <span className="text-sm font-semibold text-vortex-navy">{item}</span>
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-vortex-muted">Awaiting live source</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-3xl font-semibold text-vortex-navy">
                Developer controls
              </h2>
              <GitBranch className="size-5 text-vortex-blue" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {developerModules.map(([Icon, title, text]) => (
                <div key={title} className="rounded-2xl border border-vortex-border bg-vortex-soft p-4">
                  <Icon className="size-5 text-vortex-blue" />
                  <h3 className="mt-4 text-sm font-semibold text-vortex-navy">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-vortex-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </SiteShell>
    </PortalGate>
  );
}
