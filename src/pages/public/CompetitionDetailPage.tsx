import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  CalendarDays,
  Check,
  Code,
  Download,
  FileText,
  FlaskConical,
  Microscope,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getCompetitionBySlug } from "../../services/competitions";
import type { Competition } from "../../types/models";
import { useAsyncData } from "../../utils/useAsyncData";

const iconMap: Record<string, React.ReactNode> = {
  LCT: <Trophy size={34} />,
  OLIM: <BookOpen size={34} />,
  FIS: <Atom size={34} />,
  KIM: <FlaskConical size={34} />,
  BIO: <Microscope size={34} />,
  KS: <Code size={34} />,
};

export function CompetitionDetailPage() {
  const { slug } = useParams();
  const { data: competition, error, loading } = useAsyncData(() => getCompetitionBySlug(slug ?? ""), [slug]);

  if (loading) return <section className="container-page py-28"><LoadingState /></section>;
  if (error) return <section className="container-page py-28"><ErrorState message={error} /></section>;
  if (!competition) return <section className="container-page py-28"><EmptyState title="Lomba tidak ditemukan" /></section>;

  const isOpen = competition.registration_status === "open";
  const priceLabel = formatCurrency(competition.registration_fee, competition.competition_type);

  return (
    <section className="container-page pb-20 pt-28 md:pt-32">
      <div className="mb-8 flex items-center gap-2 text-sm font-bold text-[#004551]/65">
        <Link to="/" className="hover:text-[#770525]">Beranda</Link>
        <span>/</span>
        <Link to="/lomba" className="hover:text-[#770525]">Lomba</Link>
        <span>/</span>
        <span className="text-[#004551]">{competition.name}</span>
      </div>

      <div className="mb-7">
        <Link
          to="/lomba"
          className="grid size-12 place-items-center rounded-full border border-white/75 bg-white/55 text-[#004551] shadow-[0_14px_32px_rgba(0,69,81,0.12)] backdrop-blur-2xl transition hover:-translate-x-1 hover:bg-white/80"
          aria-label="Kembali ke daftar lomba"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>

      <article className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <div className="glass-panel rounded-[2.3rem] p-7 text-center md:p-10">
            <div className="mx-auto grid size-24 place-items-center rounded-full bg-gradient-to-br from-[#770525] to-[#9b0b34] text-white shadow-[0_22px_50px_rgba(119,5,37,0.32)]">
              {iconMap[competition.code] ?? <BookOpen size={34} />}
            </div>
            <div className="mt-6 flex justify-center">
              <span className={isOpen ? "rounded-full bg-[#c2e1df]/70 px-4 py-2 text-xs font-black text-[#004551]" : "rounded-full bg-stone-100/80 px-4 py-2 text-xs font-black text-stone-600"}>
                {isOpen ? "Pendaftaran Dibuka" : "Pendaftaran Ditutup"}
              </span>
            </div>
            <h1 className="games-display mx-auto mt-6 max-w-2xl text-4xl font-black leading-tight text-[#004551] md:text-5xl">
              {competition.name}
            </h1>
            <p className="mt-3 text-lg font-bold text-[#004551]/70">{competition.short_description}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {competition.participant_levels?.map((level) => (
                <span key={level} className="rounded-full border border-[#faadb6]/40 bg-[#faadb6]/24 px-4 py-2 text-xs font-black text-[#770525]">
                  {level}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/75 bg-white/55 px-4 py-2 text-xs font-black text-[#004551]">
                <Users size={13} /> {competition.competition_type === "team" ? "Tim" : "Individu"}
              </span>
              <span className="rounded-full border border-white/75 bg-white/55 px-4 py-2 text-xs font-black text-[#004551]">
                {priceLabel}
              </span>
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-sm font-medium leading-8 text-[#004551]/74 md:text-base">
              {competition.description || competition.short_description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {isOpen ? (
                <Link to="/daftar" className="btn-glossy-maroon inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black text-white">
                  Daftar Sekarang <ArrowRight size={17} />
                </Link>
              ) : null}
              {competition.guidebook_url ? (
                <a href={competition.guidebook_url} className="btn-glass-outline inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black text-[#004551]">
                  Unduh Panduan <Download size={17} />
                </a>
              ) : (
                <Link to="/faq" className="btn-glass-outline inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black text-[#004551]">
                  Lihat Panduan <FileText size={17} />
                </Link>
              )}
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <InfoCard icon={<Users size={20} />} label="Jenjang Peserta" value={competition.participant_levels?.join(", ") || "-"} />
            <InfoCard icon={<Users size={20} />} label="Tipe Peserta" value={competition.competition_type === "team" ? `Tim (${competition.min_members}-${competition.max_members} orang)` : "Individu"} />
            <InfoCard icon={<ShieldCheck size={20} />} label="Biaya Pendaftaran" value={priceLabel} />
            <InfoCard icon={<Trophy size={20} />} label="Kuota Peserta" value={competition.competition_type === "team" ? "Maks. 100 tim" : "Maks. 100 peserta"} />
            <InfoCard icon={<CalendarDays size={20} />} label="Periode Pendaftaran" value={formatPeriod(competition)} />
            <InfoCard icon={<CalendarDays size={20} />} label="Pelaksanaan" value="20 - 23 September 2026" />
          </div>
        </div>

        <div className="grid gap-6">
          <section className="glass-card-premium rounded-[1.6rem] p-6 md:p-8">
            <h2 className="text-xl font-black text-[#004551]">Deskripsi Lomba</h2>
            <p className="mt-4 whitespace-pre-line text-sm font-medium leading-8 text-[#004551]/72">
              {competition.description || competition.short_description}
            </p>
          </section>

          <section className="glass-card-premium rounded-[1.6rem] p-6 md:p-8">
            <h2 className="text-xl font-black text-[#004551]">Ketentuan</h2>
            <ul className="mt-5 grid gap-3 text-sm font-medium leading-7 text-[#004551]/72">
              {getRules(competition).map((rule) => (
                <li key={rule} className="flex gap-3">
                  <Check size={18} className="mt-1 shrink-0 text-[#0b5a63]" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-card-premium rounded-[1.6rem] p-6 md:p-8">
            <h2 className="text-xl font-black text-[#004551]">Dokumen & Panduan</h2>
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-white/80 bg-white/55 p-4">
              <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-xl bg-[#faadb6]/28 text-[#770525]">
                  <FileText size={22} />
                </div>
                <div>
                  <p className="font-black text-[#004551]">Panduan Teknis {competition.name} 2026</p>
                  <p className="mt-1 text-xs font-semibold text-[#004551]/55">PDF - diperbarui panitia</p>
                </div>
              </div>
              {competition.guidebook_url ? (
                <a href={competition.guidebook_url} className="grid size-10 shrink-0 place-items-center rounded-full border border-[#004551]/10 bg-white/70 text-[#004551]" aria-label="Unduh panduan">
                  <Download size={18} />
                </a>
              ) : (
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-500">Segera</span>
              )}
            </div>
          </section>
        </div>
      </article>
    </section>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-card-premium flex items-start gap-4 rounded-[1.35rem] p-5">
      <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/75 bg-white/55 text-[#004551] shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#004551]/50">{label}</p>
        <p className="mt-1 text-sm font-black text-[#004551]">{value}</p>
      </div>
    </div>
  );
}

function formatCurrency(value: number, type: Competition["competition_type"]) {
  if (value <= 0) return "Gratis";
  return `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value)} / ${type === "team" ? "tim" : "peserta"}`;
}

function formatPeriod(competition: Competition) {
  if (!competition.registration_open_at && !competition.registration_close_at) return "1 Juni - 31 Juli 2026";
  const open = competition.registration_open_at ? new Date(competition.registration_open_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "Dibuka";
  const close = competition.registration_close_at ? new Date(competition.registration_close_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "Ditentukan panitia";
  return `${open} - ${close}`;
}

function getRules(competition: Competition) {
  const typeRule = competition.competition_type === "team"
    ? `Setiap tim terdiri dari ${competition.min_members}-${competition.max_members} orang peserta.`
    : "Peserta mengikuti lomba secara individu.";

  return [
    typeRule,
    "Peserta harus berasal dari sekolah/institusi yang sama jika ketentuan cabang lomba mewajibkan.",
    "Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat.",
    "Peserta wajib mematuhi tata tertib yang telah ditetapkan panitia.",
    "Peserta yang melakukan kecurangan akan didiskualifikasi.",
  ];
}
