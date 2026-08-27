import {
  Code,
  Database,
  GitBranch,
  Lock,
  Palette,
  Rocket,
  ScrollText,
  Server,
  Settings,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import { DashboardHero, MetricCard, Worklist } from "@/components/vortex/dashboard-kit";
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
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Preview builds" value="12" caption="sample queue" icon={Rocket} />
          <MetricCard label="Feature flags" value="28" caption="sample controls" icon={SlidersHorizontal} />
          <MetricCard label="CMS records" value="1.8k" caption="sample content" icon={Database} />
          <MetricCard label="Error rate" value="0.4%" caption="sample telemetry" icon={Server} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6">
            <Worklist
              title="Deployment lane"
              items={[
                "Preview: catalog filters",
                "Production: parent dashboard copy",
                "Rollback note: certificate template",
                "Release checklist: AI assistant prompts",
              ]}
            />
            <Worklist
              title="Developer logs"
              items={[
                "Build completed - 2m 14s",
                "Email digest job delivered",
                "Feature flag updated: player-dark-mode",
                "CMS publish: IELTS guide",
              ]}
            />
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
