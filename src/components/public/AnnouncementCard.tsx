import { Link } from "react-router-dom";
import type { Announcement } from "../../types/models";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">{announcement.category}</p>
      <h3 className="mt-2 text-lg font-bold text-slate-950">{announcement.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{announcement.content}</p>
      <Link to={`/pengumuman/${announcement.slug}`} className="mt-4 inline-flex text-sm font-bold text-cyan-700">
        Baca pengumuman
      </Link>
    </article>
  );
}
