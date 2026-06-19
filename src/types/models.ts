// FILE: src/services/registrations.ts
import { supabase } from "../lib/supabase";
import type { RegistrationStatusResult } from "../types/models";

export type MemberPayload = {
  name: string;
  theme: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
};

export type TimelineScope = "regional" | "nasional";

export interface GeneralTimelineItem {
  id: string;
  timeline_scope: TimelineScope;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  sort_order: number;
}

export type Timeline = {
  id: string;
  competition_id: string | null; // ← tambah
  timeline_scope?: TimelineScope | null; // ← tambah
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_active: boolean; // ← tambah (sesuai adminTimelines.ts)
  sort_order: number;
};

export type Competition = {
  id: string;
  event_id: string | null;
  name: string;
  slug: string;
  code: string;
  short_description: string | null;
  description: string | null;
  participant_levels: string[] | null;
  competition_type: "individual" | "team";
  min_members: number;
  max_members: number;
  registration_fee: number;
  registration_status: "open" | "closed";
  registration_open_at: string | null;
  registration_close_at: string | null;
  guidebook_url: string | null;
  poster_url: string | null;
  contact_person: string | null;
  is_active: boolean;
  timelines?: Timeline[]; // ← tambah (joined saat fetch)
};

export type PaymentMethod = {
  id: string;
  event_id: string | null;
  type: PaymentMethodType;
  label: string;
  is_active: boolean;
  bank_name: string | null;
  account_number: string | null;
  account_holder: string | null;
  qris_image_url: string | null;
  notes: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export type Announcement = {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  attachment_url: string | null;
  published_at: string | null;
};

export type Registration = {
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
  members: RegistrationMemberPayload[]
) {
  if (members.length === 0) return { error: null };
  return supabase.from("registration_members").insert(members);
}

export async function checkRegistrationStatus(
  registrationCode: string,
  contact: string
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