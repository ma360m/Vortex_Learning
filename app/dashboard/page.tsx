import { DashboardRouter } from "@/components/vortex/dashboard-router";
import { SiteShell } from "@/components/vortex/site-shell";

export const metadata = {
  title: "Dashboard",
  description:
    "Open the assigned Vortex Learning dashboard for the signed-in profile.",
};

export default function DashboardGatewayPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-[#47C8F2]">Portal sign in</p>
          <h1 className="mt-4 max-w-4xl font-heading text-6xl font-semibold leading-tight">
            Open the right Vortex workspace.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
            Student, instructor, parent, and admin tools live in separate signed-in dashboards.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <DashboardRouter />
      </section>
    </SiteShell>
  );
}
