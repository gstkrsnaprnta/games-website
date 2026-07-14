import { supabase } from "../lib/supabase";

type MechanismBulkItem = {
  title: string;
  items: string[];
  sort_order: number;
};

export async function replaceAdminCompetitionMechanisms(
  competitionId: string,
  items: MechanismBulkItem[],
) {
  const { error: deleteError } = await supabase
    .from("competition_detail_mechanisms")
    .delete()
    .eq("competition_id", competitionId);

  if (deleteError) return { error: deleteError };
  if (items.length === 0) return { error: null };

  const rows = items.map((item) => ({
    ...item,
    competition_id: competitionId,
  }));

  const { error: insertError } = await supabase
    .from("competition_detail_mechanisms")
    .insert(rows);
  return { error: insertError };
}
