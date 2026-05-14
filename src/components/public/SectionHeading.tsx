import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  actionLabel?: string;
  actionHref?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", actionLabel, actionHref }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${align === "center" ? "mx-auto max-w-3xl text-center" : "flex flex-wrap items-end justify-between gap-6"}`}>
      <div className={align === "center" ? "" : "max-w-2xl"}>
        {eyebrow ? (
          <div className="mb-3 flex items-center gap-3">
            <span className="h-0.5 w-8 rounded-full bg-[#770525]" />
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#770525]">{eyebrow}</p>
          </div>
        ) : null}
        <h2 className="games-display text-3xl font-black text-[#004551] md:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-base leading-8 text-[#004551]/65">{description}</p> : null}
      </div>
      {actionLabel && actionHref && align !== "center" ? (
        <Link to={actionHref} className="inline-flex items-center gap-2 text-sm font-black text-[#770525] transition hover:gap-3">
          {actionLabel} <ArrowRight size={16} />
        </Link>
      ) : null}
    </div>
  );
}
