import { supabase } from "../lib/supabase";

export async function getSponsors() {
  return supabase.from("sponsors").select("*").eq("is_active", true).order("sort_order");
}
