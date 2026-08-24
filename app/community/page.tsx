import Link from "next/link";
import { ArrowRight, Bot, HelpCircle, MessageSquare, Ticket, Users, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";

const communityCards: Array<[LucideIcon, string, string]> = [
  [MessageSquare, "Course discussions", "Lesson questions, peer conversation, and teacher notes stay connected to courses."],
  [HelpCircle, "Instructor help", "Students can request support, attach homework, and ask for live help."],
  [Bot, "AI guidance", "AI support can suggest courses, explain support steps, and help with study planning."],
  [Ticket, "Support tickets", "Payment, access, and account requests can be tracked by support teams."],
  [Users, "Parent visibility", "Parents can follow attendance, homework, progress, payments, and teacher feedback."],
  [ArrowRight, "Consultation handoff", "Complex course-selection questions can move into a dedicated consultation request."],
];

export const metadata = {
  title: "Community",
  description:
    "Vortex Learning community and support spaces for discussions, instructor help, AI guidance, tickets, and parent/student communication.",
};

export default function CommunityPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-[#47C8F2]">Community and support</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
            A learning community with clear support lanes.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
            Discussions, instructor questions, parent visibility, AI help, and support tickets are kept connected to the learning journey.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <SectionHeading
          eyebrow="Support network"
          title="Community help without losing structure."
          description="Students can ask, practice, discuss, escalate, and stay connected while support teams keep requests organized."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {communityCards.map(([Icon, title, text]) => (
            <div key={title} className="rounded-3xl border border-vortex-border bg-white p-6 shadow-[0_16px_60px_rgba(9,29,83,0.06)]">
              <Icon className="size-5 text-vortex-blue" />
              <h2 className="mt-5 font-heading text-3xl font-semibold text-vortex-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-vortex-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-vortex-blue">Need a human answer?</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">
              Use support for issues and consultation for guidance.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/support" className="btn-secondary h-11 px-5">
              Support
            </Link>
            <Link href="/consultation" className="btn-primary h-11 px-5">
              Book Consultation
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
