import { supabase } from "../lib/supabase";

export type RegistrationPayload = {
  event_id: string;
  competition_id: string;
  registration_code: string;
  participant_type: string;
  team_name?: string | null;
  leader_name: string;
  email: string;
  whatsapp: string;
  institution: string;
  level?: string | null;
  payment_proof_url?: string | null;
  submission_url?: string | null;
};

export async function createRegistration(payload: RegistrationPayload) {
  return supabase.from("registrations").insert(payload).select("*").single();
}

export async function checkRegistrationStatus(registrationCode: string, contact: string) {
  return supabase
    .from("registrations")
    .select("registration_code, leader_name, email, whatsapp, institution, registration_status, payment_status, submission_status, admin_note")
    .eq("registration_code", registrationCode)
    .or(`email.eq.${contact},whatsapp.eq.${contact}`)
    .maybeSingle();
}
