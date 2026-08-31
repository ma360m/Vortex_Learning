"use client";

import { useEffect, useState } from "react";

import type { VortexProfile } from "@/lib/vortex-auth";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";
import {
  cacheVortexProfile,
  loadCurrentVortexProfile,
  vortexSessionKey,
} from "@/lib/supabase-profile";

function cachedProfile() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(vortexSessionKey);
    return raw ? (JSON.parse(raw) as VortexProfile) : null;
  } catch {
    return null;
  }
}

export function PortalProfileBadge({
  fallback,
  variant = "header",
}: {
  fallback: string;
  variant?: "header" | "sidebar";
}) {
  const [profile, setProfile] = useState<VortexProfile | null>(() => cachedProfile());
  const name = profile?.name || fallback || "Signed-in user";
  const email = profile?.email;
  const initial = name.trim().slice(0, 1).toUpperCase() || "V";

  useEffect(() => {
    let isMounted = true;

    async function refreshProfile() {
      if (!isSupabaseConfigured()) return;

      try {
        const currentProfile = await loadCurrentVortexProfile(getSupabaseClient());
        if (!isMounted || !currentProfile) return;
        cacheVortexProfile(currentProfile);
        setProfile(currentProfile);
      } catch {
        // Keep the cached profile/fallback visible if live profile loading fails.
      }
    }

    void refreshProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  if (variant === "sidebar") {
    return (
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-[#47C8F2] text-sm font-bold text-vortex-navy">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="truncate text-xs text-cyan-100">{email || "Signed-in profile"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-2 rounded-full border border-vortex-border bg-white py-1 pl-1 pr-3 sm:flex">
      <span className="grid size-9 place-items-center rounded-full bg-vortex-gradient text-sm font-bold text-white">
        {initial}
      </span>
      <span className="max-w-48 truncate text-sm font-semibold text-vortex-navy">{name}</span>
    </div>
  );
}
