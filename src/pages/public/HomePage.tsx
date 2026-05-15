import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Calendar,
  Calculator,
  Code2,
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
    icon: <Trophy size={24} className="text-[#7E032F]" strokeWidth={2.15} />,
    value: "5+",
    valueClassName: "text-[1.9rem] lg:text-[2.15rem]",
    label: "Cabang Lomba",
    sublabel: "Matematika & Sains",
  },
  {
    icon: <Users size={24} className="text-[#064252]" strokeWidth={2.15} />,
    value: "SD – Mahasiswa",
    valueClassName: "text-[1.28rem] leading-[1.05] lg:text-[1.55rem]",
    label: "Semua Jenjang",
    sublabel: "Pendidikan",
  },
  {
    icon: <Globe size={24} className="text-[#064252]" strokeWidth={2.15} />,
    value: "Nasional",
    valueClassName: "text-[1.78rem] lg:text-[1.95rem]",
    label: "Peserta dari Seluruh",
    sublabel: "Indonesia",
  },
  {
    icon: <Calendar size={24} className="text-[#7E032F]" strokeWidth={2.15} />,
    value: "Event Tahunan",
    valueClassName: "text-[1.55rem] leading-[1.05] lg:text-[1.85rem]",
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
      <section className="container-hero relative z-20 mt-5 mb-12 lg:mt-6 lg:mb-16">
        <div className="stats-strip-soft-glow relative overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(90deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.36)_45%,rgba(194,225,223,0.26)_72%,rgba(6,66,82,0.2)_100%)] px-3 py-3 shadow-[0_20px_55px_rgba(6,66,82,0.16),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-[28px] lg:px-5 lg:py-4">
          <div className="grid grid-cols-1 overflow-hidden rounded-[1.6rem] md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, i) => {
              const dividerClass = [
                i !== stats.length - 1 ? "xl:border-r" : "",
                i < 2 ? "md:border-b xl:border-b-0" : "",
                i % 2 === 0 ? "md:border-r" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={stat.label}
                  className={`relative flex items-center gap-4 border-white/40 px-5 py-4.5 md:py-5 lg:px-7 lg:py-5 ${dividerClass}`}
                >
                  <div className="grid size-[60px] shrink-0 place-items-center rounded-full border border-white/75 bg-white/44 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_14px_rgba(6,66,82,0.06)] backdrop-blur-md lg:size-[66px]">
                    {stat.icon}
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`font-black tracking-tight text-[#083b49] drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)] ${stat.valueClassName}`}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] font-bold uppercase leading-tight tracking-[0.08em] text-[#064252]/72 lg:text-[12px]">
                      {stat.label}
                    </p>
                    <p className="text-[11px] font-semibold leading-snug text-[#064252]/65 lg:text-[12px]">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Cabang Lomba ===== */}
      <section className="container-page relative py-10 lg:py-12">
        <div className="absolute top-1/2 left-0 size-[400px] -translate-y-1/2 rounded-full bg-[#faadb6]/10 blur-[100px] -z-10" />

        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-10 bg-[#faadb6] rounded-full" />
          <SectionHeading
            title="Cabang Lomba Unggulan"
            actionLabel="Lihat Semua Lomba"
            actionHref="/lomba"
          />
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -left-5 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-[#faadb6] text-white shadow-[0_14px_34px_rgba(250,173,182,0.45)] md:grid">
            <ArrowLeft size={20} />
          </div>
          <div className="pointer-events-none absolute -right-5 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-[#faadb6] text-white shadow-[0_14px_34px_rgba(250,173,182,0.45)] md:grid">
            <ArrowRight size={20} />
          </div>

          {competitions.loading ? <LoadingState /> : null}
          {competitions.error ? <ErrorState message={competitions.error} /> : null}
          {!competitions.loading && !competitions.error && competitions.data?.length === 0 ? (
            <EmptyState description="Lomba aktif belum tersedia." />
          ) : null}
          {competitions.data && competitions.data.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {competitions.data.slice(0, 5).map((competition) => (
                <FeaturedCompetitionCard key={competition.id} competition={competition} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* ===== Timeline Horizontal ===== */}
      <section className="container-page relative py-10 lg:py-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-10 bg-[#faadb6] rounded-full" />
          <SectionHeading title="Timeline GAMES 2026" />
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

const competitionIcons = [Calculator, Atom, FlaskConical, Leaf, Code2];

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
      className="glass-card-premium group flex min-h-[240px] flex-col justify-between rounded-[1.35rem] p-5 text-left"
    >
      <div>
        <div className="mb-7 grid size-14 place-items-center rounded-full bg-[#770525] text-white shadow-[0_18px_36px_rgba(119,5,37,0.22)] transition group-hover:scale-105 group-hover:bg-[#004551]">
          <Icon size={24} strokeWidth={2.4} />
        </div>
        <h3 className="text-[1.05rem] font-black leading-snug text-[#004551]">
          {competition.name}
        </h3>
        <p className="mt-3 line-clamp-4 text-xs font-semibold leading-6 text-[#004551]/72">
          {description}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1 text-xs font-black text-[#770525]">
        Selengkapnya <ArrowRight size={14} className="transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}