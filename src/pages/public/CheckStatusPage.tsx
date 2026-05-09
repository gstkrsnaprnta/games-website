import { useState } from "react";
import { FormInput } from "../../components/admin/FormInput";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { checkRegistrationStatus } from "../../services/registrations";
import type { RegistrationStatusResult } from "../../types/models";

export function CheckStatusPage() {
  const [registrationCode, setRegistrationCode] = useState("");
  const [contact, setContact] = useState("");
  const [result, setResult] = useState<RegistrationStatusResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);
    setSearched(true);

    if (!registrationCode.trim() || !contact.trim()) {
      setError("Nomor registrasi dan email atau WhatsApp wajib diisi.");
      return;
    }

    setLoading(true);
    const { data, error: statusError } = await checkRegistrationStatus(registrationCode.trim(), contact.trim());
    setLoading(false);

    if (statusError) {
      setError(statusError.message);
      return;
    }

    setResult(data);
  }

  return (
    <section className="container-page max-w-xl py-10">
      <h1 className="text-3xl font-black">Cek Status Pendaftaran</h1>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-5">
        <FormInput
          label="Nomor registrasi"
          placeholder="GAMES-2026-LCT-0001"
          value={registrationCode}
          onChange={(event) => setRegistrationCode(event.target.value.toUpperCase())}
          required
        />
        <FormInput
          label="Email atau WhatsApp"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          required
        />
        {error ? <ErrorState message={error} /> : null}
        <button disabled={loading} className="rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white disabled:bg-slate-400">
          {loading ? "Mengecek..." : "Cek Status"}
        </button>
      </form>
      {searched && !loading && !error && !result ? (
        <div className="mt-6">
          <EmptyState title="Data tidak ditemukan" description="Pastikan nomor registrasi dan kontak sesuai dengan data pendaftaran." />
        </div>
      ) : null}
      {result ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-cyan-700">{result.registration_code}</p>
          <h2 className="mt-2 text-xl font-black text-slate-950">{result.team_name || result.participant_name}</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="font-semibold text-slate-500">Cabang lomba</dt>
              <dd className="mt-1 font-bold text-slate-900">{result.competition_name}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-slate-500">Status pendaftaran</dt>
              <dd><StatusBadge status={result.registration_status} /></dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-slate-500">Status pembayaran</dt>
              <dd><StatusBadge status={result.payment_status} /></dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-slate-500">Status berkas</dt>
              <dd><StatusBadge status={result.submission_status} /></dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Catatan admin</dt>
              <dd className="mt-1 text-slate-700">{result.admin_note || "-"}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </section>
  );
}
