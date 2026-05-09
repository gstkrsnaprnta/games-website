import { supabase } from "../lib/supabase";
import type { Event } from "../types/models";

export async function getActiveEvent() {
  const { data, error } = await supabase.from("events").select("*").eq("is_active", true).maybeSingle();
  return { data: data as Event | null, error };
}
