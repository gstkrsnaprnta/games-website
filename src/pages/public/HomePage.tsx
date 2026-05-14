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
  { icon: <Trophy size={28} className="text-[#770525]" />, value: "5+", label: "Cabang Lomba", sublabel: "Matematika & Sains" },
  { icon: <Users size={28} className="text-[#004551]" />, value: "SD – Mahasiswa", label: "Semua Jenjang", sublabel: "Pendidikan" },
  { icon: <Globe size={28} className="text-[#004551]" />, value: "Nasional", label: "Peserta dari Seluruh", sublabel: "Indonesia" },
  { icon: <Calendar size={28} className="text-[#770525]" />, value: "Event Tahunan", label: "Diselenggarakan", sublabel: "Setiap Tahun" },
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
      <section className="container-page relative z-20 mt-4 mb-12 lg:mt-8 lg:mb-16">
        <div className="rounded-[2.5rem] p-4 lg:p-5 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[rgba(255,255,255,0.6)] via-[rgba(255,255,255,0.3)] to-[rgba(194,225,223,0.3)] backdrop-blur-[40px] shadow-[0_24px_60px_rgba(0,69,81,0.2),inset_0_1px_0_rgba(255,255,255,1)] border border-[rgba(255,255,255,0.8)]">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`flex w-full items-center justify-center gap-5 px-6 py-4 md:py-2 ${i !== stats.length - 1 ? "md:border-r border-[#004551]/15" : ""}`}>
              <div className="shrink-0 grid size-14 place-items-center rounded-full bg-white/50 shadow-inner border border-white/60">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <p className="text-[1.35rem] font-black text-[#002b32] leading-none mb-1 tracking-tight drop-shadow-sm">{stat.value}</p>
                <p className="text-[11px] font-bold text-[#004551]/75 leading-tight uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-[11px] font-semibold text-[#0b5a63]/70 leading-tight">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
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
        {!timelines.loading && !timelines.error && timelines.data?.length === 0 ? <EmptyState /> : null}
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
          {!announcements.loading && !announcements.error && announcements.data?.length === 0 ? <EmptyState /> : null}
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
