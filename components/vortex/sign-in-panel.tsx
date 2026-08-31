"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, KeyRound, Lock, ShieldCheck, UserPlus } from "lucide-react";

import { canAccessPath, dashboardForRole } from "@/lib/vortex-auth";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";
import { cacheVortexProfile, loadCurrentVortexProfile } from "@/lib/supabase-profile";

type AuthMode = "signin" | "signup" | "reset" | "update-password";

const authModes: Array<{
  value: Exclude<AuthMode, "update-password">;
  label: string;
  icon: typeof Lock;
}> = [
  { value: "signin", label: "Sign in", icon: Lock },
  { value: "signup", label: "Create", icon: UserPlus },
  { value: "reset", label: "Reset", icon: KeyRound },
];

export function SignInPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedPath = searchParams.get("next") ?? "/dashboard";
  const requestedMode = searchParams.get("mode");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState<AuthMode>(requestedMode === "update-password" ? "update-password" : "signin");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestedRole = useMemo(() => {
    if (requestedPath.includes("/admin")) return "Admin Console";
    if (requestedPath.includes("/instructor")) return "Instructor LMS";
    if (requestedPath.includes("/parent")) return "Parent Portal";
    if (requestedPath.includes("/developer")) return "Developer Panel";
    if (requestedPath.includes("/student")) return "Student LMS";
    return "your dashboard";
  }, [requestedPath]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (window.location.hash.includes("type=recovery")) {
        setMode("update-password");
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  async function finishAuthenticatedRedirect() {
    const supabase = getSupabaseClient();
    const profile = await loadCurrentVortexProfile(supabase);

    if (!profile) {
      throw new Error("Sign-in could not load your Vortex profile.");
    }

    cacheVortexProfile(profile);
    const destination = canAccessPath(profile.role, requestedPath)
      ? requestedPath
      : dashboardForRole(profile.role);

    router.push(destination);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured. Add the Vortex Supabase URL and publishable key first.");
      return;
    }

    if (mode !== "update-password" && !email.trim()) {
      setError("Enter the email address used for your account.");
      return;
    }

    if ((mode === "signin" || mode === "signup" || mode === "update-password") && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if ((mode === "signup" || mode === "update-password") && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (mode === "signup" && fullName.trim().length < 2) {
      setError("Enter the student's full name.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = getSupabaseClient();

      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

        if (signInError) throw new Error(signInError.message);
        await finishAuthenticatedRedirect();
        return;
      }

      if (mode === "signup") {
        const origin = window.location.origin;
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: { full_name: fullName.trim() },
            emailRedirectTo: `${origin}/signin?next=${encodeURIComponent(requestedPath)}`,
          },
        });

        if (signUpError) throw new Error(signUpError.message);

        if (data.session) {
          await finishAuthenticatedRedirect();
          return;
        }

        setMessage("Account created. Please check your email to confirm the account before signing in.");
        setMode("signin");
        return;
      }

      if (mode === "reset") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
          redirectTo: `${window.location.origin}/signin?mode=update-password`,
        });

        if (resetError) throw new Error(resetError.message);
        setMessage("Password reset email sent. Open the email link to choose a new password.");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) throw new Error(updateError.message);
      setMessage("Password updated. Opening your dashboard now.");
      await finishAuthenticatedRedirect();
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

      <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-vortex-soft p-1 text-xs font-semibold text-vortex-slate">
        {authModes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setMode(value);
              setError("");
              setMessage("");
            }}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl transition ${
              mode === value ? "bg-white text-vortex-navy shadow-sm" : "hover:text-vortex-blue"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        {error && (
          <p className="rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm text-vortex-slate">
            {error}
          </p>
        )}
        {message && (
          <p className="rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm text-vortex-blue">
            {message}
          </p>
        )}
        {mode === "signup" && (
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            Full name
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
              placeholder="Student full name"
            />
          </label>
        )}
        {mode !== "update-password" && (
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
        )}
        {mode !== "reset" && (
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            {mode === "update-password" ? "New password" : "Password"}
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              minLength={8}
              className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
              placeholder={mode === "update-password" ? "Choose a new password" : "Enter password"}
            />
          </label>
        )}
        {(mode === "signup" || mode === "update-password") && (
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            Confirm password
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              required
              minLength={8}
              className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
              placeholder="Repeat password"
            />
          </label>
        )}
        <button type="submit" disabled={isSubmitting} className="btn-primary h-12 px-5 disabled:opacity-60">
          {mode === "signin"
            ? "Sign in"
            : mode === "signup"
              ? "Create account"
              : mode === "reset"
                ? "Send reset email"
                : "Update password"}
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
