import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  Bot,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Ticket,
  type LucideIcon,
} from "lucide-react";

import { SearchConsole } from "@/components/vortex/search-console";
import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { ActionBanner } from "@/components/vortex/action-banner";

const supportChannels: Array<[LucideIcon, string, string]> = [
  [MessageCircle, "Live chat", "Fast help for course access, schedules, resources, and account questions."],
  [Phone, "WhatsApp", "Parent and student support through a familiar conversation channel."],
  [Ticket, "Support tickets", "Track status, ownership, priority, and escalation history."],
  [Bot, "AI support", "FAQ assistance, course search, tutor recommendations, and revision planning."],
  [Mail, "Contact forms", "Structured requests for consultations, instructors, schools, and partnerships."],
  [ShieldCheck, "Admin escalation", "Sensitive academic, payment, or operations issues move to the right team."],
];

export const metadata = {
  title: "Support",
  description:
    "Contact Vortex Learning through live chat, WhatsApp, contact forms, support tickets, AI support, and admin escalation.",
};

export default function SupportPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Support</p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
              Human help, AI guidance, and clear escalation.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              Students, parents, teachers, schools, colleges, tutoring
              institutes, and professionals can reach Vortex through the right
              support lane.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:support@vortexelearning.com" className="btn-glass h-11 px-4 text-sm">
                <Mail className="size-4" />
                support@vortexelearning.com
              </a>
              <a href="tel:+923244270697" className="btn-glass h-11 px-4 text-sm">
                <Phone className="size-4" />
                +92 324 4270697
              </a>
            </div>
          </div>
          <SearchConsole compact />
        </div>
      </section>

      <section id="ai-support" className="section-wrap">
        <SectionHeading
          eyebrow="Support center"
          title="Connected support across chat, tickets, AI, and consultation."
          description="The system supports customer support, FAQ assistance, tutor recommendations, live help, WhatsApp, and admin escalation."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {supportChannels.map(([Icon, title, text]) => (
            <div key={title} className="rounded-3xl border border-vortex-border bg-white p-6 shadow-[0_16px_60px_rgba(9,29,83,0.06)]">
              <Icon className="size-5 text-vortex-blue" />
              <h2 className="mt-5 font-heading text-3xl font-semibold text-vortex-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-vortex-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="consultation" className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Suspense fallback={null}>
              <ActionBanner />
            </Suspense>
            <SectionHeading
              eyebrow="Book consultation"
              title="Match the learner to the right course, tutor, or plan."
              description="Consultation requests can route to admissions, academic advisors, tutors, support agents, or admin escalation."
            />
            <div className="mt-8 grid gap-3">
              {[
                "Students choosing courses",
                "Parents reviewing learning plans",
                "Schools and institutes requesting partnerships",
                "Professionals exploring certifications",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-navy">
                  <ArrowRight className="size-4 text-vortex-blue" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <form action="/api/vortex/student-actions" method="post" className="rounded-[2rem] border border-vortex-border bg-vortex-soft p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
            <input type="hidden" name="intent" value="support-ticket" />
            <input type="hidden" name="returnTo" value="/support#consultation" />
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
              Message
              <textarea
                name="message"
                placeholder="Tell us the learner's current stage, target exam, subject, or deadline."
                className="min-h-36 rounded-2xl border border-vortex-border bg-white px-4 py-3 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
              />
            </label>
            <button type="submit" className="btn-primary mt-5 h-12 px-5">
              <Send className="size-4" />
              Send Request
            </button>
          </form>
        </div>
      </section>

      <section className="section-wrap">
        <div className="rounded-[2rem] bg-vortex-gradient p-8 text-white shadow-[0_30px_100px_rgba(9,29,83,0.25)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-cyan-100">Support operations</p>
              <h2 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-tight">
                Keep every learner, parent, and teacher connected.
              </h2>
            </div>
            <Link href="/support#consultation" className="btn-white h-12 px-5">
              Create Support Request
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
          <div id="privacy" className="scroll-mt-28 rounded-[2rem] border border-vortex-border bg-vortex-soft p-6">
            <p className="text-sm font-semibold text-vortex-blue">Privacy</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">Data handled by Vortex Learning</h2>
            <p className="mt-4 text-sm leading-7 text-vortex-muted">
              Vortex Learning stores account, learning progress, payment verification, licence-key, support, and certificate records needed to operate courses and dashboards. Final legal copy should be reviewed before the original domain goes live.
            </p>
          </div>
          <div id="terms" className="scroll-mt-28 rounded-[2rem] border border-vortex-border bg-vortex-soft p-6">
            <p className="text-sm font-semibold text-vortex-blue">Terms</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">Course access terms</h2>
            <p className="mt-4 text-sm leading-7 text-vortex-muted">
              Course access is unlocked after approved payment and licence-key redemption. The first three modules can be previewed, paid resources are locked, and downloading is disabled unless admin enables it for a course or resource.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
