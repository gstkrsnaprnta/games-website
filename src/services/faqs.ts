import { supabase } from "../lib/supabase";
import type { FAQ } from "../types/models";

export async function getFaqs() {
  const { data, error } = await supabase.from("faqs").select("*").eq("is_active", true).order("sort_order");
  return { data: (data ?? []) as FAQ[], error };
}
