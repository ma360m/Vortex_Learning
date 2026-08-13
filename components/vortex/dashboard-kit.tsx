import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  caption: string;
  icon: LucideIcon;
};

export function MetricCard({ label, value, caption, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-vortex-border bg-white p-5 shadow-[0_16px_60px_rgba(9,29,83,0.06)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-vortex-muted">{label}</p>
        <span className="grid size-10 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-5 font-heading text-4xl font-semibold text-vortex-navy">{value}</p>
      <p className="mt-2 text-xs text-vortex-muted">{caption}</p>
    </div>
  );
}

type WorklistProps = {
  title: string;
  items: string[];
};

export function Worklist({ title, items }: WorklistProps) {
  return (
    <div className="rounded-3xl border border-vortex-border bg-white p-6 shadow-[0_16px_60px_rgba(9,29,83,0.06)]">
      <h2 className="font-heading text-3xl font-semibold text-vortex-navy">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-between rounded-2xl bg-vortex-soft px-4 py-3">
            <span className="text-sm font-medium text-vortex-slate">{item}</span>
            <ArrowRight className="size-4 text-vortex-cyan" />
          </div>
        ))}
      </div>
    </div>
  );
}

type DashboardHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
};

export function DashboardHero({ eyebrow, title, description, cta }: DashboardHeroProps) {
  return (
    <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-[#47C8F2]">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">{description}</p>
        </div>
        {cta && (
          <Link href={cta.href} className="btn-white h-12 px-5">
            {cta.label}
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
