import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  CheckCircle2,
  FileText,
  KeyRound,
  Lock,
  MessageSquare,
  PanelLeft,
} from "lucide-react";

import {
  courses,
  getCourseBySlug,
  learningJourney,
  platformModules,
  platformRoles,
} from "@/lib/vortex-data";

const tabs = ["Notes", "Resources", "Transcript", "AI Assistant", "Assignments", "Discussion", "Quiz"];

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  return {
    title: course ? `${course.title} Preview` : "Course Preview",
    description: "Vortex Learning course preview with free modules, locked resources, AI help, assignments, discussion, quiz, learning journey, and platform modules.",
  };
}

export default async function CoursePreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    redirect(`/coming-soon?feature=${slug}-preview`);
  }

  const freeModuleCount = course.freeModuleCount ?? 3;
  const activeModule = course.modules[0];
  const activeLesson = activeModule?.lessons[0] ?? "Course preview";

  return (
    <div className="min-h-screen bg-[#f7fbff] text-vortex-navy">
      <header className="border-b border-vortex-border bg-white/88 px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-vortex-blue">
            <PanelLeft className="size-4" />
            {course.title}
          </Link>
          <div className="hidden min-w-0 flex-1 text-center md:block">
            <p className="truncate text-sm font-semibold">Course preview</p>
            <p className="text-xs text-vortex-muted">
              {freeModuleCount} preview modules open - full course unlocks with licence key
            </p>
          </div>
          <Link
            href={`/courses/${course.slug}/payment`}
            className="inline-flex size-10 items-center justify-center rounded-full border border-vortex-border bg-white text-vortex-navy transition hover:border-vortex-cyan"
            aria-label="Unlock full course"
          >
            <KeyRound className="size-4" />
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-5 px-5 py-6 sm:px-8 lg:grid-cols-[330px_1fr]">
        <aside className="rounded-3xl border border-vortex-border bg-white p-4 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-vortex-blue">Course progress</p>
              <h1 className="mt-2 font-heading text-3xl font-semibold">Preview</h1>
            </div>
            <Award className="size-8 text-vortex-blue" />
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-vortex-soft">
            <div className="h-full rounded-full bg-vortex-gradient" style={{ width: `${Math.min(100, (freeModuleCount / course.modules.length) * 100)}%` }} />
          </div>
          <div className="mt-6 grid gap-2">
            {course.modules.map((module, index) => {
              const isFree = index < freeModuleCount;

              return (
                <div key={module.title} className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl px-3 py-3 ${
                  index === 0 ? "bg-vortex-navy text-white" : "bg-vortex-soft text-vortex-navy"
                }`}>
                  <span className="grid size-8 place-items-center rounded-xl bg-white/15 text-xs font-semibold text-vortex-blue">
                    {isFree ? <CheckCircle2 className="size-4" /> : <Lock className="size-4" />}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{module.title}</span>
                    <span className="mt-1 block text-xs opacity-70">{isFree ? "Free preview" : "Locked after preview"}</span>
                  </span>
                  <BookOpen className="size-4 opacity-70" />
                </div>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link href="/signin?next=/dashboard/student/bookmarks" className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-vortex-border text-xs font-semibold transition hover:border-vortex-cyan">
              <BookOpen className="size-4" />
              Bookmark
            </Link>
            <Link href="/signin?next=/dashboard/student/calendar" className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-vortex-border text-xs font-semibold transition hover:border-vortex-cyan">
              <CheckCircle2 className="size-4" />
              Reminder
            </Link>
          </div>
        </aside>

        <section className="grid gap-5">
          <div className="overflow-hidden rounded-[2rem] border border-vortex-border bg-white shadow-[0_22px_80px_rgba(9,29,83,0.1)]">
            <div className="min-h-[360px] bg-[linear-gradient(135deg,#091D53,#143A84_52%,#1E8ACB)] p-6 text-white">
              <div className="flex items-center justify-between text-sm text-cyan-100">
                <span>{course.board}</span>
                <span className="rounded-full bg-white/12 px-3 py-1">Free preview</span>
              </div>
              <div className="flex min-h-[286px] items-center justify-center py-8 text-center">
                <span className="max-w-xl">
                  <span className="mx-auto grid size-20 place-items-center rounded-3xl border border-white/30 bg-white/18 text-white shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur">
                    <FileText className="size-9" />
                  </span>
                  <span className="mt-6 block font-heading text-4xl font-semibold leading-tight">
                    Reading preview workspace
                  </span>
                  <span className="mt-3 block text-sm leading-7 text-cyan-100">
                    Open notes, text lessons, resources, assignments, and instructor questions from one course preview area.
                  </span>
                </span>
              </div>
            </div>
            <div className="grid gap-4 border-t border-vortex-border p-5 xl:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-semibold text-vortex-blue">{activeModule?.title}</p>
                <h2 className="mt-2 font-heading text-4xl font-semibold">{activeLesson}</h2>
                <p className="mt-3 text-sm leading-7 text-vortex-muted">
                  Preview lessons remain open before payment. Paid modules, resources, instructor help records, final quiz, and certificate issue after licence activation.
                </p>
              </div>
              <Link href={`/courses/${course.slug}/payment`} className="btn-primary h-12 px-5">
                <KeyRound className="size-4" />
                Unlock full course
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-vortex-border bg-white p-4 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
            <div className="flex gap-2 overflow-x-auto rounded-full bg-vortex-soft p-2">
              {tabs.map((tab, index) => (
                <span key={tab} className={`h-10 shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold ${
                  index === 0 ? "bg-vortex-navy text-white" : "text-vortex-slate"
                }`}>
                  {tab}
                </span>
              ))}
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_300px]">
              <div className="rounded-3xl bg-vortex-soft p-6">
                <p className="text-sm font-semibold text-vortex-blue">Notes</p>
                <h3 className="mt-3 font-heading text-3xl font-semibold">Preview workspace</h3>
                <p className="mt-3 text-sm leading-7 text-vortex-muted">
                  Notes, transcript, bookmarks, AI prompts, assignments, discussions, and quiz status stay attached to the selected lesson.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    [FileText, "Lesson summary"],
                    [FileText, `${course.resourceFiles?.length ?? 0} resource files`],
                    [Bot, "Course assistant"],
                    [MessageSquare, "Instructor help"],
                  ].map(([Icon, label]) => (
                    <div key={label as string} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-semibold text-vortex-navy">
                      <Icon className="size-4 text-vortex-blue" />
                      {label as string}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-3xl bg-vortex-navy p-5 text-white">
                  <Award className="size-5 text-[#47C8F2]" />
                  <p className="mt-4 text-sm font-semibold">Certificate readiness</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full w-[18%] rounded-full bg-[#47C8F2]" />
                  </div>
                  <p className="mt-3 text-xs text-cyan-100">
                    Certificate unlocks after final quiz. Quiz questions will be added when provided.
                  </p>
                </div>
                <form action="/api/vortex/student-actions" method="post" className="rounded-3xl border border-vortex-border p-5">
                  <input type="hidden" name="intent" value="student-help" />
                  <input type="hidden" name="returnTo" value={`/preview/${course.slug}`} />
                  <p className="text-sm font-semibold">Ask instructor</p>
                  <textarea name="message" className="mt-3 min-h-24 w-full rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm outline-none" placeholder="Ask a question about this course" />
                  <button type="submit" className="btn-primary mt-3 h-10 px-4 text-xs">
                    Send question
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="mx-auto max-w-7xl px-5 pb-6 sm:px-8">
        <div className="rounded-[2rem] bg-vortex-navy p-6 text-white shadow-[0_24px_90px_rgba(9,29,83,0.18)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-[#47C8F2]">See the platform</p>
              <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight">
                Every role gets a focused workspace
              </h2>
              <p className="mt-4 text-sm leading-7 text-cyan-50">
                Students, parents, instructors, and admins can work from dedicated previews without crowding the homepage.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {platformRoles.map((role) => (
                <Link
                  key={role.role}
                  href={role.href}
                  className="rounded-2xl border border-white/15 bg-white/8 p-4 transition hover:bg-white/14"
                >
                  <p className="text-sm font-semibold text-white">{role.role}</p>
                  <p className="mt-2 text-xs leading-6 text-cyan-100">{role.title}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#47C8F2]">
                    Open workspace
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <p className="text-sm font-semibold text-vortex-blue">Learning journey</p>
          <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">Timeline</h2>
          <div className="mt-6 grid gap-3">
            {learningJourney.map((item, index) => (
              <div key={item.title} className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl bg-vortex-soft p-4">
                <span className="grid size-9 place-items-center rounded-full bg-vortex-navy text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-vortex-navy">{item.title}</span>
                  <span className="mt-1 block text-xs leading-6 text-vortex-muted">{item.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <p className="text-sm font-semibold text-vortex-blue">Platform modules</p>
          <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">
            Built around the full learning flow
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {platformModules.map((module) => (
              <div key={module} className="rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-navy">
                {module}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
