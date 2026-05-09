import { useParams } from "react-router-dom";
import { EmptyState } from "../../components/shared/EmptyState";
import { sampleAnnouncements } from "./sampleData";

export function AnnouncementDetailPage() {
  const { slug } = useParams();
  const announcement = sampleAnnouncements.find((item) => item.slug === slug);
  if (!announcement) return <section className="container-page py-10"><EmptyState title="Pengumuman tidak ditemukan" /></section>;
  return <article className="container-page max-w-3xl py-10"><p className="font-bold text-cyan-700">{announcement.category}</p><h1 className="mt-2 text-3xl font-black">{announcement.title}</h1><p className="mt-6 leading-8 text-slate-700">{announcement.content}</p></article>;
}
