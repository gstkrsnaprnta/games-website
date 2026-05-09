import { CompetitionCard } from "../../components/public/CompetitionCard";
import { PageHero } from "../../components/public/PageHero";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getCompetitions } from "../../services/competitions";
import { useAsyncData } from "../../utils/useAsyncData";

export function CompetitionsPage() {
  const { data, error, loading } = useAsyncData(getCompetitions, []);

  return (
    <>
      <PageHero eyebrow="Cabang Lomba" title="Tantangan matematika dan sains untuk semua jenjang" description="Pilih lomba yang paling cocok dengan jenjang, strategi, dan kekuatan timmu." />
      <section className="container-page py-12">
        <div className="mb-8">
          {loading ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}
          {!loading && !error && data?.length === 0 ? <EmptyState description="Belum ada lomba aktif." /> : null}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((competition) => (
            <CompetitionCard key={competition.id} competition={competition} />
          ))}
        </div>
      </section>
    </>
  );
}
