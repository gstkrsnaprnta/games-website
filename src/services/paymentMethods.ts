import { supabase } from "../lib/supabase";
import type { PaymentMethod } from "../types/models";

export async function getActivePaymentMethods() {
  const { data, error } = await supabase
    .from("payment_methods")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")
    .order("label");

  return { data: (data ?? []) as PaymentMethod[], error };
}
