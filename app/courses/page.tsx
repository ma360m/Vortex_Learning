import {
  Banknote,
  BookOpen,
  Calendar,
  GraduationCap,
  HelpCircle,
  Library,
  Phone,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import { CourseCard } from "@/components/vortex/course-card";
import { SearchConsole } from "@/components/vortex/search-console";
import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { courses, learningPaths, subjects } from "@/lib/vortex-data";

const courseSystems: Array<[string, string, LucideIcon]> = [
  ["Live learning", "Zoom, Google Meet, calendar sync, reminders, attendance, teacher notes, and homework.", Calendar],
  ["Self-paced learning", "Resume learning, daily goals, weekly goals, bookmarks, notifications, and progress.", BookOpen],
  ["Exam preparation", "Past papers, topic practice, mock exams, assignments, resources, and certificates.", GraduationCap],
  ["Instructor help", "Students can ask instructors questions, request help, and join live support sessions inside courses.", HelpCircle],
  ["Bank transfer", "Students upload payment slips; admin verifies and emails the licence key for course access.", Banknote],
  ["Payment support", "If bank transfer has an issue, students can contact +92 324 4270697.", Phone],
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
            <h1 className="mt-4 font-heading text-6xl font-semibold leading-tight">
              Unlimited learning paths, organized for intent.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              Browse academic boards, live cohorts, self-paced programs,
              bootcamps, crash courses, past-paper tracks, topic practice, and
              professional certifications.
            </p>
          </div>
          <SearchConsole compact />
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-5 lg:grid-cols-3">
          {learningPaths.map((path, index) => {
            const Icon = [Library, BookOpen, GraduationCap][index] ?? Library;

            return (
              <div key={path.title} className="rounded-3xl border border-vortex-border bg-white p-6 shadow-[0_16px_60px_rgba(9,29,83,0.06)]">
                <Icon className="size-6 text-vortex-blue" />
                <h2 className="mt-5 font-heading text-3xl font-semibold text-vortex-navy">
                  {path.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-vortex-muted">{path.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {path.items.map((item) => (
                    <span key={item} className="rounded-full bg-vortex-soft px-3 py-2 text-xs font-semibold text-vortex-slate">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Featured courses"
            title="Academic rigor, live support, and self-paced depth."
            description="Published course entries are generated from the uploaded Vortex course library, with free preview modules, locked resources, instructor help, and licence-key access."
          />
          <div className="inline-flex items-center gap-2 rounded-full border border-vortex-border bg-white px-4 py-3 text-sm font-semibold text-vortex-slate shadow-sm">
              <SlidersHorizontal className="size-4 text-vortex-blue" />
            Catalog filters ready
          </div>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Accelerated Learning Programs"
            title="Short, intensive tracks with instructor help."
            description="For urgent goals, Vortex can run accelerated exam rescue, crash revision, entry-test, and skill sprint programs with live clinics and direct instructor support."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {courses
              .filter((course) => course.tags.includes("Accelerated Learning") || course.category === "Medical Entry" || course.category === "University Entry")
              .map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Subject coverage"
            title="From school exams to professional skills."
            description="The catalog structure supports academic boards, university entry, professional certifications, crash programs, and teacher training."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <div key={subject.title} className="rounded-2xl border border-vortex-border bg-vortex-soft p-4">
                <p className="text-sm font-semibold text-vortex-navy">{subject.title}</p>
                <p className="mt-2 text-xs text-vortex-muted">{subject.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="grid gap-5 lg:grid-cols-3">
          {courseSystems.map(([title, text, Icon]) => (
            <div key={title} className="rounded-3xl border border-vortex-border bg-white p-6 shadow-[0_16px_60px_rgba(9,29,83,0.06)]">
              <Icon className="size-6 text-vortex-blue" />
              <h2 className="mt-5 font-heading text-3xl font-semibold text-vortex-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-vortex-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
