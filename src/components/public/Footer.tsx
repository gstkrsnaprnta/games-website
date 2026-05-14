import { Globe, Mail, MessageCircle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#004551] text-white pt-20 pb-10">
      {/* Decorative glows */}
      <div className="absolute -left-16 -top-16 size-64 rounded-full bg-[#faadb6]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 size-72 rounded-full bg-[#c2e1df]/10 blur-3xl pointer-events-none" />

      {/* Math decorations */}
      <span className="math-symbol math-symbol-light text-3xl pointer-events-none" style={{ top: "15%", right: "8%" }}>π</span>
      <span className="math-symbol math-symbol-light text-4xl pointer-events-none" style={{ bottom: "25%", left: "5%" }}>Σ</span>

      <div className="container-page relative grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div className="max-w-md">
          <Link to="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#770525] to-[#9b0b34] text-white shadow-lg">
              <Trophy size={18} className="text-[#faadb6]" />
            </span>
            <div>
              <h2 className="games-display text-xl font-black">GAMES 2026</h2>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c2e1df]">
                Gebyar Matematika Sains
              </p>
            </div>
          </Link>
          <p className="mt-5 text-sm leading-7 text-white/60">
            Kompetisi matematika dan sains tingkat nasional untuk mengasah nalar, kreativitas, dan inovasi generasi muda Indonesia. Program kerja tahunan divisi pendidikan sebagai wujud pengabdian mahasiswa Matematika terhadap masyarakat.
          </p>
        </div>

        {/* Navigation */}
        <div className="text-sm">
          <h3 className="font-black text-white text-base">Navigasi</h3>
          <div className="mt-5 grid gap-3 text-white/60">
            <Link to="/" className="transition hover:text-white flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#faadb6] opacity-0 transition-opacity"></span>Beranda</Link>
            <Link to="/lomba" className="transition hover:text-white flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#faadb6] opacity-0 transition-opacity"></span>Lomba</Link>
            <Link to="/timeline" className="transition hover:text-white flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#faadb6] opacity-0 transition-opacity"></span>Timeline</Link>
            <Link to="/pengumuman" className="transition hover:text-white flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#faadb6] opacity-0 transition-opacity"></span>Pengumuman</Link>
            <Link to="/cek-status" className="transition hover:text-white flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#faadb6] opacity-0 transition-opacity"></span>Cek Status</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="text-sm">
          <h3 className="font-black text-white text-base">Kontak</h3>
          <div className="mt-5 grid gap-4 text-white/60">
            <a href="mailto:panitia@games.example" className="flex items-start gap-3 transition hover:text-white">
              <Mail size={16} className="text-[#faadb6] mt-0.5 shrink-0" />
              <span>panitia@games.example</span>
            </a>
            <a href="#" className="flex items-start gap-3 transition hover:text-white">
              <MessageCircle size={16} className="text-[#faadb6] mt-0.5 shrink-0" />
              <span>08xx-xxxx-xxxx</span>
            </a>
          </div>
        </div>

        {/* Social */}
        <div className="text-sm">
          <h3 className="font-black text-white text-base">Sosial Media</h3>
          <div className="mt-5 grid gap-4 text-white/60">
            <a href="#" className="flex items-center gap-3 transition hover:text-white">
              <div className="grid size-8 place-items-center rounded-full bg-white/5 text-[#faadb6]">
                <Globe size={14} />
              </div>
              <span>@games.official</span>
            </a>
            <a href="#" className="flex items-center gap-3 transition hover:text-white">
              <div className="grid size-8 place-items-center rounded-full bg-white/5 text-[#faadb6]">
                <svg viewBox="0 0 24 24" className="size-3.5 fill-current"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.34 6.34 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.33V9.17a8.16 8.16 0 0 0 3.89 1.02V6.69Z" /></svg>
              </div>
              <span>@games.official</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 border-t border-white/10 pt-8">
        <div className="container-page flex flex-col items-center justify-between gap-4 text-xs font-medium text-white/40 md:flex-row">
          <p>© 2026 GAMES — Gebyar Matematika Sains. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/faq" className="transition hover:text-white">FAQ</Link>
            <Link to="/kontak" className="transition hover:text-white">Kontak</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
