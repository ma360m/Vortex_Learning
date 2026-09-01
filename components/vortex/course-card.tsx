import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, GraduationCap, Star } from "lucide-react";

import type { Course } from "@/lib/vortex-data";

export function CourseCard({ course, featured = false }: { course: Course; featured?: boolean }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-vortex-border bg-white shadow-[0_12px_36px_rgba(9,29,83,0.06)] transition duration-300 hover:-translate-y-1 hover:border-vortex-cyan/60 hover:shadow-[0_22px_65px_rgba(9,29,83,0.1)] ${
        featured ? "lg:grid lg:grid-cols-[0.9fr_1.1fr]" : ""
      }`}
    >
      <div className="h-1 bg-vortex-gradient" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-vortex-soft text-vortex-blue">
            <GraduationCap className="size-5" />
          </span>
          <span className="rounded-full border border-vortex-border bg-white px-3 py-1 text-xs font-semibold text-vortex-blue">
            {course.mode}
          </span>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase text-vortex-blue">{course.eyebrow}</p>
        <div className="flex flex-wrap gap-2">
          {course.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-vortex-border bg-vortex-soft px-3 py-1 text-xs font-semibold text-vortex-blue"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-5 line-clamp-2 font-heading text-2xl font-semibold leading-tight text-vortex-navy">
          {course.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-vortex-muted">
          {course.description}
        </p>
        <div className="mt-5 grid gap-3 text-sm text-vortex-slate sm:grid-cols-2">
          <span className="inline-flex items-center gap-2">
            <BookOpen className="size-4 text-vortex-blue" />
            {course.subject}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-4 text-vortex-blue" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-2">
            <Calendar className="size-4 text-vortex-blue" />
            {course.lessons} lessons
          </span>
          <span className="inline-flex items-center gap-2">
            <Star className="size-4 text-vortex-blue" />
            {course.level}
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-semibold text-vortex-navy">{course.instructor}</span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-vortex-blue">
            View course
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
