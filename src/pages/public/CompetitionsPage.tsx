import { CompetitionCard } from "../../components/public/CompetitionCard";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getCompetitions } from "../../services/competitions";
import { useAsyncData } from "../../utils/useAsyncData";

export function CompetitionsPage() {
  const { data, error, loading } = useAsyncData(getCompetitions, []);

  return (
    <section className="container-page py-10">
      <h1 className="text-3xl font-black text-slate-950">Daftar Lomba</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Cabang lomba aktif pada event GAMES tahun berjalan.</p>
      <div className="mt-8">
        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && data?.length === 0 ? <EmptyState description="Belum ada lomba aktif." /> : null}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {data?.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>
    </section>
  );
}
