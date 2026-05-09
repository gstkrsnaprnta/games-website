import { PageHero } from "../../components/public/PageHero";
import { TimelineItem } from "../../components/public/TimelineItem";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getTimelines } from "../../services/timelines";
import { useAsyncData } from "../../utils/useAsyncData";

export function TimelinePage() {
  const { data, error, loading } = useAsyncData(getTimelines, []);

  return (
    <>
      <PageHero eyebrow="Timeline" title="Ikuti alur GAMES 2026 dari pendaftaran sampai kompetisi" description="Catat tanggal penting supaya tidak ketinggalan informasi, validasi, dan pelaksanaan lomba." />
      <section className="container-page py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {loading ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}
          {!loading && !error && data?.length === 0 ? <EmptyState description="Timeline belum tersedia." /> : null}
          {data?.map((item, index) => <TimelineItem key={item.id} item={item} index={index} />)}
        </div>
      </section>
    </>
  );
}
