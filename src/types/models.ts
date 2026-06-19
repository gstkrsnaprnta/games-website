export type RegistrationStatus =
  | "pending"
  | "verified"
  | "rejected"
  | "revision_required";

export type PaymentStatus =
  | "unpaid"
  | "pending"
  | "valid"
  | "rejected"
  | "revision_required";

export type PaymentMethodType = "qris" | "bank_transfer" | "ewallet";

export type SubmissionStatus =
  | "not_required"
  | "not_submitted"
  | "pending"
  | "valid"
  | "rejected"
  | "revision_required";

export type Event = {
  id: string;
  year: number;
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
  competition_id: string | null;
  timeline_scope?: TimelineScope | null;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
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
  timelines?: Timeline[];

  // Kolom baru
  max_teams_per_school?: number | null;
  total_quota?: number | null;
  has_work_submission?: boolean;
  subthemes?: string[];
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
  event_id?: string;
  competition_id: string;
  registration_code: string;
  participant_type: string;
  team_name: string | null;
  leader_name: string;
  email: string;
  whatsapp: string;
  institution: string;
  level: string | null;
  payment_proof_url: string | null;
  payment_method_id?: string | null;
  submission_url: string | null;
  registration_status: RegistrationStatus;
  payment_status: PaymentStatus;
  submission_status: SubmissionStatus;
  admin_note: string | null;
  created_at: string;
  competitions?: Pick<Competition, "name" | "code" | "slug"> | null;
};

export type RegistrationStatusResult = {
  registration_code: string;
  participant_name: string;
  team_name: string | null;
  institution: string;
  competition_name: string;
  competition_code: string;
  registration_status: RegistrationStatus;
  payment_status: PaymentStatus;
  submission_status: SubmissionStatus;
  admin_note: string | null;
};

export type Profile = {
  id: string;
  full_name: string | null;
  role: "admin" | "super_admin";
  is_active: boolean;
};

// Tipe pendaftaran tambahan dari submitRegistration
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