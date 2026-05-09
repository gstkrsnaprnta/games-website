import { AnnouncementCard } from "../../components/public/AnnouncementCard";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getAnnouncements } from "../../services/announcements";
import { useAsyncData } from "../../utils/useAsyncData";

export function AnnouncementsPage() {
  const { data, error, loading } = useAsyncData(getAnnouncements, []);

  return (
    <section className="container-page py-10">
      <h1 className="text-3xl font-black">Pengumuman</h1>
      <div className="mt-8">
        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && data?.length === 0 ? <EmptyState description="Belum ada pengumuman terbit." /> : null}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {data?.map((item) => <AnnouncementCard key={item.id} announcement={item} />)}
      </div>
    </section>
  );
}
