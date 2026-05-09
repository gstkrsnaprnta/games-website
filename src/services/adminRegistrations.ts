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
  competitions: { name: string; code: string } | null;
};

export async function getAdminRegistrations() {
  const { data, error } = await supabase
    .from("registrations")
    .select(
      "id, registration_code, leader_name, team_name, email, whatsapp, institution, level, registration_status, payment_status, submission_status, admin_note, created_at, competitions(name, code)",
    )
    .order("created_at", { ascending: false });

  return { data: (data ?? []) as unknown as AdminRegistrationRow[], error };
}
