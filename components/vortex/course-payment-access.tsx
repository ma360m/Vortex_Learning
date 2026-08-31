"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Banknote, CheckCircle2, KeyRound, Phone, Upload } from "lucide-react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";
import { loadCurrentVortexProfile } from "@/lib/supabase-profile";

type CoursePaymentAccessProps = {
  courseSlug: string;
  courseTitle: string;
};

function cleanFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

export function CoursePaymentAccess({ courseSlug, courseTitle }: CoursePaymentAccessProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenceKey, setLicenceKey] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [isRedeemingKey, setIsRedeemingKey] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!isSupabaseConfigured()) return;

      try {
        const supabase = getSupabaseClient();
        const profile = await loadCurrentVortexProfile(supabase);

        if (!isMounted || !profile) return;

        setName(profile.name);
        setEmail(profile.email);
        setPhone(profile.phone ?? "");
      } catch {
        if (isMounted) {
          setMessage("Sign in before submitting payment registration or redeeming a licence key.");
        }
      }
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handlePaymentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmittingPayment(true);

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured for this site.");
      }

      const supabase = getSupabaseClient();
      const profile = await loadCurrentVortexProfile(supabase);

      if (!profile?.id) {
        throw new Error("Please sign in before submitting payment registration.");
      }

      const formData = new FormData(event.currentTarget);
      const slip = formData.get("payment_slip");
      let slipPath: string | null = null;

      if (slip instanceof File && slip.size > 0) {
        const storagePath = `${profile.id}/${courseSlug}-${Date.now()}-${cleanFileName(slip.name)}`;
        const { error: uploadError } = await supabase.storage
          .from("payment-slips")
          .upload(storagePath, slip, { upsert: false });

        if (uploadError) throw new Error(uploadError.message);
        slipPath = storagePath;
      }

      const nextName = String(formData.get("full_name") ?? "").trim();
      const nextPhone = String(formData.get("phone") ?? "").trim();

      if (nextName || nextPhone) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            full_name: nextName || profile.name,
            phone: nextPhone || null,
          })
          .eq("id", profile.id);

        if (profileError) throw new Error(profileError.message);
      }

      const { error: paymentError } = await supabase.rpc("request_course_bank_payment_by_slug", {
        target_course_slug: courseSlug,
        requested_amount: 0,
        requested_currency: "PKR",
        uploaded_slip_url: slipPath,
        request_note: String(formData.get("notes") ?? "").trim() || null,
      });

      if (paymentError) throw new Error(paymentError.message);

      setMessage("Payment registration submitted. Admin can now verify it and issue the licence key.");
      event.currentTarget.reset();
      setName(nextName || profile.name);
      setPhone(nextPhone);
      setEmail(profile.email);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Payment registration could not be submitted.");
    } finally {
      setIsSubmittingPayment(false);
    }
  }

  async function handleRedeemSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsRedeemingKey(true);

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

      setMessage("Licence key accepted. Your course enrollment is now active.");
      setLicenceKey("");
    } catch (redeemError) {
      setError(redeemError instanceof Error ? redeemError.message : "Licence key could not be redeemed.");
    } finally {
      setIsRedeemingKey(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form
        onSubmit={handlePaymentSubmit}
        className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]"
      >
        <div className="flex items-center gap-3">
          <Banknote className="size-6 text-vortex-blue" />
          <h2 className="font-heading text-4xl font-semibold text-vortex-navy">Payment registration</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            Full name
            <input
              name="full_name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none"
              placeholder="Student name"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            Email address
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none"
              placeholder="Registered email"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            Phone number
            <input
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none"
              placeholder="+92..."
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
            Course
            <input
              readOnly
              value={courseTitle}
              className="h-12 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm text-vortex-muted outline-none"
            />
          </label>
        </div>
        <label className="mt-4 grid gap-2 text-sm font-semibold text-vortex-navy">
          Payment slip
          <input
            name="payment_slip"
            type="file"
            accept="image/*,.pdf"
            className="rounded-2xl border border-dashed border-vortex-border bg-vortex-soft px-4 py-4 text-sm outline-none"
          />
        </label>
        <textarea
          name="notes"
          className="mt-4 min-h-28 w-full rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm outline-none"
          placeholder="Optional payment reference, bank name, or message for admin."
        />
        <button type="submit" disabled={isSubmittingPayment} className="btn-primary mt-5 h-12 px-5 disabled:opacity-60">
          {isSubmittingPayment ? "Submitting..." : "Submit registration"}
          <Upload className="size-4" />
        </button>
      </form>

      <div className="grid gap-6">
        {(message || error) && (
          <div className={`rounded-2xl border p-4 text-sm font-semibold ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-vortex-border bg-white text-vortex-blue"
          }`}>
            {error || message}
            {message.includes("Sign in") ? (
              <Link href={`/signin?next=/courses/${courseSlug}/payment`} className="ml-2 underline">
                Sign in
              </Link>
            ) : null}
          </div>
        )}

        <section className="rounded-[2rem] border border-vortex-border bg-vortex-soft p-6">
          <div className="flex items-center gap-3">
            <KeyRound className="size-6 text-vortex-blue" />
            <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Redeem licence key</h2>
          </div>
          <form onSubmit={handleRedeemSubmit} className="mt-5 grid gap-3">
            <input
              name="licence_key"
              required
              value={licenceKey}
              onChange={(event) => setLicenceKey(event.target.value)}
              className="h-12 rounded-2xl border border-vortex-border bg-white px-4 text-sm outline-none"
              placeholder="Enter licence key after admin approval"
            />
            <button type="submit" disabled={isRedeemingKey} className="btn-primary h-12 px-5 disabled:opacity-60">
              {isRedeemingKey ? "Checking key..." : "Unlock course"}
              <CheckCircle2 className="size-4" />
            </button>
          </form>
        </section>

        <section className="rounded-[2rem] border border-vortex-border bg-white p-6 shadow-[0_18px_70px_rgba(9,29,83,0.08)]">
          <h2 className="font-heading text-3xl font-semibold text-vortex-navy">Payment support</h2>
          <p className="mt-3 text-sm leading-7 text-vortex-muted">
            If bank transfer or slip upload gives an issue, contact Vortex support.
          </p>
          <div className="mt-5 grid gap-3">
            <a href="mailto:support@vortexelearning.com" className="rounded-2xl bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-blue">
              support@vortexelearning.com
            </a>
            <a href="tel:+923244270697" className="inline-flex items-center gap-2 rounded-2xl bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-blue">
              <Phone className="size-4" />
              +92 324 4270697
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
