import { redirectWithIntent } from "@/lib/vortex-form-actions";

const validIntents = new Set([
  "course-draft",
  "course-submit",
  "course-publish",
  "assign-student",
  "promote-instructor",
  "assign-parent",
  "assign-developer",
  "suspend-account",
  "verify-payment",
  "email-key",
  "support-ticket",
  "content-save",
  "feedback-save",
  "project-save",
  "policy-save",
  "social-save",
  "ai-agent-save",
  "email-save",
  "tutor-request-save",
  "log-review",
  "settings-save",
  "password-change",
  "resource-save",
  "quiz-save",
  "assignment-save",
  "support-save",
]);

function redirectBack(request: Request, formData: FormData) {
  return redirectWithIntent({
    request,
    formData,
    validIntents,
    defaultReturnTo: "/dashboard/admin",
    fallbackDone: "support-ticket",
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  return await redirectBack(request, formData);
}
