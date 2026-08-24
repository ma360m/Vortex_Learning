"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Library,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";

import type { Course } from "@/lib/vortex-data";
import { CourseCard } from "./course-card";

type SortMode = "recommended" | "title" | "lessons";

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function includesText(value: string, query: string) {
  return value.toLowerCase().includes(query.toLowerCase());
}

function hasAcceleratedSignal(course: Course) {
  const text = `${course.title} ${course.category} ${course.tags.join(" ")}`.toLowerCase();
  return text.includes("accelerated") || text.includes("crash") || text.includes("entry");
}

export function CourseCatalog({ courses }: { courses: Course[] }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("All");
  const [subject, setSubject] = useState("All");
  const [board, setBoard] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortMode, setSortMode] = useState<SortMode>("recommended");

  const modes = useMemo(() => unique(courses.map((course) => course.mode)), [courses]);
  const subjects = useMemo(() => unique(courses.map((course) => course.subject)), [courses]);
  const boards = useMemo(() => unique(courses.map((course) => course.board)), [courses]);
  const categories = useMemo(() => unique(courses.map((course) => course.category)), [courses]);
  const acceleratedCourses = useMemo(
    () => courses.filter(hasAcceleratedSignal).slice(0, 3),
    [courses],
  );
  const filterGroups: Array<[string, string, (next: string) => void, string[]]> = [
    ["Course type", mode, setMode, modes],
    ["Subject", subject, setSubject, subjects],
    ["Curriculum", board, setBoard, boards],
    ["Category", category, setCategory, categories],
  ];
  const catalogHighlights: Array<[LucideIcon, string, string]> = [
    [Library, "Curriculum paths", "FSc, Matric, O Level, A Level, IGCSE, GCSE, Edexcel, Cambridge."],
    [Video, "Live and hybrid", "Cohorts, Zoom or Google Meet, attendance, teacher notes, and reminders."],
    [BookOpen, "Self paced", "Free preview modules, locked resources, progress, bookmarks, and goals."],
    [GraduationCap, "Exam outcomes", "Past papers, topic practice, mock exams, assignments, and certificate rules."],
  ];

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = courses.filter((course) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          course.title,
          course.description,
          course.subject,
          course.board,
          course.category,
          course.level,
          course.instructor,
          ...course.tags,
        ].some((value) => includesText(value, normalizedQuery));

      return (
        matchesQuery &&
        (mode === "All" || course.mode === mode) &&
        (subject === "All" || course.subject === subject) &&
        (board === "All" || course.board === board) &&
        (category === "All" || course.category === category)
      );
    });

    return result.sort((a, b) => {
      if (sortMode === "title") return a.title.localeCompare(b.title);
      if (sortMode === "lessons") return b.lessons - a.lessons;
      return Number(hasAcceleratedSignal(b)) - Number(hasAcceleratedSignal(a));
    });
  }, [board, category, courses, mode, query, sortMode, subject]);

  const activeFilterCount = [mode, subject, board, category].filter((value) => value !== "All").length;

  function resetFilters() {
    setQuery("");
    setMode("All");
    setSubject("All");
    setBoard("All");
    setCategory("All");
    setSortMode("recommended");
  }

  return (
    <section id="catalog" className="section-wrap scroll-mt-28 pt-10 sm:pt-14">
      <div className="rounded-[1.75rem] border border-vortex-border bg-white p-4 shadow-[0_18px_70px_rgba(9,29,83,0.07)] sm:p-6">
        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr] xl:items-end">
          <div>
            <p className="text-xs font-semibold uppercase text-vortex-blue">Explore courses</p>
            <h2 className="mt-2 font-heading text-4xl font-semibold text-vortex-navy">
              {filteredCourses.length} course{filteredCourses.length === 1 ? "" : "s"} found
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-vortex-muted">
              Search and filter by course type, subject, curriculum, and learning goal.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <label className="flex h-12 items-center gap-3 rounded-2xl border border-vortex-border bg-vortex-soft px-4">
              <Search className="size-4 shrink-0 text-vortex-blue" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-vortex-muted"
                placeholder="Search subject, exam, tutor, resource"
              />
            </label>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-vortex-border bg-white px-4 text-xs font-semibold text-vortex-navy transition hover:border-vortex-cyan"
            >
              <RotateCcw className="size-4 text-vortex-blue" />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {filterGroups.map(([label, value, setter, options]) => (
            <label key={label} className="grid gap-2 text-xs font-semibold uppercase text-vortex-blue">
              {label}
              <select
                value={value}
                onChange={(event) => setter(event.target.value)}
                className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm font-semibold normal-case text-vortex-navy outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
              >
                <option>All</option>
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}

          <label className="grid gap-2 text-xs font-semibold uppercase text-vortex-blue">
            Sort
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm font-semibold normal-case text-vortex-navy outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
            >
              <option value="recommended">Recommended</option>
              <option value="title">A to Z</option>
              <option value="lessons">Most lessons</option>
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["All", "Live", "Self paced", "Hybrid", "Bootcamp"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`h-10 rounded-full px-4 text-sm font-semibold transition ${
                mode === item
                  ? "bg-vortex-navy text-white"
                  : "border border-vortex-border bg-white text-vortex-slate hover:border-vortex-cyan"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {activeFilterCount > 0 || query ? (
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-vortex-blue">
            <SlidersHorizontal className="size-4" />
            {query ? <span className="rounded-full bg-vortex-soft px-3 py-1">Search: {query}</span> : null}
            {[mode, subject, board, category].filter((value) => value !== "All").map((value) => (
              <span key={value} className="rounded-full bg-vortex-soft px-3 py-1">{value}</span>
            ))}
          </div>
        ) : null}
      </div>

      {acceleratedCourses.length > 0 ? (
        <div className="mt-6 rounded-[1.75rem] border border-vortex-border bg-vortex-soft p-4 sm:p-5">
          <div className="grid gap-5 lg:grid-cols-[0.55fr_1.45fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-vortex-gradient text-white">
                  <Sparkles className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase text-vortex-blue">Catalog focus</p>
                  <h3 className="font-heading text-3xl font-semibold text-vortex-navy">
                    Accelerated Learning
                  </h3>
                </div>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-7 text-vortex-muted">
                Short guided programs for crash revision, entry tests, exam rescue, and focused skill sprints.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {acceleratedCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group grid min-h-28 rounded-2xl bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_14px_45px_rgba(9,29,83,0.08)]"
                >
                  <span className="text-sm font-semibold leading-5 text-vortex-navy">{course.title}</span>
                  <span className="mt-2 text-xs text-vortex-muted">{course.mode} - {course.duration}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-vortex-blue">
                    View program
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 ? (
        <div className="mt-6 rounded-[1.5rem] border border-vortex-border bg-white p-8 text-center shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <Search className="mx-auto size-6 text-vortex-blue" />
          <h3 className="mt-4 font-heading text-3xl font-semibold text-vortex-navy">No courses found</h3>
          <p className="mt-2 text-sm text-vortex-muted">Try a broader subject, curriculum, or course type.</p>
          <button type="button" onClick={resetFilters} className="btn-primary mt-5 h-11 px-5">
            Reset catalog
          </button>
        </div>
      ) : null}

      <div className="mt-10 grid gap-5 lg:grid-cols-4">
        {catalogHighlights.map(([Icon, title, text]) => (
          <div key={title} className="rounded-[1.25rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            <Icon className="size-5 text-vortex-blue" />
            <h3 className="mt-4 text-sm font-semibold text-vortex-navy">{title}</h3>
            <p className="mt-2 text-xs leading-6 text-vortex-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
