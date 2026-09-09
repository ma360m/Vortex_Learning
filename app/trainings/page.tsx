import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Send } from "lucide-react";

import { ActionBanner } from "@/components/vortex/action-banner";
import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";

export const metadata = {
  title: "Trainings",
  description:
    "Request Vortex Learning training consultancy for science workshops, teacher development, and institutional learning programs.",
};

export default function TrainingsPage() {
  return (
    <SiteShell>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(112deg,#091D53_0%,#143A84_58%,#1E8ACB_100%)] px-5 py-16 text-white sm:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,29,83,0.28)_0%,rgba(9,29,83,0)_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Training Consultancy</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight sm:text-6xl">
              Professional training for schools, teachers, and learning teams
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              Request workshops, science teaching support, teacher development, or institutional learning consultancy through Vortex Learning.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#request-training" className="btn-white h-12 px-5">
                Request Training
                <ArrowRight className="size-4" />
              </Link>
              <a href="https://phonicsclub.com" target="_blank" rel="noreferrer" className="btn-glass h-12 px-5">
                Visit Phonics Club
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="request-training" className="bg-white py-20 scroll-mt-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Request consultancy"
              title="Tell us what your institution or team needs"
              description="Share the audience, preferred training type, timeline, and whether classroom products are required."
            />
            <div className="mt-8 rounded-[1.75rem] border border-vortex-border bg-vortex-soft p-5">
              <p className="text-sm font-semibold text-vortex-navy">Need classroom products?</p>
              <p className="mt-2 text-sm leading-7 text-vortex-muted">
                Visit Phonics Club for relevant products and learning resources.
              </p>
              <a
                href="https://phonicsclub.com"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-vortex-blue"
              >
                phonicsclub.com
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <form action="/api/vortex/student-actions" method="post" className="rounded-[2rem] border border-vortex-border bg-vortex-soft p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
            <Suspense fallback={null}>
              <ActionBanner />
            </Suspense>
            <input type="hidden" name="intent" value="training-consultancy" />
            <input type="hidden" name="returnTo" value="/trainings#request-training" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["name", "Name", "Your name"],
                ["organization", "Organization", "School, college, institute, or company"],
                ["email", "Email", "Your email address"],
                ["phone", "Phone", "Phone number"],
              ].map(([name, label, placeholder]) => (
                <label key={label} className="grid gap-2 text-sm font-semibold text-vortex-navy">
                  {label}
                  <input
                    name={name}
                    placeholder={placeholder}
                    className="h-12 rounded-2xl border border-vortex-border bg-white px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-vortex-navy">
              Training type
              <select name="training_type" className="h-12 rounded-2xl border border-vortex-border bg-white px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15">
                <option>Science workshop</option>
                <option>Teacher development</option>
                <option>Institutional consultancy</option>
                <option>Product-supported training</option>
              </select>
            </label>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-vortex-navy">
              Message
              <textarea
                name="message"
                placeholder="Tell us the audience, preferred dates, goals, and whether Phonics Club products are required."
                className="min-h-36 rounded-2xl border border-vortex-border bg-white px-4 py-3 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
              />
            </label>
            <button type="submit" className="btn-primary mt-5 h-12 px-5">
              <Send className="size-4" />
              Send Training Request
            </button>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
