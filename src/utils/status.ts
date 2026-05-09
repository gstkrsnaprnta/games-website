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
  pending: "bg-amber-100 text-amber-800 ring-amber-200",
  verified: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  rejected: "bg-rose-100 text-rose-800 ring-rose-200",
  revision_required: "bg-orange-100 text-orange-800 ring-orange-200",
  unpaid: "bg-slate-100 text-slate-700 ring-slate-200",
  valid: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  not_required: "bg-slate-100 text-slate-700 ring-slate-200",
  not_submitted: "bg-sky-100 text-sky-800 ring-sky-200",
};

export function getStatusLabel(status: Status) {
  return statusLabels[status] ?? status;
}
