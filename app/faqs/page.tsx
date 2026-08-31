import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { faqGroups } from "@/lib/vortex-data";

export const metadata = {
  title: "FAQs",
  description:
    "Answers about Vortex Learning live classes, self-paced courses, exam preparation, instructor help, bank transfer, licence keys, and payment support.",
};

export default function FAQsPage() {
  return (
    <SiteShell>
      <section className="section-wrap pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeading
            eyebrow="Questions"
            title="Everything important, grouped by topic"
            description="The FAQ stays focused so visitors are not forced through repeated marketing blocks."
          />
          <div className="grid gap-5">
            {faqGroups.map((group) => (
              <div key={group.title} className="rounded-[1.75rem] border border-vortex-border bg-vortex-soft p-5">
                <h2 className="font-heading text-3xl font-semibold text-vortex-navy">{group.title}</h2>
                <div className="mt-5 grid gap-3">
                  {group.items.map((item) => (
                    <details key={item.question} className="rounded-2xl border border-vortex-border bg-white p-4">
                      <summary className="cursor-pointer text-sm font-semibold text-vortex-navy">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-sm leading-7 text-vortex-muted">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="grid gap-6 rounded-[2rem] border border-vortex-border bg-white p-7 shadow-[0_18px_70px_rgba(9,29,83,0.08)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-vortex-blue">Still need help?</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">Reach Vortex support directly</h2>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
              <a href="mailto:support@vortexelearning.com" className="text-vortex-blue">
                support@vortexelearning.com
              </a>
              <a href="tel:+923244270697" className="text-vortex-blue">
                +92 324 4270697
              </a>
            </div>
          </div>
          <Link href="/support" className="btn-secondary h-11 px-5">
            Open Support
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
