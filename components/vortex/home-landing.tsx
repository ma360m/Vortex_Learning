"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Compass,
  Library,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import {
  courses,
  curriculumOptions,
  featuredCourses,
  learningPaths,
  projectAttribution,
  studentFeedbacks,
  subjects,
} from "@/lib/vortex-data";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";
import { SectionHeading } from "./section-heading";
import { StudentFeedbackSlider } from "./student-feedback-slider";

const pathIcons = [Library, BookOpen, Target];
const defaultHeroBadge = "Online courses, tutoring, and exam preparation";
const defaultFeedbackContent = {
  eyebrow: "Student feedback",
  title: "Clear guidance, real progress",
  body:
    "Students and families come here for structured courses, practical reminders, teacher support, and a learning path that is easier to follow.",
  href: "/support#community",
  secondaryHref: "/blog",
  secondaryLabel: "See our blogs",
};

const whyChooseCards = [
  {
    icon: Target,
    title: "Focused Progress",
    text: "Learning plans are shaped around weak areas, exam goals, and clear next steps.",
  },
  {
    icon: Compass,
    title: "Guided Routes",
    text: "Students can start by curriculum, subject, course type, or academic goal.",
  },
  {
    icon: Layers,
    title: "Structured Learning",
    text: "Courses connect previews, notes, resources, assignments, quizzes, and support.",
  },
  {
    icon: ShieldCheck,
    title: "Visible Support",
    text: "Parents, teachers, and admins can work from approved role-based portals.",
  },
];

type SiteContentBlockRow = {
  block_key: string;
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  href: string | null;
  metadata: unknown;
};

type SiteFeedbackRow = {
  name: string;
  role: string | null;
  quote: string;
  sort_order: number | null;
};

