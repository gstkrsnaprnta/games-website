import { supabase } from "../lib/supabase";
import type { PaymentMethod, PaymentMethodType } from "../types/models";

export type AdminPaymentMethodInput = {
  event_id?: string | null;
  type: PaymentMethodType;
  label: string;
  is_active?: boolean;
  bank_name?: string | null;
  account_number?: string | null;
  account_holder?: string | null;
  qris_image_url?: string | null;
  notes?: string | null;
  sort_order?: number;
};

async function getDefaultEventId() {
  const { data } = await supabase.from("events").select("id").eq("is_active", true).maybeSingle();
  return data?.id ?? null;
}

export async function getAdminPaymentMethods() {
  const { data, error } = await supabase
    .from("payment_methods")
    .select("*")
    .order("sort_order")
    .order("label");

  return { data: (data ?? []) as PaymentMethod[], error };
}

export async function saveAdminPaymentMethod(input: AdminPaymentMethodInput, id?: string) {
  const eventId = input.event_id ?? (await getDefaultEventId());
  const payload = {
    event_id: eventId,
    type: input.type,
    label: input.label,
    is_active: input.is_active ?? true,
    bank_name: input.type === "bank_transfer" ? input.bank_name ?? null : null,
    account_number: input.type === "bank_transfer" ? input.account_number ?? null : null,
    account_holder: input.type === "bank_transfer" ? input.account_holder ?? null : null,
    qris_image_url: input.type === "qris" ? input.qris_image_url ?? null : null,
    notes: input.notes ?? null,
    sort_order: input.sort_order ?? 0,
    updated_at: new Date().toISOString(),
  };

  if (id) return supabase.from("payment_methods").update(payload).eq("id", id);
  return supabase.from("payment_methods").insert(payload);
}

export async function deactivateAdminPaymentMethod(id: string) {
  return supabase
    .from("payment_methods")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("id", id);
}

export async function deleteAdminPaymentMethod(id: string) {
  return supabase.from("payment_methods").delete().eq("id", id);
}
