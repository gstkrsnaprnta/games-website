import { Link } from "react-router-dom";
import type { Announcement } from "../../types/models";
import { formatDate } from "../../utils/date";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="games-card rounded-[1.5rem] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex flex-wrap items-center gap-2">
        <p className="rounded-full bg-[#faadb6]/35 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#770525]">{announcement.category}</p>
        <p className="text-xs font-bold text-[#004551]/55">{formatDate(announcement.published_at)}</p>
      </div>
      <h3 className="mt-4 text-xl font-black text-[#004551]">{announcement.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#004551]/68">{announcement.content}</p>
      <Link to={`/pengumuman/${announcement.slug}`} className="mt-5 inline-flex text-sm font-black text-[#770525]">
        Baca pengumuman
      </Link>
    </article>
  );
}
