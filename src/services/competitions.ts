import { supabase } from "../lib/supabase";
import type { Competition } from "../types/models";

export async function getCompetitions() {
  const { data, error } = await supabase.from("competitions").select("*").eq("is_active", true).order("name");
  return { data: (data ?? []) as Competition[], error };
}

export async function getOpenCompetitions() {
  const { data, error } = await supabase
    .from("competitions")
    .select("*")
    .eq("is_active", true)
    .eq("registration_status", "open")
    .order("name");
  return { data: (data ?? []) as Competition[], error };
}

export async function getCompetitionBySlug(slug: string) {
  const { data, error } = await supabase
    .from("competitions")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  return { data: data as Competition | null, error };
}
