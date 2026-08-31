"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const messages: Record<string, string> = {
  "course-draft": "Course draft saved.",
  "course-submit": "Course submitted for approval.",
  "course-publish": "Course publish request sent.",
  "assign-student": "User access update sent to the student role workflow.",
  "promote-instructor": "User promotion request sent to the admin role workflow.",
  "assign-parent": "Parent portal access assignment request sent to the admin role workflow.",
  "assign-developer": "Developer access assignment request sent to the admin role workflow.",
  "suspend-account": "Account suspension request sent to the admin workflow.",
  "verify-payment": "Payment verification request received.",
  "email-key": "Licence-key email request queued.",
  "student-unlock": "Licence key submitted for course unlock.",
  "student-help": "Instructor-help request sent.",
  "instructor-course": "Instructor course draft saved.",
  "instructor-live": "Live session request saved.",
  "parent-message": "Parent message sent.",
  "support-ticket": "Support ticket submitted.",
  "consultation-request": "Consultation request submitted.",
  "training-consultancy": "Training consultancy request submitted.",
  "content-save": "Homepage content update received.",
  "feedback-save": "Student feedback update received.",
  "project-save": "Phonics Club project section update received.",
  "policy-save": "Policy and social link update received.",
  "social-save": "Social link update received.",
  "ai-agent-save": "AI agent settings update received.",
  "settings-save": "Platform settings update received.",
  "password-change": "Password update request validated.",
  "resource-save": "Course resources saved for the draft.",
  "quiz-save": "Quiz settings saved for the course.",
  "assignment-save": "Assignment workflow saved for the course.",
  "support-save": "Instructor-help settings saved for the course.",
};

const errors: Record<string, string> = {
  "password-required": "Enter the current password, new password, and confirmation.",
  "password-length": "Use at least 8 characters for the new password.",
  "password-mismatch": "New password and confirmation do not match.",
  "password-same": "Choose a new password that is different from the current password.",
};

export function ActionBanner() {
  const searchParams = useSearchParams();
  const done = searchParams.get("done");
  const error = searchParams.get("error");

  if (error && errors[error]) {
    return (
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-white p-4 text-sm text-vortex-slate shadow-[0_12px_40px_rgba(9,29,83,0.06)]">
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
        <p>{errors[error]}</p>
      </div>
    );
  }

  if (done && messages[done]) {
    return (
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-vortex-cyan/40 bg-white p-4 text-sm text-vortex-slate shadow-[0_12px_40px_rgba(9,29,83,0.06)]">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-vortex-blue" />
        <p>{messages[done]}</p>
      </div>
    );
  }

  return null;
}
