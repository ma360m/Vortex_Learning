"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { canAccessPath, dashboardForRole, type VortexProfile, type VortexRole } from "@/lib/vortex-auth";
import { getSupabaseClient } from "@/lib/supabase-client";
import {
  cacheVortexProfile,
  clearCachedVortexProfile,
  loadCurrentVortexProfile,
} from "@/lib/supabase-profile";

export function PortalGate({
  allowed,
  children,
}: {
  allowed: VortexRole[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<VortexProfile | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const hasAccess = Boolean(profile && allowed.includes(profile.role) && canAccessPath(profile.role, pathname));
  const allowedKey = allowed.join("|");

  useEffect(() => {
    let isMounted = true;
    let subscription: { unsubscribe: () => void } | undefined;

    async function checkAccess() {
      try {
        const supabase = getSupabaseClient();
        const currentProfile = await loadCurrentVortexProfile(supabase);

        if (!isMounted) return;

        if (!currentProfile) {
          clearCachedVortexProfile();
          router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
          return;
        }

        cacheVortexProfile(currentProfile);
        setProfile(currentProfile);

        if (!allowed.includes(currentProfile.role) || !canAccessPath(currentProfile.role, pathname)) {
          router.replace(dashboardForRole(currentProfile.role));
        }
      } catch {
        if (!isMounted) return;
        clearCachedVortexProfile();
        router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
      } finally {
        if (isMounted) setIsChecking(false);
      }
    }

    void checkAccess();

    try {
      const supabase = getSupabaseClient();
      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange(() => {
        void checkAccess();
      });
      subscription = authSubscription;
    } catch {
      void checkAccess();
    }

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [allowed, allowedKey, pathname, router]);

  if (isChecking || !hasAccess) {
    return (
      <div className="grid min-h-screen place-items-center bg-vortex-paper px-5 text-vortex-navy">
        <div className="rounded-[1.5rem] border border-vortex-border bg-white p-6 text-center shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <ShieldCheck className="mx-auto size-6 text-vortex-blue" />
          <p className="mt-3 text-sm font-semibold">Checking portal access...</p>
        </div>
      </div>
    );
  }

  return children;
}
