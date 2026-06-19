// FILE: src/services/registrations.ts
import { supabase } from "../lib/supabase";
import type { RegistrationStatusResult } from "../types/models";

export type MemberPayload = {
  name: string;
  role: string;
  identity_number: string;
  class_or_semester: string;
  id_card_url: string;
};

export type SubmitRegistrationPayload = {
  competition_id: string;
  team_name: string;
  leader_name: string;
  email: string;
  whatsapp: string;
  institution: string;
  level: string;
  work_title: string;
  work_subtheme: string;
  payment_method_id: string;
  payment_proof_url: string;
  members: MemberPayload[];
};

export type SubmitRegistrationResult =
  | { ok: true; registration_code: string; registration_id: string }
  | { ok: false; error: string };

export async function submitRegistration(
  payload: SubmitRegistrationPayload,
): Promise<SubmitRegistrationResult> {
  const { data, error } = await supabase.rpc("submit_registration", {
    p_competition_id: payload.competition_id,
    p_team_name: payload.team_name,
    p_leader_name: payload.leader_name,
    p_email: payload.email,
    p_whatsapp: payload.whatsapp,
    p_institution: payload.institution,
    p_level: payload.level,
    p_work_title: payload.work_title,
    p_work_subtheme: payload.work_subtheme,
    p_payment_method_id: payload.payment_method_id || null,
    p_payment_proof_url: payload.payment_proof_url,
    p_members: payload.members,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const result = data as SubmitRegistrationResult;
  return result;
}

// Maksimal ukuran file bukti pembayaran (1 MB)
export const MAX_PAYMENT_PROOF_SIZE = 1024 * 1024;

// Tipe file yang diizinkan untuk bukti pembayaran
export const ALLOWED_PAYMENT_PROOF_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export async function uploadPaymentProof(
  file: File,
): Promise<{ url: string | null; error: Error | null }> {
  if (file.size > MAX_PAYMENT_PROOF_SIZE) {
    return {
      url: null,
      error: new Error("Ukuran file maksimal 1 MB."),
    };
  }
  if (!ALLOWED_PAYMENT_PROOF_TYPES.includes(file.type)) {
    return {
      url: null,
      error: new Error("Format file harus JPG, PNG, WEBP, atau PDF."),
    };
  }

  const ext = file.name.split(".").pop();
  const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const path = `${uniqueId}.${ext}`;

  const { error } = await supabase.storage
    .from("payment-proofs")
    .upload(path, file, { upsert: false });

  if (error) return { url: null, error };

  const { data } = supabase.storage.from("payment-proofs").getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}

// Legacy helpers tetap dipertahankan agar halaman lain tidak rusak
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
  payment_method_id?: string | null;
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

export async function createRegistrationMembers(
  members: RegistrationMemberPayload[],
) {
  if (members.length === 0) return { error: null };
  return supabase.from("registration_members").insert(members);
}

export async function checkRegistrationStatus(
  registrationCode: string,
  contact: string,
) {
  const { data, error } = await supabase.rpc("check_registration_status", {
    contact_input: contact,
    registration_code_input: registrationCode,
  });
  const firstRow = Array.isArray(data) ? data[0] : data;
  return {
    data: (firstRow ?? null) as RegistrationStatusResult | null,
    error,
  };
}
