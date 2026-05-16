import { Globe, Mail, MessageCircle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Lomba", href: "/lomba" },
  { label: "Timeline", href: "/timeline" },
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Cek Status", href: "/cek-status" },
];

export function Footer() {
  return (
    <footer className="relative mt-0 overflow-hidden bg-[#064452] text-white">      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-56 rounded-full bg-[#faadb6]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-64 rounded-full bg-[#c2e1df]/10 blur-3xl" />

      {/* Math decorations - hidden on mobile to keep footer clean */}
      <span
        className="math-symbol math-symbol-light pointer-events-none hidden text-3xl md:block"
        style={{ top: "18%", right: "8%" }}
      >
        π
      </span>
      <span
        className="math-symbol math-symbol-light pointer-events-none hidden text-4xl md:block"
        style={{ bottom: "22%", left: "5%" }}
      >
        Σ
      </span>

      <div className="container-page relative py-8 md:py-12 lg:py-14">
        <div className="grid gap-7 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-85"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#7E032F] to-[#9b0b34] text-white shadow-lg">
                <Trophy size={18} className="text-[#faadb6]" />
              </span>

              <div>
                <h2 className="games-display text-lg font-black leading-none text-white md:text-xl">
                  GAMES 2026
                </h2>
                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-[#c2e1df] md:text-[9px]">
                  Gebyar Matematika Sains
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-md text-xs font-medium leading-6 text-white/62 md:text-sm md:leading-7">
              Kompetisi matematika dan sains tingkat nasional untuk mengasah
              nalar, kreativitas, dan inovasi generasi muda Indonesia.
            </p>
          </div>

          {/* Mobile quick sections */}
          <div className="grid grid-cols-2 gap-6 md:contents">
            {/* Navigation */}
            <div className="text-sm">
              <h3 className="text-sm font-black text-white md:text-base">
                Navigasi
              </h3>

              <div className="mt-3 grid gap-2.5 text-xs font-medium text-white/62 md:mt-5 md:gap-3 md:text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="inline-flex items-center gap-2 transition hover:text-white"
                  >
                    <span className="size-1 rounded-full bg-[#faadb6]" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="text-sm">
              <h3 className="text-sm font-black text-white md:text-base">
                Kontak
              </h3>

              <div className="mt-3 grid gap-3 text-xs font-medium text-white/62 md:mt-5 md:gap-4 md:text-sm">
                <a
                  href="mailto:panitia@games.example"
                  className="flex items-start gap-2.5 transition hover:text-white"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-[#faadb6]" />
                  <span className="break-all">panitia@games.example</span>
                </a>

                <a
                  href="#"
                  className="flex items-start gap-2.5 transition hover:text-white"
                >
                  <MessageCircle
                    size={15}
                    className="mt-0.5 shrink-0 text-[#faadb6]"
                  />
                  <span>08xx-xxxx-xxxx</span>
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="col-span-2 text-sm md:col-span-1">
              <h3 className="text-sm font-black text-white md:text-base">
                Sosial Media
              </h3>

              <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-white/68 md:mt-5 md:grid md:gap-4 md:text-sm">
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 transition hover:bg-white/10 hover:text-white md:border-0 md:bg-transparent md:px-0 md:py-0"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-white/8 text-[#faadb6]">
                    <Globe size={13} />
                  </span>
                  <span>@games.official</span>
                </a>

                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 transition hover:bg-white/10 hover:text-white md:border-0 md:bg-transparent md:px-0 md:py-0"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-white/8 text-[#faadb6]">
                    <svg viewBox="0 0 24 24" className="size-3.5 fill-current">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.34 6.34 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.33V9.17a8.16 8.16 0 0 0 3.89 1.02V6.69Z" />
                    </svg>
                  </span>
                  <span>@games.official</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/10 pt-5 md:mt-10 md:pt-6">
          <div className="flex flex-col items-start justify-between gap-3 text-[11px] font-medium text-white/45 sm:flex-row sm:items-center">
            <p>
              © 2026 GAMES — Gebyar Matematika Sains. All rights reserved.
            </p>

            <div className="flex gap-5">
              <Link to="/faq" className="transition hover:text-white">
                FAQ
              </Link>
              <Link to="/kontak" className="transition hover:text-white">
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}