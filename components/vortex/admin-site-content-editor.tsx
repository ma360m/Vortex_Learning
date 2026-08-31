"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  MessageSquareQuote,
  Newspaper,
  ShieldCheck,
} from "lucide-react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";
import { loadCurrentVortexProfile } from "@/lib/supabase-profile";

type FeedbackDraft = {
  name: string;
  role: string;
  quote: string;
};

type PolicyDraft = {
  slug: string;
  title: string;
  summary: string;
  sections: string[][];
};

type SocialDraft = {
  kind: string;
  label: string;
  href: string;
};

type ProjectDraft = {
  title: string;
  description: string;
  points: string[];
};

type AdminSiteContentEditorProps = {
  heroBadge: string;
  feedbacks: FeedbackDraft[];
  policies: PolicyDraft[];
  project: ProjectDraft;
  socials: SocialDraft[];
};

type ContentBlockRow = {
  block_key: string;
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  href: string | null;
  metadata: unknown;
};

type FeedbackRow = {
  name: string;
  role: string | null;
  quote: string;
  sort_order: number | null;
};

type PolicyRow = {
  slug: string;
  title: string;
  summary: string;
  sections: unknown;
};

type SocialRow = {
  kind: string;
  label: string;
  href: string;
};

function feedbackKey(index: number, feedback: FeedbackDraft) {
  const cleanName = feedback.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return cleanName || `feedback-${index + 1}`;
}

function policySections(value: unknown, fallback: string[][]) {
  if (!Array.isArray(value)) return fallback;

  const rows = value.filter((row): row is string[] => (
    Array.isArray(row) &&
    typeof row[0] === "string" &&
    typeof row[1] === "string"
  ));

  return rows.length ? rows : fallback;
}

