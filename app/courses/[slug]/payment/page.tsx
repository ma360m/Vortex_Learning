import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Banknote, CheckCircle2, KeyRound, Mail, Phone, ShieldCheck, Upload } from "lucide-react";

import { SiteShell } from "@/components/vortex/site-shell";
import { courses, getCourseBySlug } from "@/lib/vortex-data";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  return {
    title: course ? `${course.title} Payment` : "Course Payment",
    description: "Bank transfer payment slip upload and licence-key access for Vortex Learning courses.",
  };
}

export default async function CoursePaymentPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ done?: string }>;
}) {
  const { slug } = await params;
  const { done } = await searchParams;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <ArrowLeft className="size-4" />
            Back to course
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-[#47C8F2]">Bank transfer access</p>
              <h1 className="mt-4 max-w-4xl font-heading text-6xl font-semibold leading-tight">
                Register, upload payment slip, unlock with licence key.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-cyan-50">
                {course.title} includes {course.freeModuleCount ?? 3} free preview modules. Full modules, resources, instructor help, and certificate work unlock after admin verification.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <div className="grid gap-3">
                {[
                  [Mail, "Registration email", "Sent from support@vortexelearning.com"],
                  [Upload, "Payment slip", "Upload proof of bank transfer"],
                  [ShieldCheck, "Admin approval", "Payment is verified in admin panel"],
                  [KeyRound, "Licence key", "Sent from noreply@vortexelearning.com"],
                ].map(([Icon, title, text]) => (
                  <div key={title as string} className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl bg-white/10 p-4">
                    <Icon className="size-5 text-[#47C8F2]" />
                    <span>
                      <span className="block text-sm font-semibold text-white">{title as string}</span>
                      <span className="mt-1 block text-xs text-cyan-100">{text as string}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        {done && (
          <div className="mb-6 rounded-2xl border border-vortex-border bg-white p-4 text-sm font-semibold text-vortex-blue shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
            Request received. The backend flow queues the payment email and waits for admin verification.
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <form action="/api/vortex/student-actions" method="post" encType="multipart/form-data" className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
            <input type="hidden" name="intent" value="course-payment-register" />
            <input type="hidden" name="returnTo" value={`/courses/${course.slug}/payment`} />
            <input type="hidden" name="course_slug" value={course.slug} />
            <div className="flex items-center gap-3">
              <Banknote className="size-6 text-vortex-blue" />
              <h2 className="font-heading text-4xl font-semibold text-vortex-navy">Payment registration</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
                Full name
                <input name="full_name" required className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder="Student name" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
                Email address
                <input name="email" type="email" required className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder="Registered email" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
                Phone number
                <input name="phone" className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder="+92..." />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
                Course
                <input readOnly value={course.title} className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm text-vortex-muted outline-none" />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-vortex-navy">
              Payment slip
              <input name="payment_slip" type="file" accept="image/*,.pdf" className="rounded-2xl border border-dashed border-vortex-border bg-vortex-soft px-4 py-4 text-sm outline-none" />
            </label>
            <textarea name="notes" className="mt-4 min-h-28 w-full rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm outline-none" placeholder="Optional payment reference, bank name, or message for admin." />
            <button type="submit" className="btn-primary mt-5 h-12 px-5">
              Submit registration
              <Upload className="size-4" />
            </button>
          </form>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-vortex-border bg-vortex-soft p-6">
              <div className="flex items-center gap-3">
                <KeyRound className="size-6 text-vortex-blue" />
                <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Redeem licence key</h2>
              </div>
              <form action="/api/vortex/student-actions" method="post" className="mt-5 grid gap-3">
                <input type="hidden" name="intent" value="student-unlock" />
                <input type="hidden" name="returnTo" value={`/player/${course.slug}`} />
                <input type="hidden" name="course_slug" value={course.slug} />
                <input name="licence_key" required className="h-12 rounded-2xl border border-vortex-border bg-white px-4 text-sm outline-none" placeholder="Enter licence key after admin approval" />
                <button type="submit" className="btn-primary h-12 px-5">
                  Unlock course
                  <CheckCircle2 className="size-4" />
                </button>
              </form>
            </section>

            <section className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
              <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Payment support</h2>
              <p className="mt-3 text-sm leading-7 text-vortex-muted">
                If bank transfer or slip upload gives an issue, contact Vortex support.
              </p>
              <div className="mt-5 grid gap-3">
                <a href="mailto:support@vortexelearning.com" className="rounded-2xl bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-blue">
                  support@vortexelearning.com
                </a>
                <a href="tel:+923244270697" className="inline-flex items-center gap-2 rounded-2xl bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-blue">
                  <Phone className="size-4" />
                  +92 324 4270697
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
