// FILE: src/services/adminCompetitionSyllabus.ts
import { supabase } from "../lib/supabase";

type SyllabusInput = {
  title: string | null;
  items: string[];
  sort_order: number;
};

export async function replaceAdminCompetitionSyllabus(
  competitionId: string,
  items: SyllabusInput[],
) {
  // Delete existing syllabus records
  const { error: deleteError } = await supabase
    .from("competition_syllabus")
    .delete()
    .eq("competition_id", competitionId);

  if (deleteError) return { error: deleteError };

  if (items.length === 0) return { error: null };

  // Insert new syllabus records
  const { error: insertError } = await supabase
    .from("competition_syllabus")
    .insert(
      items.map((item) => ({
        competition_id: competitionId,
        title: item.title?.trim() || null,
        items: item.items,
        sort_order: item.sort_order,
      })),
    );

  return { error: insertError };
}
