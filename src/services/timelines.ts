import { supabase } from "../lib/supabase";

export async function getTimelines() {
  return supabase.from("timelines").select("*").eq("is_active", true).order("sort_order").order("start_date");
}
