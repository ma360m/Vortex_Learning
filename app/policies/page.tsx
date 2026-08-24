import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { policyPages } from "@/lib/vortex-data";

export const metadata = {
  title: "Policies",
  description:
    "Vortex Learning privacy, terms, refund, and cookie policies for students, parents, instructors, and support operations.",
};

export default function PoliciesPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-[#47C8F2]">Policies</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
            Structured policies for a structured learning platform.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
            Privacy, terms, refunds, cookies, course access, payment verification, parent visibility, and protected resources are separated into clear pages.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <SectionHeading
          eyebrow="Policy library"
          title="Choose the policy you need."
          description="These pages are launch-ready structure and should be reviewed by the business or legal team before the final public domain goes live."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {policyPages.map((policy) => (
            <Link
              key={policy.slug}
              href={`/policies/${policy.slug}`}
              className="group rounded-[1.75rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)] transition hover:-translate-y-1 hover:border-vortex-cyan/60"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
                  <FileText className="size-5" />
                </span>
                <ArrowRight className="size-5 text-vortex-cyan transition group-hover:translate-x-1" />
              </div>
              <h2 className="mt-6 font-heading text-3xl font-semibold text-vortex-navy">
                {policy.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-vortex-muted">{policy.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-vortex-blue">Admin editable</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">
              Admin content settings include policy sections and footer links.
            </h2>
          </div>
          <Link href="/signin?next=/dashboard/admin/content" className="btn-primary h-11 px-5">
            <ShieldCheck className="size-4" />
            Admin Content
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
