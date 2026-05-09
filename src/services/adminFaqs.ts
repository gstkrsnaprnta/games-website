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

type FaqInput = {
  event_id?: string | null;
  question: string;
  answer: string;
  sort_order?: number;
  is_active?: boolean;
};

async function getDefaultEventId() {
  const { data } = await supabase.from("events").select("id").eq("is_active", true).maybeSingle();
  return data?.id ?? null;
}

export async function saveAdminFaq(input: FaqInput, id?: string) {
  const payload = { ...input, event_id: input.event_id ?? (await getDefaultEventId()) };
  if (id) return supabase.from("faqs").update(payload).eq("id", id);
  return supabase.from("faqs").insert(payload);
}

export async function deleteAdminFaq(id: string) {
  return supabase.from("faqs").delete().eq("id", id);
}
