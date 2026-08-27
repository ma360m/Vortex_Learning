"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";

import {
  canAccessPath,
  dashboardForRole,
  findProfileByEmail,
} from "@/lib/vortex-auth";

export function SignInPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedPath = searchParams.get("next") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const requestedRole = useMemo(() => {
    if (requestedPath.includes("/admin")) return "Admin Console";
    if (requestedPath.includes("/instructor")) return "Instructor LMS";
    if (requestedPath.includes("/parent")) return "Parent Portal";
    if (requestedPath.includes("/developer")) return "Developer Panel";
    if (requestedPath.includes("/student")) return "Student LMS";
    return "your dashboard";
  }, [requestedPath]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const profile = findProfileByEmail(email);

    if (!profile.email) {
      setError("Enter the email address used for your account.");
      return;
    }

    window.localStorage.setItem("vortex_session", JSON.stringify(profile));
    const destination = canAccessPath(profile.role, requestedPath)
      ? requestedPath
      : dashboardForRole(profile.role);

    router.push(destination);
  }

  return (
    <section className="bg-white p-2 sm:p-4">
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
          <Lock className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-vortex-blue">Secure access</p>
          <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Open {requestedRole}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        {error && (
          <p className="rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm text-vortex-slate">
            {error}
          </p>
        )}
        <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
          Email address
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
            placeholder="Enter your registered email"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
          Password
          <input
            type="password"
            required
            className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
            placeholder="Enter password"
          />
        </label>
        <button type="submit" className="btn-primary h-12 px-5">
          Sign in
          <ArrowRight className="size-4" />
        </button>
      </form>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-vortex-border bg-vortex-soft p-4 text-sm leading-7 text-vortex-muted">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-vortex-blue" />
        <p>
          New accounts open as students. Parent, instructor, developer, and admin access is assigned through approved permissions.
        </p>
      </div>
    </section>
  );
}
