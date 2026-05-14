import { Bell, CalendarDays, CheckCircle2, Clock3, FileText, Hourglass, Trophy, ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getTimelines } from "../../services/timelines";
import type { Timeline } from "../../types/models";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";

const stepIcons = [CalendarDays, FileText, CheckCircle2, Trophy, Hourglass];

export function TimelinePage() {
  const { data, error, loading } = useAsyncData(getTimelines, []);
  const items = data ?? [];

  return (
    <>
      <section className="container-page pt-28 md:pt-32">
        <div className="hero-glass relative grid min-h-[390px] overflow-hidden rounded-[2.35rem] md:grid-cols-[1fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <p className="mb-5 inline-flex w-fit rounded-full border border-[#faadb6]/45 bg-[#faadb6]/22 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#770525]">
              Timeline GAMES 2026
            </p>
            <h1 className="games-display max-w-2xl text-4xl font-black leading-[1.04] text-[#004551] md:text-5xl lg:text-6xl">
              Timeline Kegiatan <span className="text-[#770525]">GAMES 2026</span>
            </h1>
            <p className="mt-5 max-w-md text-sm font-semibold leading-7 text-[#004551]/78 md:text-base">
              Pantau setiap tahap kegiatan GAMES 2026 agar tidak ketinggalan informasi penting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/daftar" className="btn-glossy-maroon inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black text-white">
                Daftar Sekarang <Rocket size={16} />
              </Link>
              <Link to="/lomba" className="btn-glass-outline inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black text-[#004551]">
                Lihat Semua Lomba <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <TimelineHeroVisual />
        </div>
      </section>

      <section className="container-page py-10 md:py-14">
        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && items.length === 0 ? <EmptyState description="Timeline belum tersedia." /> : null}
        {items.length > 0 ? (
          <>
            <div className="hidden md:block">
              <DesktopTimeline items={items.slice(0, 5)} />
            </div>
            <div className="md:hidden">
              <MobileTimeline items={items.slice(0, 5)} />
            </div>
          </>
        ) : null}
      </section>

      <section className="container-page pb-20">
        <div className="glass-panel flex flex-col gap-5 rounded-[1.7rem] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex gap-5">
            <div className="grid size-16 shrink-0 place-items-center rounded-full border border-white/80 bg-white/60 text-[#004551] shadow-[0_16px_34px_rgba(0,69,81,0.14)]">
              <Bell size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#004551]">Catatan Penting</h2>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-[#004551]/72">
                Tanggal dapat berubah sewaktu-waktu. Pastikan kamu selalu memantau informasi terbaru melalui pengumuman di website atau media sosial resmi GAMES 2026.
              </p>
            </div>
          </div>
          <Link to="/pengumuman" className="btn-glass-outline inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-black text-[#770525]">
            Lihat Pengumuman <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

function DesktopTimeline({ items }: { items: Timeline[] }) {
  const columnCount = Math.min(Math.max(items.length, 1), 5);

  return (
    <div className="glass-panel relative overflow-hidden rounded-[2.3rem] p-6 md:p-8 lg:p-10">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
      >
        {items.map((item, index) => {
          const Icon = stepIcons[index % stepIcons.length];
          const featured = index === 3;
          return (
            <div key={item.id} className="relative px-3">
              <div className="relative h-32">
                {index > 0 ? (
                  <div className={`absolute left-0 right-1/2 top-10 h-1 -translate-y-1/2 ${getTimelineSegmentClass(index - 1)}`} />
                ) : null}
                {index < items.length - 1 ? (
                  <div className={`absolute left-1/2 right-0 top-10 h-1 -translate-y-1/2 ${getTimelineSegmentClass(index)}`} />
                ) : null}
                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
                  <div className={`grid size-20 place-items-center rounded-full border shadow-[0_0_28px_rgba(194,225,223,0.42)] backdrop-blur-2xl ${featured ? "border-[#faadb6]/65 bg-[#770525] text-white" : "border-white/75 bg-[#004551]/68 text-white"}`}>
                    <Icon size={28} className={featured ? "text-[#faadb6]" : "text-[#c2e1df]"} />
                  </div>
                </div>
                <div className={`absolute left-1/2 top-20 h-12 w-px -translate-x-1/2 ${featured ? "bg-[#770525]" : "bg-[#5fa6a5]/70"}`} />
                <div className={`absolute left-1/2 top-[7.9rem] size-2 -translate-x-1/2 rounded-full ${featured ? "bg-[#770525]" : "bg-[#5fa6a5]"}`} />
              </div>
              <div className={`glass-card-premium min-h-[310px] rounded-[1.45rem] p-6 text-center ${featured ? "border-[#770525]/50" : ""}`}>
                <span className={`rounded-full px-4 py-1.5 text-xs font-black ${featured ? "bg-[#faadb6]/35 text-[#770525]" : "bg-[#c2e1df]/55 text-[#004551]"}`}>
                  Tahap {index + 1}
                </span>
                <h3 className="mt-5 text-2xl font-black leading-tight text-[#004551]">{item.title}</h3>
                <p className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-black text-[#004551]">
                  <CalendarDays size={15} /> {formatTimelineDate(item)}
                </p>
                {item.description ? (
                  <p className="mt-5 text-sm font-medium leading-8 text-[#004551]/72">{item.description}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getTimelineSegmentClass(index: number) {
  if (index === 2 || index === 3) return "bg-[#770525]";
  if (index > 3) return "bg-[#9fbec0]";
  return "bg-[#5fd0cc]";
}

function MobileTimeline({ items }: { items: Timeline[] }) {
  return (
    <div className="glass-panel relative rounded-[2rem] p-5">
      <div className="absolute bottom-10 left-[2.9rem] top-10 w-1 rounded-full bg-gradient-to-b from-[#5fa6a5] via-[#770525] to-[#c2e1df]" />
      <div className="grid gap-5">
        {items.map((item, index) => {
          const Icon = stepIcons[index % stepIcons.length];
          const featured = index === 3;
          return (
            <div key={item.id} className="relative grid grid-cols-[3.5rem_1fr] gap-4">
              <div className="relative z-10 flex justify-center pt-6">
                <div className={`grid size-12 place-items-center rounded-full shadow-[0_0_20px_rgba(0,69,81,0.2)] ${featured ? "bg-[#770525] text-white" : "bg-[#004551] text-[#c2e1df]"}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className={`glass-card-premium rounded-[1.3rem] p-5 ${featured ? "border-[#770525]/50" : ""}`}>
                <span className={`rounded-full px-3 py-1 text-[11px] font-black ${featured ? "bg-[#faadb6]/35 text-[#770525]" : "bg-[#c2e1df]/55 text-[#004551]"}`}>
                  Tahap {index + 1}
                </span>
                <h3 className="mt-3 text-xl font-black text-[#004551]">{item.title}</h3>
                <p className="mt-2 text-sm font-black text-[#004551]">{formatTimelineDate(item)}</p>
                {item.description ? <p className="mt-3 text-sm font-medium leading-7 text-[#004551]/70">{item.description}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineHeroVisual() {
  return (
    <div className="relative hidden min-h-[390px] items-center justify-center overflow-hidden md:flex">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#c2e1df]/18 to-[#004551]/68" />
      <span className="absolute left-16 top-12 font-mono text-2xl font-bold text-[#c2e1df]/65">f(x) = sin x</span>
      <span className="absolute right-16 top-24 font-mono text-xl font-bold text-[#c2e1df]/75">a² + b² = c²</span>
      <span className="absolute bottom-12 left-1/2 font-mono text-xl font-bold text-[#c2e1df]/75">π = 3.14159</span>
      <div className="relative aspect-square w-[340px]">
        <div className="absolute inset-3 rounded-full border border-[#c2e1df]/45" />
        <div className="absolute inset-10 rounded-full border border-dashed border-[#c2e1df]/45" />
        <div className="absolute left-[14%] top-[45%] size-24 animate-float-reverse">
          <svg viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(194,225,223,0.7)]">
            <polygon points="50,8 84,28 84,72 50,94 16,72 16,28" fill="rgba(194,225,223,0.18)" stroke="#c2e1df" strokeWidth="2" />
            <line x1="16" y1="28" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
            <line x1="84" y1="28" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
            <line x1="50" y1="94" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute right-[6%] top-[45%] size-32 animate-float">
          <svg viewBox="0 0 120 120" className="drop-shadow-[0_0_20px_rgba(194,225,223,0.7)]">
            <polygon points="60,8 108,102 12,102" fill="rgba(194,225,223,0.12)" stroke="#c2e1df" strokeWidth="2" />
            <line x1="60" y1="8" x2="70" y2="88" stroke="#c2e1df" strokeWidth="2" />
            <line x1="12" y1="102" x2="70" y2="88" stroke="#c2e1df" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative grid size-40 place-items-center rounded-[2rem] border border-[#c2e1df]/58 bg-[#004551]/42 text-[#c2e1df] shadow-[inset_0_0_52px_rgba(194,225,223,0.35),0_0_44px_rgba(194,225,223,0.28)] backdrop-blur-2xl">
            <CalendarDays size={78} strokeWidth={1.6} />
            <div className="absolute -bottom-8 -right-8 grid size-24 place-items-center rounded-full border border-[#c2e1df]/70 bg-[#004551]/58 text-[#c2e1df] shadow-[0_0_34px_rgba(194,225,223,0.34)]">
              <Clock3 size={48} strokeWidth={1.6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTimelineDate(item: Timeline) {
  if (!item.end_date) return formatDate(item.start_date);
  return `${formatDate(item.start_date)} - ${formatDate(item.end_date)}`;
}
