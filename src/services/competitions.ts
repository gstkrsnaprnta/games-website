import { supabase } from "../lib/supabase";

export async function getCompetitions() {
  return supabase.from("competitions").select("*").eq("is_active", true).order("name");
}

export async function getCompetitionBySlug(slug: string) {
  return supabase.from("competitions").select("*").eq("slug", slug).eq("is_active", true).maybeSingle();
}
