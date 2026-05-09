import { supabase } from "../lib/supabase";
import type { Competition } from "../types/models";

export async function getAdminCompetitions() {
  const { data, error } = await supabase.from("competitions").select("*").order("name");
  return { data: (data ?? []) as Competition[], error };
}
