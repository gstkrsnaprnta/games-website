import { supabase } from "../lib/supabase";

export async function getAnnouncements() {
  return supabase
    .from("announcements")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
}

export async function getAnnouncementBySlug(slug: string) {
  return supabase.from("announcements").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
}
