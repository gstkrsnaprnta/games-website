import { supabase } from "../lib/supabase";
import type { RegistrationStatusResult } from "../types/models";

export type RegistrationPayload = {
  id: string;
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
  payment_status?: "unpaid" | "pending";
  submission_status?: "not_required" | "pending";
};

export type RegistrationMemberPayload = {
  registration_id: string;
  name: string;
  role?: string | null;
};

export async function getNextRegistrationCode(competitionId: string) {
  const { data, error } = await supabase.rpc("next_registration_code", {
    competition_id_input: competitionId,
  });
  return { data: data as string | null, error };
}

export async function createRegistration(payload: RegistrationPayload) {
  return supabase.from("registrations").insert(payload);
}

export async function createRegistrationMembers(members: RegistrationMemberPayload[]) {
  if (members.length === 0) return { error: null };
  return supabase.from("registration_members").insert(members);
}

export async function checkRegistrationStatus(registrationCode: string, contact: string) {
  const { data, error } = await supabase.rpc("check_registration_status", {
    contact_input: contact,
    registration_code_input: registrationCode,
  });
  const firstRow = Array.isArray(data) ? data[0] : data;
  return { data: (firstRow ?? null) as RegistrationStatusResult | null, error };
}
