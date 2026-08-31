import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, KeyRound, Mail, ShieldCheck, Upload } from "lucide-react";

import { CoursePaymentAccess } from "@/components/vortex/course-payment-access";
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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    redirect(`/coming-soon?feature=${slug}-payment`);
  }

  return (
    <SiteShell>
      <section className="page-hero page-hero-payment px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <ArrowLeft className="size-4" />
            Back to course
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-[#47C8F2]">Bank transfer access</p>
              <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
                Register, upload payment slip, unlock with licence key
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
        <CoursePaymentAccess courseSlug={course.slug} courseTitle={course.title} />
      </section>
    </SiteShell>
  );
}
