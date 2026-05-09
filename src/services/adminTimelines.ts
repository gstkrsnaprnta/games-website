import { supabase } from "../lib/supabase";

export type AdminTimelineRow = {
  id: string;
  title: string;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  sort_order: number;
  competitions: { name: string } | null;
};

export async function getAdminTimelines() {
  const { data, error } = await supabase
    .from("timelines")
    .select("id, title, start_date, end_date, is_active, sort_order, competitions(name)")
    .order("sort_order")
    .order("start_date");

  return { data: (data ?? []) as unknown as AdminTimelineRow[], error };
}