export function AdminSiteContentEditor({
  heroBadge,
  feedbacks,
  policies,
  project,
  socials,
}: AdminSiteContentEditorProps) {
  const [badge, setBadge] = useState(heroBadge);
  const [feedbackDrafts, setFeedbackDrafts] = useState(feedbacks);
  const [policyDrafts, setPolicyDrafts] = useState(policies);
  const [projectDraft, setProjectDraft] = useState(project);
  const [socialDrafts, setSocialDrafts] = useState(socials);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const contentCount = useMemo(
    () => feedbackDrafts.length + policyDrafts.length + socialDrafts.length + 2,
    [feedbackDrafts.length, policyDrafts.length, socialDrafts.length],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadSavedContent() {
      if (!isSupabaseConfigured()) return;

      try {
        const supabase = getSupabaseClient();
        const [blocksResult, feedbackResult, policyResult, socialResult] = await Promise.all([
          supabase
            .from("site_content_blocks")
            .select("block_key, eyebrow, title, body, href, metadata")
            .in("block_key", ["home_hero_badge", "home_feedback", "project_attribution"]),
          supabase
            .from("site_student_feedbacks")
            .select("name, role, quote, sort_order")
            .eq("published", true)
            .order("sort_order", { ascending: true }),
          supabase
            .from("site_policy_pages")
            .select("slug, title, summary, sections")
            .eq("published", true),
          supabase
            .from("site_social_links")
            .select("kind, label, href")
            .eq("published", true)
            .order("sort_order", { ascending: true }),
        ]);

        const tableError = blocksResult.error || feedbackResult.error || policyResult.error || socialResult.error;
        if (tableError) throw new Error(tableError.message);

        if (!isMounted) return;

        const blocks = (blocksResult.data as ContentBlockRow[] | null) ?? [];
        const savedBadge = blocks.find((block) => block.block_key === "home_hero_badge");
        const savedProject = blocks.find((block) => block.block_key === "project_attribution");

        if (savedBadge?.title) setBadge(savedBadge.title);
        if (savedProject?.title || savedProject?.body) {
          setProjectDraft((current) => ({
            ...current,
            title: savedProject.title || current.title,
            description: savedProject.body || current.description,
          }));
        }

        const savedFeedbacks = (feedbackResult.data as FeedbackRow[] | null) ?? [];
        if (savedFeedbacks.length) {
          setFeedbackDrafts(savedFeedbacks.map((item) => ({
            name: item.name,
            role: item.role || "Student feedback",
            quote: item.quote,
          })));
        }

        const savedPolicies = (policyResult.data as PolicyRow[] | null) ?? [];
        if (savedPolicies.length) {
          setPolicyDrafts((current) => current.map((policy) => {
            const savedPolicy = savedPolicies.find((item) => item.slug === policy.slug);
            if (!savedPolicy) return policy;

            return {
              ...policy,
              title: savedPolicy.title,
              summary: savedPolicy.summary,
              sections: policySections(savedPolicy.sections, policy.sections),
            };
          }));
        }

        const savedSocials = (socialResult.data as SocialRow[] | null) ?? [];
        if (savedSocials.length) {
          setSocialDrafts(savedSocials);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? `${loadError.message}. Run database/vortex_site_content_schema.sql if these tables are not installed yet.`
              : "Website content could not be loaded.",
          );
        }
      }
    }

    void loadSavedContent();

    return () => {
      isMounted = false;
    };
  }, []);

  async function saveAll() {
    setSaving(true);
    setStatus("");
    setError("");

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured.");
      }

      const supabase = getSupabaseClient();
      const profile = await loadCurrentVortexProfile(supabase);

      if (!profile?.id || profile.role !== "admin") {
        throw new Error("Only approved admin accounts can save website content.");
      }

      const updatedBy = profile.id;
      const today = new Date().toISOString().slice(0, 10);

      const [blocksResult, feedbackResult, policyResult, socialResult] = await Promise.all([
        supabase.from("site_content_blocks").upsert(
          [
            {
              block_key: "home_hero_badge",
              eyebrow: null,
              title: badge,
              body: null,
              href: null,
              metadata: {},
              published: true,
              updated_by: updatedBy,
            },
            {
              block_key: "home_feedback",
              eyebrow: "Student feedback",
              title: "Clear guidance, real progress",
              body:
                "Students and families come here for structured courses, practical reminders, teacher support, and a learning path that is easier to follow.",
              href: "/support#community",
              metadata: { secondary_href: "/blog", secondary_label: "See our blogs" },
              published: true,
              updated_by: updatedBy,
            },
            {
              block_key: "project_attribution",
              eyebrow: "Phonics Club initiative",
              title: projectDraft.title,
              body: projectDraft.description,
              href: "/about#phonics-club",
              metadata: { points: projectDraft.points },
              published: true,
              updated_by: updatedBy,
            },
          ],
          { onConflict: "block_key" },
        ),
        supabase.from("site_student_feedbacks").upsert(
          feedbackDrafts.map((feedback, index) => ({
            feedback_key: feedbackKey(index, feedback),
            name: feedback.name,
            role: feedback.role,
            quote: feedback.quote,
            sort_order: index + 1,
            published: true,
            updated_by: updatedBy,
          })),
          { onConflict: "feedback_key" },
        ),
        supabase.from("site_policy_pages").upsert(
          policyDrafts.map((policy) => ({
            slug: policy.slug,
            title: policy.title,
            summary: policy.summary,
            sections: policy.sections,
            last_updated: today,
            published: true,
            updated_by: updatedBy,
          })),
          { onConflict: "slug" },
        ),
        supabase.from("site_social_links").upsert(
          socialDrafts.map((social, index) => ({
            kind: social.kind,
            label: social.label,
            href: social.href,
            sort_order: index + 1,
            published: true,
            updated_by: updatedBy,
          })),
          { onConflict: "kind" },
        ),
      ]);

      const saveError = blocksResult.error || feedbackResult.error || policyResult.error || socialResult.error;
      if (saveError) throw new Error(saveError.message);

      setStatus("Website content saved to Supabase. Published pages will use these values when the content tables are installed.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Website content could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-5">
      <div className="rounded-2xl border border-vortex-border bg-vortex-soft p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-vortex-blue">Live content editor</p>
            <h3 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">
              Homepage, feedback, policies, and footer links
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-vortex-muted">
              These fields save to Supabase content tables under the approved admin account. Public pages keep the built-in defaults and use published Supabase values when available.
            </p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-vortex-navy">
            {contentCount} editable records
          </div>
        </div>
        {(status || error) && (
          <div className={`mt-4 flex items-start gap-3 rounded-2xl border bg-white p-4 text-sm ${error ? "border-red-200 text-red-700" : "border-vortex-cyan/40 text-vortex-slate"}`}>
            {error ? <ShieldCheck className="mt-0.5 size-5 shrink-0" /> : <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-vortex-blue" />}
            <p>{error || status}</p>
          </div>
        )}
      </div>

      <div className="grid gap-5 2xl:grid-cols-2">
        <section className="rounded-2xl border border-vortex-border bg-white p-4">
          <div className="flex items-center gap-3">
            <Newspaper className="size-5 text-vortex-blue" />
            <h3 className="text-sm font-semibold text-vortex-navy">Homepage hero</h3>
          </div>
          <label className="mt-4 grid gap-2 text-xs font-semibold uppercase text-vortex-blue">
            Hero badge
            <input
              value={badge}
              onChange={(event) => setBadge(event.target.value)}
              className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm normal-case text-vortex-navy outline-none"
            />
          </label>
        </section>

        <section className="rounded-2xl border border-vortex-border bg-white p-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-vortex-blue" />
            <h3 className="text-sm font-semibold text-vortex-navy">About attribution</h3>
          </div>
          <label className="mt-4 grid gap-2 text-xs font-semibold uppercase text-vortex-blue">
            Title
            <input
              value={projectDraft.title}
              onChange={(event) => setProjectDraft((current) => ({ ...current, title: event.target.value }))}
              className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm normal-case text-vortex-navy outline-none"
            />
          </label>
          <label className="mt-3 grid gap-2 text-xs font-semibold uppercase text-vortex-blue">
            Description
            <textarea
              value={projectDraft.description}
              onChange={(event) => setProjectDraft((current) => ({ ...current, description: event.target.value }))}
              className="min-h-24 rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm normal-case text-vortex-navy outline-none"
            />
          </label>
        </section>

        <section className="rounded-2xl border border-vortex-border bg-white p-4">
          <div className="flex items-center gap-3">
            <MessageSquareQuote className="size-5 text-vortex-blue" />
            <h3 className="text-sm font-semibold text-vortex-navy">Student feedback</h3>
          </div>
          <div className="mt-4 grid gap-3">
            {feedbackDrafts.map((feedback, index) => (
              <div key={`${feedback.name}-${index}`} className="grid gap-2 rounded-2xl bg-vortex-soft p-3">
                <input
                  value={feedback.name}
                  onChange={(event) => setFeedbackDrafts((current) => current.map((item, itemIndex) => (
                    itemIndex === index ? { ...item, name: event.target.value } : item
                  )))}
                  className="h-10 rounded-xl border border-vortex-border bg-white px-3 text-sm font-semibold text-vortex-navy outline-none"
                />
                <input
                  value={feedback.role}
                  onChange={(event) => setFeedbackDrafts((current) => current.map((item, itemIndex) => (
                    itemIndex === index ? { ...item, role: event.target.value } : item
                  )))}
                  className="h-10 rounded-xl border border-vortex-border bg-white px-3 text-xs text-vortex-muted outline-none"
                />
                <textarea
                  value={feedback.quote}
                  onChange={(event) => setFeedbackDrafts((current) => current.map((item, itemIndex) => (
                    itemIndex === index ? { ...item, quote: event.target.value } : item
                  )))}
                  className="min-h-20 rounded-xl border border-vortex-border bg-white px-3 py-2 text-sm text-vortex-navy outline-none"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-vortex-border bg-white p-4">
          <div className="flex items-center gap-3">
            <FileText className="size-5 text-vortex-blue" />
            <h3 className="text-sm font-semibold text-vortex-navy">Policies and socials</h3>
          </div>
          <div className="mt-4 grid gap-3">
            {policyDrafts.map((policy, index) => (
              <label key={policy.slug} className="grid gap-2 text-xs font-semibold uppercase text-vortex-blue">
                {policy.title}
                <input
                  value={policy.summary}
                  onChange={(event) => setPolicyDrafts((current) => current.map((item, itemIndex) => (
                    itemIndex === index ? { ...item, summary: event.target.value } : item
                  )))}
                  className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm normal-case text-vortex-navy outline-none"
                />
              </label>
            ))}
            {socialDrafts.map((social, index) => (
              <label key={social.kind} className="grid gap-2 text-xs font-semibold uppercase text-vortex-blue">
                {social.label} URL
                <input
                  value={social.href}
                  onChange={(event) => setSocialDrafts((current) => current.map((item, itemIndex) => (
                    itemIndex === index ? { ...item, href: event.target.value } : item
                  )))}
                  className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm normal-case text-vortex-navy outline-none"
                />
              </label>
            ))}
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={saveAll}
        disabled={saving}
        className="btn-primary h-12 w-full justify-center px-5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
      >
        {saving ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
        Save website content
      </button>
    </div>
  );
}
