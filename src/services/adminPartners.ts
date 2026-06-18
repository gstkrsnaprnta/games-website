import { supabase } from "../lib/supabase";

export type AdminPartnerRow = {
  id: string;
  name: string;
  website_url: string | null;
  logo_url: string | null;
  is_active: boolean;
  sort_order: number;
};

export async function getAdminPartners() {
  const { data, error } = await supabase
    .from("partners")
    .select("id, name, website_url, logo_url, is_active, sort_order")
    .order("sort_order")
    .order("name");
  return { data: (data ?? []) as AdminPartnerRow[], error };
}

type PartnerInput = {
  name: string;
  logo_url?: string | null;
  website_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
};

export async function saveAdminPartner(input: PartnerInput, id?: string) {
  if (id) return supabase.from("partners").update(input).eq("id", id);
  return supabase.from("partners").insert(input);
}

export async function deactivateAdminPartner(id: string) {
  return supabase.from("partners").update({ is_active: false }).eq("id", id);
}
