import { supabase } from "../lib/supabase";
import type { Competition } from "../types/models";
import { createSlug } from "../utils/slug";

export async function getAdminCompetitions() {
  const { data, error } = await supabase.from("competitions").select("*").order("name");
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
};

async function getDefaultEventId() {
  const { data } = await supabase.from("events").select("id").eq("is_active", true).maybeSingle();
  return data?.id ?? null;
}

export async function saveAdminCompetition(input: CompetitionInput, id?: string) {
  const eventId = input.event_id ?? (await getDefaultEventId());
  const payload = {
    ...input,
    event_id: eventId,
    slug: input.slug?.trim() || createSlug(input.name),
    participant_levels: input.participant_levels ?? [],
  };

  if (id) return supabase.from("competitions").update(payload).eq("id", id);
  return supabase.from("competitions").insert(payload);
}

export async function deleteAdminCompetition(id: string) {
  return supabase.from("competitions").delete().eq("id", id);
}
