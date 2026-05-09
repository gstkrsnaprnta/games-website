import { supabase } from "../lib/supabase";

export type AdminSponsorRow = {
  id: string;
  name: string;
  sponsor_type: string;
  website_url: string | null;
  is_active: boolean;
  sort_order: number;
};

export async function getAdminSponsors() {
  const { data, error } = await supabase
    .from("sponsors")
    .select("id, name, sponsor_type, website_url, is_active, sort_order")
    .order("sort_order")
    .order("name");

  return { data: (data ?? []) as AdminSponsorRow[], error };
}
