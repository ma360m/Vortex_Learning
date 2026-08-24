"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Library,
  MessageSquareQuote,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import {
  courses,
  curriculumOptions,
  learningPaths,
  projectAttribution,
  studentFeedbacks,
  subjects,
} from "@/lib/vortex-data";
import { SectionHeading } from "./section-heading";

const pathIcons = [Library, BookOpen, Target];
const acceleratedCourses = courses
  .filter((course) => {
    const text = `${course.title} ${course.category} ${course.tags.join(" ")}`.toLowerCase();
    return text.includes("accelerated") || text.includes("crash") || text.includes("entry");
  })
  .slice(0, 3);

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.48, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function HomeLanding() {
  const stats = [
    [`${courses.length}`, "linked courses"],
    [`${subjects.length}`, "subject tracks"],
    [`${curriculumOptions.length}`, "curriculum routes"],
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-vortex-navy text-white">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=75"
          alt="Students studying together in a modern learning environment"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,29,83,0.93)_0%,rgba(9,29,83,0.78)_56%,rgba(20,58,132,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,#f7fbff_0%,rgba(247,251,255,0)_100%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.86fr)_minmax(360px,0.7fr)] lg:items-center">
          <div className="max-w-[700px]">
            <div className="mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-50 backdrop-blur">
              <span className="size-2.5 rounded-full bg-[#47C8F2]" />
              <span className="truncate">Vortex Learning - Learning, structured for your path.</span>
            </div>
            <h1 className="font-heading text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[4.25rem]">
              One platform.
              <span className="block text-cyan-100">Every subject.</span>
              <span className="block text-white">Every goal.</span>
            </h1>
            <p className="mt-5 max-w-[620px] text-base leading-7 text-blue-50 sm:text-lg sm:leading-8">
              Vortex Learning brings structured courses, live classes, tutor guidance,
              AI support, parent visibility, and academic operations into one focused
              education ecosystem.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/explore" className="btn-white h-[3.05rem] px-5 text-sm">
                <Sparkles className="size-4" />
                Explore Paths
              </Link>
              <Link href="/courses" className="btn-glass h-[3.05rem] px-5 text-sm">
                <BookOpen className="size-4" />
                Course Catalog
              </Link>
              <Link href="/consultation" className="inline-flex h-[3.05rem] items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold text-cyan-50 transition hover:text-white">
                <Calendar className="size-4" />
                Contact Us Now
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[480px] md:block lg:mx-0">
            <div className="rounded-[1.5rem] border border-white/20 bg-white/12 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-[1.15rem] bg-[#071847]/94">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-[#47C8F2]" />
                    <span className="size-2.5 rounded-full bg-white/60" />
                    <span className="size-2.5 rounded-full bg-white/35" />
                  </div>
                  <span className="text-xs font-semibold text-cyan-100">Live Learning Preview</span>
                </div>
                <div className="grid gap-4 p-5">
                  <div className="rounded-3xl bg-[linear-gradient(135deg,#091D53,#143A84_54%,#1E8ACB)] p-5">
                    <div className="flex items-center justify-between text-xs text-cyan-100">
                      <span>Cambridge 0625</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1">
                        <span className="size-2 rounded-full bg-[#47C8F2]" />
                        Live
                      </span>
                    </div>
                    <div className="mt-14">
                      <p className="text-sm text-cyan-100">Topic</p>
                      <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-white">
                        Electricity, circuits, and exam reasoning
                      </h2>
                    </div>
                    <div className="mt-7 grid grid-cols-3 gap-2">
                      {["Notes", "Quiz", "Transcript"].map((item) => (
                        <span
                          key={item}
                          className="rounded-2xl bg-white/12 px-3 py-3 text-center text-xs font-semibold text-cyan-50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {stats.map(([value, label]) => (
                      <div key={label} className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
                        <p className="font-heading text-3xl font-semibold">{value}</p>
                        <p className="mt-1 text-xs text-cyan-100">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal className="section-wrap pt-14 sm:pt-20">
        <SectionHeading
          eyebrow="Find your path"
          title="Explore by curriculum, subject, or learning goal."
          description="Choose a starting point, then move into a precise course, tutor, resource, or exam plan."
        />
        <div className="mt-9 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {learningPaths.map((path, index) => {
            const Icon = pathIcons[index] ?? Library;

            return (
              <div key={path.title} className="contents">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-3xl border border-vortex-border bg-white p-6 shadow-[0_18px_60px_rgba(9,29,83,0.07)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
                      <Icon className="size-5" />
                    </span>
                    <ChevronRight className="size-5 text-vortex-cyan transition group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-6 font-heading text-3xl font-semibold text-vortex-navy">
                    {path.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-vortex-muted">{path.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {path.items.slice(0, 6).map((item) => (
                      <Link
                        key={item}
                        href="/explore"
                        className="rounded-full border border-vortex-border bg-vortex-soft px-3 py-2 text-xs font-semibold text-vortex-slate transition hover:border-vortex-cyan hover:text-vortex-blue"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </motion.div>
                {index < learningPaths.length - 1 ? (
                  <div className="hidden place-items-center px-1 text-vortex-cyan lg:grid">
                    <motion.span
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      className="grid size-11 place-items-center rounded-full border border-vortex-border bg-white shadow-sm"
                    >
                      <ArrowRight className="size-5" />
                    </motion.span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="section-wrap pt-0">
        <div className="grid gap-6 rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)] lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-vortex-blue">Course catalog</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight text-vortex-navy">
              Browse the full catalog on a dedicated page.
            </h2>
            <p className="mt-4 text-sm leading-7 text-vortex-muted">
              The homepage stays light. The course catalog now carries filtering,
              subject exploration, curriculum options, and all linked course pages.
            </p>
            <Link href="/courses" className="btn-primary mt-6 h-11 px-5">
              Open Course Catalog
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="rounded-2xl border border-vortex-border bg-vortex-soft p-4 transition hover:border-vortex-cyan hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase text-vortex-blue">{course.board}</p>
                <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-vortex-navy">
                  {course.title}
                </h3>
                <p className="mt-3 text-xs text-vortex-muted">{course.mode}</p>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section-wrap pt-0">
        <div className="rounded-[2rem] border border-vortex-border bg-white p-7 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow="Accelerated Learning Programs"
              title="Fast, guided routes for urgent goals."
              description="Structured intensive programs for exam rescue, crash revision, entry tests, language goals, and professional skill sprints."
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {(acceleratedCourses.length > 0 ? acceleratedCourses : courses.slice(0, 3)).map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="rounded-2xl border border-vortex-border bg-vortex-soft p-4 text-sm font-semibold text-vortex-navy transition hover:border-vortex-cyan hover:text-vortex-blue"
                >
                  {course.title}
                  <span className="mt-3 block text-xs font-medium text-vortex-muted">
                    {course.duration} - {course.mode}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/consultation" className="btn-primary mt-7 h-11 px-5">
            Contact Us Now
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Reveal>

      <Reveal className="relative isolate overflow-hidden bg-vortex-navy py-14 text-white sm:py-20">
        <Image
          src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=2200&q=75"
          alt="Students working together during a guided study session"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,29,83,0.94)_0%,rgba(9,29,83,0.82)_48%,rgba(20,58,132,0.54)_100%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Student feedback</p>
            <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-tight sm:text-5xl">
              Structure that makes learning feel calmer.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-cyan-50 sm:text-base sm:leading-8">
              Students and families notice the same thing first: clear paths,
              practical reminders, and teacher guidance make progress easier to follow.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
            {studentFeedbacks.map((feedback) => (
              <motion.article
                key={feedback.name}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-white/18 bg-white/12 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.16)] backdrop-blur-md"
              >
                <MessageSquareQuote className="size-5 text-[#47C8F2]" />
                <p className="mt-5 text-sm leading-7 text-blue-50">{feedback.quote}</p>
                <div className="mt-5 border-t border-white/14 pt-4">
                  <p className="text-sm font-semibold text-white">{feedback.name}</p>
                  <p className="mt-1 text-xs text-cyan-100">{feedback.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="bg-white px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-vortex-border shadow-[0_18px_70px_rgba(9,29,83,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-vortex-gradient p-7 text-white sm:p-9">
            <p className="text-sm font-semibold text-cyan-100">Phonics Club initiative</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight">
              {projectAttribution.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-blue-50">{projectAttribution.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {projectAttribution.points.map((point) => (
                <span key={point} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-xs font-semibold text-cyan-50">
                  <ShieldCheck className="size-4 text-[#47C8F2]" />
                  {point}
                </span>
              ))}
            </div>
          </div>
          <div className="grid divide-y divide-vortex-border bg-white">
            <Link
              href="/about#phonics-club"
              className="group flex items-center justify-between gap-6 p-7 transition hover:bg-vortex-soft sm:p-9"
            >
              <div>
                <p className="text-sm font-semibold text-vortex-blue">About Vortex</p>
                <h3 className="mt-2 font-heading text-3xl font-semibold leading-tight text-vortex-navy">
                  Learn more about the project background.
                </h3>
              </div>
              <ArrowRight className="size-5 shrink-0 text-vortex-cyan transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/blog"
              className="group flex items-center justify-between gap-6 p-7 transition hover:bg-vortex-soft sm:p-9"
            >
              <div>
                <p className="text-sm font-semibold text-vortex-blue">Blog and guidance</p>
                <h3 className="mt-2 font-heading text-3xl font-semibold leading-tight text-vortex-navy">
                  Click here to see our blogs.
                </h3>
              </div>
              <Newspaper className="size-5 shrink-0 text-vortex-cyan transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
