import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { SiteShell } from "@/components/vortex/site-shell";
import { policyPages } from "@/lib/vortex-data";

export function generateStaticParams() {
  return policyPages.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policyPages.find((item) => item.slug === slug);

  return {
    title: policy?.title ?? "Policy",
    description: policy?.summary ?? "Vortex Learning policy page.",
  };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policyPages.find((item) => item.slug === slug);

  if (!policy) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="page-hero page-hero-policies px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/policies" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <ArrowLeft className="size-4" />
            All policies
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase text-[#47C8F2]">Vortex Learning policy</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
            {policy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-cyan-50">{policy.summary}</p>
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-5">
          {policy.sections.map(([title, text]) => (
            <section
              key={title}
              className="rounded-[1.75rem] border border-vortex-border bg-white p-6 shadow-[0_16px_60px_rgba(9,29,83,0.06)]"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-vortex-blue" />
                <h2 className="font-heading text-3xl font-semibold text-vortex-navy">{title}</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-vortex-muted">{text}</p>
            </section>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
