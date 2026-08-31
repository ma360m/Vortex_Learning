"use client";

import { useCallback, useEffect, useState } from "react";
import { BadgeCheck, CreditCard, Loader2, RefreshCw } from "lucide-react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";
import { PortalRecordEmptyState } from "./portal-empty-state";

type PaymentRelation = {
  title?: string | null;
  slug?: string | null;
  full_name?: string | null;
  email?: string | null;
};

type PaymentRow = {
  id: string;
  amount: number | null;
  currency: string | null;
  status: string | null;
  slip_url: string | null;
  created_at: string | null;
  courses: PaymentRelation | PaymentRelation[] | null;
  profiles: PaymentRelation | PaymentRelation[] | null;
};

function relation(value: PaymentRelation | PaymentRelation[] | null) {
  return Array.isArray(value) ? value[0] ?? null : value;
}

export function AdminPaymentReviews({ compact = false }: { compact?: boolean }) {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const loadPayments = useCallback(async function loadPayments() {
    setError("");
    setMessage("");

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured.");
      }

      setIsLoading(true);
      const supabase = getSupabaseClient();
      const { data, error: paymentsError } = await supabase
        .from("payments")
        .select("id, amount, currency, status, slip_url, created_at, courses!payments_course_id_fkey(title, slug), profiles!payments_user_id_fkey(full_name, email)")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(compact ? 4 : 25);

      if (paymentsError) throw new Error(paymentsError.message);
      setPayments((data ?? []) as PaymentRow[]);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Payment records could not be loaded.");
      setPayments([]);
    } finally {
      setIsLoading(false);
    }
  }, [compact]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadPayments();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadPayments]);

  async function verifyPayment(paymentId: string) {
    setError("");
    setMessage("");
    setVerifyingId(paymentId);

    try {
      const supabase = getSupabaseClient();
      const { error: verifyError } = await supabase.rpc("verify_bank_payment_and_issue_licence", {
        target_payment_id: paymentId,
        admin_notes: "Verified from admin portal",
      });

      if (verifyError) throw new Error(verifyError.message);

      setPayments((current) => current.filter((payment) => payment.id !== paymentId));
      setMessage("Payment verified. Licence key was generated and queued for email.");
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : "Payment verification failed.");
    } finally {
      setVerifyingId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-[1.35rem] border border-vortex-border bg-white p-6 text-sm font-semibold text-vortex-muted">
        Reading pending payment records...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-vortex-blue">Live payments</p>
          <h3 className="mt-1 font-heading text-2xl font-semibold text-vortex-navy">Pending bank slips</h3>
        </div>
        <button
          type="button"
          onClick={() => void loadPayments()}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy"
        >
          <RefreshCw className="size-3.5 text-vortex-blue" />
          Refresh
        </button>
      </div>

      {(message || error) && (
        <p className={`mb-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
          error ? "bg-red-50 text-red-700" : "bg-vortex-soft text-vortex-blue"
        }`}>
          {error || message}
        </p>
      )}

      {payments.length ? (
        <div className="grid gap-3">
          {payments.map((payment) => {
            const course = relation(payment.courses);
            const profile = relation(payment.profiles);

            return (
              <div key={payment.id} className="grid gap-3 rounded-2xl bg-vortex-soft p-4 lg:grid-cols-[1fr_0.8fr_auto] lg:items-center">
                <div>
                  <p className="font-semibold text-vortex-navy">{course?.title ?? "Course record"}</p>
                  <p className="mt-1 text-xs text-vortex-muted">
                    {profile?.full_name ?? profile?.email ?? "Signed-in user"} - {payment.currency ?? "PKR"} {payment.amount ?? 0}
                  </p>
                  <p className="mt-1 text-xs text-vortex-muted">
                    Slip: {payment.slip_url ?? "not attached"}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-vortex-blue">
                  <CreditCard className="size-3.5" />
                  {payment.status ?? "pending"}
                </span>
                <button
                  type="button"
                  onClick={() => void verifyPayment(payment.id)}
                  disabled={verifyingId === payment.id}
                  className="h-10 rounded-full bg-vortex-navy px-4 text-xs font-semibold text-white disabled:opacity-60"
                >
                  {verifyingId === payment.id ? <Loader2 className="mr-1 inline size-3.5 animate-spin" /> : <BadgeCheck className="mr-1 inline size-3.5" />}
                  Verify and issue key
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <PortalRecordEmptyState
          title="No pending payment rows"
          description="Payment requests submitted from course pages will appear here after students submit them from signed-in accounts."
          icon={CreditCard}
        />
      )}
    </div>
  );
}
