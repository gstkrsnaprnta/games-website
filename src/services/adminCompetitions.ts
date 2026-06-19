// FILE: src/services/adminCompetitions.ts
import { supabase } from "../lib/supabase";
import type { Competition } from "../types/models";
import { createSlug } from "../utils/slug";

export async function getAdminCompetitions() {
  const { data, error } = await supabase
    .from("competitions")
    .select(
      `*, timelines (
        id, competition_id, title, description,
        start_date, end_date, is_active, sort_order
      )`
    )
    .order("name")
    .order("sort_order", { referencedTable: "timelines", ascending: true });

  return { data: (data ?? []) as Competition[], error };
}

type CompetitionInput = {
  event_id?: string | null;
  name: string;
  slug?: string;
  code: string;
  short_description?: string | null;
  description?: string | null;
  participant_levels?: string[] | null;
  competition_type?: "individual" | "team";
  min_members?: number;
  max_members?: number;
  registration_fee?: number;
  registration_status?: "open" | "closed";
  is_active?: boolean;
  // Kolom baru
  max_teams_per_school?: number | null;
  total_quota?: number | null;
  has_work_submission?: boolean;
  subthemes?: string[];
};

async function getDefaultEventId() {
  const { data } = await supabase
    .from("events")
    .select("id")
    .eq("is_active", true)
    .maybeSingle();
  return data?.id ?? null;
}

export async function saveAdminCompetition(
  input: CompetitionInput,
  id?: string
) {
  const eventId = input.event_id ?? (await getDefaultEventId());
  const payload = {
    ...input,
    event_id: eventId,
    slug: input.slug?.trim() || createSlug(input.name),
    participant_levels: input.participant_levels ?? [],
    subthemes: input.subthemes ?? [],
  };

  if (id) {
    const { data, error } = await supabase
      .from("competitions")
      .update(payload)
      .eq("id", id)
      .select("id")
      .single();
    return { data: data?.id as string | null, error };
  }

  const { data, error } = await supabase
    .from("competitions")
    .insert(payload)
    .select("id")
    .single();
  return { data: data?.id as string | null, error };
}

export async function deleteAdminCompetition(id: string) {
  return supabase.from("competitions").delete().eq("id", id);
}