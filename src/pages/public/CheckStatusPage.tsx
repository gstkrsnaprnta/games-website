import { useState } from "react";
import { Search } from "lucide-react";
import { PublicFormInput } from "../../components/public/PublicFormInput";
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
      <PageHero
        eyebrow="Cek Status"
        title="Pantau validasi pendaftaranmu"
        description="Masukkan nomor registrasi dan kontak yang dipakai saat mendaftar."
      />
      <section className="container-page max-w-2xl py-14">
        <div className="glass-panel rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#faadb6]/10 blur-3xl rounded-full pointer-events-none" />
          <form onSubmit={handleSubmit} className="grid gap-6 relative z-10">
            <PublicFormInput
              label="Nomor registrasi"
              placeholder="Contoh: GAMES-2026-LCT-0001"
              value={registrationCode}
              onChange={(event) => setRegistrationCode(event.target.value.toUpperCase())}
              required
            />
            <PublicFormInput
              label="Email atau WhatsApp"
              placeholder="Contoh: budi@email.com atau 08123456789"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              required
            />
            {error ? <ErrorState message={error} /> : null}
            <button
              disabled={loading}
              className="btn-glossy-maroon mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-black text-white disabled:opacity-50"
            >
              <Search size={18} />
              {loading ? "Mengecek Data..." : "Cek Status Sekarang"}
            </button>
          </form>
        </div>

        {searched && !loading && !error && !result ? (
          <div className="mt-8">
            <EmptyState title="Data tidak ditemukan" description="Pastikan nomor registrasi dan kontak (email/WA) sesuai persis dengan saat pendaftaran." />
          </div>
        ) : null}

        {result ? (
          <div className="glass-card-premium mt-8 rounded-[2rem] p-8 relative overflow-hidden border-[#c2e1df]/40 bg-gradient-to-br from-white/90 to-white/50">
            <div className="flex items-center gap-4 border-b border-[#004551]/10 pb-6 mb-6">
              <div className="grid size-12 place-items-center rounded-2xl bg-[#004551]/10 text-[#004551] shadow-inner">
                <Search size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#004551]/50">{result.registration_code}</p>
                <h2 className="text-2xl font-black text-[#004551]">{result.team_name || result.participant_name}</h2>
              </div>
            </div>
            
            <dl className="grid gap-4 text-sm">
              <div className="rounded-xl bg-white/60 p-4 shadow-sm border border-white/80">
                <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#004551]/50">Cabang Lomba</dt>
                <dd className="mt-1 text-base font-black text-[#004551]">{result.competition_name}</dd>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/60 p-4 shadow-sm border border-white/80">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#004551]/50 mb-2">Pendaftaran</dt>
                  <dd><StatusBadge status={result.registration_status} /></dd>
                </div>
                <div className="rounded-xl bg-white/60 p-4 shadow-sm border border-white/80">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#004551]/50 mb-2">Pembayaran</dt>
                  <dd><StatusBadge status={result.payment_status} /></dd>
                </div>
                <div className="rounded-xl bg-white/60 p-4 shadow-sm border border-white/80">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#004551]/50 mb-2">Berkas</dt>
                  <dd><StatusBadge status={result.submission_status} /></dd>
                </div>
              </div>

              {result.admin_note ? (
                <div className="rounded-xl bg-[#faadb6]/10 p-4 border border-[#faadb6]/30 mt-2">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#770525]/70">Catatan dari Panitia</dt>
                  <dd className="mt-1 font-medium text-[#770525]">{result.admin_note}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        ) : null}
      </section>
    </>
  );
}
