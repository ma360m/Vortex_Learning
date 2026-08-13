import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Newspaper,
  Search,
  type LucideIcon,
} from "lucide-react";

import { SearchConsole } from "@/components/vortex/search-console";
import { SectionHeading } from "@/components/vortex/section-heading";
import { SiteShell } from "@/components/vortex/site-shell";
import { blogPosts } from "@/lib/vortex-data";

const editorialTypes: Array<[LucideIcon, string]> = [
  [GraduationCap, "Exam Guides"],
  [BookOpen, "University Guides"],
  [FileText, "Career Advice"],
];

const contentModules: Array<[LucideIcon, string]> = [
  [Newspaper, "Articles"],
  [Search, "Search assistant"],
  [FileText, "Study notes"],
  [BookOpen, "Resource hubs"],
];

export const metadata = {
  title: "Blog",
  description:
    "Read Vortex Learning articles, tips, tricks, exam guides, university guides, career advice, and AI-supported study guidance.",
};

export default function BlogPage() {
  return (
    <SiteShell>
      <section className="bg-vortex-navy px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Blog</p>
            <h1 className="mt-4 max-w-4xl font-heading text-6xl font-semibold leading-tight">
              Exam clarity, study strategy, and career direction.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              A professional publishing surface for articles, tips, tricks,
              exam guides, university guides, career advice, and responsible AI
              learning habits.
            </p>
          </div>
          <SearchConsole compact />
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Editorial library"
            title="Guidance that supports the courses."
            description="Posts can connect into course recommendations, resource hubs, past-paper collections, FAQs, and support flows."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {editorialTypes.map(([Icon, label]) => (
              <div key={label} className="rounded-2xl border border-vortex-border bg-white p-4">
                <Icon className="size-5 text-vortex-blue" />
                <p className="mt-3 text-sm font-semibold text-vortex-navy">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <article
              key={post.title}
              className={`rounded-[2rem] border border-vortex-border bg-white p-7 shadow-[0_18px_70px_rgba(9,29,83,0.08)] ${
                index === 0 ? "lg:row-span-2 lg:p-9" : ""
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-vortex-soft px-3 py-1 text-xs font-semibold text-vortex-blue">
                  {post.category}
                </span>
                <span className="text-xs text-vortex-muted">{post.date}</span>
              </div>
              <h2 className={`mt-5 font-heading font-semibold leading-tight text-vortex-navy ${index === 0 ? "text-5xl" : "text-3xl"}`}>
                {post.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-vortex-muted">{post.excerpt}</p>
              <Link href="/support" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-vortex-blue">
                Ask Vortex
                <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Content system"
            title="A searchable knowledge layer for students and families."
            description="The blog can house SEO-ready guides while feeding AI support, FAQ answers, consultation prep, and course discovery."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {contentModules.map(([Icon, label]) => (
              <div key={label} className="rounded-3xl border border-vortex-border bg-vortex-soft p-6">
                <Icon className="size-5 text-vortex-blue" />
                <h3 className="mt-5 font-heading text-3xl font-semibold text-vortex-navy">{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
