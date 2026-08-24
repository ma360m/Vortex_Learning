import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";

import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { instructors, team } from "@/lib/vortex-data";

const teamPhotos = [
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=720&q=75",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=720&q=75",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=720&q=75",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=720&q=75",
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=720&q=75",
  "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=720&q=75",
];

export const metadata = {
  title: "Our Team",
  description:
    "Meet the Vortex Learning leadership, instructors, support team, developers, marketing team, and advisors.",
};

export default function TeamPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-[#47C8F2]">Our team</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight sm:text-6xl">
            Teachers, advisors, and operators behind Vortex Learning.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
            Leadership, teachers, support, developers, marketing, and academic advisors working around one standard: serious students deserve serious systems.
          </p>
        </div>
      </section>

      <section id="instructors" className="section-wrap scroll-mt-28">
        <SectionHeading
          eyebrow="Instructors"
          title="Qualified experts with course ownership and consultation paths."
          description="Instructor profiles connect qualifications, subjects, ratings, experience, biographies, availability, certificates, and consultation booking."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {instructors.map((instructor) => (
            <article
              key={instructor.name}
              className="grid rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)] sm:grid-cols-[auto_1fr] sm:items-center"
            >
              <div className="relative mx-auto size-36 overflow-hidden rounded-full border-4 border-white bg-vortex-soft shadow-[0_16px_45px_rgba(9,29,83,0.16)] ring-1 ring-vortex-border sm:mx-0">
                <Image
                  src={instructor.photo}
                  alt={instructor.name}
                  fill
                  unoptimized
                  sizes="144px"
                  className="object-cover"
                />
              </div>
              <div className="mt-5 text-center sm:mt-0 sm:pl-6 sm:text-left">
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  {instructor.subjects.map((subject) => (
                    <span key={subject} className="rounded-full bg-vortex-soft px-3 py-1 text-xs font-semibold text-vortex-blue">
                      {subject}
                    </span>
                  ))}
                </div>
                <h2 className="mt-5 font-heading text-3xl font-semibold text-vortex-navy">
                  {instructor.name}
                </h2>
                <p className="mt-2 text-sm font-semibold text-vortex-slate">{instructor.role}</p>
                <p className="mt-4 text-sm leading-7 text-vortex-muted">{instructor.bio}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Rating", instructor.rating],
                    ["Experience", instructor.experience],
                    ["Qualification", instructor.qualification],
                    ["Availability", instructor.availability],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-vortex-soft p-3 text-sm">
                      <p className="text-xs font-semibold text-vortex-muted">{label}</p>
                      <p className="mt-1 font-semibold text-vortex-navy">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/consultation" className="btn-primary h-11 px-4">
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

      <section className="section-wrap">
        <SectionHeading
          eyebrow="Organization"
          title="Clear roles, visible experience, and trusted accountability."
          description="Profiles are structured for qualifications, responsibilities, social links, and the operating team behind the platform."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {team.map((person, index) => (
            <article
              key={person.name}
              className="rounded-[1.75rem] border border-vortex-border bg-white p-6 text-center shadow-[0_18px_70px_rgba(9,29,83,0.07)] transition hover:-translate-y-1 hover:border-vortex-cyan/50"
            >
              <div className="relative mx-auto size-28 overflow-hidden rounded-full border-4 border-white bg-vortex-soft shadow-[0_16px_45px_rgba(9,29,83,0.16)] ring-1 ring-vortex-border">
                <Image
                  src={teamPhotos[index]}
                  alt={person.name}
                  fill
                  unoptimized
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <span className="mx-auto mt-5 inline-flex rounded-full bg-vortex-soft px-3 py-1 text-xs font-semibold text-vortex-blue">
                {person.group}
              </span>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-vortex-navy">
                {person.name}
              </h2>
              <p className="mt-2 text-sm font-semibold text-vortex-slate">{person.role}</p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-vortex-muted">
                {person.experience}
              </p>
              <p className="mt-2 text-sm font-semibold text-vortex-navy">
                {person.qualification}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-vortex-border px-3 py-2 text-xs font-semibold text-vortex-slate">
                  <ShieldCheck className="size-3.5 text-vortex-blue" />
                  Verified
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-vortex-border px-3 py-2 text-xs font-semibold text-vortex-slate">
                  <Users className="size-3.5 text-vortex-blue" />
                  Vortex team
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="apply" className="section-wrap scroll-mt-28 pt-0">
        <div className="rounded-[2rem] border border-vortex-border bg-white p-8 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-vortex-blue">Join the academic network</p>
              <h2 className="mt-3 font-heading text-5xl font-semibold text-vortex-navy">
                Build courses, advise students, or support operations.
              </h2>
            </div>
            <Link href="/team#apply" className="btn-primary h-12 px-5">
              Become an Instructor
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
