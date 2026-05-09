import type { PaymentStatus, RegistrationStatus, SubmissionStatus } from "../types/models";

type Status = RegistrationStatus | PaymentStatus | SubmissionStatus;

export const statusLabels: Record<Status, string> = {
  pending: "Menunggu",
  verified: "Terverifikasi",
  rejected: "Ditolak",
  revision_required: "Perlu Revisi",
  unpaid: "Belum Bayar",
  valid: "Valid",
  not_required: "Tidak Diperlukan",
  not_submitted: "Belum Dikirim",
};

export const statusClasses: Record<Status, string> = {
  pending: "bg-[#faadb6]/35 text-[#770525] ring-[#faadb6]/60",
  verified: "bg-[#c2e1df] text-[#004551] ring-[#004551]/15",
  rejected: "bg-[#770525] text-white ring-[#770525]",
  revision_required: "bg-[#faadb6]/60 text-[#770525] ring-[#770525]/15",
  unpaid: "bg-stone-100 text-stone-700 ring-stone-200",
  valid: "bg-[#c2e1df] text-[#004551] ring-[#004551]/15",
  not_required: "bg-stone-100 text-stone-700 ring-stone-200",
  not_submitted: "bg-[#f2efeb] text-[#004551] ring-[#004551]/15",
};

export function getStatusLabel(status: Status) {
  return statusLabels[status] ?? status;
}
