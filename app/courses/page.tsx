import {
  Banknote,
  BookOpen,
  Calendar,
  GraduationCap,
  HelpCircle,
  KeyRound,
  Phone,
  type LucideIcon,
} from "lucide-react";

import { CourseCatalog } from "@/components/vortex/course-catalog";
import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { courses, subjects } from "@/lib/vortex-data";

const courseSystems: Array<[string, string, LucideIcon]> = [
  ["Live learning", "Zoom, Google Meet, calendar sync, reminders, attendance, teacher notes, and homework.", Calendar],
  ["Self-paced learning", "Resume learning, daily goals, weekly goals, bookmarks, notifications, and progress.", BookOpen],
  ["Exam preparation", "Past papers, topic practice, mock exams, assignments, resources, and certificates.", GraduationCap],
  ["Instructor help", "Students can ask instructors questions, request help, and join live support sessions inside courses.", HelpCircle],
  ["Bank transfer", "Students upload payment slips; admin verifies and emails the licence key for course access.", Banknote],
  ["Payment support", "If bank transfer has an issue, students can contact +92 324 4270697.", Phone],
];

const catalogStats: Array<[LucideIcon, string, string]> = [
  [BookOpen, `${courses.length} courses`, "Generated from the course library"],
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
