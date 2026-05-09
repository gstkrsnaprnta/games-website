import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/shared/EmptyState";
import { sampleCompetitions } from "./sampleData";

export function CompetitionDetailPage() {
  const { slug } = useParams();
  const competition = sampleCompetitions.find((item) => item.slug === slug);

  if (!competition) return <section className="container-page py-10"><EmptyState title="Lomba tidak ditemukan" /></section>;

  return (
    <section className="container-page py-10">
      <p className="font-bold text-cyan-700">{competition.code}</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950">{competition.name}</h1>
      <p className="mt-4 max-w-3xl leading-7 text-slate-600">{competition.description}</p>
      <dl className="mt-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-5 md:grid-cols-3">
        <div><dt className="text-sm font-semibold text-slate-500">Jenjang</dt><dd className="mt-1 font-bold">{competition.participant_levels?.join(", ")}</dd></div>
        <div><dt className="text-sm font-semibold text-slate-500">Tipe</dt><dd className="mt-1 font-bold">{competition.competition_type === "team" ? "Tim" : "Individu"}</dd></div>
        <div><dt className="text-sm font-semibold text-slate-500">Status</dt><dd className="mt-1 font-bold">{competition.registration_status === "open" ? "Pendaftaran Buka" : "Pendaftaran Tutup"}</dd></div>
      </dl>
      <Link to="/daftar" className="mt-8 inline-flex rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white">Daftar lomba ini</Link>
    </section>
  );
}
