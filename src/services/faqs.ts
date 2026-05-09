import { supabase } from "../lib/supabase";

export async function getFaqs() {
  return supabase.from("faqs").select("*").eq("is_active", true).order("sort_order");
}
