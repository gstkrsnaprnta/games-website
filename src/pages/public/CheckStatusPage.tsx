import { useState } from "react";
import { FormInput } from "../../components/admin/FormInput";
import { PageHero } from "../../components/public/PageHero";
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
    <>
    <PageHero eyebrow="Cek Status" title="Pantau validasi pendaftaranmu" description="Masukkan nomor registrasi dan kontak yang dipakai saat mendaftar." />
    <section className="container-page max-w-2xl py-12">
      <form onSubmit={handleSubmit} className="games-card grid gap-4 rounded-[1.7rem] p-6">
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
        <button disabled={loading} className="games-button rounded-full bg-[#770525] px-5 py-4 font-black text-white disabled:bg-stone-400">
          {loading ? "Mengecek..." : "Cek Status"}
        </button>
      </form>
      {searched && !loading && !error && !result ? (
        <div className="mt-6">
          <EmptyState title="Data tidak ditemukan" description="Pastikan nomor registrasi dan kontak sesuai dengan data pendaftaran." />
        </div>
      ) : null}
      {result ? (
        <div className="mt-6 rounded-[1.7rem] border border-[#004551]/10 bg-white/75 p-6 shadow-xl">
          <p className="text-sm font-black text-[#770525]">{result.registration_code}</p>
          <h2 className="mt-2 text-2xl font-black text-[#004551]">{result.team_name || result.participant_name}</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="font-semibold text-[#004551]/55">Cabang lomba</dt>
              <dd className="mt-1 font-bold text-[#004551]">{result.competition_name}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-[#004551]/55">Status pendaftaran</dt>
              <dd><StatusBadge status={result.registration_status} /></dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-[#004551]/55">Status pembayaran</dt>
              <dd><StatusBadge status={result.payment_status} /></dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-[#004551]/55">Status berkas</dt>
              <dd><StatusBadge status={result.submission_status} /></dd>
            </div>
            <div>
              <dt className="font-semibold text-[#004551]/55">Catatan admin</dt>
              <dd className="mt-1 text-[#004551]/75">{result.admin_note || "-"}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </section>
    </>
  );
}
