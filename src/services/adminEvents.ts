import { supabase } from "../lib/supabase";
import type { Event } from "../types/models";

export type AdminEventInput = {
  year: number;
  name: string;
  theme?: string | null;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  is_active?: boolean;
};

export async function getAdminEvents() {
  const { data, error } = await supabase.from("events").select("*").order("year", { ascending: false });
  return { data: (data ?? []) as Event[], error };
}

export async function saveAdminEvent(input: AdminEventInput, id?: string) {
  if (input.is_active) {
    const { error } = await supabase.from("events").update({ is_active: false }).neq("id", id ?? "00000000-0000-0000-0000-000000000000");
    if (error) return { error };
  }

  const payload = {
    year: input.year,
    name: input.name,
    theme: input.theme ?? null,
    description: input.description ?? null,
    start_date: input.start_date || null,
    end_date: input.end_date || null,
    is_active: input.is_active ?? false,
  };

  if (id) return supabase.from("events").update(payload).eq("id", id);
  return supabase.from("events").insert(payload);
}

export async function setAdminEventActive(id: string) {
  const { error } = await supabase.from("events").update({ is_active: false }).neq("id", id);
  if (error) return { error };
  return supabase.from("events").update({ is_active: true }).eq("id", id);
}

export async function deleteAdminEvent(id: string) {
  return supabase.from("events").delete().eq("id", id);
}
