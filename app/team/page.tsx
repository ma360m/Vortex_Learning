import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck, Users } from "lucide-react";

import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { team } from "@/lib/vortex-data";

const teamPhotos = [
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=720&q=75",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=720&q=75",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=720&q=75",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=720&q=75",
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=720&q=75",
  "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=720&q=75",
];

export const metadata = {
  title: "Team",
  description:
    "Meet the Vortex Learning leadership, teachers, support team, developers, marketing team, and advisors.",
};

export default function TeamPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-[#47C8F2]">Team</p>
          <h1 className="mt-4 max-w-4xl font-heading text-6xl font-semibold leading-tight">
            The people behind the learning operating system.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
            Leadership, teachers, support, developers, marketing, and academic advisors working around one standard: serious students deserve serious systems.
          </p>
        </div>
      </section>

      <section className="section-wrap">
        <SectionHeading
          eyebrow="Organization"
          title="Clear roles, visible experience, and trusted accountability."
          description="Profiles are structured for qualifications, responsibilities, social links, and the operating team behind the platform."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {team.map((person, index) => (
            <article key={person.name} className="overflow-hidden rounded-3xl border border-vortex-border bg-white shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
              <div className="relative h-72">
                <Image
                  src={teamPhotos[index]}
                  alt={person.name}
                  fill
                  unoptimized
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-vortex-soft px-3 py-1 text-xs font-semibold text-vortex-blue">
                    {person.group}
                  </span>
                  <ExternalLink className="size-4 text-vortex-cyan" />
                </div>
                <h2 className="mt-5 font-heading text-3xl font-semibold text-vortex-navy">
                  {person.name}
                </h2>
                <p className="mt-2 text-sm font-semibold text-vortex-slate">{person.role}</p>
                <p className="mt-4 text-sm leading-7 text-vortex-muted">{person.experience}</p>
                <p className="mt-2 text-sm font-semibold text-vortex-navy">{person.qualification}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-vortex-border px-3 py-2 text-xs font-semibold text-vortex-slate">
                    <ShieldCheck className="size-3.5 text-vortex-blue" />
                    Verified
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-vortex-border px-3 py-2 text-xs font-semibold text-vortex-slate">
                    <Users className="size-3.5 text-vortex-blue" />
                    Vortex team
                  </span>
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-vortex-border px-4 text-xs font-semibold text-vortex-navy transition hover:border-vortex-cyan hover:text-vortex-blue"
                  >
                    LinkedIn
                    <ExternalLink className="size-3.5" />
                  </a>
                  <a
                    href="mailto:support@vortexelearning.com"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-vortex-border px-4 text-xs font-semibold text-vortex-navy transition hover:border-vortex-cyan hover:text-vortex-blue"
                  >
                    Email
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap pt-0">
        <div className="rounded-[2rem] border border-vortex-border bg-white p-8 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-vortex-blue">Join the academic network</p>
              <h2 className="mt-3 font-heading text-5xl font-semibold text-vortex-navy">
                Build courses, advise students, or support operations.
              </h2>
            </div>
            <Link href="/instructors#apply" className="btn-primary h-12 px-5">
              Become an Instructor
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
