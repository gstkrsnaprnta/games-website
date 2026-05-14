import { ArrowRight, Atom, BookOpen, Calculator, Code, FlaskConical, Microscope, Users } from "lucide-react";
import { Link } from "react-router-dom";
import type { Competition } from "../../types/models";

const iconMap: Record<string, React.ReactNode> = {
  LCT: <Calculator size={24} />,
  OLIM: <BookOpen size={24} />,
  FIS: <Atom size={24} />,
  KIM: <FlaskConical size={24} />,
  BIO: <Microscope size={24} />,
  KS: <Code size={24} />,
};

function getCompetitionIcon(code: string) {
  return iconMap[code] ?? <BookOpen size={24} />;
}

export function CompetitionCard({ competition }: { competition: Competition }) {
  const isOpen = competition.registration_status === "open";
  const priceLabel = competition.registration_fee > 0
    ? `Rp${competition.registration_fee.toLocaleString("id-ID")} / ${competition.competition_type === "team" ? "tim" : "peserta"}`
    : "Gratis";

  return (
    <article className="glass-card-premium group flex h-full flex-col rounded-[1.35rem] p-5 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#770525] opacity-25 blur-lg transition-opacity group-hover:opacity-45" />
          <div className="relative grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#770525] to-[#9b0b34] text-white shadow-[0_18px_34px_rgba(119,5,37,0.24)]">
            {getCompetitionIcon(competition.code)}
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1.5 text-[10px] font-black ${
            isOpen
              ? "border border-[#c2e1df]/70 bg-[#c2e1df]/55 text-[#004551]"
              : "border border-stone-200 bg-stone-100/70 text-stone-500"
          }`}
        >
          {isOpen ? "Pendaftaran Dibuka" : "Ditutup"}
        </span>
      </div>

      <h3 className="text-xl font-black leading-tight text-[#004551]">{competition.name}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {competition.participant_levels?.map((level) => (
          <span
            key={level}
            className="rounded-full border border-[#faadb6]/35 bg-[#faadb6]/25 px-3 py-1 text-[10px] font-black text-[#770525]"
          >
            {level}
          </span>
        ))}
        <span className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/50 px-3 py-1 text-[10px] font-black text-[#004551]">
          <Users size={12} />
          {competition.competition_type === "team" ? "Tim" : "Individu"}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm font-medium leading-7 text-[#004551]/70">
        {competition.short_description}
      </p>
      <p className="mt-4 text-sm font-black text-[#004551]">Biaya: {priceLabel}</p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-7">
        <Link
          to={`/lomba/${competition.slug}`}
          className="btn-glass-outline inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black text-[#004551]"
        >
          Selengkapnya <ArrowRight size={14} />
        </Link>
        {isOpen ? (
          <Link
            to="/daftar"
            className="btn-glossy-maroon rounded-full px-6 py-2.5 text-xs font-black text-white"
          >
            Daftar
          </Link>
        ) : null}
      </div>
    </article>
  );
}
