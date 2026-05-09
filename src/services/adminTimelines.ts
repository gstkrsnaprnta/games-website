import { supabase } from "../lib/supabase";

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

export async function getAdminTimelines() {
  const { data, error } = await supabase
    .from("timelines")
    .select("id, competition_id, title, description, start_date, end_date, is_active, sort_order, competitions(name)")
    .order("sort_order")
    .order("start_date");

  return { data: (data ?? []) as unknown as AdminTimelineRow[], error };
}

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
  const { data } = await supabase.from("events").select("id").eq("is_active", true).maybeSingle();
  return data?.id ?? null;
}

export async function saveAdminTimeline(input: TimelineInput, id?: string) {
  const payload = { ...input, event_id: input.event_id ?? (await getDefaultEventId()) };
  if (id) return supabase.from("timelines").update(payload).eq("id", id);
  return supabase.from("timelines").insert(payload);
}

export async function deleteAdminTimeline(id: string) {
  return supabase.from("timelines").delete().eq("id", id);
}
