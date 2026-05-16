import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Hourglass,
  Rocket,
  Trophy,
} from "lucide-react";
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

      {/* ===== Timeline ===== */}
      <section className="container-hero py-7 md:py-12">
        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && items.length === 0 ? (
          <EmptyState description="Timeline belum tersedia." />
        ) : null}

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

function DesktopTimeline({ items }: { items: Timeline[] }) {
  const columnCount = Math.min(Math.max(items.length, 1), 5);
  const activeIndex = Math.min(3, Math.max(0, items.length - 1));

  return (
    <div className="relative overflow-hidden rounded-[2.15rem] border border-white/88 bg-white/48 p-6 shadow-[0_22px_56px_rgba(6,68,82,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[24px] md:p-8 lg:p-10">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item, index) => {
          const Icon = stepIcons[index % stepIcons.length];
          const featured = index === activeIndex;

          return (
            <div key={item.id} className="relative px-3">
              <div className="relative h-28">
                {index > 0 ? (
                  <div
                    className={`absolute left-0 right-1/2 top-10 h-[3px] -translate-y-1/2 ${getTimelineSegmentClass(index - 1)}`}
                  />
                ) : null}

                {index < items.length - 1 ? (
                  <div
                    className={`absolute left-1/2 right-0 top-10 h-[3px] -translate-y-1/2 ${getTimelineSegmentClass(index)}`}
                  />
                ) : null}

                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
                  <div
                    className={[
                      "grid size-18 place-items-center rounded-full border shadow-[0_0_26px_rgba(194,225,223,0.42)] backdrop-blur-2xl",
                      featured
                        ? "border-[#faadb6]/65 bg-[#7E032F] text-white"
                        : "border-white/75 bg-[#064452]/76 text-white",
                    ].join(" ")}
                  >
                    <Icon
                      size={25}
                      className={featured ? "text-[#faadb6]" : "text-[#c2e1df]"}
                    />
                  </div>
                </div>

                <div
                  className={[
                    "absolute left-1/2 top-[4.5rem] h-10 w-px -translate-x-1/2",
                    featured ? "bg-[#7E032F]" : "bg-[#5fa6a5]/70",
                  ].join(" ")}
                />
              </div>

              <div
                className={[
                  "min-h-[250px] rounded-[1.35rem] border bg-white/62 p-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]",
                  featured ? "border-[#7E032F]/42" : "border-white/75",
                ].join(" ")}
              >
                <span
                  className={[
                    "rounded-full px-3 py-1.5 text-[11px] font-black",
                    featured
                      ? "bg-[#faadb6]/35 text-[#7E032F]"
                      : "bg-[#c2e1df]/55 text-[#064452]",
                  ].join(" ")}
                >
                  Tahap {index + 1}
                </span>

                <h3 className="mt-5 text-xl font-black leading-tight text-[#064452]">
                  {item.title}
                </h3>

                <p className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-black text-[#064452]">
                  <CalendarDays size={15} /> {formatTimelineDate(item)}
                </p>

                {item.description ? (
                  <p className="mt-5 text-sm font-semibold leading-7 text-[#064452]/70">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileTimeline({ items }: { items: Timeline[] }) {
  const activeIndex = Math.min(3, Math.max(0, items.length - 1));

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/88 bg-white/58 px-4 py-5 shadow-[0_18px_44px_rgba(6,68,82,0.1),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[24px]">
      <div className="pointer-events-none absolute -right-24 top-6 size-56 rounded-full bg-[#c2e1df]/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 size-56 rounded-full bg-[#064452]/10 blur-3xl" />

      <div className="relative">
        <div className="absolute bottom-8 left-[1.45rem] top-8 w-[2px] rounded-full bg-gradient-to-b from-[#5fa6a5] via-[#7E032F] to-[#c2e1df] shadow-[0_0_16px_rgba(194,225,223,0.55)]" />

        <div className="grid gap-4">
          {items.map((item, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            const featured = index === activeIndex;

            return (
              <div
                key={item.id}
                className="relative grid min-w-0 grid-cols-[3.05rem_1fr] gap-3"
              >
                <div className="relative z-10 flex justify-center pt-4">
                  <div className="grid size-11 place-items-center rounded-full border border-white/80 bg-white/62 shadow-[0_12px_28px_rgba(6,68,82,0.13),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md">
                    <div
                      className={[
                        "grid size-8 place-items-center rounded-full",
                        featured
                          ? "bg-gradient-to-br from-[#7E032F] to-[#a60b3a] text-white shadow-[0_0_20px_rgba(126,3,47,0.34)]"
                          : "bg-gradient-to-br from-[#064452] to-[#0b5a63] text-[#c2e1df]",
                      ].join(" ")}
                    >
                      <Icon size={15} />
                    </div>
                  </div>
                </div>

                <article
                  className={[
                    "min-w-0 rounded-[1.2rem] border bg-white/64 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]",
                    featured ? "border-[#7E032F]/42" : "border-white/76",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-flex rounded-full px-3 py-1 text-[10px] font-black",
                      featured
                        ? "bg-[#faadb6]/35 text-[#7E032F]"
                        : "bg-[#c2e1df]/55 text-[#064452]",
                    ].join(" ")}
                  >
                    Tahap {index + 1}
                  </span>

                  <h3 className="mt-2.5 text-[1rem] font-black leading-snug text-[#064452]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-[0.78rem] font-black leading-5 text-[#064452]/80">
                    {formatTimelineDate(item)}
                  </p>

                  {item.description ? (
                    <p className="mt-2 text-[0.78rem] font-semibold leading-5 text-[#064452]/68">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              </div>
            );
          })}
        </div>
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

function getTimelineSegmentClass(index: number) {
  if (index === 2 || index === 3) return "bg-[#7E032F]";
  if (index > 3) return "bg-[#9fbec0]";
  return "bg-[#5fd0cc]";
}

function formatTimelineDate(item: Timeline) {
  if (!item.end_date) return formatDate(item.start_date);
  return `${formatDate(item.start_date)} - ${formatDate(item.end_date)}`;
}