"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { dashboardForRole } from "@/lib/vortex-auth";
import { getSupabaseClient } from "@/lib/supabase-client";
import { cacheVortexProfile, clearCachedVortexProfile, loadCurrentVortexProfile } from "@/lib/supabase-profile";

export function DashboardRouter() {
  const router = useRouter();

  useEffect(() => {
    async function openDashboard() {
      try {
        const supabase = getSupabaseClient();
        const profile = await loadCurrentVortexProfile(supabase);

        if (!profile) {
          clearCachedVortexProfile();
          router.replace("/signin?next=/dashboard");
          return;
        }

        cacheVortexProfile(profile);
        router.replace(dashboardForRole(profile.role));
      } catch {
        clearCachedVortexProfile();
        router.replace("/signin?next=/dashboard");
      }
    }

    void openDashboard();
  }, [router]);

  return (
    <div className="grid min-h-[360px] place-items-center rounded-[2rem] border border-vortex-border bg-white p-8 text-center shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
      <div>
        <Loader2 className="mx-auto size-6 animate-spin text-vortex-blue" />
        <p className="mt-4 text-sm font-semibold text-vortex-navy">Opening your assigned dashboard...</p>
      </div>
    </div>
  );
}
