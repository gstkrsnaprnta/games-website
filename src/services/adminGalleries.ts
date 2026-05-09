import { supabase } from "../lib/supabase";

export type AdminGalleryRow = {
  id: string;
  title: string | null;
  image_url: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
};

export async function getAdminGalleries() {
  const { data, error } = await supabase
    .from("galleries")
    .select("id, title, image_url, description, is_active, sort_order")
    .order("sort_order");

  return { data: (data ?? []) as AdminGalleryRow[], error };
}

type GalleryInput = {
  event_id?: string | null;
  title?: string | null;
  image_url: string;
  description?: string | null;
  sort_order?: number;
  is_active?: boolean;
};

async function getDefaultEventId() {
  const { data } = await supabase.from("events").select("id").eq("is_active", true).maybeSingle();
  return data?.id ?? null;
}

export async function saveAdminGallery(input: GalleryInput, id?: string) {
  const payload = { ...input, event_id: input.event_id ?? (await getDefaultEventId()) };
  if (id) return supabase.from("galleries").update(payload).eq("id", id);
  return supabase.from("galleries").insert(payload);
}

export async function deactivateAdminGallery(id: string) {
  return supabase.from("galleries").update({ is_active: false }).eq("id", id);
}
