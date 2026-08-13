"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const router = useRouter();

  function signOut() {
    window.localStorage.removeItem("vortex_session");
    router.push("/signin");
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-white/15 text-xs font-semibold text-cyan-50 transition hover:bg-white/10"
    >
      <LogOut className="size-4" />
      Sign out
    </button>
  );
}
