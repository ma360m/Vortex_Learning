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
      <section className="section-wrap">
        <div className="grid overflow-hidden rounded-[2rem] border border-vortex-border bg-white shadow-[0_24px_90px_rgba(9,29,83,0.1)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="page-hero page-hero-signin min-h-[360px] p-7 text-white sm:p-10">
            <div className="relative flex h-full flex-col justify-end">
              <p className="text-sm font-semibold uppercase text-[#47C8F2]">Sign in</p>
              <h1 className="mt-4 max-w-xl font-heading text-4xl font-semibold leading-tight sm:text-5xl">
                One secure entry for every Vortex workspace
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-cyan-50">
                Sign in once. Your dashboard opens according to the access approved for your account.
              </p>
            </div>
          </div>
          <div className="p-4 sm:p-7">
            <Suspense fallback={null}>
              <SignInPanel />
            </Suspense>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
