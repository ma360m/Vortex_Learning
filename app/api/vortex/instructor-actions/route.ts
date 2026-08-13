import { NextResponse } from "next/server";

const validIntents = new Set([
  "instructor-course",
  "course-submit",
  "course-publish",
  "instructor-live",
  "student-help",
]);

export async function POST(request: Request) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "instructor-course");
  const returnTo = String(formData.get("returnTo") ?? "/dashboard/instructor");
  const safeReturnTo = returnTo.startsWith("/") ? returnTo : "/dashboard/instructor";
  const url = new URL(safeReturnTo, request.url);
  url.searchParams.set("done", validIntents.has(intent) ? intent : "instructor-course");
  return NextResponse.redirect(url, 303);
}
