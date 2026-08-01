import { supabase } from "../lib/supabase";
import type { Announcement } from "../types/models";
import { fetchWithCache } from "../utils/publicCache";

const TTL = 3 * 60 * 1000; // 3 menit

export async function getAnnouncements() {
  return fetchWithCache("announcements_all", TTL, async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    return { data: (data ?? []) as Announcement[], error };
  });
}

export async function getAnnouncementBySlug(slug: string) {
  // Kunci cache menyertakan slug agar setiap pengumuman disimpan secara terpisah.
  return fetchWithCache(`announcement_${slug}`, TTL, async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return { data: data as Announcement | null, error };
  });
}

