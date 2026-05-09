import { Link } from "react-router-dom";
import type { Competition } from "../../types/models";

export function CompetitionCard({ competition }: { competition: Competition }) {
  const isOpen = competition.registration_status === "open";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-950">{competition.name}</h3>
        <span className={isOpen ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800" : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"}>
          {isOpen ? "Buka" : "Tutup"}
        </span>
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{competition.short_description}</p>
      <p className="mt-4 text-sm font-semibold text-slate-800">{competition.participant_levels?.join(", ")}</p>
      <div className="mt-5 flex gap-2">
        <Link to={`/lomba/${competition.slug}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold">
          Detail
        </Link>
        {isOpen ? (
          <Link to="/daftar" className="rounded-lg bg-cyan-600 px-3 py-2 text-sm font-bold text-white">
            Daftar
          </Link>
        ) : null}
      </div>
    </article>
  );
}
