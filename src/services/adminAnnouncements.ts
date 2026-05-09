import { supabase } from "../lib/supabase";

export type AdminAnnouncementRow = {
  id: string;
  title: string;
  category: string;
  status: "draft" | "published";
  published_at: string | null;
  competitions: { name: string } | null;
};

export async function getAdminAnnouncements() {
  const { data, error } = await supabase
    .from("announcements")
    .select("id, title, category, status, published_at, competitions(name)")
    .order("created_at", { ascending: false });

  return { data: (data ?? []) as unknown as AdminAnnouncementRow[], error };
}
