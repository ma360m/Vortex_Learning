import type { SupabaseClient, User } from "@supabase/supabase-js";

import type { VortexProfile, VortexRole } from "./vortex-auth";

export const vortexSessionKey = "vortex_session";

type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone?: string | null;
  role: string | null;
  avatar_url?: string | null;
};

const validRoles = new Set<VortexRole>(["student", "parent", "instructor", "admin", "developer"]);

export function normalizeVortexRole(role: string | null | undefined): VortexRole {
  return role && validRoles.has(role as VortexRole) ? (role as VortexRole) : "student";
}

function nameFromEmail(email: string) {
  const rawName = email.split("@")[0] || "Vortex learner";
  return rawName
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
}

export function profileFromSupabaseRow(row: ProfileRow, user: User): VortexProfile {
  const email = row.email || user.email || "";

  return {
    id: row.id,
    name: row.full_name || user.user_metadata?.full_name || nameFromEmail(email),
    email,
    role: normalizeVortexRole(row.role),
    phone: row.phone ?? undefined,
    avatarUrl: row.avatar_url ?? undefined,
  };
}

export async function loadCurrentVortexProfile(
  supabase: SupabaseClient,
): Promise<VortexProfile | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone, role, avatar_url")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error(
      "Your account signed in, but no Vortex profile exists yet. Run the Supabase schema so the profile trigger can create account records.",
    );
  }

  return profileFromSupabaseRow(data as ProfileRow, user);
}

export function cacheVortexProfile(profile: VortexProfile) {
  window.localStorage.setItem(vortexSessionKey, JSON.stringify(profile));
}

export function clearCachedVortexProfile() {
  window.localStorage.removeItem(vortexSessionKey);
}
