import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  Calendar,
  Calculator,
  Code,
  FlaskConical,
  Globe,
  Leaf,
  Trophy,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnnouncementCard } from "../../components/public/AnnouncementCard";
import { CTASection } from "../../components/public/CTASection";
import { HeroSection } from "../../components/public/HeroSection";
import { SectionHeading } from "../../components/public/SectionHeading";
import { TimelineHorizontal } from "../../components/public/TimelineItem";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getAnnouncements } from "../../services/announcements";
import { getCompetitions } from "../../services/competitions";
import { getTimelines } from "../../services/timelines";
import type { Competition } from "../../types/models";
import { useAsyncData } from "../../utils/useAsyncData";

const stats = [
  {
    icon: <Trophy size={22} className="text-[#7E032F]" strokeWidth={2.15} />,
    value: "5+",
    valueClassName: "text-[1.65rem] lg:text-[2.05rem]",
    label: "Cabang Lomba",
    sublabel: "Matematika & Sains",
  },
  {
    icon: <Users size={22} className="text-[#064252]" strokeWidth={2.15} />,
    value: "SD – Mahasiswa",
    valueClassName: "text-[1rem] leading-[1.05] lg:text-[1.45rem]",
    label: "Semua Jenjang",
    sublabel: "Pendidikan",
  },
  {
    icon: <Globe size={22} className="text-[#064252]" strokeWidth={2.15} />,
    value: "Nasional",
    valueClassName: "text-[1.35rem] lg:text-[1.9rem]",
    label: "Peserta dari Seluruh",
    sublabel: "Indonesia",
  },
  {
    icon: <Calendar size={22} className="text-[#7E032F]" strokeWidth={2.15} />,
    value: "Event Tahunan",
    valueClassName: "text-[1.12rem] leading-[1.05] lg:text-[1.75rem]",
    label: "Diselenggarakan",
    sublabel: "Setiap Tahun",
  },
];

