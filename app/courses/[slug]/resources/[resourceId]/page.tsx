import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Banknote, Download, FileText, KeyRound, ShieldCheck } from "lucide-react";

import { LicenceKeyRedeemer } from "@/components/vortex/licence-key-redeemer";
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
    description: "Vortex Learning course resource access and download status.",
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
      <section className="page-hero page-hero-resource px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <ArrowLeft className="size-4" />
            Back to {course.title}
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-[#47C8F2]">Course resource</p>
              <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
                {resource.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-cyan-50">
                This material is listed for easy access. Viewing and downloading follow the course licence and admin download settings.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <div className="grid gap-3">
                {[
                  ["File", resource.fileName],
                  ["Type", resource.kind.toUpperCase()],
                  ["Size", resource.sizeLabel],
                  ["Downloads", resource.downloadable ? "Enabled" : "Controlled by admin"],
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
                <span className="text-sm font-semibold text-vortex-navy">Resource viewer</span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-vortex-soft px-3 py-1 text-xs font-semibold text-vortex-blue">
                <ShieldCheck className="size-3.5" />
                Access controlled
              </span>
            </div>
            <div className="grid min-h-[520px] place-items-center bg-[linear-gradient(135deg,#edf7ff,#ffffff)] p-8">
              <div className="max-w-md text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-vortex-gradient text-white">
                  <FileText className="size-7" />
                </span>
                <h2 className="mt-6 font-heading text-4xl font-semibold text-vortex-navy">
                  Resource ready for upload-backed viewing
                </h2>
                <p className="mt-3 text-sm leading-7 text-vortex-muted">
                  Once this file exists in Supabase Storage and the licence key is accepted, this area becomes the reading view. Downloading appears only when admin enables it for this material.
                </p>
                <div className="mt-5 rounded-2xl border border-vortex-border bg-white px-4 py-3 text-left text-xs font-semibold text-vortex-muted">
                  Storage path: {resource.storagePath}
                </div>
                <button
                  type="button"
                  disabled
                  className="mt-4 inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-vortex-border bg-white px-5 text-sm font-semibold text-vortex-muted"
                >
                  <Download className="size-4" />
                  {resource.downloadable ? "Download after unlock" : "Download controlled by admin"}
                </button>
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
              <LicenceKeyRedeemer returnHref={`/courses/${course.slug}/resources/${resource.id}`} />
            </section>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
