import { useParams } from "react-router-dom";
import { PageHero } from "../../components/public/PageHero";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getAnnouncementBySlug } from "../../services/announcements";
import { useAsyncData } from "../../utils/useAsyncData";

export function AnnouncementDetailPage() {
  const { slug } = useParams();
  const { data: announcement, error, loading } = useAsyncData(() => getAnnouncementBySlug(slug ?? ""), [slug]);

  if (loading) return <section className="container-page py-10"><LoadingState /></section>;
  if (error) return <section className="container-page py-10"><ErrorState message={error} /></section>;
  if (!announcement) return <section className="container-page py-10"><EmptyState title="Pengumuman tidak ditemukan" /></section>;
  return (
    <>
      <PageHero eyebrow={announcement.category} title={announcement.title} />
      <article className="container-page max-w-3xl py-12">
        <div className="games-card rounded-[2rem] p-6 md:p-9">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#770525]">{announcement.category}</p>
          <div className="prose mt-5 max-w-none text-[#004551]">
            <p className="whitespace-pre-line leading-8 text-[#004551]/75">{announcement.content}</p>
          </div>
          {announcement.attachment_url ? (
            <a href={announcement.attachment_url} className="mt-6 inline-flex rounded-full bg-[#770525] px-5 py-3 text-sm font-black text-white">
              Buka Lampiran
            </a>
          ) : null}
        </div>
      </article>
    </>
  );
}