function readableMetadata(value: unknown) {
  return value && typeof value === "object" ? value as Record<string, unknown> : {};
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
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
  const [heroBadge, setHeroBadge] = useState(defaultHeroBadge);
  const [feedbackContent, setFeedbackContent] = useState(defaultFeedbackContent);
  const [feedbackItems, setFeedbackItems] = useState(studentFeedbacks);
  const stats = [
    [`${courses.length}`, "published courses"],
    [`${subjects.length}`, "active subjects"],
    [`${curriculumOptions.length}`, "learning pathways"],
  ];

  useEffect(() => {
    let isMounted = true;

    async function loadPublishedContent() {
      if (!isSupabaseConfigured()) return;

      try {
        const supabase = getSupabaseClient();
        const [blocksResult, feedbackResult] = await Promise.all([
          supabase
            .from("site_content_blocks")
            .select("block_key, eyebrow, title, body, href, metadata")
            .eq("published", true)
            .in("block_key", ["home_hero_badge", "home_feedback"]),
          supabase
            .from("site_student_feedbacks")
            .select("name, role, quote, sort_order")
            .eq("published", true)
            .order("sort_order", { ascending: true }),
        ]);

        if (!isMounted || blocksResult.error || feedbackResult.error) return;

        const blocks = (blocksResult.data as SiteContentBlockRow[] | null) ?? [];
        const badgeBlock = blocks.find((block) => block.block_key === "home_hero_badge");
        const feedbackBlock = blocks.find((block) => block.block_key === "home_feedback");

        if (badgeBlock?.title) setHeroBadge(badgeBlock.title);
        if (feedbackBlock) {
          const metadata = readableMetadata(feedbackBlock.metadata);
          setFeedbackContent({
            eyebrow: feedbackBlock.eyebrow || defaultFeedbackContent.eyebrow,
            title: feedbackBlock.title || defaultFeedbackContent.title,
            body: feedbackBlock.body || defaultFeedbackContent.body,
            href: feedbackBlock.href || defaultFeedbackContent.href,
            secondaryHref: typeof metadata.secondary_href === "string" ? metadata.secondary_href : defaultFeedbackContent.secondaryHref,
            secondaryLabel: typeof metadata.secondary_label === "string" ? metadata.secondary_label : defaultFeedbackContent.secondaryLabel,
          });
        }

        const savedFeedbacks = (feedbackResult.data as SiteFeedbackRow[] | null) ?? [];
        if (savedFeedbacks.length) {
          setFeedbackItems(savedFeedbacks.map((feedback) => ({
            name: feedback.name,
            role: feedback.role || "Student feedback",
            quote: feedback.quote,
          })));
        }
      } catch {
        // Keep built-in content when the optional content tables are not installed yet.
      }
    }

    void loadPublishedContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-vortex-navy text-white">
        <Image
          src="/vortex-home-audience.jpeg"
          alt="Vortex Learning training audience session"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[44%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,29,83,0.93)_0%,rgba(9,29,83,0.78)_56%,rgba(20,58,132,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,#f7fbff_0%,rgba(247,251,255,0)_100%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.86fr)_minmax(360px,0.7fr)] lg:items-center">
          <div className="max-w-[700px]">
            <div className="mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-50 backdrop-blur">
              <span className="size-2.5 rounded-full bg-[#47C8F2]" />
              <span className="truncate">{heroBadge}</span>
            </div>
            <h1 className="font-heading text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[4.25rem]">
              Online learning
              <span className="block text-cyan-100">for every subject</span>
              <span className="block text-white">and every goal</span>
            </h1>
            <p className="mt-5 max-w-[620px] text-base leading-7 text-blue-50 sm:text-lg sm:leading-8">
              Explore live and self-paced courses, tutor guidance, exam preparation,
              AI study support, and clear progress tools for students and families.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/courses" className="btn-white h-[3.05rem] px-5 text-sm">
                <Sparkles className="size-4" />
                Explore Courses
              </Link>
              <Link href="/trainings" className="btn-glass h-[3.05rem] px-5 text-sm">
                <BookOpen className="size-4" />
                Trainings
              </Link>
              <Link href="/consultation" className="inline-flex h-[3.05rem] items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold text-cyan-50 transition hover:text-white">
                <Calendar className="size-4" />
                Consultation
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

      <Reveal className="bg-vortex-navy px-4 py-14 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase text-[#47C8F2]">Who we are</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight sm:text-5xl">
            A structured online learning partner for serious academic growth
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-base font-semibold leading-8 text-white/88 sm:text-lg sm:leading-9">
            Vortex Learning connects dedicated educators with students and families
            through organized courses, live learning, practical resources, parent
            visibility, and clear support pathways.
          </p>
        </div>
      </Reveal>

      <Reveal className="bg-white px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why choose us?"
            title="Learning support that feels clear, guided, and accountable"
            description="The platform is designed for students who need structure, families who need visibility, and teachers who need an organized way to support progress."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {whyChooseCards.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[1.25rem] border border-vortex-border bg-white p-6 shadow-[0_14px_45px_rgba(9,29,83,0.06)]">
                <span className="grid size-14 place-items-center rounded-2xl bg-vortex-soft text-vortex-blue">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold leading-7 text-vortex-navy">{title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-vortex-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section-wrap pt-0">
        <div id="phonics-club" className="grid overflow-hidden rounded-[2rem] border border-vortex-border bg-white shadow-[0_22px_80px_rgba(9,29,83,0.1)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase text-vortex-blue">Partnership</p>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-vortex-navy sm:text-5xl">
              {projectAttribution.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-vortex-muted">
              {projectAttribution.description}
            </p>
            <a
              href="https://phonicsclub.com"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-vortex-blue transition hover:text-vortex-cyan"
            >
              Visit phonicsclub.com
              <ArrowRight className="size-4" />
            </a>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {projectAttribution.points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-slate">
                  <CheckCircle2 className="size-4 shrink-0 text-vortex-blue" />
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-72 bg-vortex-navy lg:min-h-full">
            <Image
              src="/phonics-club-project.png"
              alt="Phonics Club educators working in a library learning session"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,29,83,0.34),rgba(9,29,83,0.04))]" />
          </div>
        </div>
      </Reveal>

      <Reveal className="section-wrap pt-14 sm:pt-20">
        <SectionHeading
          eyebrow="Find your path"
          title="Explore by curriculum, subject, or learning goal"
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
                        href="/courses"
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
        <div id="course-catalog" className="overflow-hidden rounded-[2rem] border border-vortex-border bg-white shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <div className="bg-[linear-gradient(135deg,#091D53,#143A84_58%,#1E8ACB)] p-6 text-white sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase text-cyan-100">Current course catalog</p>
                <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight sm:text-5xl">
                  Explore the courses currently available
                </h2>
                <p className="mt-4 text-base leading-7 text-blue-50">
                  Start with a published course, open its free preview, and choose full access when you are ready.
                </p>
              </div>
              <Link href="/courses#catalog" className="btn-white h-11 px-5 lg:w-fit">
                View full catalog
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8 xl:grid-cols-3">
            {featuredCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group flex min-h-52 flex-col rounded-2xl border border-vortex-border bg-vortex-soft p-5 transition hover:-translate-y-1 hover:border-vortex-cyan hover:bg-white hover:shadow-[0_16px_50px_rgba(9,29,83,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-vortex-blue">
                    <BookOpen className="size-4" />
                    {course.subject}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-vortex-cyan transition group-hover:translate-x-1" />
                </div>
                <h3 className="mt-5 line-clamp-2 font-heading text-2xl font-semibold leading-tight text-vortex-navy">
                  {course.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-vortex-muted">{course.description}</p>
                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-5 text-xs font-semibold text-vortex-slate">
                  <span>{course.board}</span>
                  <span>{course.mode}</span>
                  <span>{course.lessons} lessons</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section-wrap">
        <StudentFeedbackSlider content={feedbackContent} items={feedbackItems} />
      </Reveal>
    </>
  );
}
