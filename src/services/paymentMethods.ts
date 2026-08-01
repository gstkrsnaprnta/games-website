import { supabase } from "../lib/supabase";
import type { PaymentMethod } from "../types/models";
import { fetchWithCache } from "../utils/publicCache";

export async function getActivePaymentMethods() {
  return fetchWithCache("payment_methods_active", 3 * 60 * 1000, async () => {
    const { data, error } = await supabase
      .from("payment_methods")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .order("label");

    return { data: (data ?? []) as PaymentMethod[], error };
  });
}

