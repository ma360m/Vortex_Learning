import { redirectWithIntent } from "@/lib/vortex-form-actions";

const validIntents = new Set(["parent-message", "support-ticket", "password-change"]);

export async function POST(request: Request) {
  const formData = await request.formData();
  return redirectWithIntent({
    request,
    formData,
    validIntents,
    defaultReturnTo: "/dashboard/parent",
    fallbackDone: "parent-message",
  });
}
