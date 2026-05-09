import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#004551] py-14 text-white md:py-20">
      <div className="absolute -left-20 top-8 size-56 rounded-full bg-[#faadb6]/30 blur-3xl" />
      <div className="absolute -right-16 bottom-0 size-64 rounded-full bg-[#c2e1df]/30 blur-3xl" />
      <div className="container-page relative">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#faadb6]">{eyebrow}</p>
        <h1 className="games-display mt-4 max-w-4xl text-4xl font-black md:text-6xl">{title}</h1>
        {description ? <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 md:text-lg">{description}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
