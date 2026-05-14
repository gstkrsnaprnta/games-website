import { Calendar } from "lucide-react";
import type { Timeline } from "../../types/models";
import { formatDate } from "../../utils/date";

export function TimelineItem({ item, index = 0, isLast = false }: { item: Timeline; index?: number; isLast?: boolean }) {
  return (
    <div className="relative flex gap-5 group">
      {/* Connector line & circle */}
      <div className="flex flex-col items-center">
        <div className="grid size-12 shrink-0 place-items-center rounded-full border border-white/60 bg-white/50 shadow-md backdrop-blur-sm transition-transform group-hover:scale-110">
          <div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-[#770525] to-[#9b0b34] text-[10px] font-black text-white shadow-inner">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
        {!isLast && (
          <div className="my-2 w-0.5 flex-1 rounded-full bg-gradient-to-b from-[#770525]/30 via-[#c2e1df]/50 to-transparent" />
        )}
      </div>

      {/* Content card */}
      <div className="glass-card-premium mb-8 flex-1 rounded-[1.25rem] p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#faadb6]/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#770525] border border-[#faadb6]/30">
            <Calendar size={12} />
            {formatDate(item.start_date)}
          </span>
          {item.end_date && (
            <span className="text-xs font-bold text-[#004551]/50">
              — {formatDate(item.end_date)}
            </span>
          )}
        </div>
        <h3 className="mt-4 text-lg font-black text-[#004551]">{item.title}</h3>
        {item.description ? (
          <p className="mt-2 text-sm leading-7 text-[#004551]/65">{item.description}</p>
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
  return (
    <div className="relative w-full overflow-x-auto pb-8 pt-4 hide-scrollbar">
      {/* Continuous connecting line */}
      <div className="absolute top-[4.5rem] left-8 right-8 h-1 rounded-full bg-gradient-to-r from-[#770525]/20 via-[#c2e1df]/40 to-transparent -z-10" />
      
      <div className="flex gap-6 min-w-max px-2">
        {items.map((item) => (
          <div key={item.id} className="relative w-72 flex flex-col group">
            {/* Top Node */}
            <div className="flex justify-center mb-6">
              <div className="grid size-14 place-items-center rounded-full border border-white/60 bg-white/50 shadow-[0_4px_12px_rgba(0,69,81,0.05)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#770525] to-[#9b0b34] text-white shadow-inner">
                  <Calendar size={16} className="text-[#faadb6]" />
                </div>
              </div>
            </div>

            {/* Glass Card Content */}
            <div className="glass-card-premium flex-1 rounded-[1.5rem] p-6 text-center h-full">
              <h3 className="text-[15px] font-black text-[#004551] leading-tight mb-3">
                {item.title}
              </h3>
              <div className="inline-flex justify-center items-center gap-1.5 rounded-full bg-[#004551]/5 px-3 py-1.5 text-[11px] font-bold text-[#004551]/70 border border-[#004551]/10">
                {formatDate(item.start_date)}
              </div>
              {item.description ? (
                <p className="mt-4 text-xs leading-relaxed text-[#004551]/60 line-clamp-3">
                  {item.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
