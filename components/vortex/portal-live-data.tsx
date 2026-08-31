"use client";

import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  CreditCard,
  FileText,
  KeyRound,
  Mail,
  MessageSquare,
  ShieldCheck,
  Ticket,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";
import { loadCurrentVortexProfile } from "@/lib/supabase-profile";

type PortalRole = "admin" | "student" | "parent" | "instructor";

type LiveMetric = {
  title: string;
  value: string;
  caption: string;
  icon: LucideIcon;
};

async function countRows(
  supabase: ReturnType<typeof getSupabaseClient>,
  table: string,
  filters: Array<[string, string | number | boolean | null]> = [],
) {
  let query: ReturnType<ReturnType<typeof supabase.from>["select"]> = supabase
    .from(table)
    .select("id", { count: "exact", head: true });

  filters.forEach(([column, value]) => {
    if (value === null) {
      query = query.is(column, null);
    } else {
      query = query.eq(column, value);
    }
  });

  const { count, error } = await query;
  if (error) throw new Error(error.message);
  return count ?? 0;
}

function loadingMetrics(role: PortalRole): LiveMetric[] {
  const sharedCaption = "reading live Supabase data";

  if (role === "admin") {
    return [
      { title: "Profiles", value: "...", caption: sharedCaption, icon: Users },
      { title: "Courses", value: "...", caption: sharedCaption, icon: BookOpen },
      { title: "Payments", value: "...", caption: sharedCaption, icon: CreditCard },
      { title: "Emails", value: "...", caption: sharedCaption, icon: Mail },
    ];
  }

  if (role === "instructor") {
    return [
      { title: "My courses", value: "...", caption: sharedCaption, icon: BookOpen },
      { title: "Live sessions", value: "...", caption: sharedCaption, icon: Video },
      { title: "Help requests", value: "...", caption: sharedCaption, icon: MessageSquare },
      { title: "Assignments", value: "...", caption: sharedCaption, icon: FileText },
    ];
  }

  if (role === "parent") {
    return [
      { title: "Linked learners", value: "...", caption: sharedCaption, icon: Users },
      { title: "Payments", value: "...", caption: sharedCaption, icon: CreditCard },
      { title: "Messages", value: "...", caption: sharedCaption, icon: MessageSquare },
      { title: "Reports", value: "...", caption: sharedCaption, icon: FileText },
    ];
  }

  return [
    { title: "Enrollments", value: "...", caption: sharedCaption, icon: BookOpen },
    { title: "Payments", value: "...", caption: sharedCaption, icon: CreditCard },
    { title: "Licence keys", value: "...", caption: sharedCaption, icon: KeyRound },
    { title: "Certificates", value: "...", caption: sharedCaption, icon: Award },
  ];
}

