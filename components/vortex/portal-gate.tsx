"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { canAccessPath, dashboardForRole, type VortexProfile, type VortexRole } from "@/lib/vortex-auth";

const sessionKey = "vortex_session";

function parseSession(rawSession: string | null): VortexProfile | null {
  try {
    return rawSession ? (JSON.parse(rawSession) as VortexProfile) : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return window.localStorage.getItem(sessionKey);
}

function getServerSnapshot() {
  return null;
}

export function PortalGate({
  allowed,
  children,
}: {
  allowed: VortexRole[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const rawSession = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const profile = useMemo(() => parseSession(rawSession), [rawSession]);
  const hasAccess = Boolean(profile && allowed.includes(profile.role) && canAccessPath(profile.role, pathname));

  useEffect(() => {
    if (!profile) {
      router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!allowed.includes(profile.role) || !canAccessPath(profile.role, pathname)) {
      router.replace(dashboardForRole(profile.role));
      return;
    }
  }, [allowed, pathname, profile, router]);

  if (!hasAccess) {
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
