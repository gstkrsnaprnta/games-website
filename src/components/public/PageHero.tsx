import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      {/* Page Hero Background Glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#004551]/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute -left-20 top-8 size-96 rounded-full bg-[#faadb6]/10 blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 size-80 rounded-full bg-[#c2e1df]/20 blur-[100px] -z-10 pointer-events-none" />

      <div className="container-page relative z-10">
        <div className="glass-panel p-8 md:p-12 lg:p-16 rounded-[2.5rem] text-center max-w-4xl mx-auto shadow-[0_20px_60px_rgba(0,69,81,0.05)]">
          <p className="inline-flex items-center justify-center gap-2 rounded-full bg-white/60 border border-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-[#770525] backdrop-blur-sm shadow-sm">
            {eyebrow}
          </p>
          <h1 className="games-display mt-6 text-4xl font-black text-[#004551] md:text-5xl lg:text-6xl drop-shadow-sm">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 mx-auto max-w-2xl text-base leading-8 text-[#004551]/75 md:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8 flex justify-center">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
