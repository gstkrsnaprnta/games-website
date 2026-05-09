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

type SponsorInput = {
  event_id?: string | null;
  name: string;
  logo_url?: string | null;
  website_url?: string | null;
  sponsor_type?: string;
  sort_order?: number;
  is_active?: boolean;
};

async function getDefaultEventId() {
  const { data } = await supabase.from("events").select("id").eq("is_active", true).maybeSingle();
  return data?.id ?? null;
}

export async function saveAdminSponsor(input: SponsorInput, id?: string) {
  const payload = { ...input, event_id: input.event_id ?? (await getDefaultEventId()) };
  if (id) return supabase.from("sponsors").update(payload).eq("id", id);
  return supabase.from("sponsors").insert(payload);
}

export async function deactivateAdminSponsor(id: string) {
  return supabase.from("sponsors").update({ is_active: false }).eq("id", id);
}
