import { Link, useParams } from "react-router-dom";
import { PageHero } from "../../components/public/PageHero";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getCompetitionBySlug } from "../../services/competitions";
import { useAsyncData } from "../../utils/useAsyncData";

export function CompetitionDetailPage() {
  const { slug } = useParams();
  const { data: competition, error, loading } = useAsyncData(() => getCompetitionBySlug(slug ?? ""), [slug]);

  if (loading) return <section className="container-page py-10"><LoadingState /></section>;
  if (error) return <section className="container-page py-10"><ErrorState message={error} /></section>;
  if (!competition) return <section className="container-page py-10"><EmptyState title="Lomba tidak ditemukan" /></section>;

  return (
    <>
      <PageHero eyebrow={competition.code} title={competition.name} description={competition.short_description ?? undefined}>
        <div className="flex flex-wrap gap-2">
          {competition.participant_levels?.map((level) => <span key={level} className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">{level}</span>)}
        </div>
      </PageHero>
      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="games-card rounded-[2rem] p-6 md:p-8">
          <h2 className="text-2xl font-black text-[#004551]">Deskripsi Lomba</h2>
          <p className="mt-4 leading-8 text-[#004551]/72">{competition.description}</p>
        </article>
        <aside className="games-card rounded-[2rem] p-6">
          <dl className="grid gap-4 text-sm">
            <div><dt className="font-bold text-[#004551]/55">Jenjang</dt><dd className="mt-1 font-black text-[#004551]">{competition.participant_levels?.join(", ")}</dd></div>
            <div><dt className="font-bold text-[#004551]/55">Tipe</dt><dd className="mt-1 font-black text-[#004551]">{competition.competition_type === "team" ? "Tim" : "Individu"}</dd></div>
            <div><dt className="font-bold text-[#004551]/55">Status</dt><dd className="mt-1 font-black text-[#770525]">{competition.registration_status === "open" ? "Pendaftaran Buka" : "Pendaftaran Tutup"}</dd></div>
            <div><dt className="font-bold text-[#004551]/55">Biaya</dt><dd className="mt-1 font-black text-[#004551]">{competition.registration_fee > 0 ? `Rp${competition.registration_fee.toLocaleString("id-ID")}` : "Gratis / sesuai ketentuan"}</dd></div>
          </dl>
          <div className="mt-6 grid gap-3">
            {competition.guidebook_url ? <a href={competition.guidebook_url} className="rounded-full border border-[#004551]/20 px-5 py-3 text-center font-black text-[#004551]">Unduh Guidebook</a> : null}
            <Link to="/daftar" className="rounded-full bg-[#770525] px-5 py-3 text-center font-black text-white">Daftar lomba ini</Link>
          </div>
        </aside>
      </section>
    </>
  );
}
