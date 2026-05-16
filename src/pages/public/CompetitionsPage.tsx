import { useMemo, useState } from "react";
import { ArrowRight, Filter, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { CompetitionCard } from "../../components/public/CompetitionCard";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getCompetitions } from "../../services/competitions";
import type { Competition } from "../../types/models";
import { useAsyncData } from "../../utils/useAsyncData";
import { Calendar } from "lucide-react";

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
      {/* ===== Hero Lomba ===== */}
      <section className="container-hero relative pt-28 pb-3 md:pt-32 md:pb-8">        <div className="inner-page-hero inner-competition-hero relative overflow-hidden rounded-[2rem] border border-white/90 px-6 py-8 shadow-[0_24px_60px_rgba(6,68,82,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] md:grid md:min-h-[360px] md:grid-cols-[0.9fr_1.1fr] md:items-center md:rounded-[2.35rem] md:px-12 md:py-12 lg:px-14">
        {/* Mobile/Desktop visual background */}
        <div className="competition-hero-visual pointer-events-none absolute inset-0">
          <div className="competition-hero-orb">
            <svg viewBox="0 0 120 120" className="h-full w-full">
              <circle cx="60" cy="60" r="43" fill="none" stroke="rgba(216,238,235,0.45)" strokeWidth="1.2" strokeDasharray="5 5" />
              <ellipse cx="60" cy="60" rx="50" ry="16" fill="none" stroke="rgba(216,238,235,0.48)" strokeWidth="1.4" />
              <ellipse cx="60" cy="60" rx="16" ry="50" fill="none" stroke="rgba(216,238,235,0.48)" strokeWidth="1.4" />
              <line x1="60" y1="10" x2="60" y2="110" stroke="rgba(216,238,235,0.38)" strokeWidth="1.1" />
              <line x1="10" y1="60" x2="110" y2="60" stroke="rgba(216,238,235,0.38)" strokeWidth="1.1" />
            </svg>

            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center text-white">
                <div className="text-[3.2rem] font-black leading-none drop-shadow-[0_0_18px_rgba(216,238,235,0.6)] md:text-[4.5rem]">
                  Σ
                </div>
                <div className="-mt-1 text-lg font-black md:text-2xl">k²</div>
              </div>
            </div>
          </div>

          <div className="competition-hero-cube" />
          <div className="competition-hero-pyramid" />

          <div className="competition-chip competition-chip-top">a² + b² = c²</div>
          <div className="competition-chip competition-chip-mid">f(x) = sin x</div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[16.8rem] md:max-w-lg">
          <span className="inline-flex max-w-full rounded-full border border-[#faadb6]/55 bg-[#fff3f6]/88 px-4 py-2 text-[0.62rem] font-black uppercase tracking-[0.12em] text-[#7E032F] shadow-[0_8px_20px_rgba(126,3,47,0.08)] backdrop-blur-md md:text-xs">
            Cabang Lomba GAMES 2026
          </span>

          <h1 className="games-display mt-5 text-[2.18rem] font-black leading-[0.96] tracking-[-0.055em] text-[#064452] min-[390px]:text-[2.42rem] md:text-[4.25rem] lg:text-[4.8rem]">
            Pilih Cabang
            <br />
            Lomba
            <br />
            <span className="text-[#7E032F]">Terbaikmu</span>
          </h1>

          <p className="mt-5 max-w-[15rem] text-[0.84rem] font-semibold leading-6 text-[#064452]/78 min-[390px]:max-w-[16.5rem] min-[390px]:text-[0.9rem] md:max-w-md md:text-base md:leading-7">
            Temukan kompetisi yang sesuai dengan jenjang dan kemampuanmu.
            <span className="hidden md:inline"> Tunjukkan prestasimu dan raih pengalaman terbaik!</span>
          </p>

          <div className="mt-6 flex w-full max-w-[260px] flex-col items-start gap-3 md:mt-8 md:max-w-none md:flex-row">
            <Link
              to="/daftar"
              className="primary-glossy inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-black text-white md:h-12 md:w-auto md:px-8"
            >
              Daftar Sekarang
              <Rocket size={15} className="text-[#ffd5df]" />
            </Link>

            <Link
              to="/timeline"
              className="btn-glass-outline inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-black text-[#064452] md:h-12 md:w-auto md:px-8"
            >
              Lihat Timeline
              <Calendar size={15} />
            </Link>
          </div>
        </div>
      </div>
      </section>

      <section className="container-hero pt-2 pb-10 md:pt-8 md:pb-12">       <div className="hide-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 rounded-full px-5 py-3 text-sm font-black transition ${activeFilter === filter
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

      {/* ===== Bottom CTA ===== */}
      <section className="container-hero relative mt-8 pb-12 md:mt-10 md:pb-14">
        <div className="relative overflow-hidden rounded-[1.65rem] border border-white/85 bg-[linear-gradient(90deg,rgba(194,225,223,0.54)_0%,rgba(248,240,231,0.78)_35%,rgba(255,255,255,0.9)_100%)] px-6 py-6 shadow-[0_18px_44px_rgba(6,68,82,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[24px] md:px-8 md:py-7">
          {/* left geometry */}
          <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-[260px] opacity-35 md:block">
            <svg
              className="absolute left-8 top-1/2 -translate-y-1/2"
              width="150"
              height="120"
              viewBox="0 0 150 120"
              fill="none"
            >
              <polygon
                points="75,10 130,38 75,66 20,38"
                stroke="#064452"
                strokeWidth="1.4"
                opacity="0.55"
              />
              <polygon
                points="20,38 75,66 75,112 20,84"
                stroke="#064452"
                strokeWidth="1.4"
                opacity="0.42"
              />
              <polygon
                points="130,38 75,66 75,112 130,84"
                stroke="#064452"
                strokeWidth="1.4"
                opacity="0.42"
              />
            </svg>

            <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_0%_50%,rgba(6,68,82,0.32),transparent_62%)]" />
          </div>

          <div className="relative z-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="md:pl-[190px]">
              <h2 className="games-display text-[1.45rem] font-black leading-tight tracking-[-0.03em] text-[#7E032F] md:text-2xl">
                Belum yakin memilih lomba?
              </h2>

              <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-[#064452]/72">
                Baca panduan lomba atau hubungi panitia untuk memastikan kategori yang sesuai dengan kemampuanmu.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                to="/lomba"
                className="btn-glass-outline inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-[#064452]"
              >
                Lihat Panduan
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/kontak"
                className="btn-glossy-maroon inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-white"
              >
                Hubungi Panitia
              </Link>
            </div>
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
