import { NextResponse } from "next/server";

const validIntents = new Set([
  "student-unlock",
  "student-help",
  "support-ticket",
  "course-payment-register",
  "payment-slip-upload",
]);

export async function POST(request: Request) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "student-help");
  const returnTo = String(formData.get("returnTo") ?? "/dashboard/student");
  const safeReturnTo = returnTo.startsWith("/") ? returnTo : "/dashboard/student";
  const url = new URL(safeReturnTo, request.url);
  url.searchParams.set("done", validIntents.has(intent) ? intent : "student-help");
  return NextResponse.redirect(url, 303);
}
