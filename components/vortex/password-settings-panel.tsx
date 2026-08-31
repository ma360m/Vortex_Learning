"use client";

import { FormEvent, useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";

import { getSupabaseClient } from "@/lib/supabase-client";

export function PasswordSettingsPanel({
  action,
  returnTo,
}: {
  action: string;
  returnTo: string;
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: updateError } = await getSupabaseClient().auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw new Error(updateError.message);
      setNewPassword("");
      setConfirmPassword("");
      setStatus("Password updated successfully.");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Password update failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
              <KeyRound className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase text-vortex-blue">Account security</p>
              <h2 className="mt-1 font-heading text-3xl font-semibold text-vortex-navy">
                Change password
              </h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-vortex-muted">
            Update the password for your signed-in Vortex Learning account.
          </p>
          <div className="mt-5 rounded-2xl bg-vortex-soft p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-vortex-navy">
              <ShieldCheck className="size-4 text-vortex-blue" />
              Protected account action
            </div>
            <p className="mt-2 text-xs leading-6 text-vortex-muted">
              Passwords must be at least 8 characters and different from the current password.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} data-action={action} data-return-to={returnTo} className="grid gap-4 rounded-2xl bg-vortex-soft p-5">
          <input type="hidden" name="intent" value="password-change" />
          {status && <p className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-vortex-blue">{status}</p>}
          {error && <p className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-vortex-slate">{error}</p>}
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            New password
            <input
              name="new_password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              type="password"
              required
              minLength={8}
              className="h-11 rounded-2xl border border-vortex-border bg-white px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            Confirm new password
            <input
              name="confirm_password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              required
              minLength={8}
              className="h-11 rounded-2xl border border-vortex-border bg-white px-4 text-sm outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
            />
          </label>
          <button type="submit" disabled={isSubmitting} className="btn-primary h-11 w-fit px-5 disabled:opacity-60">
            <KeyRound className="size-4" />
            Update password
          </button>
        </form>
      </div>
    </section>
  );
}
