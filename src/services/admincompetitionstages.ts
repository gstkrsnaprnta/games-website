import { supabase } from "../lib/supabase";

// ─── Bulk replace (untuk form competition) ────────────────────────────────────
// Hapus semua tahapan lama milik competition, lalu insert sekaligus.
// Dipanggil oleh AdminCompetitionsPage setelah competition berhasil disimpan,
// persis seperti replaceAdminTimelines di services/adminTimelines.ts.

type StageBulkItem = {
  title: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
};

export async function replaceAdminCompetitionStages(
  competitionId: string,
  items: StageBulkItem[],
) {
  const { error: deleteError } = await supabase
    .from("competition_stages")
    .delete()
    .eq("competition_id", competitionId);

  if (deleteError) return { error: deleteError };
  if (items.length === 0) return { error: null };

  const rows = items.map((item) => ({
    ...item,
    competition_id: competitionId,
  }));

  const { error: insertError } = await supabase
    .from("competition_stages")
    .insert(rows);
  return { error: insertError };
}