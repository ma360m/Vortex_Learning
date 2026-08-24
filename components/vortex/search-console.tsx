"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, FileText, Library, Search, UserRound } from "lucide-react";

import { searchIndex } from "@/lib/vortex-data";

const typeIcons = {
  Course: Library,
  Subject: Library,
  Tutor: UserRound,
  Article: FileText,
  "Past Paper": FileText,
  FAQ: Bot,
  "Study Notes": FileText,
};

export function SearchConsole({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return searchIndex.slice(0, compact ? 4 : 6);
    }

    return searchIndex
      .filter((item) => {
        const text = `${item.type} ${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
        return text.includes(normalized);
      })
      .slice(0, compact ? 4 : 7);
  }, [compact, query]);

  return (
    <div className="rounded-3xl border border-white/60 bg-white/88 p-2 shadow-[0_20px_70px_rgba(9,29,83,0.14)] backdrop-blur-xl sm:p-3 sm:shadow-[0_26px_90px_rgba(9,29,83,0.16)]">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-vortex-blue" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search courses, notes, FAQs"
          className="h-12 w-full rounded-2xl border border-vortex-border bg-white pl-12 pr-4 text-sm font-medium text-vortex-navy outline-none transition placeholder:text-vortex-muted focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15 sm:h-14 sm:text-base"
        />
      </label>

      <div className={`grid gap-2 ${compact ? "mt-3" : "mt-4"}`}>
        {results.length > 0 ? (
          results.map((result) => {
            const Icon = typeIcons[result.type as keyof typeof typeIcons] ?? Search;

            return (
              <Link
                key={`${result.type}-${result.title}`}
                href={result.href}
                className="group grid grid-cols-[auto_1fr] items-center gap-3 rounded-2xl border border-transparent px-3 py-3 transition hover:border-vortex-border hover:bg-vortex-soft sm:grid-cols-[auto_1fr_auto]"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-vortex-blue/10 text-vortex-blue">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-semibold text-vortex-navy">
                      {result.title}
                    </span>
                    <span className="rounded-full bg-white px-2 py-1 text-[0.7rem] font-semibold text-vortex-blue">
                      {result.type}
                    </span>
                  </span>
                  {!compact && (
                    <span className="mt-1 block truncate text-xs text-vortex-muted">
                      {result.description}
                    </span>
                  )}
                </span>
                <ArrowRight className="hidden size-4 text-vortex-cyan transition group-hover:translate-x-1 sm:block" />
              </Link>
            );
          })
        ) : (
          <div className="rounded-2xl bg-vortex-soft px-4 py-5 text-sm text-vortex-muted">
            No matching result yet.
          </div>
        )}
      </div>
    </div>
  );
}
