import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Clock3,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getGeneralTimelines } from "../../services/timelines";
import type { GeneralTimelineItem, TimelineScope } from "../../types/models";
import { VerticalTimeline } from "../../components/public/TimelineItem";



export function TimelinePage() {
  const [data, setData] = useState<GeneralTimelineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeScope, setActiveScope] = useState<TimelineScope>("regional");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const EVENT_ID = "916561f8-9237-490f-98f4-3db9a46575a7";
        const { data: timelinesData, error: dbError } = await getGeneralTimelines(EVENT_ID);
        if (dbError) {
          throw dbError;
        }
        setData(timelinesData);

        const regCount = timelinesData.filter((item) => item.timeline_scope === "regional").length;
        const natCount = timelinesData.filter((item) => item.timeline_scope === "nasional").length;
        if (import.meta.env.DEV) {
          console.info("General timeline count:", {
            regional: regCount,
            nasional: natCount,
          });
        }
      } catch (err: unknown) {
        console.error("Error fetching timelines:", err);
        const errMsg =
          err instanceof Error ? err.message : "Gagal memuat timeline.";
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const regionalTimeline = data.filter((item) => item.timeline_scope === "regional");
  const nationalTimeline = data.filter((item) => item.timeline_scope === "nasional");
  const activeTimeline = activeScope === "regional" ? regionalTimeline : nationalTimeline;

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="container-hero pt-28 md:pt-32">
        <div className="timeline-page-hero timeline-page-hero-soft relative grid min-h-[430px] overflow-hidden rounded-[2rem] border border-white/90 backdrop-blur-[26px] md:min-h-[390px] md:grid-cols-[1fr_0.95fr] md:rounded-[2.35rem]">
          <div className="relative z-20 flex flex-col justify-center px-6 py-8 md:p-10 lg:p-12">
            <div className="relative z-10 max-w-[18.5rem] md:max-w-[34rem]">
              <p className="mb-5 inline-flex w-fit rounded-full border border-[#faadb6]/45 bg-[#fff1f4]/84 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#7E032F] shadow-[0_8px_18px_rgba(126,3,47,0.08)] backdrop-blur-md">
                Timeline GAMES 2026
              </p>

              <h1 className="games-display text-[2.16rem] font-black leading-[1.02] tracking-[-0.05em] text-[#064452] min-[390px]:text-[2.38rem] md:text-5xl md:tracking-[-0.04em] lg:text-6xl">
                Timeline Kegiatan{" "}
                <span className="text-[#7E032F]">GAMES 2026</span>
              </h1>

              <p className="mt-5 max-w-[16.5rem] text-[0.92rem] font-semibold leading-6 text-[#064452]/78 md:max-w-md md:text-base md:leading-7">
                Pantau setiap tahap kegiatan GAMES 2026 agar tidak ketinggalan informasi penting.
              </p>

              <div className="mt-7 flex w-full max-w-[235px] flex-col items-start gap-3 min-[390px]:max-w-[250px] sm:max-w-none sm:flex-row md:mt-8">
                <Link
                  to="/daftar"
                  className="btn-glossy-maroon inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-full px-5 text-[0.82rem] font-black text-white sm:w-auto md:h-12 md:px-8 md:text-sm"
                >
                  <span className="whitespace-nowrap">Daftar Sekarang</span>
                  <Rocket size={15} className="shrink-0" />
                </Link>

                <Link
                  to="/lomba"
                  className="btn-glass-outline inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-full px-5 text-[0.82rem] font-black text-[#064452] sm:w-auto md:h-12 md:px-8 md:text-sm"
                >
                  <span className="whitespace-nowrap">Lihat Semua Lomba</span>
                  <ArrowRight size={15} className="shrink-0" />
                </Link>
              </div>
            </div>
          </div>

          <TimelineHeroVisual />
        </div>
      </section>

      {/* ===== Tabs Section ===== */}
      <section className="container-hero mt-8">
        <div className="mx-auto flex max-w-[400px] justify-center px-4">
          <div
            role="tablist"
            aria-label="Kategori Timeline"
            className="flex w-full items-center gap-1.5 rounded-full border border-white/60 bg-white/35 p-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_rgba(6,66,82,0.06)] backdrop-blur-md"
          >
            <button
              role="tab"
              id="tab-regional"
              aria-selected={activeScope === "regional"}
              aria-controls="panel-regional"
              tabIndex={activeScope === "regional" ? 0 : -1}
              onClick={() => setActiveScope("regional")}
              className={`flex-1 rounded-full py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeScope === "regional"
                  ? "bg-[#7E032F] text-white shadow-[0_4px_12px_rgba(126,3,47,0.22)]"
                  : "text-[#064452] hover:bg-white/40 hover:text-[#7E032F]"
              }`}
            >
              Regional
            </button>
            <button
              role="tab"
              id="tab-nasional"
              aria-selected={activeScope === "nasional"}
              aria-controls="panel-nasional"
              tabIndex={activeScope === "nasional" ? 0 : -1}
              onClick={() => setActiveScope("nasional")}
              className={`flex-1 rounded-full py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeScope === "nasional"
                  ? "bg-[#7E032F] text-white shadow-[0_4px_12px_rgba(126,3,47,0.22)]"
                  : "text-[#064452] hover:bg-white/40 hover:text-[#7E032F]"
              }`}
            >
              Nasional
            </button>
          </div>
        </div>
      </section>

      {/* ===== Timeline Content Section ===== */}
      <section className="container-hero py-4 md:py-6">
        {loading ? (
          <TimelineSkeleton />
        ) : error ? (
          <div className="mx-auto max-w-md px-4 py-16 text-center">
            <div className="rounded-[1.45rem] border border-red-200 bg-red-50/80 p-6 shadow-md backdrop-blur-md">
              <p className="text-sm font-semibold text-red-800">
                Terjadi kesalahan saat memuat data:
              </p>
              <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-red-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-900 cursor-pointer"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        ) : (
          <VerticalTimeline items={activeTimeline} scope={activeScope} />
        )}
      </section>

      {/* ===== Note ===== */}
      <section className="container-hero pb-14 md:pb-20">
        <div className="relative overflow-hidden rounded-[1.65rem] border border-white/90 bg-white/70 p-5 shadow-[0_18px_44px_rgba(6,68,82,0.1),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-[24px] md:flex md:items-center md:justify-between md:gap-6 md:p-8">
          <div className="flex gap-4 md:gap-5">
            <div className="grid size-12 shrink-0 place-items-center rounded-full border border-white/80 bg-white/70 text-[#064452] shadow-[0_14px_30px_rgba(6,68,82,0.12)] md:size-16">
              <Bell size={22} />
            </div>

            <div>
              <h2 className="text-lg font-black text-[#064452] md:text-xl">
                Catatan Penting
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#064452]/72 md:leading-7">
                Tanggal dapat berubah sewaktu-waktu. Pastikan kamu selalu
                memantau informasi terbaru melalui pengumuman di website atau
                media sosial resmi GAMES 2026.
              </p>
            </div>
          </div>

          <Link
            to="/pengumuman"
            className="btn-glass-outline mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-[#7E032F] md:mt-0 md:w-auto md:px-7"
          >
            Lihat Pengumuman <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}

