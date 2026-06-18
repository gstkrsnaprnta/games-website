import { supabase } from "../lib/supabase";

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
}

export async function getPartners() {
  const { data, error } = await supabase
    .from("partners")
    .select("id, name, logo_url, website_url, sort_order")
    .eq("is_active", true)
    .order("sort_order");
  return { data: (data ?? []) as Partner[], error };
}
