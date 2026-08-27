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
        <div className="grid gap-6 rounded-[2rem] bg-vortex-gradient p-7 text-white shadow-[0_26px_90px_rgba(9,29,83,0.22)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Still need help?</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold">Talk to Vortex support or book a consultation</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/support" className="btn-white h-11 px-5">
              Support
            </Link>
            <Link href="/consultation" className="btn-glass h-11 px-5">
              Book Consultation
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
