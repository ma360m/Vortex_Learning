import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

import { CourseCard } from "@/components/vortex/course-card";
import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { courses, instructors } from "@/lib/vortex-data";

const applicationSignals: Array<[LucideIcon, string]> = [
  [CheckCircle2, "Verified"],
  [Award, "Certified"],
  [Calendar, "Bookable"],
];

export const metadata = {
  title: "Instructors",
  description:
    "Explore Vortex Learning instructor profiles, courses, ratings, experience, biographies, subjects, availability, certificates, and consultation booking.",
};

export default function InstructorsPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Instructors</p>
            <h1 className="mt-4 max-w-4xl font-heading text-6xl font-semibold leading-tight">
              Teach with credibility, structure, and visibility.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              Instructor profiles connect qualifications, subjects, ratings,
              availability, courses, certificates, and consultation booking.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["4.9", "sample rating"],
              ["64", "sample teachers"],
              ["18", "sample subjects"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="font-heading text-4xl font-semibold">{value}</p>
                <p className="mt-1 text-xs text-cyan-100">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <SectionHeading
          eyebrow="Profiles"
          title="Qualified experts with course ownership and consultation paths."
          description="Each instructor profile is ready for biography, courses, ratings, experience, subjects, availability, certificates, and social links."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {instructors.map((instructor) => (
            <article key={instructor.name} className="grid overflow-hidden rounded-[2rem] border border-vortex-border bg-white shadow-[0_18px_70px_rgba(9,29,83,0.08)] sm:grid-cols-[240px_1fr]">
              <div className="relative min-h-72 sm:min-h-full">
                <Image
                  src={instructor.photo}
                  alt={instructor.name}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {instructor.subjects.map((subject) => (
                    <span key={subject} className="rounded-full bg-vortex-soft px-3 py-1 text-xs font-semibold text-vortex-blue">
                      {subject}
                    </span>
                  ))}
                </div>
                <h2 className="mt-5 font-heading text-4xl font-semibold text-vortex-navy">
                  {instructor.name}
                </h2>
                <p className="mt-2 text-sm font-semibold text-vortex-slate">{instructor.role}</p>
                <p className="mt-4 text-sm leading-7 text-vortex-muted">{instructor.bio}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {([
                    [Star, instructor.rating],
                    [Users, instructor.experience],
                    [GraduationCap, instructor.qualification],
                    [Calendar, instructor.availability],
                  ] as Array<[LucideIcon, string]>).map(([Icon, value]) => (
                    <div key={value as string} className="flex items-center gap-3 rounded-2xl bg-vortex-soft p-3 text-sm font-semibold text-vortex-navy">
                      <Icon className="size-4 text-vortex-blue" />
                      {value as string}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/support#consultation" className="btn-primary h-11 px-4">
                    Book consultation
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link href="/courses" className="btn-secondary h-11 px-4">
                    View courses
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Instructor courses"
            title="Programs connected directly to expert teaching."
            description="Course ownership, quality review, live support, and certificate requirements can all map back to instructor profiles."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="section-wrap">
        <div className="rounded-[2rem] bg-vortex-gradient p-8 text-white shadow-[0_30px_100px_rgba(9,29,83,0.25)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-cyan-100">Instructor application</p>
              <h2 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-tight">
                Bring your subject expertise into a premium learning ecosystem.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {applicationSignals.map(([Icon, label]) => (
                <div key={label} className="rounded-2xl bg-white/12 p-4 text-center">
                  <Icon className="mx-auto size-5 text-[#47C8F2]" />
                  <p className="mt-3 text-sm font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
