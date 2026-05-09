import { ArrowRight, Medal, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="absolute left-[-7rem] top-10 size-72 rounded-full bg-[#faadb6]/45 blur-3xl" />
      <div className="absolute right-[-5rem] top-2 size-80 rounded-full bg-[#c2e1df]/70 blur-3xl" />
      <div className="container-page relative grid min-h-[600px] items-center gap-10 md:grid-cols-[1.08fr_0.92fr]">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#770525]/15 bg-white/70 px-4 py-2 text-sm font-black text-[#770525] shadow-sm">
            <Medal size={16} /> GAMES 2026
          </div>
          <h1 className="games-display text-5xl font-black leading-[0.95] text-[#004551] md:text-7xl">
            Gebyar Matematika Sains
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-9 text-[#004551]/75">
            Ajang kompetisi matematika dan sains tahunan yang kompetitif, edukatif, dan berskala nasional untuk
            siswa SD, SMP, SMA, hingga mahasiswa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/daftar" className="games-button inline-flex items-center gap-2 rounded-full bg-[#770525] px-6 py-4 font-black text-white shadow-xl shadow-[#770525]/20">
              Daftar Sekarang <ArrowRight size={18} />
            </Link>
            <Link to="/lomba" className="games-button rounded-full border border-[#004551]/20 bg-white/60 px-6 py-4 font-black text-[#004551]">
              Lihat Cabang Lomba
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="games-blob absolute -right-5 -top-8 size-36 bg-[#faadb6]/70" />
          <div className="games-blob absolute -bottom-10 -left-6 size-44 bg-[#c2e1df]" />
          <div className="games-card relative rounded-[2rem] p-6">
            <div className="grid aspect-square place-items-center rounded-[1.6rem] bg-gradient-to-br from-[#004551] via-[#004551] to-[#770525] p-8 text-white">
              <div className="text-center">
                <Sparkles className="mx-auto text-[#faadb6]" size={40} />
                <p className="mt-5 text-8xl font-black">G</p>
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.24em] text-[#c2e1df]">Matematika. Sains. Prestasi.</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm font-bold text-[#004551]">
              <div className="rounded-2xl bg-[#c2e1df]/70 p-3">5+ Lomba</div>
              <div className="rounded-2xl bg-[#faadb6]/45 p-3">Nasional</div>
              <div className="rounded-2xl bg-white/80 p-3">Tahunan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
