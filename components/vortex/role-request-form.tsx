"use client";

import { useState } from "react";
import { Send, UserCog } from "lucide-react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";
import { loadCurrentVortexProfile } from "@/lib/supabase-profile";

type RequestableRole = "parent" | "instructor" | "developer";

export function RoleRequestForm() {
  const [requestedRole, setRequestedRole] = useState<RequestableRole>("parent");
  const [reason, setReason] = useState("");
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
        throw new Error("Supabase is not configured.");
      }

      const supabase = getSupabaseClient();
      const profile = await loadCurrentVortexProfile(supabase);

      if (!profile?.id) {
        throw new Error("Sign in before requesting portal access.");
      }

      const { error: requestError } = await supabase.rpc("request_portal_role", {
        requested_role: requestedRole,
        reason: reason.trim() || null,
      });

      if (requestError) throw new Error(requestError.message);

      setMessage("Role request submitted. An approved admin can review it in the Users section.");
      setReason("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Role request could not be submitted.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-vortex-blue">Access request</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">Need another portal?</h2>
        </div>
        <UserCog className="size-5 text-vortex-blue" />
      </div>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
        {(message || error) && (
          <p className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
            error ? "bg-red-50 text-red-700" : "bg-vortex-soft text-vortex-blue"
          }`}>
            {error || message}
          </p>
        )}
        <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
          Portal role
          <select
            value={requestedRole}
            onChange={(event) => setRequestedRole(event.target.value as RequestableRole)}
            className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none"
          >
            <option value="parent">Parent Portal</option>
            <option value="instructor">Instructor LMS</option>
            <option value="developer">Developer Panel</option>
          </select>
        </label>
        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className="min-h-24 rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm outline-none"
          placeholder="Why do you need this access?"
        />
        <button type="submit" disabled={isSubmitting} className="btn-primary h-11 w-fit px-5 disabled:opacity-60">
          <Send className="size-4" />
          {isSubmitting ? "Submitting..." : "Request access"}
        </button>
      </form>
    </section>
  );
}
