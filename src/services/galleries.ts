import { supabase } from "../lib/supabase";

export async function getGalleries() {
  return supabase.from("galleries").select("*").eq("is_active", true).order("sort_order");
}
