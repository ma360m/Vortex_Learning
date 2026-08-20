import { redirectWithIntent } from "@/lib/vortex-form-actions";

const validIntents = new Set([
  "student-unlock",
  "student-help",
  "support-ticket",
  "course-payment-register",
  "payment-slip-upload",
  "password-change",
]);

export async function POST(request: Request) {
  const formData = await request.formData();
  return redirectWithIntent({
    request,
    formData,
    validIntents,
    defaultReturnTo: "/dashboard/student",
    fallbackDone: "student-help",
  });
}
