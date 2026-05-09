type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#770525]">{eyebrow}</p>
      ) : null}
      <h2 className="games-display mt-3 text-3xl font-black text-[#004551] md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-[#004551]/72">{description}</p> : null}
    </div>
  );
}

