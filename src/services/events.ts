import { supabase } from "../lib/supabase";

export async function getActiveEvent() {
  return supabase.from("events").select("*").eq("is_active", true).maybeSingle();
}