export function HomePage() {
  const competitions = useAsyncData(getCompetitions, []);
  const timelines = useAsyncData(getTimelines, []);
  const announcements = useAsyncData(getAnnouncements, []);

  return (
    <>
      {/* ===== Hero ===== */}
      <HeroSection />

      {/* ===== Stats Strip ===== */}
      <section className="container-hero relative z-20 mt-5 mb-8 lg:mt-6 lg:mb-12">
        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.34)_48%,rgba(194,225,223,0.26)_72%,rgba(6,66,82,0.22)_100%)] p-3 shadow-[0_18px_46px_rgba(6,66,82,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[28px] md:rounded-[2rem] lg:p-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-0 lg:overflow-hidden lg:rounded-[1.5rem]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  "relative flex min-h-[112px] flex-col justify-between rounded-[1.25rem] border border-white/55 bg-white/24 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md",
                  "lg:min-h-0 lg:flex-row lg:items-center lg:justify-start lg:gap-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-6 lg:py-5 lg:shadow-none",
                  i !== stats.length - 1 ? "lg:border-r lg:border-white/38" : "",
                ].join(" ")}
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-full border border-white/75 bg-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_14px_rgba(6,66,82,0.07)] backdrop-blur-md lg:size-[62px]">
                  {stat.icon}
                </div>

                <div className="mt-3 min-w-0 lg:mt-0">
                  <p
                    className={`font-black tracking-tight text-[#083b49] drop-shadow-[0_1px_1px_rgba(255,255,255,0.32)] ${stat.valueClassName}`}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[9.5px] font-black uppercase leading-tight tracking-[0.08em] text-[#064252]/70 lg:text-[11px]">
                    {stat.label}
                  </p>
                  <p className="text-[10px] font-semibold leading-snug text-[#064252]/62 lg:text-[11px]">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Cabang Lomba ===== */}
      <section className="container-hero relative pt-4 pb-5 lg:pt-8 lg:pb-8">        <div className="pointer-events-none absolute -left-24 top-24 size-[360px] rounded-full bg-[#faadb6]/10 blur-[100px] -z-10" />
        <div className="pointer-events-none absolute right-0 top-8 size-[420px] rounded-full bg-[#c2e1df]/16 blur-[120px] -z-10" />

        <div className="mb-6 flex items-end justify-between gap-4 md:mb-9">
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <div className="h-9 w-1.5 shrink-0 rounded-full bg-[#faadb6] shadow-[0_0_18px_rgba(250,173,182,0.55)] md:h-10" />
            <div className="min-w-0">
              <p className="mb-1 hidden text-[10px] font-black uppercase tracking-[0.24em] text-[#7E032F] md:block">
                Cabang lomba unggulan
              </p>
              <h2 className="games-display text-[2rem] font-black leading-[1.02] tracking-[-0.055em] text-[#064252] min-[390px]:text-[2.18rem] md:text-4xl">
                Cabang Lomba Unggulan
              </h2>
            </div>
          </div>

          <Link
            to="/lomba"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-white/55 bg-white/24 px-5 py-2.5 text-xs font-black text-[#7E032F] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] backdrop-blur-md transition hover:translate-y-[-1px] hover:bg-white/40 md:inline-flex"
          >
            Lihat Semua Lomba <ArrowRight size={15} />
          </Link>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -left-5 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-[#faadb6] text-white shadow-[0_14px_34px_rgba(250,173,182,0.45)] lg:grid">
            <ArrowLeft size={20} />
          </div>

          <div className="pointer-events-none absolute -right-5 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-[#faadb6] text-white shadow-[0_14px_34px_rgba(250,173,182,0.45)] lg:grid">
            <ArrowRight size={20} />
          </div>

          {competitions.loading ? <LoadingState /> : null}
          {competitions.error ? <ErrorState message={competitions.error} /> : null}
          {!competitions.loading && !competitions.error && competitions.data?.length === 0 ? (
            <EmptyState description="Lomba aktif belum tersedia." />
          ) : null}

          {competitions.data && competitions.data.length > 0 ? (
            <>
              <div className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 pl-1 pr-6 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-5">
                {competitions.data.slice(0, 5).map((competition) => (
                  <FeaturedCompetitionCard key={competition.id} competition={competition} />
                ))}
              </div>

              <div className="mt-5 flex justify-center md:hidden">
                <Link
                  to="/lomba"
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/28 px-5 py-2.5 text-xs font-black text-[#7E032F] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md"
                >
                  Lihat Semua Lomba <ArrowRight size={14} />
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* ===== Timeline Horizontal ===== */}
      <section className="container-hero relative pt-4 pb-10 lg:pt-5 lg:pb-14">
        <div className="pointer-events-none absolute -left-16 top-10 size-[360px] rounded-full bg-[#c2e1df]/12 blur-[100px] -z-10" />
        <div className="pointer-events-none absolute right-0 bottom-0 size-[440px] rounded-full bg-[#064252]/8 blur-[120px] -z-10" />

        <div className="mb-6 flex items-center gap-4 md:mb-8">
          <div className="h-9 w-1.5 shrink-0 rounded-full bg-[#faadb6] shadow-[0_0_18px_rgba(250,173,182,0.55)] md:h-10" />
          <h2 className="games-display text-[1.85rem] font-black leading-tight tracking-[-0.04em] text-[#064252] min-[390px]:text-[2.05rem] md:text-4xl">
            Timeline GAMES 2026
          </h2>
        </div>

        {timelines.loading ? <LoadingState /> : null}
        {timelines.error ? <ErrorState message={timelines.error} /> : null}
        {!timelines.loading && !timelines.error && timelines.data?.length === 0 ? (
          <EmptyState />
        ) : null}
        {timelines.data && timelines.data.length > 0 ? (
          <TimelineHorizontal items={timelines.data.slice(0, 5)} />
        ) : null}
      </section>

      {/* ===== Pengumuman ===== */}
      <section className="container-page relative py-10 lg:py-12">
        <div className="absolute top-0 right-0 size-[500px] rounded-full bg-[#004551]/5 blur-[120px] -z-10" />

        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-10 bg-[#faadb6] rounded-full" />
          <SectionHeading
            title="Pengumuman Terbaru"
            actionLabel="Lihat Semua Pengumuman"
            actionHref="/pengumuman"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {announcements.loading ? <LoadingState /> : null}
          {announcements.error ? <ErrorState message={announcements.error} /> : null}
          {!announcements.loading && !announcements.error && announcements.data?.length === 0 ? (
            <EmptyState />
          ) : null}
          {announcements.data?.slice(0, 3).map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CTASection />
    </>
  );
}

const competitionIcons = [Calculator, Atom, FlaskConical, Leaf, Code, BookOpen];

function FeaturedCompetitionCard({ competition }: { competition: Competition }) {
  const iconIndex = Math.abs(competition.code.charCodeAt(0) || 0) % competitionIcons.length;
  const Icon = competitionIcons[iconIndex];

  const description =
    competition.short_description ||
    competition.description ||
    "Kompetisi untuk mengasah nalar, strategi, dan kreativitas peserta.";

  return (
    <Link
      to={`/lomba/${competition.slug}`}
      className="group glass-card-premium flex min-h-[218px] w-[218px] shrink-0 snap-start flex-col justify-between rounded-[1.35rem] p-4 text-left transition sm:w-auto md:min-h-[250px] md:p-5 lg:min-h-[270px]"
    >
      <div>
        <div className="mb-5 flex items-start justify-between gap-3 md:mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#7E032F] opacity-25 blur-lg transition-opacity group-hover:opacity-45" />
            <div className="relative grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#7E032F] to-[#9f0a3a] text-white shadow-[0_16px_28px_rgba(126,3,47,0.22)] transition group-hover:scale-105 group-hover:from-[#064252] group-hover:to-[#0b5a63] md:size-14">
              <Icon size={21} strokeWidth={2.25} />
            </div>
          </div>

          <span className="rounded-full border border-white/60 bg-white/42 px-2.5 py-1 text-[8.5px] font-black uppercase tracking-[0.08em] text-[#064252]/70 backdrop-blur-md">
            Buka
          </span>
        </div>

        <h3 className="line-clamp-2 text-[0.98rem] font-black leading-tight tracking-[-0.02em] text-[#064252] md:text-lg">
          {competition.name}
        </h3>

        <p className="mt-3 line-clamp-3 text-[0.76rem] font-semibold leading-5 text-[#064252]/68 md:mt-4 md:line-clamp-4 md:text-sm md:leading-6">
          {description}
        </p>
      </div>

      <span className="mt-5 inline-flex items-center gap-1 text-[0.72rem] font-black text-[#7E032F] md:text-xs">
        Selengkapnya{" "}
        <ArrowRight size={13} className="transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}