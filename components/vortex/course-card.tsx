import Link from "next/link";
import { ArrowRight, Calendar, Clock, GraduationCap, Star } from "lucide-react";

import type { Course } from "@/lib/vortex-data";

export function CourseCard({ course, featured = false }: { course: Course; featured?: boolean }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-vortex-border bg-white shadow-[0_18px_60px_rgba(9,29,83,0.08)] transition duration-300 hover:-translate-y-1 hover:border-vortex-cyan/60 hover:shadow-[0_28px_90px_rgba(9,29,83,0.14)] ${
        featured ? "lg:grid lg:grid-cols-[0.9fr_1.1fr]" : ""
      }`}
    >
      <div className="relative min-h-48 overflow-hidden bg-vortex-gradient">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0)_54%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="text-xs font-semibold uppercase opacity-80">{course.eyebrow}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 backdrop-blur">
              {course.mode}
            </span>
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 backdrop-blur">
              {course.board}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-vortex-border bg-vortex-soft px-3 py-1 text-xs font-semibold text-vortex-blue"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight text-vortex-navy">
          {course.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-vortex-muted">
          {course.description}
        </p>
        <div className="mt-6 grid gap-3 text-sm text-vortex-slate sm:grid-cols-2">
          <span className="inline-flex items-center gap-2">
            <GraduationCap className="size-4 text-vortex-blue" />
            {course.level}
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
            {course.rating}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-8">
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
