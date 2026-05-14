import { ArrowRight, Megaphone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import type { Announcement } from "../../types/models";
import { formatDate } from "../../utils/date";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="glass-panel-dark group rounded-[1.75rem] p-6 text-white transition-all hover:bg-[#004551]/80 hover:shadow-[0_16px_40px_rgba(0,69,81,0.3)]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#faadb6]/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#faadb6] border border-[#faadb6]/20">
          <Megaphone size={12} />
          {announcement.category}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c2e1df]/60">
          <Calendar size={12} />
          {formatDate(announcement.published_at)}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-black leading-snug text-white">
        {announcement.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#c2e1df]/70">
        {announcement.content}
      </p>
      <Link
        to={`/pengumuman/${announcement.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#faadb6] transition-all group-hover:gap-3"
      >
        Baca Selengkapnya <ArrowRight size={14} />
      </Link>
    </article>
  );
}
