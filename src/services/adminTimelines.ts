import { supabase } from "../lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AdminTimelineRow = {
  id: string;
  competition_id: string | null;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  sort_order: number;
  competitions: { name: string } | null;
};

// ─── Get all ──────────────────────────────────────────────────────────────────

export async function getAdminTimelines() {
  const { data, error } = await supabase
    .from("timelines")
    .select(
      "id, competition_id, title, description, start_date, end_date, is_active, sort_order, competitions(name)",
    )
    .order("sort_order")
    .order("start_date");

  return { data: (data ?? []) as unknown as AdminTimelineRow[], error };
}

// ─── Get by competition ───────────────────────────────────────────────────────

export async function getAdminTimelinesByCompetition(competitionId: string) {
  const { data, error } = await supabase
    .from("timelines")
    .select(
      "id, competition_id, title, description, start_date, end_date, is_active, sort_order",
    )
    .eq("competition_id", competitionId)
    .order("sort_order")
    .order("start_date");

  return { data: (data ?? []) as unknown as AdminTimelineRow[], error };
}

// ─── Save (insert / update) ───────────────────────────────────────────────────

type TimelineInput = {
  event_id?: string | null;
  competition_id?: string | null;
  title: string;
  description?: string | null;
  start_date: string;
  end_date?: string | null;
  sort_order?: number;
  is_active?: boolean;
};

async function getDefaultEventId() {
  const { data } = await supabase
    .from("events")
    .select("id")
    .eq("is_active", true)
    .maybeSingle();
  return data?.id ?? null;
}

export async function saveAdminTimeline(input: TimelineInput, id?: string) {
  const payload = {
    ...input,
    event_id: input.event_id ?? (await getDefaultEventId()),
  };
  if (id) return supabase.from("timelines").update(payload).eq("id", id);
  return supabase.from("timelines").insert(payload);
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteAdminTimeline(id: string) {
  return supabase.from("timelines").delete().eq("id", id);
}

// ─── Bulk replace (untuk form competition) ────────────────────────────────────
// Hapus semua timeline lama milik competition, lalu insert sekaligus.
// Dipanggil oleh AdminCompetitionsPage setelah competition berhasil disimpan.

type TimelineBulkItem = {
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  sort_order: number;
  is_active: boolean;
};

export async function replaceAdminTimelines(
  competitionId: string,
  items: TimelineBulkItem[],
) {
  const { error: deleteError } = await supabase
    .from("timelines")
    .delete()
    .eq("competition_id", competitionId);

  if (deleteError) return { error: deleteError };
  if (items.length === 0) return { error: null };

  const eventId = await getDefaultEventId();
  const rows = items.map((item) => ({
    ...item,
    competition_id: competitionId,
    event_id: eventId,
  }));

  const { error: insertError } = await supabase.from("timelines").insert(rows);
  return { error: insertError };
}
