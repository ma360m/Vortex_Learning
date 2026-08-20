import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Banknote, FileText, KeyRound, Lock, ShieldCheck } from "lucide-react";

import { SiteShell } from "@/components/vortex/site-shell";
import { courses, getCourseBySlug } from "@/lib/vortex-data";

export function generateStaticParams() {
  return courses.flatMap((course) =>
    (course.resourceFiles ?? []).map((resource) => ({
      slug: course.slug,
      resourceId: resource.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; resourceId: string }>;
}) {
  const { slug, resourceId } = await params;
  const course = getCourseBySlug(slug);
  const resource = course?.resourceFiles?.find((item) => item.id === resourceId);

  return {
    title: resource ? `${resource.title} Resource` : "Course Resource",
    description: "Protected Vortex Learning course resource gate.",
  };
}

export default async function CourseResourcePage({
  params,
}: {
  params: Promise<{ slug: string; resourceId: string }>;
}) {
  const { slug, resourceId } = await params;
  const course = getCourseBySlug(slug);
  const resource = course?.resourceFiles?.find((item) => item.id === resourceId);

  if (!course || !resource) {
    redirect(`/coming-soon?feature=${slug}-${resourceId}-resource`);
  }

  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <ArrowLeft className="size-4" />
            Back to {course.title}
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-[#47C8F2]">Protected flipbook</p>
              <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
                {resource.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-cyan-50">
                This course material is locked until payment is verified and the licence key is redeemed by the student.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <div className="grid gap-3">
                {[
                  ["File", resource.fileName],
                  ["Type", resource.kind.toUpperCase()],
                  ["Size", resource.sizeLabel],
                  ["Downloads", resource.downloadable ? "Allowed by admin" : "Disabled by default"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                    <span className="text-sm text-cyan-100">{label}</span>
                    <span className="text-right text-sm font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] border border-vortex-border bg-white shadow-[0_22px_80px_rgba(9,29,83,0.1)]">
            <div className="flex items-center justify-between border-b border-vortex-border px-5 py-4">
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-vortex-blue" />
                <span className="text-sm font-semibold text-vortex-navy">Flipbook viewer</span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-vortex-soft px-3 py-1 text-xs font-semibold text-vortex-blue">
                <Lock className="size-3.5" />
                Locked
              </span>
            </div>
            <div className="grid min-h-[520px] place-items-center bg-[linear-gradient(135deg,#edf7ff,#ffffff)] p-8">
              <div className="max-w-md text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-vortex-gradient text-white">
                  <Lock className="size-7" />
                </span>
                <h2 className="mt-6 font-heading text-4xl font-semibold text-vortex-navy">
                  Resource locked
                </h2>
                <p className="mt-3 text-sm leading-7 text-vortex-muted">
                  Once the licence key is accepted, this area becomes the flipbook reading view. No download button is shown unless admin enables downloading for this material.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-vortex-border bg-vortex-soft p-6">
              <div className="flex items-center gap-3">
                <Banknote className="size-6 text-vortex-blue" />
                <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Need access?</h2>
              </div>
              <p className="mt-3 text-sm leading-7 text-vortex-muted">
                Register for bank transfer verification, upload your slip, and use the emailed licence key to unlock the course.
              </p>
              <Link href={`/courses/${course.slug}/payment`} className="btn-primary mt-5 h-11 px-5">
                Start payment flow
              </Link>
            </section>

            <section className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
              <div className="flex items-center gap-3">
                <KeyRound className="size-6 text-vortex-blue" />
                <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Licence key</h2>
              </div>
              <form action="/api/vortex/student-actions" method="post" className="mt-5 grid gap-3">
                <input type="hidden" name="intent" value="student-unlock" />
                <input type="hidden" name="returnTo" value={`/courses/${course.slug}/resources/${resource.id}`} />
                <input type="hidden" name="course_slug" value={course.slug} />
                <input name="licence_key" required className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder="Enter licence key" />
                <button type="submit" className="btn-primary h-12 px-5">
                  Verify key
                  <ShieldCheck className="size-4" />
                </button>
              </form>
            </section>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
