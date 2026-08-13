import { NextResponse } from "next/server";

const validIntents = new Set([
  "course-draft",
  "course-submit",
  "course-publish",
  "promote-instructor",
  "assign-parent",
  "verify-payment",
  "email-key",
  "support-ticket",
]);

function redirectBack(request: Request, formData: FormData) {
  const intent = String(formData.get("intent") ?? "course-draft");
  const returnTo = String(formData.get("returnTo") ?? "/dashboard/admin");
  const safeReturnTo = returnTo.startsWith("/") ? returnTo : "/dashboard/admin";
  const done = validIntents.has(intent) ? intent : "support-ticket";
  const url = new URL(safeReturnTo, request.url);
  url.searchParams.set("done", done);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  return redirectBack(request, formData);
}
