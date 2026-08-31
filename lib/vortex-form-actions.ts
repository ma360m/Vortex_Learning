import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "./supabase-server";

function textField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function submissionSubject(intent: string, formData: FormData) {
  if (intent === "training-consultancy") {
    return `Training consultancy request${textField(formData, "training_type") ? ` - ${textField(formData, "training_type")}` : ""}`;
  }

  if (intent === "consultation-request") {
    return `Consultation request${textField(formData, "goal") ? ` - ${textField(formData, "goal")}` : ""}`;
  }

  return textField(formData, "topic") || textField(formData, "subject") || "Vortex Learning support request";
}

function submissionMessage(formData: FormData) {
  const details = [
    ["Name", textField(formData, "name")],
    ["Organization", textField(formData, "organization")],
    ["Email", textField(formData, "email")],
    ["Phone", textField(formData, "phone")],
    ["Goal", textField(formData, "goal")],
    ["Subject", textField(formData, "subject")],
    ["Training type", textField(formData, "training_type")],
    ["Message", textField(formData, "message")],
  ].filter(([, value]) => value);

  return details.map(([label, value]) => `${label}: ${value}`).join("\n");
}

async function savePublicSubmission(intent: string, formData: FormData) {
  if (!["support-ticket", "consultation-request", "training-consultancy"].includes(intent)) {
    return;
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const email = textField(formData, "email");
  const subject = submissionSubject(intent, formData);
  const message = submissionMessage(formData) || subject;

  await supabase.from("support_tickets").insert({
    name: textField(formData, "name") || null,
    email: email || null,
    subject,
    message,
    status: "open",
  });

  if (email) {
    await supabase.from("email_queue").insert({
      email,
      from_email: "support@vortexelearning.com",
      template_key: intent,
      payload: {
        subject,
        source: "website",
      },
    });
  }
}

export async function redirectWithIntent({
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

  const safeIntent = validIntents.has(intent) ? intent : fallbackDone;

  try {
    await savePublicSubmission(safeIntent, formData);
  } catch {
    url.searchParams.set("notice", "submission-local");
  }

  url.searchParams.set("done", safeIntent);
  return NextResponse.redirect(url, 303);
}
