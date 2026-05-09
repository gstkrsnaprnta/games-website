import { TimelineItem } from "../../components/public/TimelineItem";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getTimelines } from "../../services/timelines";
import { useAsyncData } from "../../utils/useAsyncData";

export function TimelinePage() {
  const { data, error, loading } = useAsyncData(getTimelines, []);

  return (
    <section className="container-page py-10">
      <h1 className="text-3xl font-black">Timeline</h1>
      <div className="mt-8 grid gap-5">
        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && data?.length === 0 ? <EmptyState description="Timeline belum tersedia." /> : null}
        {data?.map((item) => <TimelineItem key={item.id} item={item} />)}
      </div>
    </section>
  );
}
