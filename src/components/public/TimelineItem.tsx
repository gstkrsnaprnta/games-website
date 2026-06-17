import {
  Calendar,
  CheckCircle2,
  FileText,
  Medal,
  Trophy,
} from "lucide-react";
import type { Timeline } from "../../types/models";
import { formatDate } from "../../utils/date";

const horizontalIcons = [Calendar, FileText, CheckCircle2, Trophy, Medal];

export function TimelineItem({
  item,
  index = 0,
  isLast = false,
}: {
  item: Timeline;
  index?: number;
  isLast?: boolean;
}) {
  return (
    <div className="group relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="grid size-12 shrink-0 place-items-center rounded-full border border-white/70 bg-white/50 shadow-md backdrop-blur-sm transition-transform group-hover:scale-110">
          <div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-[#7E032F] to-[#9b0b34] text-[10px] font-black text-white shadow-inner">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {!isLast ? (
          <div className="my-2 w-0.5 flex-1 rounded-full bg-gradient-to-b from-[#7E032F]/30 via-[#c2e1df]/50 to-transparent" />
        ) : null}
      </div>

      <div className="glass-card-premium mb-8 flex-1 rounded-[1.25rem] p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#faadb6]/30 bg-[#faadb6]/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#7E032F]">
            <Calendar size={12} />
            {formatDate(item.start_date)}
          </span>

          {item.end_date ? (
            <span className="text-xs font-bold text-[#064252]/50">
              — {formatDate(item.end_date)}
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-lg font-black text-[#064252]">
          {item.title}
        </h3>

        {item.description ? (
          <p className="mt-2 text-sm leading-7 text-[#064252]/65">
            {item.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function TimelineList({ items }: { items: Timeline[] }) {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <TimelineItem
          key={item.id}
          item={item}
          index={index}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

export function TimelineHorizontal({ items }: { items: Timeline[] }) {
  const visibleItems = items.slice(0, 5);

  if (visibleItems.length === 0) return null;

  return (
    <>
      {/* =========================
          MOBILE TIMELINE
      ========================= */}
      <div className="relative md:hidden">
        <div className="relative overflow-hidden rounded-[1.65rem] border border-white/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0.18)_48%,rgba(194,225,223,0.18)_76%,rgba(6,66,82,0.12)_100%)] px-4 py-5 shadow-[0_18px_48px_rgba(6,66,82,0.16),inset_0_1px_0_rgba(255,255,255,0.82)] backdrop-blur-[26px]">
          <div className="pointer-events-none absolute -right-20 top-12 size-56 rounded-full bg-[#c2e1df]/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 size-64 rounded-full bg-[#064252]/10 blur-3xl" />

          <div className="relative space-y-4">
            <div className="absolute bottom-8 left-[1.65rem] top-8 w-[2px] rounded-full bg-gradient-to-b from-[#c2e1df]/75 via-[#9fd8d4]/65 to-[#7E032F]/55 shadow-[0_0_16px_rgba(194,225,223,0.55)]" />

            {visibleItems.map((item, index) => {
              const Icon = horizontalIcons[index % horizontalIcons.length];

              return (
                <div key={item.id} className="relative flex gap-4">
                  <div className="relative z-10 grid size-[3.35rem] shrink-0 place-items-center rounded-full border border-white/75 bg-white/42 shadow-[0_10px_26px_rgba(6,66,82,0.14),inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-md">
                    <div
                      className={[
                        "grid size-9 place-items-center rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]",
                        index % 2 === 0
                          ? "bg-gradient-to-br from-[#7E032F] to-[#a60b3a] text-white shadow-[0_0_22px_rgba(126,3,47,0.35)]"
                          : "bg-gradient-to-br from-[#064252] to-[#0b5a63] text-[#c2e1df]",
                      ].join(" ")}
                    >
                      <Icon size={15} strokeWidth={2.35} />
                    </div>
                  </div>

                  <article className="min-w-0 flex-1 rounded-[1.25rem] border border-white/62 bg-white/24 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_12px_28px_rgba(6,66,82,0.08)] backdrop-blur-md">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[#064252]/10 bg-[#064252]/6 px-3 py-1 text-[0.66rem] font-black text-[#064252]/70">
                        {formatDate(item.start_date)}
                      </span>

                      {item.end_date ? (
                        <span className="text-[0.65rem] font-bold text-[#064252]/46">
                          — {formatDate(item.end_date)}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-[0.94rem] font-black leading-snug text-[#064252]">
                      {item.title}
                    </h3>

                    {item.description ? (
                      <p className="mt-2 line-clamp-3 text-[0.76rem] font-medium leading-5 text-[#064252]/62">
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

      {/* =========================
          DESKTOP TIMELINE
      ========================= */}
      <div className="relative hidden overflow-hidden rounded-[1.8rem] border border-white/75 bg-[linear-gradient(90deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.13)_45%,rgba(194,225,223,0.16)_70%,rgba(6,66,82,0.12)_100%)] px-4 pb-5 pt-6 shadow-[0_18px_52px_rgba(6,66,82,0.14),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-[24px] md:block md:px-6 md:pb-6 md:pt-7">
        <div className="hide-scrollbar relative overflow-x-auto">
          <div
            className="relative min-w-[940px] md:min-w-0"
            style={{
              gridTemplateColumns: `repeat(${visibleItems.length}, minmax(0, 1fr))`,
            }}
          >
            <div className="absolute left-[5.8rem] right-[5.8rem] top-[2.05rem] z-0 h-[3px] rounded-full bg-[#c2e1df]/60 shadow-[0_0_18px_rgba(194,225,223,0.8)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#c2e1df] via-[#9fd8d4] to-[#7E032F] shadow-[0_0_18px_rgba(159,216,212,0.75)]"
                style={{
                  width: "100%",
                }}
              />
            </div>

            <div
              className="relative z-10 grid"
              style={{
                gridTemplateColumns: `repeat(${visibleItems.length}, minmax(0, 1fr))`,
              }}
            >
              {visibleItems.map((item, index) => {
                const Icon = horizontalIcons[index % horizontalIcons.length];

                return (
                  <div key={item.id} className="flex justify-center">
                    <div className="relative grid size-[4.15rem] place-items-center rounded-full border border-white/75 bg-white/42 shadow-[0_10px_28px_rgba(6,66,82,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md">
                      <div
                        className={[
                          "grid size-11 place-items-center rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]",
                          index % 2 === 0
                            ? "bg-gradient-to-br from-[#7E032F] to-[#a60b3a] text-white shadow-[0_0_24px_rgba(126,3,47,0.38)]"
                            : "bg-gradient-to-br from-[#064252] to-[#0b5a63] text-[#c2e1df]",
                        ].join(" ")}
                      >
                        <Icon size={17} strokeWidth={2.35} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 overflow-hidden rounded-[1.35rem] border border-white/65 bg-white/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_16px_34px_rgba(6,66,82,0.08)] backdrop-blur-md">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${visibleItems.length}, minmax(0, 1fr))`,
                }}
              >
                {visibleItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={[
                      "min-h-[135px] px-5 py-5 text-center",
                      index !== visibleItems.length - 1
                        ? "border-r border-white/35"
                        : "",
                    ].join(" ")}
                  >
                    <h3 className="text-[0.84rem] font-black leading-snug text-[#064252]">
                      {item.title}
                    </h3>

                    <div className="mx-auto mt-3 inline-flex items-center justify-center rounded-full border border-[#064252]/10 bg-[#064252]/6 px-3 py-1.5 text-[0.68rem] font-black text-[#064252]/68">
                      {formatDate(item.start_date)}
                    </div>

                    {item.description ? (
                      <p className="mx-auto mt-3 line-clamp-3 max-w-[11rem] text-[0.72rem] font-medium leading-5 text-[#064252]/58">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}