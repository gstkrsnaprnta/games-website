import { supabase } from "../lib/supabase";

export type AdminFaqRow = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
};

export async function getAdminFaqs() {
  const { data, error } = await supabase
    .from("faqs")
    .select("id, question, answer, sort_order, is_active")
    .order("sort_order");

  return { data: (data ?? []) as AdminFaqRow[], error };
}
