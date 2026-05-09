import { useParams } from "react-router-dom";
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
  return <article className="container-page max-w-3xl py-10"><p className="font-bold text-cyan-700">{announcement.category}</p><h1 className="mt-2 text-3xl font-black">{announcement.title}</h1><p className="mt-6 leading-8 text-slate-700">{announcement.content}</p></article>;
}
