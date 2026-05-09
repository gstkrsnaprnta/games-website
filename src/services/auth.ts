import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Profile } from "../types/models";

export async function signInAdmin(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOutAdmin() {
  return supabase.auth.signOut();
}

export async function getCurrentSession() {
  return supabase.auth.getSession();
}

export async function getCurrentAdminProfile(session: Session | null) {
  if (!session?.user.id) {
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, is_active")
    .eq("id", session.user.id)
    .maybeSingle();

  const profile = data as Profile | null;
  const isAllowed = profile?.is_active === true && ["admin", "super_admin"].includes(profile.role);

  return { data: isAllowed ? profile : null, error };
}
