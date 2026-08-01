import { supabase } from "../lib/supabase";
import type { GeneralTimelineItem } from "../types/models";
import { fetchWithCache } from "../utils/publicCache";

export async function getGeneralTimelines(eventId: string) {
  // Kunci cache menyertakan eventId agar timeline per event disimpan terpisah.
  return fetchWithCache(`timelines_${eventId}`, 3 * 60 * 1000, async () => {
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
  });
}

