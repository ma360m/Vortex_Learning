"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Library,
  LineChart,
  MessageSquare,
  Target,
} from "lucide-react";

import {
  courses,
  instructors,
  learningPaths,
  platformRoles,
  subjects,
} from "@/lib/vortex-data";
import { CourseCard } from "./course-card";
import { SearchConsole } from "./search-console";
import { SectionHeading } from "./section-heading";
import { VortexLogo } from "./logo";

const discoveryTabs = [
  "Trending Courses",
  "Popular Subjects",
  "Accelerated",
  "Crash Courses",
  "Self Paced",
  "Live Classes",
];

const tabCourseMap: Record<string, string[]> = {
  "Trending Courses": ["physics", "chemistry", "biology"],
  "Popular Subjects": ["maths", "computer-science", "english"],
  Accelerated: ["mdcat", "ecat", "law-admission-test-lat"],
  "Crash Courses": ["mdcat", "ecat", "law-admission-test-lat"],
  "Self Paced": ["biology", "english", "urdu"],
  "Live Classes": ["physics", "maths", "olevels"],
};

const stats = [
  [`${courses.length}`, "linked courses"],
  [`${subjects.length}`, "subject tracks"],
  [`${instructors.length}`, "instructors"],
];

const pathIcons = [Library, BookOpen, Target];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function PlatformLanding() {
  const [activeTab, setActiveTab] = useState(discoveryTabs[0]);
  const [activeSubject, setActiveSubject] = useState(subjects[0].title);
  const [activeRole, setActiveRole] = useState(platformRoles[0].role);

  const selectedCourses = useMemo(() => {
    const slugs = tabCourseMap[activeTab] ?? tabCourseMap[discoveryTabs[0]];
    return slugs
      .map((slug) => courses.find((course) => course.slug === slug))
      .filter(Boolean)
      .slice(0, 3);
  }, [activeTab]);

  const subject = subjects.find((item) => item.title === activeSubject) ?? subjects[0];
  const role = platformRoles.find((item) => item.role === activeRole) ?? platformRoles[0];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-vortex-navy text-white md:min-h-[78svh]">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=75"
          alt="Students studying together in a modern learning environment"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,29,83,0.92)_0%,rgba(9,29,83,0.76)_48%,rgba(20,58,132,0.34)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#f7fbff_0%,rgba(247,251,255,0)_100%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(390px,0.78fr)] lg:items-center lg:pt-20">
          <div className="max-w-[720px]">
            <div className="mb-5 inline-flex max-w-full items-center gap-3 border-l border-[#47C8F2] bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-50 backdrop-blur sm:mb-7">
              <span className="truncate">Vortex Learning</span>
            </div>
            <h1 className="font-heading text-4xl font-semibold leading-[1.04] sm:text-6xl lg:text-[4.9rem]">
              Learn without limits
              <span className="block text-cyan-100">Every subject</span>
              <span className="block text-white">Every goal</span>
            </h1>
            <p className="mt-5 max-w-[640px] text-base leading-7 text-blue-50 sm:mt-7 sm:text-lg sm:leading-8">
              Vortex Learning brings courses, live classes, tutors, past papers,
              AI study support, parent visibility, and academic operations into
              one premium education ecosystem.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/courses" className="btn-primary h-[3.25rem] px-6 text-base">
                <BookOpen className="size-5" />
                Explore Courses
              </Link>
              <Link href="/consultation" className="btn-glass h-[3.25rem] px-6 text-base">
                <Calendar className="size-5" />
                Book Consultation
              </Link>
              <Link href="/consultation?goal=become-tutor" className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full px-2 text-sm font-semibold text-cyan-50 transition hover:text-white sm:px-4">
                <GraduationCap className="size-5" />
                Become a Tutor
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[520px] md:block lg:mx-0">
            <div className="rounded-[1.75rem] border border-white/20 bg-white/12 p-3 shadow-[0_35px_100px_rgba(0,0,0,0.24)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-[1.35rem] bg-[#071847]/94">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-[#47C8F2]" />
                    <span className="size-2.5 rounded-full bg-white/60" />
                    <span className="size-2.5 rounded-full bg-white/35" />
                  </div>
                  <span className="text-xs font-semibold text-cyan-100">Live Physics Studio</span>
                </div>
                <div className="grid gap-4 p-5 xl:grid-cols-[1.25fr_0.75fr]">
                  <div className="min-h-72 rounded-3xl bg-[linear-gradient(135deg,#091D53,#143A84_54%,#1E8ACB)] p-5">
                    <div className="flex items-center justify-between text-xs text-cyan-100">
                      <span>Cambridge 0625</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1">
                        <span className="size-2 rounded-full bg-[#47C8F2]" />
                        Live
                      </span>
                    </div>
                    <div className="mt-20">
                      <p className="text-sm text-cyan-100">Topic</p>
                      <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-white xl:text-4xl">
                        Electricity, circuits, and exam reasoning
                      </h2>
                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-2">
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
                  <div className="grid gap-3">
                    {[
                      ["AI", "Summarize weak concepts"],
                      ["Goal", "42 minutes today"],
                      ["Parent", "Attendance synced"],
                      ["Tutor", "Homework reviewed"],
                    ].map(([label, text]) => (
                      <div key={label} className="rounded-2xl bg-white/[0.08] p-4">
                        <p className="text-xs font-semibold text-[#47C8F2]">{label}</p>
                        <p className="mt-2 text-sm leading-6 text-white">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/20 bg-white/12 p-4 backdrop-blur">
                  <p className="font-heading text-3xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs text-cyan-100">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Reveal className="relative z-10 -mt-10 px-4 sm:-mt-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <SearchConsole />
        </div>
      </Reveal>

      <Reveal className="section-wrap pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Find your path"
          title="Start by curriculum, subject, or learning goal"
          description="Vortex keeps discovery structured so visitors can move from a broad ambition to a precise course, tutor, resource, or exam plan."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {learningPaths.map((path, index) => (
            <div
              key={path.title}
              className="group rounded-3xl border border-vortex-border bg-white p-6 shadow-[0_18px_60px_rgba(9,29,83,0.07)] transition hover:-translate-y-1 hover:border-vortex-cyan/60"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
                  {(() => {
                    const Icon = pathIcons[index] ?? Library;
                    return <Icon className="size-5" />;
                  })()}
                </span>
                <ChevronRight className="size-5 text-vortex-cyan transition group-hover:translate-x-1" />
              </div>
              <h3 className="mt-6 font-heading text-3xl font-semibold text-vortex-navy">
                {path.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-vortex-muted">{path.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {path.items.slice(0, 5).map((item) => (
                  <Link
                    key={item}
                    href="/courses"
                    className="rounded-full border border-vortex-border bg-vortex-soft px-3 py-2 text-xs font-semibold text-vortex-slate transition hover:border-vortex-cyan hover:text-vortex-blue"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Featured learning"
            title="A catalog built for breadth without feeling like a marketplace"
            description="Explore live cohorts, recorded courses, hybrid bootcamps, revision programs, mock exams, assignments, topic practice, and resource hubs."
          />
          <div className="flex gap-2 overflow-x-auto rounded-full border border-vortex-border bg-white p-2 shadow-sm">
            {discoveryTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-vortex-navy text-white shadow-[0_12px_30px_rgba(9,29,83,0.2)]"
                    : "text-vortex-slate hover:bg-vortex-soft hover:text-vortex-navy"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {selectedCourses.map((course) => (
            <CourseCard key={course!.slug} course={course!} />
          ))}
        </div>
      </Reveal>

      <Reveal className="section-wrap pt-0">
        <div className="rounded-[2rem] border border-vortex-border bg-white p-7 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow="Accelerated Learning Programs"
              title="Fast, guided routes for urgent goals"
              description="Structured intensive programs for exam rescue, crash revision, entry tests, language goals, and professional skill sprints."
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {["Exam Rescue", "30-Day Revision", "Entry Test Sprint"].map((item) => (
                <Link
                  key={item}
                  href="/courses"
                  className="rounded-2xl border border-vortex-border bg-vortex-soft p-4 text-sm font-semibold text-vortex-navy transition hover:border-vortex-cyan hover:text-vortex-blue"
                >
                  {item}
                  <span className="mt-3 block text-xs font-medium text-vortex-muted">
                    Instructor help, live clinics, daily goals
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="bg-white py-14 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Subject explorer"
              title="A disciplined map for every major academic and skills track"
              description="Students can browse with intent, then drill into lessons, tutors, resources, practice, and exam preparation."
            />
            <div className="mt-8 rounded-3xl border border-vortex-border bg-vortex-soft p-6">
              <p className="text-sm font-semibold text-vortex-blue">{subject.cluster}</p>
              <h3 className="mt-2 font-heading text-4xl font-semibold text-vortex-navy">
                {subject.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-vortex-muted">{subject.description}</p>
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-4">
                <span className="text-sm font-semibold text-vortex-slate">{subject.count}</span>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-vortex-blue"
                >
                  Browse subject
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {subjects.slice(0, 10).map((item) => (
              <button
                key={item.title}
                type="button"
                onMouseEnter={() => setActiveSubject(item.title)}
                onFocus={() => setActiveSubject(item.title)}
                onClick={() => setActiveSubject(item.title)}
                className={`group min-h-32 rounded-2xl border p-4 text-left transition duration-300 hover:-translate-y-1 ${
                  activeSubject === item.title
                    ? "border-vortex-cyan bg-vortex-navy text-white shadow-[0_22px_70px_rgba(9,29,83,0.24)]"
                    : "border-vortex-border bg-white text-vortex-navy hover:border-vortex-cyan/70"
                }`}
              >
                <span
                  className={`grid size-9 place-items-center rounded-xl ${
                    activeSubject === item.title
                      ? "bg-white/15 text-cyan-100"
                      : "bg-vortex-blue/10 text-vortex-blue"
                  }`}
                >
                  <BookOpen className="size-4" />
                </span>
                <span className="mt-4 block text-base font-semibold">{item.title}</span>
                <span
                  className={`mt-2 block text-xs ${
                    activeSubject === item.title ? "text-cyan-100" : "text-vortex-muted"
                  }`}
                >
                  {item.cluster}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section-wrap">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-vortex-border bg-white shadow-[0_24px_90px_rgba(9,29,83,0.1)] sm:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=75"
              alt="Educators and students collaborating around laptops"
              fill
              unoptimized
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(9,29,83,0.92),rgba(9,29,83,0)_100%)] p-5 text-white sm:p-8">
              <p className="text-sm font-semibold text-cyan-100">Meet the instructors</p>
              <h2 className="mt-3 max-w-2xl font-heading text-4xl font-semibold leading-tight">
                Expert teachers, visible credentials, consultable schedules
              </h2>
            </div>
          </div>
          <div className="grid gap-4">
            {instructors.map((instructor) => (
              <Link
                key={instructor.name}
                href="/team#instructors"
                className="group grid grid-cols-[auto_1fr] items-center gap-4 rounded-3xl border border-vortex-border bg-white p-4 transition hover:-translate-y-1 hover:border-vortex-cyan/60 hover:shadow-[0_18px_70px_rgba(9,29,83,0.1)] sm:grid-cols-[auto_1fr_auto]"
              >
                <span className="grid size-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,#091D53,#1E8ACB)] text-sm font-semibold text-white shadow-sm">
                  {initials(instructor.name)}
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-vortex-navy">{instructor.name}</span>
                  <span className="mt-1 block text-sm text-vortex-muted">{instructor.role}</span>
                  <span className="mt-2 flex flex-wrap gap-2">
                    {instructor.subjects.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-vortex-soft px-2 py-1 text-[0.7rem] font-semibold text-vortex-blue">
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
                <ArrowRight className="hidden size-5 text-vortex-cyan transition group-hover:translate-x-1 sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="bg-vortex-navy py-14 text-white sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="See the platform"
              title="Every role gets a focused workspace"
              description="The same ecosystem supports students, parents, teachers, administrators, and developers without turning the homepage into an admin dashboard."
              tone="dark"
            />
            <div className="flex flex-wrap gap-2">
              {platformRoles.map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => setActiveRole(item.role)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeRole === item.role
                      ? "bg-white text-vortex-navy"
                      : "border border-white/20 bg-white/8 text-cyan-50 hover:bg-white/14"
                  }`}
                >
                  {item.role}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-white/15 bg-white/8 p-5 sm:p-8">
              <p className="text-sm font-semibold text-[#47C8F2]">{role.role} workspace</p>
              <h3 className="mt-3 font-heading text-5xl font-semibold leading-tight text-white">
                {role.title}
              </h3>
              <div className="mt-7 grid gap-3">
                {role.points.map((point) => (
                  <div key={point} className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-3">
                    <CheckCircle2 className="size-5 text-[#47C8F2]" />
                    <span className="text-sm text-cyan-50">{point}</span>
                  </div>
                ))}
              </div>
              <Link href={role.href} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#47C8F2]">
                Open preview
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-[#06163f] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.22)]">
              <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
                <div className="rounded-3xl bg-white/8 p-4">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="rounded-2xl bg-white p-2">
                      <VortexLogo compact />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">Vortex OS</p>
                      <p className="text-xs text-cyan-100">Role preview</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {["Overview", "Courses", "Calendar", "Messages", "Settings"].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-2xl px-3 py-3 text-sm ${
                          index === 0 ? "bg-white text-vortex-navy" : "text-cyan-50"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-3xl bg-white p-5 text-vortex-navy">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{role.role} Intelligence</p>
                      <LineChart className="size-5 text-vortex-blue" />
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {["Progress", "Attendance", "Goals"].map((item, index) => (
                        <div key={item} className="rounded-2xl bg-vortex-soft p-4">
                          <p className="text-xs font-semibold text-vortex-muted">{item}</p>
                          <p className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">
                            {[82, 94, 7][index]}%
                          </p>
                          <p className="mt-1 text-[0.7rem] text-vortex-muted">visible after sign-in</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white/8 p-5">
                      <Bot className="size-5 text-[#47C8F2]" />
                      <p className="mt-4 text-sm font-semibold text-white">AI plan updated</p>
                      <p className="mt-2 text-xs leading-6 text-cyan-100">Revision sprint adjusted around weak topics and live lesson reminders.</p>
                    </div>
                    <div className="rounded-3xl bg-white/8 p-5">
                      <MessageSquare className="size-5 text-[#47C8F2]" />
                      <p className="mt-4 text-sm font-semibold text-white">Discussion active</p>
                      <p className="mt-2 text-xs leading-6 text-cyan-100">Teacher notes, peer questions, and support escalation in one thread.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="px-4 pb-16 sm:px-8 sm:pb-24">
        <div className="mx-auto overflow-hidden rounded-[2rem] bg-vortex-gradient p-5 text-white shadow-[0_30px_100px_rgba(9,29,83,0.25)] sm:p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-cyan-100">Learn Without Limits.</p>
              <h2 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-tight sm:text-6xl">
                Build a serious learning journey with Vortex Learning
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50">
                Explore courses, book guidance, or start the instructor application pathway.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/courses" className="btn-white h-12 px-5">
                <BookOpen className="size-5" />
                Explore Courses
              </Link>
              <Link href="/consultation" className="btn-glass h-12 px-5">
                <Calendar className="size-5" />
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
