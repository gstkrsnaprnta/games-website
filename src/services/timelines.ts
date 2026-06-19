import { supabase } from "../lib/supabase";
import type { GeneralTimelineItem } from "../types/models";

export async function getGeneralTimelines(eventId: string) {
  const { data, error } = await supabase
    .from("timelines")
    .select(`
      id,
      timeline_scope,
      title,
      description,
      start_date,
      end_date,
      sort_order
    `)
    .eq("event_id", eventId)
    .is("competition_id", null)
    .eq("is_active", true)
    .in("timeline_scope", ["regional", "nasional"])
    .order("sort_order", { ascending: true });

  return { data: (data ?? []) as GeneralTimelineItem[], error };
}
