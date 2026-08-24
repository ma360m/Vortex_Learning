import Link from "next/link";
import { ArrowRight, Banknote, BookOpen, Calendar, GraduationCap, HelpCircle, Phone, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { faqGroups } from "@/lib/vortex-data";

const faqFeatureCards: Array<[LucideIcon, string, string]> = [
  [Calendar, "Live learning", "Zoom, Google Meet, calendar sync, reminders, attendance, teacher notes, and homework."],
  [BookOpen, "Self-paced learning", "Resume learning, daily goals, weekly goals, bookmarks, notifications, and progress."],
  [GraduationCap, "Exam preparation", "Past papers, topic practice, mock exams, assignments, resources, and certificates."],
  [HelpCircle, "Instructor help", "Students can ask instructors questions, request help, and join live support sessions inside courses."],
  [Banknote, "Bank transfer", "Students upload payment slips; admin verifies and emails the licence key for course access."],
  [Phone, "Payment support", "If bank transfer has an issue, students can contact +92 324 4270697."],
];

export const metadata = {
  title: "FAQs",
  description:
    "Answers about Vortex Learning live classes, self-paced courses, exam preparation, instructor help, bank transfer, licence keys, and payment support.",
};

export default function FAQsPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-[#47C8F2]">FAQs</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
            Clear answers for learning, payment, and support.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
            This page keeps operational details out of the course catalog while still making them easy to find.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-5 lg:grid-cols-3">
          {faqFeatureCards.map(([Icon, title, text]) => (
            <div key={title as string} className="rounded-3xl border border-vortex-border bg-white p-6 shadow-[0_16px_60px_rgba(9,29,83,0.06)]">
              <Icon className="size-6 text-vortex-blue" />
              <h2 className="mt-5 font-heading text-3xl font-semibold text-vortex-navy">{title as string}</h2>
              <p className="mt-3 text-sm leading-7 text-vortex-muted">{text as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeading
            eyebrow="Questions"
            title="Everything structured by topic."
            description="Admin can extend these groups as policy, payment, and course access rules become more specific."
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

      <section className="section-wrap">
        <div className="grid gap-6 rounded-[2rem] bg-vortex-gradient p-7 text-white shadow-[0_26px_90px_rgba(9,29,83,0.22)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Still need help?</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold">Talk to Vortex support or book a consultation.</h2>
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
