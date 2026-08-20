import { Suspense } from "react";

import { SignInPanel } from "@/components/vortex/sign-in-panel";
import { SiteShell } from "@/components/vortex/site-shell";

export const metadata = {
  title: "Sign In",
  description: "Sign in to Vortex Learning and open the dashboard assigned to your profile role.",
};

export default function SignInPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-[#47C8F2]">Sign in</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
            Your portal opens from your profile role.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
            Students, parents, instructors, developers, and admins use the same sign-in entry, then Vortex routes them to the correct workspace.
          </p>
        </div>
      </section>
      <section className="section-wrap">
        <Suspense fallback={null}>
          <SignInPanel />
        </Suspense>
      </section>
    </SiteShell>
  );
}
