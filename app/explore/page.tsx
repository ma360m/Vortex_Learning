import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight, Library, Target } from "lucide-react";

import { SearchConsole } from "@/components/vortex/search-console";
import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { curriculumOptions, learningPaths, subjects } from "@/lib/vortex-data";

const pathIcons = [Library, BookOpen, Target];

export const metadata = {
  title: "Explore",
  description:
    "Search Vortex Learning courses, subjects, tutors, articles, past papers, notes, and FAQs by curriculum, subject, or learning goal.",
};

export default function ExplorePage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Explore</p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
              Search first, then choose the right learning path.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              Search courses, subjects, tutors, articles, past papers, notes, and FAQs from one dedicated discovery page.
            </p>
          </div>
          <SearchConsole />
        </div>
      </section>

      <section className="section-wrap">
        <SectionHeading
          eyebrow="Find your path"
          title="Explore by curriculum, subject, or learning goal."
          description="The homepage now stays lighter, while this page carries the deeper browsing and search experience."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {learningPaths.map((path, index) => {
            const Icon = pathIcons[index] ?? Library;

            return (
              <Link
                key={path.title}
                href="/courses"
                className="group rounded-3xl border border-vortex-border bg-white p-6 shadow-[0_18px_60px_rgba(9,29,83,0.07)] transition hover:-translate-y-1 hover:border-vortex-cyan/60"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
                    <Icon className="size-5" />
                  </span>
                  <ChevronRight className="size-5 text-vortex-cyan transition group-hover:translate-x-1" />
                </div>
                <h2 className="mt-6 font-heading text-3xl font-semibold text-vortex-navy">
                  {path.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-vortex-muted">{path.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {path.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-vortex-border bg-vortex-soft px-3 py-2 text-xs font-semibold text-vortex-slate"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeading
            eyebrow="Quick routes"
            title="Jump into a curriculum or subject."
            description="These options route visitors into the course catalog where every course card links to its course page and preview."
          />
          <div className="grid gap-6">
            <div>
              <p className="text-sm font-semibold text-vortex-blue">Curriculum options</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {curriculumOptions.map((item) => (
                  <Link
                    key={item}
                    href="/courses"
                    className="rounded-full border border-vortex-border bg-vortex-soft px-4 py-2 text-sm font-semibold text-vortex-slate transition hover:border-vortex-cyan hover:text-vortex-blue"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-vortex-blue">Subject options</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {subjects.slice(0, 12).map((subject) => (
                  <Link
                    key={subject.title}
                    href="/courses"
                    className="rounded-2xl border border-vortex-border bg-vortex-soft p-4 transition hover:border-vortex-cyan hover:bg-white"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-vortex-navy">{subject.title}</span>
                      <ArrowRight className="size-4 text-vortex-cyan" />
                    </span>
                    <span className="mt-2 block text-xs text-vortex-muted">{subject.cluster}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
