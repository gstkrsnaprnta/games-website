import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Filter, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { CompetitionCard } from "../../components/public/CompetitionCard";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getCompetitions } from "../../services/competitions";
import type { Competition } from "../../types/models";
import { useAsyncData } from "../../utils/useAsyncData";

const filters = ["Semua", "SD", "SMP", "SMA", "Mahasiswa", "Individu", "Tim", "Pendaftaran Dibuka"];

export function CompetitionsPage() {
  const { data, error, loading } = useAsyncData(getCompetitions, []);
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filteredCompetitions = useMemo(
    () => (data ?? []).filter((competition) => matchesFilter(competition, activeFilter)),
    [activeFilter, data],
  );

  return (
    <>
      <section className="container-page pt-28 md:pt-32">
        <div className="hero-glass relative grid min-h-[360px] overflow-hidden rounded-[2.35rem] md:grid-cols-[1fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <p className="mb-5 inline-flex w-fit rounded-full border border-[#faadb6]/45 bg-[#faadb6]/22 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#770525]">
              Cabang Lomba GAMES 2026
            </p>
            <h1 className="games-display max-w-xl text-4xl font-black leading-[1.02] text-[#004551] md:text-5xl lg:text-6xl">
              Pilih Cabang Lomba <span className="text-[#770525]">Terbaikmu</span>
            </h1>
            <p className="mt-5 max-w-md text-sm font-semibold leading-7 text-[#004551]/78 md:text-base">
              Temukan kompetisi yang sesuai dengan jenjang dan kemampuanmu. Tunjukkan prestasimu dan raih pengalaman terbaik!
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/daftar" className="btn-glossy-maroon inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black text-white">
                Daftar Sekarang <Rocket size={16} />
              </Link>
              <Link to="/timeline" className="btn-glass-outline inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black text-[#004551]">
                Lihat Timeline <CalendarDays size={16} />
              </Link>
            </div>
          </div>
          <CompetitionHeroVisual />
        </div>
      </section>

      <section className="container-page py-10 md:py-12">
        <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-5 py-3 text-sm font-black transition ${
                activeFilter === filter
                  ? "btn-glossy-maroon text-white"
                  : "border border-white/70 bg-white/55 text-[#004551] shadow-[0_12px_30px_rgba(0,69,81,0.08)] backdrop-blur-2xl hover:bg-white/75"
              }`}
            >
              {filter === "Pendaftaran Dibuka" ? (
                <span className="inline-flex items-center gap-2">
                  <Filter size={14} /> {filter}
                </span>
              ) : filter}
            </button>
          ))}
        </div>

        <div className="mb-8">
          {loading ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}
          {!loading && !error && data?.length === 0 ? <EmptyState description="Belum ada lomba aktif." /> : null}
          {!loading && !error && data && data.length > 0 && filteredCompetitions.length === 0 ? (
            <EmptyState description="Tidak ada lomba yang cocok dengan filter ini." />
          ) : null}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompetitions.map((competition) => (
            <CompetitionCard key={competition.id} competition={competition} />
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="cta-glass relative overflow-hidden rounded-[2rem] p-6 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:p-8">
          <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 opacity-25 md:block">
            <svg width="180" height="120" viewBox="0 0 180 120">
              <polygon points="90,10 150,42 150,98 90,116 30,98 30,42" fill="none" stroke="#004551" strokeWidth="1.5" />
              <line x1="30" y1="42" x2="90" y2="72" stroke="#004551" strokeWidth="1.5" />
              <line x1="150" y1="42" x2="90" y2="72" stroke="#004551" strokeWidth="1.5" />
              <line x1="90" y1="116" x2="90" y2="72" stroke="#004551" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="relative md:pl-56">
            <h2 className="text-2xl font-black text-[#004551]">Belum yakin memilih lomba?</h2>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-7 text-[#004551]/70">
              Baca panduan lomba atau hubungi panitia untuk memastikan kategori yang sesuai dengan kemampuanmu.
            </p>
          </div>
          <div className="relative mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link to="/faq" className="btn-glass-outline inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-[#004551]">
              Lihat Panduan <ArrowRight size={15} />
            </Link>
            <Link to="/kontak" className="btn-glossy-maroon inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-white">
              Hubungi Panitia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function matchesFilter(competition: Competition, filter: string) {
  if (filter === "Semua") return true;
  if (filter === "Individu") return competition.competition_type === "individual";
  if (filter === "Tim") return competition.competition_type === "team";
  if (filter === "Pendaftaran Dibuka") return competition.registration_status === "open";
  return competition.participant_levels?.includes(filter) ?? false;
}

function CompetitionHeroVisual() {
  return (
    <div className="relative hidden min-h-[360px] items-center justify-center overflow-hidden md:flex">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#c2e1df]/25 to-[#004551]/55" />
      <div className="absolute right-8 top-8 h-px w-48 rotate-90 bg-[#c2e1df]/40" />
      <div className="relative aspect-square w-[340px]">
        <div className="absolute inset-8 rounded-full bg-[#004551]/42 shadow-[inset_0_0_72px_rgba(194,225,223,0.62),0_0_54px_rgba(194,225,223,0.35)] backdrop-blur-xl" />
        <div className="absolute inset-8 rounded-full border border-[#c2e1df]/60" />
        <div className="absolute inset-14 rounded-full border border-dashed border-[#c2e1df]/55" />
        <div className="absolute left-1/2 top-10 h-[260px] w-px -translate-x-1/2 bg-[#c2e1df]/48" />
        <div className="absolute left-10 top-1/2 h-px w-[260px] -translate-y-1/2 bg-[#c2e1df]/48" />
        <div className="absolute inset-0 grid place-items-center text-white">
          <span className="text-7xl font-black drop-shadow-[0_0_28px_rgba(216,238,235,1)]">Σ</span>
          <span className="absolute left-[58%] top-[46%] text-4xl font-black">k²</span>
        </div>
        <div className="absolute -right-2 top-14 size-24 animate-float">
          <svg viewBox="0 0 100 100" className="drop-shadow-[0_0_18px_rgba(250,173,182,0.7)]">
            <polygon points="50,8 92,82 12,78" fill="#770525" opacity="0.5" stroke="#faadb6" strokeWidth="2" />
            <line x1="50" y1="8" x2="60" y2="70" stroke="#faadb6" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute bottom-8 left-2 size-20 animate-float-reverse">
          <svg viewBox="0 0 100 100" className="drop-shadow-[0_0_18px_rgba(194,225,223,0.7)]">
            <polygon points="50,10 82,30 82,72 50,92 18,72 18,30" fill="rgba(194,225,223,0.24)" stroke="#c2e1df" strokeWidth="2" />
            <line x1="18" y1="30" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
            <line x1="82" y1="30" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
            <line x1="50" y1="92" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
          </svg>
        </div>
        <div className="glass-chip absolute right-3 top-5 rounded-xl px-4 py-2 font-mono text-xs font-black text-[#004551]">a² + b² = c²</div>
        <div className="glass-chip absolute left-0 top-36 rounded-xl px-4 py-2 font-mono text-xs font-black text-[#770525]">f(x) = sin x</div>
      </div>
    </div>
  );
}
