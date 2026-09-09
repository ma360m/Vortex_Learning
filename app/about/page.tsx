import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, ShieldCheck, Users, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { projectAttribution } from "@/lib/vortex-data";

const aboutCards: Array<[LucideIcon, string, string]> = [
  [BookOpen, "Course structure", "Preview modules, locked resources, assignments, quizzes, and certificates."],
  [Users, "Team visibility", "Tutors, support, advisors, and admins work from connected role-based spaces."],
  [ShieldCheck, "Parent confidence", "Attendance, progress, homework, payments, and teacher feedback can be visible."],
  [ArrowRight, "Guided next step", "Students can browse, preview, ask for help, or book consultation."],
];

export const metadata = {
  title: "About",
  description:
    "Learn about Vortex Learning, a project of Phonics Club, and its structured approach to courses, tutors, parent visibility, and learning support.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="page-hero page-hero-about px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-[#47C8F2]">About</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
            Learning, structured for each student path
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
            Vortex Learning organizes courses, live learning, resources, AI support, parent visibility, and academic operations into a calmer education platform.
          </p>
        </div>
      </section>

      <section id="phonics-club" className="section-wrap scroll-mt-28">
        <div className="grid overflow-hidden rounded-[2rem] border border-vortex-border bg-white shadow-[0_26px_90px_rgba(9,29,83,0.12)] lg:grid-cols-[0.94fr_1.06fr]">
          <div className="bg-vortex-gradient p-7 text-white sm:p-9 lg:p-10">
            <p className="text-sm font-semibold text-cyan-100">Project ownership</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight sm:text-5xl">
              {projectAttribution.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-blue-50 sm:text-base sm:leading-8">{projectAttribution.description}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {projectAttribution.points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl bg-white/12 px-4 py-3 text-sm font-semibold">
                  <ShieldCheck className="size-4 text-[#47C8F2]" />
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-80 bg-vortex-navy">
            <Image
              src="/phonics-club-project.png"
              alt="Phonics Club educators working in a library learning session"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,29,83,0.16),rgba(9,29,83,0))]" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeading
            eyebrow="How Vortex helps"
            title="A focused platform for students, parents, and academic teams"
            description="The platform is built around structured discovery, course previews, protected resources, support workflows, and visible progress."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutCards.map(([Icon, title, text]) => (
              <div key={title} className="rounded-3xl border border-vortex-border bg-vortex-soft p-6">
                <Icon className="size-5 text-vortex-blue" />
                <h2 className="mt-5 text-sm font-semibold text-vortex-navy">{title}</h2>
                <p className="mt-2 text-xs leading-6 text-vortex-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-6 rounded-[2rem] border border-vortex-border bg-white p-7 shadow-[0_18px_70px_rgba(9,29,83,0.08)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-vortex-blue">Meet the people</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">
              Talk through your learning needs with our team
            </h2>
          </div>
          <Link href="/consultation" className="btn-primary h-11 px-5">
            Talk to our team
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
