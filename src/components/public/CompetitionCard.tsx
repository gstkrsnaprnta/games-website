import { Link } from "react-router-dom";
import type { Competition } from "../../types/models";

export function CompetitionCard({ competition }: { competition: Competition }) {
  const isOpen = competition.registration_status === "open";

  return (
    <article className="group games-card flex h-full flex-col rounded-[1.7rem] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#004551] text-lg font-black text-white">
          {competition.code.slice(0, 2)}
        </div>
        <span className={isOpen ? "rounded-full bg-[#c2e1df] px-3 py-1 text-xs font-black text-[#004551]" : "rounded-full bg-stone-100 px-3 py-1 text-xs font-black text-stone-700"}>
          {isOpen ? "Buka" : "Tutup"}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-black text-[#004551]">{competition.name}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#004551]/68">{competition.short_description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {competition.participant_levels?.map((level) => (
          <span key={level} className="rounded-full bg-[#faadb6]/35 px-3 py-1 text-xs font-black text-[#770525]">{level}</span>
        ))}
      </div>
      <p className="mt-4 text-sm font-bold text-[#004551]">
        {competition.registration_fee > 0 ? `Rp${competition.registration_fee.toLocaleString("id-ID")}` : "Gratis / sesuai ketentuan"}
      </p>
      <div className="mt-auto flex gap-2 pt-6">
        <Link to={`/lomba/${competition.slug}`} className="games-button rounded-full border border-[#004551]/20 px-4 py-2 text-sm font-black text-[#004551]">
          Detail
        </Link>
        {isOpen ? (
          <Link to="/daftar" className="games-button rounded-full bg-[#770525] px-4 py-2 text-sm font-black text-white">
            Daftar
          </Link>
        ) : null}
      </div>
    </article>
  );
}
