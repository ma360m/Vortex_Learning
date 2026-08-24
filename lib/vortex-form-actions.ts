import { NextResponse } from "next/server";

export function redirectWithIntent({
  request,
  formData,
  validIntents,
  defaultReturnTo,
  fallbackDone,
}: {
  request: Request;
  formData: FormData;
  validIntents: Set<string>;
  defaultReturnTo: string;
  fallbackDone: string;
}) {
  const intent = String(formData.get("intent") ?? fallbackDone);
  const returnTo = String(formData.get("returnTo") ?? defaultReturnTo);
  const safeReturnTo = returnTo.startsWith("/") ? returnTo : defaultReturnTo;
  const url = new URL(safeReturnTo, request.url);

  if (intent === "password-change") {
    const currentPassword = String(formData.get("current_password") ?? "");
    const newPassword = String(formData.get("new_password") ?? "");
    const confirmPassword = String(formData.get("confirm_password") ?? "");

    if (!currentPassword || !newPassword || !confirmPassword) {
      url.searchParams.set("error", "password-required");
      return NextResponse.redirect(url, 303);
    }

    if (newPassword.length < 8) {
      url.searchParams.set("error", "password-length");
      return NextResponse.redirect(url, 303);
    }

    if (newPassword !== confirmPassword) {
      url.searchParams.set("error", "password-mismatch");
      return NextResponse.redirect(url, 303);
    }

    if (currentPassword === newPassword) {
      url.searchParams.set("error", "password-same");
      return NextResponse.redirect(url, 303);
    }

    url.searchParams.set("done", "password-change");
    return NextResponse.redirect(url, 303);
  }

  url.searchParams.set("done", validIntents.has(intent) ? intent : fallbackDone);
  return NextResponse.redirect(url, 303);
}
