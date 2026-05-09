import type { Timeline } from "../../types/models";
import { formatDate } from "../../utils/date";

export function TimelineItem({ item, index = 0 }: { item: Timeline; index?: number }) {
  return (
    <div className="relative rounded-[1.5rem] border border-[#004551]/10 bg-white/72 p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#770525] text-sm font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="text-sm font-black text-[#770525]">{formatDate(item.start_date)}</p>
          <h3 className="mt-1 text-lg font-black text-[#004551]">{item.title}</h3>
          {item.description ? <p className="mt-2 text-sm leading-6 text-[#004551]/68">{item.description}</p> : null}
        </div>
      </div>
    </div>
  );
}
