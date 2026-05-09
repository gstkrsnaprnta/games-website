import type { Timeline } from "../../types/models";
import { formatDate } from "../../utils/date";

export function TimelineItem({ item }: { item: Timeline }) {
  return (
    <div className="border-l-2 border-cyan-200 pl-4">
      <p className="text-sm font-semibold text-cyan-700">{formatDate(item.start_date)}</p>
      <h3 className="mt-1 font-bold text-slate-950">{item.title}</h3>
      {item.description ? <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p> : null}
    </div>
  );
}