export function PortalLiveSummary({ role }: { role: PortalRole }) {
  const [metrics, setMetrics] = useState<LiveMetric[]>(() => loadingMetrics(role));
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadMetrics() {
      if (!isSupabaseConfigured()) {
        setError("Supabase is not configured.");
        return;
      }

      try {
        const supabase = getSupabaseClient();
        const profile = await loadCurrentVortexProfile(supabase);

        if (!profile?.id) {
          throw new Error("Signed-in profile was not found.");
        }

        let nextMetrics: LiveMetric[];

        if (role === "admin") {
          const [profiles, courses, payments, queuedEmails] = await Promise.all([
            countRows(supabase, "profiles"),
            countRows(supabase, "courses", [["published", true]]),
            countRows(supabase, "payments", [["status", "pending"]]),
            countRows(supabase, "email_queue", [["status", "queued"]]),
          ]);

          nextMetrics = [
            { title: "Profiles", value: `${profiles}`, caption: "real account records", icon: Users },
            { title: "Published courses", value: `${courses}`, caption: "live Supabase catalog", icon: BookOpen },
            { title: "Payment reviews", value: `${payments}`, caption: "pending verification", icon: CreditCard },
            { title: "Queued emails", value: `${queuedEmails}`, caption: "awaiting sender service", icon: Mail },
          ];
        } else if (role === "instructor") {
          const { data: instructorRow, error: instructorError } = await supabase
            .from("instructors")
            .select("id")
            .eq("profile_id", profile.id)
            .maybeSingle();

          if (instructorError) throw new Error(instructorError.message);

          const instructorId = (instructorRow as { id?: string } | null)?.id;
          const [courses, liveSessions, helpRequests, assignments] = instructorId
            ? await Promise.all([
                countRows(supabase, "courses", [["instructor_id", instructorId]]),
                countRows(supabase, "live_sessions", [["instructor_id", instructorId]]),
                countRows(supabase, "instructor_help_requests", [["instructor_id", instructorId]]),
                countRows(supabase, "assignments"),
              ])
            : [0, 0, 0, 0];

          nextMetrics = [
            { title: "My courses", value: `${courses}`, caption: "assigned to this instructor", icon: BookOpen },
            { title: "Live sessions", value: `${liveSessions}`, caption: "scheduled in Supabase", icon: Video },
            { title: "Help requests", value: `${helpRequests}`, caption: "student questions", icon: MessageSquare },
            { title: "Assignments", value: `${assignments}`, caption: "visible records", icon: FileText },
          ];
        } else if (role === "parent") {
          const [linkedLearners, payments, notifications, reports] = await Promise.all([
            countRows(supabase, "parent_students", [["parent_id", profile.id]]),
            countRows(supabase, "payments", [["user_id", profile.id]]),
            countRows(supabase, "notifications", [["user_id", profile.id], ["read_at", null]]),
            countRows(supabase, "certificates"),
          ]);

          nextMetrics = [
            { title: "Linked learners", value: `${linkedLearners}`, caption: "approved parent links", icon: Users },
            { title: "Payments", value: `${payments}`, caption: "parent account payments", icon: CreditCard },
            { title: "Unread alerts", value: `${notifications}`, caption: "notifications", icon: MessageSquare },
            { title: "Reports", value: `${reports}`, caption: "visible certificates/reports", icon: FileText },
          ];
        } else {
          const [enrollments, payments, licenceKeys, certificates] = await Promise.all([
            countRows(supabase, "enrollments", [["student_id", profile.id]]),
            countRows(supabase, "payments", [["user_id", profile.id]]),
            countRows(supabase, "licence_keys", [["user_id", profile.id]]),
            countRows(supabase, "certificates", [["student_id", profile.id]]),
          ]);

          nextMetrics = [
            { title: "Enrollments", value: `${enrollments}`, caption: "unlocked courses", icon: BookOpen },
            { title: "Payments", value: `${payments}`, caption: "bank-transfer records", icon: CreditCard },
            { title: "Licence keys", value: `${licenceKeys}`, caption: "issued to this account", icon: KeyRound },
            { title: "Certificates", value: `${certificates}`, caption: "earned records", icon: Award },
          ];
        }

        if (isMounted) {
          setMetrics(nextMetrics);
          setError("");
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Live portal data could not load.");
          setMetrics(loadingMetrics(role).map((metric) => ({ ...metric, value: "0", caption: "no live records loaded" })));
        }
      }
    }

    void loadMetrics();

    return () => {
      isMounted = false;
    };
  }, [role]);

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div key={metric.title} className="rounded-[1.35rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-vortex-muted">{metric.title}</p>
                <span className="grid size-10 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
                  <Icon className="size-4" />
                </span>
              </div>
              <p className="mt-5 font-heading text-4xl font-semibold text-vortex-navy">{metric.value}</p>
              <p className="mt-2 text-xs text-vortex-muted">{metric.caption}</p>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="rounded-[1.35rem] border border-vortex-border bg-white p-5 text-sm leading-7 text-vortex-muted shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-vortex-blue" />
            <p>
              Live data is connected, but this account could not read records yet: {error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function PortalRecordEmptyState({
  title,
  description,
  icon: Icon = Ticket,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="rounded-[1.35rem] border border-vortex-border bg-white p-6 text-center shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-vortex-blue/10 text-vortex-blue">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 font-heading text-3xl font-semibold text-vortex-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-vortex-muted">{description}</p>
    </div>
  );
}
