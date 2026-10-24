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
  const { data } = await supabase
    .from("events")
    .select("id")
    .eq("is_active", true)
    .maybeSingle();
  return data?.id ?? null;
}

export async function saveAdminGallery(input: GalleryInput, id?: string) {
  const payload = {
    ...input,
    event_id: input.event_id ?? (await getDefaultEventId()),
  };
  if (id) return supabase.from("galleries").update(payload).eq("id", id);
  return supabase.from("galleries").insert(payload);
}

export async function deactivateAdminGallery(id: string) {
  return supabase.from("galleries").update({ is_active: false }).eq("id", id);
}

const GALLERY_BUCKET = "galleries";

export async function uploadGalleryImage(file: File, ext: string) {
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from(GALLERY_BUCKET)
    .upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type,
    });

  if (error) return { url: null, error };

  const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}

function getGalleryStoragePath(url: string) {
  const marker = `/storage/v1/object/public/${GALLERY_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length).split("?")[0]);
}

export async function deleteAdminGallery(id: string, imageUrl: string) {
  const { error } = await supabase.from("galleries").delete().eq("id", id);
  if (error) return { error };

  // Hapus file di Storage (abaikan jika URL bukan dari bucket galleries)
  const path = getGalleryStoragePath(imageUrl);
  if (path) {
    await supabase.storage.from(GALLERY_BUCKET).remove([path]);
  }

  return { error: null };
}
