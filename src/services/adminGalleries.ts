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
