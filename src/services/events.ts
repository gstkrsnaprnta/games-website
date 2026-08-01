import { supabase } from "../lib/supabase";
import type { Event } from "../types/models";
import { fetchWithCache } from "../utils/publicCache";

export async function getActiveEvent() {
  return fetchWithCache("active_event", 3 * 60 * 1000, async () => {
    const { data, error } = await supabase.from("events").select("*").eq("is_active", true).maybeSingle();
    return { data: data as Event | null, error };
  });
}
