import { supabase } from "../lib/supabase";
import { fetchWithCache } from "../utils/publicCache";

export interface Sponsor {
  id: string;
  event_id: string | null;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  sponsor_type: string | null;
  sort_order: number | null;
  is_active: boolean | null;
  created_at: string | null;
}

export async function getSponsors() {
  return fetchWithCache("sponsors_all", 3 * 60 * 1000, async () => {
    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    return { data: (data ?? []) as Sponsor[], error };
  });
}
