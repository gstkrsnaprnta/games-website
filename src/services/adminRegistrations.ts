import { supabase } from "../lib/supabase";
import type { PaymentStatus, RegistrationStatus, SubmissionStatus } from "../types/models";

export type AdminRegistrationRow = {
  id: string;
  registration_code: string;
  leader_name: string;
  team_name: string | null;
  email: string;
  whatsapp: string;
  institution: string;
  level: string | null;
  registration_status: RegistrationStatus;
  payment_status: PaymentStatus;
  submission_status: SubmissionStatus;
  admin_note: string | null;
  created_at: string;
  competition_id?: string;
  competitions: { name: string; code: string } | null;
  registration_members?: { id: string; name: string; role: string | null }[];
};

export async function getAdminRegistrations() {
  const { data, error } = await supabase
    .from("registrations")
    .select(
      "id, competition_id, registration_code, leader_name, team_name, email, whatsapp, institution, level, registration_status, payment_status, submission_status, admin_note, created_at, competitions(name, code)",
    )
    .order("created_at", { ascending: false });

  return { data: (data ?? []) as unknown as AdminRegistrationRow[], error };
}

export async function getAdminRegistrationById(id: string) {
  const { data, error } = await supabase
    .from("registrations")
    .select(
      "id, registration_code, leader_name, team_name, email, whatsapp, institution, level, registration_status, payment_status, submission_status, admin_note, created_at, competitions(name, code), registration_members(id, name, role)",
    )
    .eq("id", id)
    .maybeSingle();

  return { data: data as unknown as AdminRegistrationRow | null, error };
}

export async function updateAdminRegistrationStatus(
  id: string,
  payload: Pick<AdminRegistrationRow, "registration_status" | "payment_status" | "submission_status" | "admin_note">,
) {
  return supabase.from("registrations").update(payload).eq("id", id);
}
