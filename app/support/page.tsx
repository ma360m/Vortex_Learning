import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Bot,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Ticket,
  Users,
  type LucideIcon,
} from "lucide-react";

import { SearchConsole } from "@/components/vortex/search-console";
import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";

const supportChannels: Array<[LucideIcon, string, string]> = [
  [MessageCircle, "Course discussions", "Lesson questions, peer conversation, and teacher notes stay connected to courses."],
  [Users, "Parent visibility", "Parents can follow attendance, homework, progress, payments, and teacher feedback."],
  [Ticket, "Support tickets", "Payment, access, account, and resource requests can be tracked by support teams."],
  [Bot, "AI guidance", "FAQ assistance, course search, tutor recommendations, and revision planning."],
  [Phone, "WhatsApp and phone", "Parent and student support through familiar conversation channels."],
  [ShieldCheck, "Admin escalation", "Sensitive academic, payment, or operations issues move to the right team."],
];

export const metadata = {
  title: "Support and Community",
  description:
    "Contact Vortex Learning and use the merged community support space for discussions, instructor help, tickets, AI support, WhatsApp, and admin escalation.",
};

export default function SupportPage() {
  redirect("/");

  return (
    <SiteShell>
      <section className="page-hero page-hero-support px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Support and community</p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
              One place for questions, discussions, and help
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              Students, parents, teachers, schools, colleges, tutoring institutes,
              and professionals can ask course questions, request help, and move
              into the right support lane from one page.
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

      <section id="community" className="section-wrap scroll-mt-28">
        <SectionHeading
          eyebrow="Support network"
          title="Community help without losing structure"
          description="Course discussions, parent visibility, support tickets, AI guidance, WhatsApp, and admin escalation stay together in one organized support space."
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

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Support request"
              title="Send the right details to the support team"
              description="Use support for course access, technical issues, payment questions, parent portal access, resources, and account help."
            />
            <div className="mt-8 grid gap-3">
              {[
                "Course access or locked resources",
                "Payment slip or licence-key questions",
                "Parent portal access",
                "Technical account support",
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
            <input type="hidden" name="returnTo" value="/support" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["name", "Name", "Student or parent name"],
                ["email", "Email", "Your email address"],
                ["phone", "Phone", "+92 300 0000000"],
                ["topic", "Topic", "Payment, course access, parent portal..."],
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
                placeholder="Tell us what happened, which course is involved, and the registered email if different."
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
        <div className="rounded-[2rem] border border-vortex-border bg-white p-8 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-vortex-blue">Direct support</p>
              <h2 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight text-vortex-navy">
                For payment, account, or course access issues
              </h2>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <a href="mailto:support@vortexelearning.com" className="text-vortex-blue">
                  support@vortexelearning.com
                </a>
                <a href="tel:+923244270697" className="text-vortex-blue">
                  +92 324 4270697
                </a>
              </div>
            </div>
            <Link href="/consultation" className="btn-secondary h-12 px-5">
              Consultation Page
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
