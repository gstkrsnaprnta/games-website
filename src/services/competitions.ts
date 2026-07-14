import { supabase } from "../lib/supabase";
import type { Competition } from "../types/models";

export async function getCompetitions() {
  const { data, error } = await supabase
    .from("competitions")
    .select("*")
    .eq("is_active", true)
    .order("name");
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

// Join timelines & stages & mechanisms (aktif saja, diurutkan by sort_order) untuk halaman detail.
export async function getCompetitionBySlug(slug: string) {
  const { data, error } = await supabase
    .from("competitions")
    .select(
      `*, timelines (
        id, competition_id, title, description,
        start_date, end_date, is_active, sort_order
      ), stages:competition_stages (
        id, competition_id, title, description, is_active, sort_order
      ), mechanisms:competition_detail_mechanisms (
        id, competition_id, title, items, sort_order
      ), syllabus:competition_syllabus (
        id, competition_id, title, items, sort_order
      )`,
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .eq("timelines.is_active", true)
    .eq("stages.is_active", true)
    .order("sort_order", { referencedTable: "timelines", ascending: true })
    .order("sort_order", { referencedTable: "stages", ascending: true })
    .order("sort_order", { referencedTable: "mechanisms", ascending: true })
    .order("sort_order", { referencedTable: "syllabus", ascending: true })
    .maybeSingle();

  return { data: data as Competition | null, error };
}