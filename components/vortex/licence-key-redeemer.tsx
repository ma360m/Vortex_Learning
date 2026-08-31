"use client";

import { useState } from "react";
import { CheckCircle2, KeyRound } from "lucide-react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";

export function LicenceKeyRedeemer({
  returnHref,
  label = "Verify key",
}: {
  returnHref: string;
  label?: string;
}) {
  const [licenceKey, setLicenceKey] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured for this site.");
      }

      const trimmedKey = licenceKey.trim();
      if (!trimmedKey) {
        throw new Error("Enter a licence key first.");
      }

      const supabase = getSupabaseClient();
      const { error: redeemError } = await supabase.rpc("redeem_licence_key", {
        target_licence_key: trimmedKey,
      });

      if (redeemError) throw new Error(redeemError.message);

      setMessage("Licence key accepted. Your course access is active.");
      setLicenceKey("");
      window.history.replaceState(null, "", returnHref);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Licence key could not be redeemed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
      <input
        name="licence_key"
        required
        value={licenceKey}
        onChange={(event) => setLicenceKey(event.target.value)}
        className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none"
        placeholder="Enter licence key"
      />
      <button type="submit" disabled={isSubmitting} className="btn-primary h-12 px-5 disabled:opacity-60">
        <KeyRound className="size-4" />
        {isSubmitting ? "Checking..." : label}
        <CheckCircle2 className="size-4" />
      </button>
      {(message || error) && (
        <p className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
          error ? "bg-red-50 text-red-700" : "bg-white text-vortex-blue"
        }`}>
          {error || message}
        </p>
      )}
    </form>
  );
}
