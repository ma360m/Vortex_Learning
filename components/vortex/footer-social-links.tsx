"use client";

import { useEffect, useState } from "react";
import { BookOpen, Camera, SquarePlay, type LucideIcon } from "lucide-react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";

type SocialLink = {
  label: string;
  href: string;
  kind: string;
};

type SocialRow = {
  label: string;
  href: string;
  kind: string;
};

const socialIcons: Record<string, LucideIcon> = {
  instagram: Camera,
  youtube: SquarePlay,
};

export function FooterSocialLinks({ links }: { links: SocialLink[] }) {
  const [visibleLinks, setVisibleLinks] = useState(links);

  useEffect(() => {
    let isMounted = true;

    async function loadSocials() {
      if (!isSupabaseConfigured()) return;

      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("site_social_links")
          .select("kind, label, href")
          .eq("published", true)
          .order("sort_order", { ascending: true });

        if (!isMounted || error) return;

        const rows = (data as SocialRow[] | null) ?? [];
        if (rows.length) setVisibleLinks(rows);
      } catch {
        // Keep footer defaults when optional content tables are unavailable.
      }
    }

    void loadSocials();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {visibleLinks.map((social) => {
        const Icon = socialIcons[social.kind] ?? BookOpen;

        return (
          <a
            key={`${social.kind}-${social.href}`}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="grid size-10 place-items-center rounded-full border border-vortex-border bg-vortex-soft text-vortex-blue transition hover:border-vortex-cyan hover:bg-white"
            aria-label={social.label}
          >
            <Icon className="size-4" />
          </a>
        );
      })}
    </div>
  );
}
