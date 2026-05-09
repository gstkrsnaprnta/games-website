import { supabase } from "../lib/supabase";
import type { Announcement } from "../types/models";

export async function getAnnouncements() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return { data: (data ?? []) as Announcement[], error };
}

export async function getAnnouncementBySlug(slug: string) {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return { data: data as Announcement | null, error };
}
