import { AnnouncementCard } from "../../components/public/AnnouncementCard";
import { PageHero } from "../../components/public/PageHero";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getAnnouncements } from "../../services/announcements";
import { useAsyncData } from "../../utils/useAsyncData";

export function AnnouncementsPage() {
  const { data, error, loading } = useAsyncData(getAnnouncements, []);

  return (
    <>
      <PageHero eyebrow="Pengumuman" title="Informasi resmi GAMES" description="Pantau update terbaru tentang pendaftaran, jadwal, finalis, dan informasi penting dari panitia." />
      <section className="container-page py-12">
        <div>
          {loading ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}
          {!loading && !error && data?.length === 0 ? <EmptyState description="Belum ada pengumuman terbit." /> : null}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {data?.map((item) => <AnnouncementCard key={item.id} announcement={item} />)}
        </div>
      </section>
    </>
  );
}
