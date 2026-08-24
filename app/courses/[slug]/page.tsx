import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Award,
  Banknote,
  BookOpen,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileText,
  HelpCircle,
  KeyRound,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Star,
  Upload,
  Video,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { courses, getCourseBySlug, instructors } from "@/lib/vortex-data";

const courseSystems: Array<[LucideIcon, string, string]> = [
  [FileText, "Resources", "Locked flipbooks, transcripts, study notes, past papers, and mark schemes."],
  [ClipboardCheck, "Assignments", "Homework, uploads, rubric status, teacher feedback, and reminders."],
  [MessageSquare, "Instructor help", "Ask the instructor questions, request help, join live doubt sessions, and track replies."],
  [Award, "Certificates", "Completion progress, quiz requirements, assignment review, and certificate issue state."],
  [Star, "Reviews", "Placeholder ratings and structured student feedback for launch."],
  [Bot, "AI assistant", "Course assistant, homework helper, quiz helper, and revision planner."],
];

const bankTransferSteps: Array<[LucideIcon, string]> = [
  [Upload, "Upload payment slip"],
  [CheckCircle2, "Admin verifies payment"],
  [Mail, "Licence key emailed to user"],
  [KeyRound, "Student unlocks course"],
];

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course",
    };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    redirect(`/coming-soon?feature=${slug}-course`);
  }

  const instructor = instructors.find((item) => item.name === course.instructor) ?? instructors[0];
  const freeModuleCount = course.freeModuleCount ?? 3;
  const resourceFiles = course.resourceFiles ?? [];
  const helpLinks = course.helpLinks ?? [];

  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">{course.eyebrow}</p>
            <h1 className="mt-4 max-w-5xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
              {course.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-cyan-50">{course.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/preview/${course.slug}`} className="btn-white h-12 px-5">
                <Video className="size-5" />
                Start Free Preview
              </Link>
              <Link href={`/courses/${course.slug}/payment`} className="btn-glass h-12 px-5">
                <Banknote className="size-5" />
                Get Full Access
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <div className="grid gap-4">
              {[
                ["Mode", course.mode],
                ["Level", course.level],
                ["Duration", course.duration],
                ["Lessons", `${course.lessons}`],
                ["Free modules", `${freeModuleCount}`],
                ["Resources", `${resourceFiles.length} locked`],
                ["Instructor", course.instructor],
                ["Rating", course.rating],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                  <span className="text-sm text-cyan-100">{label}</span>
                  <span className="text-sm font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Overview"
            title="A complete course page designed for commitment."
            description="The structure supports curriculum, instructor credibility, modules, reviews, FAQ, resources, assignments, discussion, and certificates."
          />
          <div className="grid gap-3">
            {course.outcomes.map((outcome) => (
              <div key={outcome} className="flex items-start gap-3 rounded-2xl border border-vortex-border bg-white p-4">
                <CheckCircle2 className="mt-0.5 size-5 text-vortex-blue" />
                <p className="text-sm leading-7 text-vortex-slate">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Curriculum"
            title="Modules, lessons, and resource packs."
            description={`The first ${freeModuleCount} modules are available as a free preview. Remaining modules, resources, and certificate work unlock after payment approval and licence-key redemption.`}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {course.modules.map((module, index) => (
              <div key={module.title} className="rounded-3xl border border-vortex-border bg-vortex-soft p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-vortex-gradient font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    index < freeModuleCount ? "bg-white text-vortex-blue" : "bg-vortex-navy text-white"
                  }`}>
                    {index < freeModuleCount ? "Free preview" : "Locked"}
                  </span>
                </div>
                <h2 className="mt-6 font-heading text-3xl font-semibold text-vortex-navy">
                  {module.title}
                </h2>
                <div className="mt-5 grid gap-3">
                  {module.lessons.map((lesson) => (
                    <div key={lesson} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-vortex-slate">
                      {index < freeModuleCount ? (
                        <BookOpen className="size-4 text-vortex-blue" />
                      ) : (
                        <Lock className="size-4 text-vortex-blue" />
                      )}
                      {lesson}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {module.resources.map((resource) => (
                    <span key={resource} className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-vortex-blue">
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeading
            eyebrow="Resource library"
            title="Locked flipbook material, preserved from the course package."
            description={`${resourceFiles.length} files are attached to this course. They are listed now, displayed as protected flipbooks after licence activation, and not downloadable unless admin enables downloads for the course or resource.`}
          />
          <div className="grid gap-3">
            {resourceFiles.length > 0 ? (
              resourceFiles.map((resource) => (
                <Link
                  key={resource.id}
                  href={`/courses/${course.slug}/resources/${resource.id}`}
                  className="group grid gap-3 rounded-2xl border border-vortex-border bg-white p-4 transition hover:-translate-y-0.5 hover:border-vortex-cyan/70 hover:shadow-[0_16px_50px_rgba(9,29,83,0.08)] sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <span>
                    <span className="flex items-center gap-3 text-sm font-semibold text-vortex-navy">
                      <FileText className="size-4 text-vortex-blue" />
                      {resource.title}
                    </span>
                    <span className="mt-1 block text-xs text-vortex-muted">
                      {resource.fileName} - {resource.sizeLabel} - Flipbook locked
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-vortex-blue">
                    <Lock className="size-4" />
                    Open gate
                  </span>
                </Link>
              ))
            ) : (
              <div className="rounded-2xl border border-vortex-border bg-white p-5 text-sm text-vortex-muted">
                Course resources will be attached by admin.
              </div>
            )}
          </div>
        </div>

        {helpLinks.length > 0 && (
          <div className="mt-8 rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
            <div className="flex items-center gap-3">
              <ExternalLink className="size-5 text-vortex-blue" />
              <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Helping links and references</h2>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {helpLinks.map((link) => (
                <div key={link} className="rounded-2xl bg-vortex-soft px-4 py-3 text-sm font-medium text-vortex-slate">
                  {link}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="section-wrap">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
            <p className="text-sm font-semibold text-vortex-blue">Instructor</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">
              {instructor.name}
            </h2>
            <p className="mt-2 text-sm font-semibold text-vortex-slate">{instructor.role}</p>
            <p className="mt-5 text-sm leading-7 text-vortex-muted">{instructor.bio}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Experience", instructor.experience],
                ["Qualification", instructor.qualification],
                ["Availability", instructor.availability],
                ["Rating", instructor.rating],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-vortex-soft p-4">
                  <p className="text-xs font-semibold text-vortex-muted">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-vortex-navy">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {courseSystems.map(([Icon, title, text]) => (
              <div key={title} className="rounded-3xl border border-vortex-border bg-white p-6 shadow-[0_16px_60px_rgba(9,29,83,0.06)]">
                <Icon className="size-5 text-vortex-blue" />
                <h3 className="mt-5 font-semibold text-vortex-navy">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-vortex-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
            <div className="flex items-center gap-3">
              <HelpCircle className="size-6 text-vortex-blue" />
              <h2 className="font-heading text-4xl font-semibold text-vortex-navy">
                Instructor help inside the course
              </h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-vortex-muted">
              Students can ask the instructor anything related to the course, request a live help session,
              attach screenshots or homework, and keep replies connected to the lesson.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Ask a question", "Book live help", "Attach homework"].map((item) => (
                <form key={item} action="/api/vortex/student-actions" method="post">
                  <input type="hidden" name="intent" value="student-help" />
                  <input type="hidden" name="returnTo" value={`/courses/${course.slug}`} />
                  <input type="hidden" name="request_type" value={item} />
                  <button className="w-full rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-navy">
                    {item}
                  </button>
                </form>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-vortex-border bg-vortex-soft p-6">
            <div className="flex items-center gap-3">
              <Banknote className="size-6 text-vortex-blue" />
              <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Bank transfer access</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {bankTransferSteps.map(([Icon, label]) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-vortex-navy">
                  <Icon className="size-4 text-vortex-blue" />
                  {label}
                </div>
              ))}
            </div>
            <Link href={`/courses/${course.slug}/payment`} className="btn-primary mt-5 h-11 px-5">
              Apply for payment verification
              <ArrowRight className="size-4" />
            </Link>
            <a href="tel:+923244270697" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-vortex-blue">
              <Phone className="size-4" />
              Payment issue? +92 324 4270697
            </a>
          </div>
        </div>
      </section>

      <section className="bg-vortex-navy px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#47C8F2]">FAQ</p>
            <h2 className="mt-3 font-heading text-5xl font-semibold">Course questions, answered cleanly.</h2>
          </div>
          <div className="grid gap-3 lg:min-w-[520px]">
            {[
              ["Is this course live or recorded?", `This course is ${course.mode.toLowerCase()} with structured progress tracking.`],
              ["Are resources included?", "Yes. Course resources are kept as locked flipbook material after payment approval and licence activation."],
              ["When does the certificate unlock?", course.certificateRule ?? "Certificate unlocks after the final quiz is passed."],
            ].map(([question, answer]) => (
              <details key={question} className="rounded-2xl border border-white/15 bg-white/8 p-4">
                <summary className="cursor-pointer text-sm font-semibold">{question}</summary>
                <p className="mt-3 text-sm leading-7 text-cyan-100">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="rounded-[2rem] border border-vortex-border bg-white p-8 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-vortex-blue">Begin learning</p>
              <h2 className="mt-3 font-heading text-5xl font-semibold text-vortex-navy">
                Open the course preview.
              </h2>
            </div>
            <Link href={`/preview/${course.slug}`} className="btn-primary h-12 px-5">
              Launch Free Preview
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
