export type RegistrationStatus = "pending" | "verified" | "rejected" | "revision_required";
export type PaymentStatus = "unpaid" | "pending" | "valid" | "rejected" | "revision_required";
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
  guidebook_url: string | null;
  poster_url: string | null;
  contact_person: string | null;
  is_active: boolean;
};

export type Timeline = {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  sort_order: number;
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
  submission_url: string | null;
  registration_status: RegistrationStatus;
  payment_status: PaymentStatus;
  submission_status: SubmissionStatus;
  admin_note: string | null;
  created_at: string;
};
