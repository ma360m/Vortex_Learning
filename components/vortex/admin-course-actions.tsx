"use client";

import { useState } from "react";
import { CheckCircle2, Eye, Loader2 } from "lucide-react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";

export function AdminCourseActions({ courseSlug }: { courseSlug: string }) {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [pendingAction, setPendingAction] = useState<"review" | "publish" | null>(null);

  async function updateCourse(action: "review" | "publish") {
    setStatus("");
    setError("");
    setPendingAction(action);

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured.");
      }

      const supabase = getSupabaseClient();
      const payload =
        action === "publish"
          ? { approval_status: "approved", published: true }
          : { approval_status: "submitted" };

      const { error: updateError } = await supabase
        .from("courses")
        .update(payload)
        .eq("slug", courseSlug);

      if (updateError) throw new Error(updateError.message);

      setStatus(action === "publish" ? "Published" : "Submitted for review");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Course update failed.");
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => void updateCourse("review")}
        disabled={Boolean(pendingAction)}
        className="h-9 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy disabled:opacity-60"
      >
        {pendingAction === "review" ? <Loader2 className="mr-1 inline size-3.5 animate-spin" /> : <CheckCircle2 className="mr-1 inline size-3.5 text-vortex-blue" />}
        Review
      </button>
      <button
        type="button"
        onClick={() => void updateCourse("publish")}
        disabled={Boolean(pendingAction)}
        className="h-9 rounded-full border border-vortex-border bg-white px-3 text-xs font-semibold text-vortex-navy disabled:opacity-60"
      >
        {pendingAction === "publish" ? <Loader2 className="mr-1 inline size-3.5 animate-spin" /> : <Eye className="mr-1 inline size-3.5 text-vortex-blue" />}
        Publish
      </button>
      {(status || error) && (
        <span className={`text-xs font-semibold ${error ? "text-red-600" : "text-vortex-blue"}`}>
          {error || status}
        </span>
      )}
    </div>
  );
}
