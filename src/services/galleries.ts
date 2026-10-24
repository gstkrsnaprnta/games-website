import { supabase } from "../lib/supabase";
import type { Gallery } from "../types/models";
import { fetchWithCache } from "../utils/publicCache";

export async function getGalleries() {
  return fetchWithCache("galleries_all", 3 * 60 * 1000, async () => {
    const { data, error } = await supabase
      .from("galleries")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    return { data: (data ?? []) as Gallery[], error };
  });
}
