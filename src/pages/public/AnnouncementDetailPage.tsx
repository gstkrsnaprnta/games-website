import { ArrowLeft, Calendar, FileText, Megaphone, Paperclip } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getAnnouncementBySlug } from "../../services/announcements";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";

export function AnnouncementDetailPage() {
  const { slug } = useParams();
  const { data: announcement, error, loading } = useAsyncData(() => getAnnouncementBySlug(slug ?? ""), [slug]);

  if (loading) return <section className="container-page py-28 min-h-[80vh] flex flex-col justify-center items-center"><LoadingState /></section>;
  if (error) return <section className="container-page py-28 min-h-[80vh] flex flex-col justify-center items-center"><ErrorState message={error} /></section>;
  if (!announcement) return <section className="container-page py-28 min-h-[80vh] flex flex-col justify-center items-center"><EmptyState title="Pengumuman tidak ditemukan" /></section>;

  return (
    <article className="container-page max-w-4xl pb-20 pt-28 md:pt-32">
      <div className="mb-8 flex items-center gap-2 text-sm font-bold text-[#004551]/65">
        <Link to="/" className="hover:text-[#770525]">Beranda</Link>
        <span>/</span>
        <Link to="/pengumuman" className="hover:text-[#770525]">Pengumuman</Link>
        <span>/</span>
        <span className="text-[#004551]">{announcement.title}</span>
      </div>

      <Link
        to="/pengumuman"
        className="mb-7 grid size-12 place-items-center rounded-full border border-white/75 bg-white/55 text-[#004551] shadow-[0_14px_32px_rgba(0,69,81,0.12)] backdrop-blur-2xl transition hover:-translate-x-1 hover:bg-white/80"
        aria-label="Kembali ke pengumuman"
      >
        <ArrowLeft size={20} />
      </Link>

      <div className="glass-panel overflow-hidden rounded-[2.3rem]">
        <div className="relative p-7 md:p-10 lg:p-12">
          <div className="absolute right-0 top-0 size-72 rounded-full bg-[#c2e1df]/28 blur-[80px]" />
          <div className="absolute -left-20 bottom-0 size-80 rounded-full bg-[#004551]/14 blur-[90px]" />
          <div className="relative z-10">
            <div className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-[#004551] to-[#5fa6a5] text-white shadow-[0_20px_46px_rgba(0,69,81,0.22)]">
              <Megaphone size={38} strokeWidth={1.6} />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#faadb6]/24 px-4 py-2 text-xs font-black text-[#770525]">
                <FileText size={14} />
                {announcement.category}
              </span>
              {announcement.published_at ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-2 text-xs font-black text-[#004551]">
                  <Calendar size={14} />
                  {formatDate(announcement.published_at)}
                </span>
              ) : null}
            </div>
            <h1 className="games-display mt-6 text-4xl font-black leading-tight text-[#004551] md:text-5xl">
              {announcement.title}
            </h1>
            <div className="mt-8 border-t border-[#004551]/10 pt-8">
              <p className="whitespace-pre-line text-base font-medium leading-9 text-[#004551]/78 md:text-lg">
                {announcement.content}
              </p>
            </div>
            {announcement.attachment_url ? (
              <div className="mt-10">
                <a
                  href={announcement.attachment_url}
                  className="btn-glossy-maroon inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black text-white"
                >
                  <Paperclip size={16} /> Buka Lampiran
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
