import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Sparkles } from "lucide-react";

const buildQueue = [
  "Blog article detail pages",
  "Instructor profile detail pages",
  "Community forums and study groups",
  "Past-paper and study-note libraries",
  "Certificate verification",
  "Student quizzes, assignments, discussions, and payments",
  "Instructor quiz, resource, certificate, and analytics tools",
  "Admin blogs, emails, certificates, coupons, analytics, logs, and tutor requests",
];

export function ComingSoonContent({ feature }: { feature?: string }) {
  const label = feature
    ? feature
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "This page";

  return (
    <section className="section-wrap">
      <div className="overflow-hidden rounded-[2rem] border border-vortex-border bg-white shadow-[0_24px_90px_rgba(9,29,83,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="page-hero page-hero-dashboard p-6 text-white sm:p-10 lg:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-xs font-semibold text-cyan-50">
              <Sparkles className="size-3.5 text-[#47C8F2]" />
              Planned platform area
            </div>
            <h1 className="mt-8 font-heading text-4xl font-semibold leading-tight sm:text-6xl">
              {label} is coming soon
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              This part of Vortex Learning is reserved for a finished, production-quality experience. For now, continue through the working catalog, support, sign-in, and dashboard flows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/courses" className="btn-white h-12 px-5">
                <BookOpen className="size-5" />
                Open Course Catalog
              </Link>
              <a href="mailto:support@vortexelearning.com" className="text-sm font-semibold text-cyan-50 transition hover:text-white">
                support@vortexelearning.com
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-vortex-soft text-vortex-blue">
                <FileText className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-vortex-blue">Build List</p>
                <h2 className="font-heading text-3xl font-semibold text-vortex-navy">
                  Pages still to finish
                </h2>
              </div>
            </div>
            <div className="mt-7 grid gap-3">
              {buildQueue.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3"
                >
                  <span className="text-sm font-semibold text-vortex-slate">{item}</span>
                  <ArrowRight className="size-4 shrink-0 text-vortex-cyan" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
