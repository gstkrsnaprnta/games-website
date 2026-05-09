import { CompetitionCard } from "../../components/public/CompetitionCard";
import { sampleCompetitions } from "./sampleData";

export function CompetitionsPage() {
  return (
    <section className="container-page py-10">
      <h1 className="text-3xl font-black text-slate-950">Daftar Lomba</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Cabang lomba aktif pada event GAMES tahun berjalan.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {sampleCompetitions.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>
    </section>
  );
}
