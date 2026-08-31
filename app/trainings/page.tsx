import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Building2, FlaskConical, GraduationCap, Send, Users } from "lucide-react";

import { ActionBanner } from "@/components/vortex/action-banner";
import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";

const trainingTracks = [
  ["Science workshops", "Hands-on science training, demonstrations, classroom routines, and practical teaching support."],
  ["Teacher development", "Training plans for schools, colleges, and institutes that need structured faculty support."],
  ["Institutional consultancy", "Program design, curriculum planning, staff training, parent orientation, and learning operations."],
];

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
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Training Consultancy</p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
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
              <a
                href="https://phonicsclub.com"
                target="_blank"
                rel="noreferrer"
                className="btn-glass h-12 px-5"
              >
                Visit Phonics Club
              </a>
            </div>
          </div>
          <div className="grid gap-3 rounded-[2rem] border border-white/18 bg-white/10 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.16)] backdrop-blur-xl">
            {trainingTracks.map(([title, text], index) => {
              const Icon = [FlaskConical, GraduationCap, Building2][index] ?? Users;

              return (
                <div key={title} className="grid gap-3 rounded-2xl bg-white/10 p-4 sm:grid-cols-[auto_1fr]">
                  <span className="grid size-11 place-items-center rounded-2xl bg-white text-vortex-blue">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-white">{title}</h2>
                    <p className="mt-1 text-xs leading-6 text-cyan-50">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeading
            eyebrow="Training tracks"
            title="Focused programs without a crowded sales page"
            description="Each request can be shaped around science learning, teacher preparation, academic operations, or product-supported classroom needs."
          />
          <div className="grid gap-4">
            {trainingTracks.map(([title, text], index) => {
              const Icon = [FlaskConical, GraduationCap, Building2][index] ?? Users;

              return (
                <div key={title} className="grid gap-4 rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)] sm:grid-cols-[auto_1fr]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-vortex-soft text-vortex-blue">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-heading text-3xl font-semibold text-vortex-navy">{title}</h2>
                    <p className="mt-2 text-sm leading-7 text-vortex-muted">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="request-training" className="bg-white py-20">
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
