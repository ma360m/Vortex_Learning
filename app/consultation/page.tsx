import Link from "next/link";
import { ArrowRight, Calendar, GraduationCap, Send, Users } from "lucide-react";

import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { curriculumOptions, subjects } from "@/lib/vortex-data";

export const metadata = {
  title: "Book Consultation",
  description:
    "Book a Vortex Learning consultation for course selection, tutor matching, exam planning, parent guidance, school partnerships, and professional learning routes.",
};

export default function ConsultationPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Book consultation</p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
              Match the learner to the right course, tutor, or plan.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              Consultation requests can route to admissions, academic advisors, tutors, support agents, or admin escalation.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="tel:+923244270697" className="btn-glass h-11 px-4">
                <Calendar className="size-4" />
                +92 324 4270697
              </a>
              <a href="mailto:support@vortexelearning.com" className="btn-glass h-11 px-4">
                support@vortexelearning.com
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Students", "Choosing courses or exam routes"],
                ["Parents", "Reviewing learning plans"],
                ["Schools", "Partnerships and programs"],
                ["Professionals", "Certifications and skills"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl bg-white/10 p-4">
                  <Users className="size-5 text-[#47C8F2]" />
                  <p className="mt-4 text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-xs leading-6 text-cyan-100">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow="Tell us the goal"
              title="A focused request helps us guide you faster."
              description="Share the learner stage, curriculum, target exam, subject, preferred schedule, and deadline."
            />
            <div className="mt-8 grid gap-3">
              {curriculumOptions.slice(0, 8).map((item) => (
                <span key={item} className="rounded-2xl border border-vortex-border bg-white px-4 py-3 text-sm font-semibold text-vortex-navy">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <form action="/api/vortex/student-actions" method="post" className="rounded-[2rem] border border-vortex-border bg-vortex-soft p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
            <input type="hidden" name="intent" value="support-ticket" />
            <input type="hidden" name="returnTo" value="/consultation" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["name", "Name", "Student or parent name"],
                ["email", "Email", "Your email address"],
                ["phone", "Phone", "+92 300 0000000"],
                ["goal", "Goal", "O Level, IELTS, SAT, AI..."],
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
              Preferred subject
              <select name="subject" className="h-12 rounded-2xl border border-vortex-border bg-white px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15">
                {subjects.map((subject) => (
                  <option key={subject.title}>{subject.title}</option>
                ))}
              </select>
            </label>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-vortex-navy">
              Message
              <textarea
                name="message"
                placeholder="Tell us the learner's current stage, target exam, subject, or deadline."
                className="min-h-36 rounded-2xl border border-vortex-border bg-white px-4 py-3 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
              />
            </label>
            <button type="submit" className="btn-primary mt-5 h-12 px-5">
              <Send className="size-4" />
              Send Consultation Request
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-vortex-blue">Prefer browsing first?</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">
              Explore the catalog before sending a request.
            </h2>
          </div>
          <Link href="/courses" className="btn-secondary h-11 px-5">
            <GraduationCap className="size-4" />
            Open Catalog
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
