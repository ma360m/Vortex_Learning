import { NextResponse } from "next/server";

const validIntents = new Set(["parent-message", "support-ticket"]);

export async function POST(request: Request) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "parent-message");
  const returnTo = String(formData.get("returnTo") ?? "/dashboard/parent");
  const safeReturnTo = returnTo.startsWith("/") ? returnTo : "/dashboard/parent";
  const url = new URL(safeReturnTo, request.url);
  url.searchParams.set("done", validIntents.has(intent) ? intent : "parent-message");
  return NextResponse.redirect(url, 303);
}
