import { supabase } from "../lib/supabase";
import type { Timeline } from "../types/models";

export async function getTimelines() {
  const { data, error } = await supabase
    .from("timelines")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")
    .order("start_date");
  return { data: (data ?? []) as Timeline[], error };
}
