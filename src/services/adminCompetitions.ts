// FILE: src/services/adminCompetitions.ts
import { supabase } from "../lib/supabase";
import type { Competition, WhatsappContact } from "../types/models";
import { createSlug } from "../utils/slug";

export async function getAdminCompetitions() {
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
      )`,
    )
    .order("name")
    .order("sort_order", { referencedTable: "timelines", ascending: true })
    .order("sort_order", { referencedTable: "stages", ascending: true })
    .order("sort_order", { referencedTable: "mechanisms", ascending: true });

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
  // Kontak WhatsApp panitia (CP), bisa beda nomor per jenjang
  whatsapp_cp?: WhatsappContact[] | null;
  // Kolom baru
  max_teams_per_school?: number | null;
  total_quota?: number | null;
  has_work_submission?: boolean;
  main_theme?: string | null;
  subthemes?: string[];
  show_timeline?: boolean;
  show_stages?: boolean;
  show_mechanisms?: boolean;
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
  id?: string,
) {
  const eventId = input.event_id ?? (await getDefaultEventId());
  const payload = {
    ...input,
    event_id: eventId,
    slug: input.slug?.trim() || createSlug(input.name),
    participant_levels: input.participant_levels ?? [],
    subthemes: input.subthemes ?? [],
    whatsapp_cp: input.whatsapp_cp ?? [],
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