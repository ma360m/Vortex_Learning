import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  GraduationCap,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

import { CourseCatalog } from "@/components/vortex/course-catalog";
import { SiteShell } from "@/components/vortex/site-shell";
import { courses } from "@/lib/vortex-data";

const catalogStats: Array<[LucideIcon, string, string]> = [
  [BookOpen, `${courses.length} courses`, "Linked to course detail pages"],
  [GraduationCap, "3 free modules", "Preview-first course access"],
  [Calendar, "Live + self paced", "Cohorts, bootcamps, and recordings"],
  [KeyRound, "Licence key", "Unlock after payment approval"],
];

const catalogRoutes = [
  ["Curriculum", "/courses?board=FSc#catalog"],
  ["Subject", "/courses?subject=Physics#catalog"],
  ["Live classes", "/courses?mode=Live#catalog"],
  ["Accelerated", "/courses?query=accelerated#catalog"],
  ["Past papers", "/courses?query=past%20paper#catalog"],
  ["Self paced", "/courses?mode=Self%20paced#catalog"],
];

export const metadata = {
  title: "Courses",
  description:
    "Explore Vortex Learning courses across O Level, A Level, IGCSE, FSc, Matric, SAT, IELTS, AI, programming, business, science, and more.",
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function sortParam(value: string | string[] | undefined): "recommended" | "title" | "lessons" {
  const next = firstParam(value);
  return next === "title" || next === "lessons" ? next : "recommended";
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string | string[];
    mode?: string | string[];
    subject?: string | string[];
    board?: string | string[];
    category?: string | string[];
    sort?: string | string[];
  }>;
}) {
  const filters = await searchParams;
  const initialFilters = {
    query: firstParam(filters.query) ?? "",
    mode: firstParam(filters.mode) ?? "All",
    subject: firstParam(filters.subject) ?? "All",
    board: firstParam(filters.board) ?? "All",
    category: firstParam(filters.category) ?? "All",
    sort: sortParam(filters.sort),
  };
  const catalogKey = [
    initialFilters.query,
    initialFilters.mode,
    initialFilters.subject,
    initialFilters.board,
    initialFilters.category,
    initialFilters.sort,
  ].join("|");

  return (
    <SiteShell>
      <section className="page-hero page-hero-courses px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Course catalog</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight sm:text-6xl">
              Find the right course without searching through noise
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              Browse Vortex Learning by curriculum, subject, course type, and academic goal. Every course page connects preview modules, locked resources, instructor help, payment verification, and certificates.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#catalog" className="btn-white h-12 px-5">
                Explore catalog
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/consultation" className="btn-glass h-12 px-5">
                Book guidance
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/18 bg-white/12 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-cyan-100">Catalog map</p>
                <h2 className="mt-2 font-heading text-3xl font-semibold">Choose by route, not by noise</h2>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/18 bg-white/12 px-3 py-1.5 text-xs font-semibold text-cyan-50">
                <CheckCircle2 className="size-3.5 text-[#47C8F2]" />
                Live catalog
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {catalogStats.map(([Icon, value, label]) => (
                <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                  <Icon className="size-4 text-[#47C8F2]" />
                  <p className="mt-3 font-heading text-3xl font-semibold">{value}</p>
                  <p className="mt-1 text-[0.7rem] leading-4 text-cyan-100">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/14 bg-[#071847]/35 p-4">
              <p className="text-xs font-semibold uppercase text-cyan-100">Fast routes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {catalogRoutes.map(([route, href]) => (
                  <Link
                    key={route}
                    href={href}
                    className="rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-[#47C8F2]/70 hover:bg-white/16"
                  >
                    {route}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CourseCatalog key={catalogKey} courses={courses} initialFilters={initialFilters} />

      <section className="section-wrap pt-0">
        <div className="grid gap-6 rounded-[2rem] border border-vortex-border bg-white p-7 shadow-[0_18px_70px_rgba(9,29,83,0.08)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-vortex-blue">Questions about access?</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">
              Course access, live learning, bank transfer, and support are explained in FAQs
            </h2>
          </div>
          <Link href="/faqs" className="btn-primary h-11 px-5">
            Open FAQs
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
