import { redirectWithIntent } from "@/lib/vortex-form-actions";

const validIntents = new Set([
  "instructor-course",
  "course-submit",
  "course-publish",
  "instructor-live",
  "student-help",
  "password-change",
  "resource-save",
  "quiz-save",
  "assignment-save",
  "support-save",
]);

export async function POST(request: Request) {
  const formData = await request.formData();
  return redirectWithIntent({
    request,
    formData,
    validIntents,
    defaultReturnTo: "/dashboard/instructor",
    fallbackDone: "instructor-course",
  });
}
