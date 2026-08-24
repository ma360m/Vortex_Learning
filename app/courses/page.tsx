import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  GraduationCap,
  KeyRound,
  Library,
  type LucideIcon,
} from "lucide-react";

import { CourseCatalog } from "@/components/vortex/course-catalog";
import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { courses, curriculumOptions, subjects } from "@/lib/vortex-data";

const catalogStats: Array<[LucideIcon, string, string]> = [
  [BookOpen, `${courses.length} courses`, "Linked to course detail pages"],
  [GraduationCap, "3 free modules", "Preview-first course access"],
  [Calendar, "Live + self paced", "Cohorts, bootcamps, and recordings"],
  [KeyRound, "Licence key", "Unlock after payment approval"],
];

export const metadata = {
  title: "Courses",
  description:
    "Explore Vortex Learning courses across O Level, A Level, IGCSE, FSc, Matric, SAT, IELTS, AI, programming, business, science, and more.",
};

export default function CoursesPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Course catalog</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight sm:text-6xl">
              Find the right course without searching through noise.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              Browse Vortex Learning by curriculum, subject, course type, and academic goal. Every course page connects preview modules, locked resources, instructor help, payment verification, and certificates.
            </p>
          </div>
          <div className="grid gap-3 rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl sm:grid-cols-2">
            {catalogStats.map(([Icon, value, label]) => (
              <div key={label} className="rounded-2xl bg-white/10 p-4">
                <Icon className="size-5 text-[#47C8F2]" />
                <p className="mt-4 font-heading text-3xl font-semibold">{value}</p>
                <p className="mt-1 text-xs text-cyan-100">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CourseCatalog courses={courses} />

      <section id="subjects" className="section-wrap scroll-mt-28">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeading
            eyebrow="Subject explorer"
            title="Curriculum and subject options in one catalog."
            description="Use the catalog for FSc, O Level, A Level, IGCSE, GCSE, entry tests, languages, and professional skill tracks. Course cards link directly to the correct course page."
          />
          <div className="grid gap-6">
            <div className="rounded-[1.75rem] border border-vortex-border bg-white p-5 shadow-[0_16px_60px_rgba(9,29,83,0.06)]">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
                  <Library className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase text-vortex-blue">Curriculum options</p>
                  <h2 className="font-heading text-3xl font-semibold text-vortex-navy">
                    O Level, A Level, IGCSE, GCSE, and more
                  </h2>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {curriculumOptions.map((option) => (
                  <a
                    key={option}
                    href="#catalog"
                    className="rounded-full border border-vortex-border bg-vortex-soft px-4 py-2 text-sm font-semibold text-vortex-slate transition hover:border-vortex-cyan hover:text-vortex-blue"
                  >
                    {option}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <a
                  key={subject.title}
                  href="#catalog"
                  className="group rounded-2xl border border-vortex-border bg-vortex-soft p-4 transition hover:border-vortex-cyan hover:bg-white"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-vortex-navy">{subject.title}</span>
                    <ArrowRight className="size-4 text-vortex-cyan transition group-hover:translate-x-1" />
                  </span>
                  <span className="mt-2 block text-xs text-vortex-muted">
                    {subject.cluster} - {subject.count}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="grid gap-6 rounded-[2rem] border border-vortex-border bg-white p-7 shadow-[0_18px_70px_rgba(9,29,83,0.08)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-vortex-blue">Questions about access?</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">
              Course access, live learning, bank transfer, and support are explained in FAQs.
            </h2>
          </div>
          <Link href="/faqs" className="btn-primary h-11 px-5">
            Open FAQs
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
