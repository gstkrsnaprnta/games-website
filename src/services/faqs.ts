import { supabase } from "../lib/supabase";
import type { FAQ } from "../types/models";
import { fetchWithCache } from "../utils/publicCache";

export async function getFaqs() {
  return fetchWithCache("faqs_all", 3 * 60 * 1000, async () => {
    const { data, error } = await supabase.from("faqs").select("*").eq("is_active", true).order("sort_order");
    return { data: (data ?? []) as FAQ[], error };
  });
}

