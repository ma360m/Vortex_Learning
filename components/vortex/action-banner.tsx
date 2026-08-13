"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

const messages: Record<string, string> = {
  "course-draft": "Course draft saved. Connect the SQL backend to persist this record.",
  "course-submit": "Course submitted for approval.",
  "course-publish": "Course publish request sent.",
  "promote-instructor": "User promotion request sent to the admin role workflow.",
  "assign-parent": "Parent portal access assignment request sent to the admin role workflow.",
  "verify-payment": "Payment verification request received.",
  "email-key": "Licence-key email request queued.",
  "student-unlock": "Licence key submitted for course unlock.",
  "student-help": "Instructor-help request sent.",
  "instructor-course": "Instructor course draft saved.",
  "instructor-live": "Live session request saved.",
  "parent-message": "Parent message sent.",
  "support-ticket": "Support ticket submitted.",
};

export function ActionBanner() {
  const searchParams = useSearchParams();
  const done = searchParams.get("done");

  if (!done || !messages[done]) {
    return null;
  }

  return (
    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-vortex-cyan/40 bg-white p-4 text-sm text-vortex-slate shadow-[0_12px_40px_rgba(9,29,83,0.06)]">
      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-vortex-blue" />
      <p>{messages[done]}</p>
    </div>
  );
}
