import { supabase } from "../lib/supabase";
import { createSlug } from "../utils/slug";

export type AdminAnnouncementRow = {
  id: string;
  competition_id?: string | null;
  title: string;
  slug?: string;
  category: string;
  content?: string;
  status: "draft" | "published";
  published_at: string | null;
  competitions: { name: string } | null;
};

export async function getAdminAnnouncements() {
  const { data, error } = await supabase
    .from("announcements")
    .select("id, competition_id, title, slug, category, content, status, published_at, competitions(name)")
    .order("created_at", { ascending: false });

  return { data: (data ?? []) as unknown as AdminAnnouncementRow[], error };
}

type AnnouncementInput = {
  event_id?: string | null;
  competition_id?: string | null;
  title: string;
  slug?: string;
  category?: string;
  content: string;
  status?: "draft" | "published";
  published_at?: string | null;
};

async function getDefaultEventId() {
  const { data } = await supabase.from("events").select("id").eq("is_active", true).maybeSingle();
  return data?.id ?? null;
}

export async function saveAdminAnnouncement(input: AnnouncementInput, id?: string) {
  const status = input.status ?? "draft";
  const payload = {
    ...input,
    event_id: input.event_id ?? (await getDefaultEventId()),
    slug: input.slug?.trim() || createSlug(input.title),
    category: input.category?.trim() || "general",
    status,
    published_at: status === "published" ? input.published_at ?? new Date().toISOString() : null,
  };

  if (id) return supabase.from("announcements").update(payload).eq("id", id);
  return supabase.from("announcements").insert(payload);
}

export async function deleteAdminAnnouncement(id: string) {
  return supabase.from("announcements").delete().eq("id", id);
}
