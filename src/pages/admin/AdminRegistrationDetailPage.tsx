import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FormSelect } from "../../components/admin/FormSelect";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { StatusBadge } from "../../components/shared/StatusBadge";
import {
  getAdminRegistrationById,
  type AdminRegistrationRow,
  updateAdminRegistrationStatus,
} from "../../services/adminRegistrations";
import type { PaymentMethodType, PaymentStatus, RegistrationStatus, SubmissionStatus } from "../../types/models";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";

const registrationStatusOptions = [
  { label: "Menunggu", value: "pending" },
  { label: "Terverifikasi", value: "verified" },
  { label: "Ditolak", value: "rejected" },
  { label: "Perlu Revisi", value: "revision_required" },
];

const paymentStatusOptions = [
  { label: "Belum Bayar", value: "unpaid" },
  { label: "Menunggu", value: "pending" },
  { label: "Valid", value: "valid" },
  { label: "Ditolak", value: "rejected" },
  { label: "Perlu Revisi", value: "revision_required" },
];

const submissionStatusOptions = [
  { label: "Tidak Diperlukan", value: "not_required" },
  { label: "Belum Dikirim", value: "not_submitted" },
  { label: "Menunggu", value: "pending" },
  { label: "Valid", value: "valid" },
  { label: "Ditolak", value: "rejected" },
  { label: "Perlu Revisi", value: "revision_required" },
];

export function AdminRegistrationDetailPage() {
  const { id } = useParams();
  const { data, error, loading, reload } = useAsyncData(() => getAdminRegistrationById(id ?? ""), [id]);
  const [form, setForm] = useState({
    registration_status: "pending" as RegistrationStatus,
    payment_status: "unpaid" as PaymentStatus,
    submission_status: "not_required" as SubmissionStatus,
    admin_note: "",
  });
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!data) return;
    Promise.resolve().then(() => {
      setForm({
        registration_status: data.registration_status,
        payment_status: data.payment_status,
        submission_status: data.submission_status,
        admin_note: data.admin_note ?? "",
      });
    });
  }, [data]);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!id) return;
    setSaving(true);
    setSaveError("");
    setSaveMessage("");
    const { error: updateError } = await updateAdminRegistrationStatus(id, form);
    setSaving(false);

    if (updateError) {
      setSaveError(updateError.message);
      return;
    }

    setSaveMessage("Status peserta berhasil diperbarui.");
    reload();
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!data) return <EmptyState title="Peserta tidak ditemukan" />;

  return (
    <section>
      <Link to="/admin/registrations" className="text-sm font-bold text-cyan-700">
        Kembali ke peserta
      </Link>
      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
        <RegistrationSummary registration={data} />
        <form onSubmit={handleSave} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5">
          <div>
            <h1 className="text-xl font-black text-slate-950">Validasi Peserta</h1>
            <p className="mt-1 text-sm text-slate-600">Ubah status manual sesuai hasil verifikasi panitia.</p>
          </div>
          <FormSelect
            label="Status pendaftaran"
            value={form.registration_status}
            onChange={(event) => setForm((current) => ({ ...current, registration_status: event.target.value as RegistrationStatus }))}
            options={registrationStatusOptions}
          />
          <FormSelect
            label="Status pembayaran"
            value={form.payment_status}
            onChange={(event) => setForm((current) => ({ ...current, payment_status: event.target.value as PaymentStatus }))}
            options={paymentStatusOptions}
          />
          <FormSelect
            label="Status berkas"
            value={form.submission_status}
            onChange={(event) => setForm((current) => ({ ...current, submission_status: event.target.value as SubmissionStatus }))}
            options={submissionStatusOptions}
          />
          <FormTextarea
            label="Catatan admin"
            value={form.admin_note}
            onChange={(event) => setForm((current) => ({ ...current, admin_note: event.target.value }))}
          />
          {saveError ? <ErrorState message={saveError} /> : null}
          {saveMessage ? <p className="rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{saveMessage}</p> : null}
          <button disabled={saving} className="rounded-lg bg-cyan-600 px-4 py-2 font-bold text-white disabled:bg-slate-400">
            {saving ? "Menyimpan..." : "Simpan Validasi"}
          </button>
        </form>
      </div>
    </section>
  );
}

function RegistrationSummary({ registration }: { registration: AdminRegistrationRow }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-bold text-cyan-700">{registration.registration_code}</p>
      <h1 className="mt-2 text-2xl font-black text-slate-950">{registration.team_name || registration.leader_name}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <StatusBadge status={registration.registration_status} />
        <StatusBadge status={registration.payment_status} />
        <StatusBadge status={registration.submission_status} />
      </div>
      <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
        <Detail label="Ketua/Peserta" value={registration.leader_name} />
        <Detail label="Lomba" value={registration.competitions ? `${registration.competitions.name} (${registration.competitions.code})` : "-"} />
        <Detail label="Email" value={registration.email} />
        <Detail label="WhatsApp" value={registration.whatsapp} />
        <Detail label="Instansi" value={registration.institution} />
        <Detail label="Jenjang" value={registration.level ?? "-"} />
        <Detail label="Tanggal daftar" value={formatDate(registration.created_at)} />
      </dl>
      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-sm font-bold text-slate-950">Pembayaran Manual</h2>
        <dl className="mt-3 grid gap-4 text-sm md:grid-cols-2">
          <Detail label="Metode pembayaran" value={registration.payment_methods ? `${formatPaymentType(registration.payment_methods.type)} - ${registration.payment_methods.label}` : "-"} />
          <Detail label="Bukti pembayaran" value={registration.payment_proof_url ?? "-"} />
          {registration.payment_methods?.type === "bank_transfer" ? (
            <>
              <Detail label="Bank" value={registration.payment_methods.bank_name ?? "-"} />
              <Detail label="Nomor rekening" value={registration.payment_methods.account_number ?? "-"} />
              <Detail label="Atas nama" value={registration.payment_methods.account_holder ?? "-"} />
            </>
          ) : null}
          {registration.payment_methods?.type === "qris" ? <Detail label="QRIS" value={registration.payment_methods.qris_image_url ?? "-"} /> : null}
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          {registration.payment_proof_url ? (
            <a
              href={registration.payment_proof_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-cyan-600 px-3 py-2 text-xs font-bold text-white"
            >
              Buka Bukti Pembayaran
            </a>
          ) : null}
          {registration.payment_methods?.qris_image_url ? (
            <a
              href={registration.payment_methods.qris_image_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700"
            >
              Buka QRIS
            </a>
          ) : null}
        </div>
        {registration.payment_methods?.notes ? (
          <p className="mt-4 rounded-lg bg-white p-3 text-sm text-slate-600">{registration.payment_methods.notes}</p>
        ) : null}
      </div>
      <div className="mt-6">
        <h2 className="text-sm font-bold text-slate-950">Anggota Tim</h2>
        {registration.registration_members?.length ? (
          <ul className="mt-2 grid gap-2 text-sm text-slate-700">
            {registration.registration_members.map((member) => (
              <li key={member.id} className="rounded-lg bg-slate-50 p-3">
                {member.name} {member.role ? `- ${member.role}` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-slate-500">Tidak ada anggota tambahan.</p>
        )}
      </div>
    </div>
  );
}

function formatPaymentType(type: PaymentMethodType) {
  if (type === "qris") return "QRIS";
  if (type === "bank_transfer") return "Transfer Bank";
  return "E-Wallet";
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