function TimelineSkeleton() {
  return (
    <div className="relative mx-auto max-w-[850px] px-4 py-12 lg:py-16">
      {/* Center line skeleton */}
      <div className="absolute left-6 top-4 bottom-4 w-[3px] bg-white/20 lg:left-1/2 lg:-translate-x-1/2" />
      
      <div className="space-y-10 lg:space-y-14">
        {[1, 2, 3, 4].map((i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              className={`relative flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-16 ${
                isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Dot skeleton */}
              <div className="absolute left-6 top-8 z-10 flex size-[18px] -translate-x-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-sm lg:left-1/2 lg:-translate-x-1/2" />

              {/* Card skeleton */}
              <div
                className={`ml-12 lg:ml-0 rounded-[1.45rem] border border-white/40 bg-white/30 p-6 shadow-sm animate-pulse ${
                  isLeft ? "lg:col-start-1" : "lg:col-start-2"
                }`}
              >
                <div className="h-4 w-1/3 rounded bg-white/30 mb-3" />
                <div className="h-6 w-3/4 rounded bg-white/40 mb-3" />
                <div className="h-4 w-full rounded bg-white/20 mb-2" />
                <div className="h-4 w-5/6 rounded bg-white/20" />
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
    <div className="timeline-hero-visual pointer-events-none absolute inset-0 z-10 overflow-hidden md:relative md:inset-auto md:flex md:min-h-[390px] md:items-center md:justify-center">
      <div className="timeline-hero-teal" />
      <div className="timeline-hero-grid" />

      <span className="timeline-formula timeline-formula-sin">
        f(x) = sin x
      </span>

      <span className="timeline-formula timeline-formula-pythagoras">
        a² + b² = c²
      </span>

      <span className="timeline-formula timeline-formula-pi">
        π = 3.14159
      </span>

      <div className="timeline-hero-object">
        <div className="absolute inset-3 rounded-full border border-[#c2e1df]/42" />
        <div className="absolute inset-10 rounded-full border border-dashed border-[#c2e1df]/42" />

        {/* Cube */}
        <div className="absolute left-[2%] top-[54%] size-14 animate-float-reverse md:left-[14%] md:top-[45%] md:size-24">
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_20px_rgba(194,225,223,0.7)]"
          >
            <polygon
              points="50,8 84,28 84,72 50,94 16,72 16,28"
              fill="rgba(194,225,223,0.16)"
              stroke="#c2e1df"
              strokeWidth="2"
            />
            <line x1="16" y1="28" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
            <line x1="84" y1="28" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
            <line x1="50" y1="94" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
          </svg>
        </div>

        {/* Pyramid */}
        <div className="absolute right-[1%] top-[48%] size-16 animate-float md:right-[6%] md:top-[45%] md:size-32">
          <svg
            viewBox="0 0 120 120"
            className="drop-shadow-[0_0_20px_rgba(194,225,223,0.7)]"
          >
            <polygon
              points="60,8 108,102 12,102"
              fill="rgba(250,173,182,0.12)"
              stroke="#c2e1df"
              strokeWidth="2"
            />
            <line x1="60" y1="8" x2="70" y2="88" stroke="#c2e1df" strokeWidth="2" />
            <line x1="12" y1="102" x2="70" y2="88" stroke="#c2e1df" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Calendar + Clock */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative grid size-24 place-items-center rounded-[1.35rem] border border-[#c2e1df]/58 bg-[#064452]/42 text-[#c2e1df] shadow-[inset_0_0_52px_rgba(194,225,223,0.35),0_0_44px_rgba(194,225,223,0.28)] backdrop-blur-2xl md:size-40 md:rounded-[2rem]">
            <CalendarDays size={46} strokeWidth={1.6} className="md:size-[78px]" />

            <div className="absolute -bottom-5 -right-5 grid size-14 place-items-center rounded-full border border-[#c2e1df]/70 bg-[#064452]/58 text-[#c2e1df] shadow-[0_0_34px_rgba(194,225,223,0.34)] md:-bottom-8 md:-right-8 md:size-24">
              <Clock3 size={30} strokeWidth={1.6} className="md:size-[48px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}