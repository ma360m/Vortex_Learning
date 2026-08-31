"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, ShieldCheck, UserCog } from "lucide-react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";
import { PortalRecordEmptyState } from "./portal-empty-state";

type ProfileRelation = {
  full_name?: string | null;
  email?: string | null;
};

type RoleRequestRow = {
  id: string;
  requested_role: string;
  reason: string | null;
  status: string;
  created_at: string | null;
  profiles: ProfileRelation | ProfileRelation[] | null;
};

function relation(value: ProfileRelation | ProfileRelation[] | null) {
  return Array.isArray(value) ? value[0] ?? null : value;
}

export function AdminRoleRequests() {
  const [requests, setRequests] = useState<RoleRequestRow[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const loadRequests = useCallback(async function loadRequests() {
    setError("");
    setMessage("");

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured.");
      }

      setIsLoading(true);
      const supabase = getSupabaseClient();
      const { data, error: requestsError } = await supabase
        .from("role_requests")
        .select("id, requested_role, reason, status, created_at, profiles!role_requests_profile_id_fkey(full_name, email)")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(20);

      if (requestsError) throw new Error(requestsError.message);
      setRequests((data ?? []) as RoleRequestRow[]);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Role requests could not be loaded.");
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadRequests();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadRequests]);

  async function approveRequest(requestId: string) {
    setError("");
    setMessage("");
    setApprovingId(requestId);

    try {
      const supabase = getSupabaseClient();
      const { error: approveError } = await supabase.rpc("approve_role_request", {
        target_request_id: requestId,
        review_note: "Approved from admin portal",
      });

      if (approveError) throw new Error(approveError.message);

      setRequests((current) => current.filter((request) => request.id !== requestId));
      setMessage("Role request approved and email queued.");
    } catch (approveError) {
      setError(approveError instanceof Error ? approveError.message : "Role approval failed.");
    } finally {
      setApprovingId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-[1.35rem] border border-vortex-border bg-white p-6 text-sm font-semibold text-vortex-muted">
        Reading pending role requests...
      </div>
    );
  }

  return (
    <div>
      {(message || error) && (
        <p className={`mb-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
          error ? "bg-red-50 text-red-700" : "bg-vortex-soft text-vortex-blue"
        }`}>
          {error || message}
        </p>
      )}

      {requests.length ? (
        <div className="grid gap-3">
          {requests.map((request) => {
            const profile = relation(request.profiles);

            return (
              <div key={request.id} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="font-semibold text-vortex-navy">{profile?.full_name ?? profile?.email ?? "Signed-in user"}</p>
                  <p className="mt-1 text-xs text-vortex-muted">
                    Requested {request.requested_role} access{request.reason ? ` - ${request.reason}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void approveRequest(request.id)}
                  disabled={approvingId === request.id}
                  className="h-10 rounded-full bg-vortex-navy px-4 text-xs font-semibold text-white disabled:opacity-60"
                >
                  {approvingId === request.id ? <Loader2 className="mr-1 inline size-3.5 animate-spin" /> : <ShieldCheck className="mr-1 inline size-3.5" />}
                  Approve role
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <PortalRecordEmptyState
          title="No pending role requests"
          description="When users request parent, instructor, or developer access, approved admins can review those requests here."
          icon={UserCog}
        />
      )}
    </div>
  );
}
