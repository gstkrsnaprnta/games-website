import { Menu, Rocket, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  ["Beranda", "/"],
  ["Tentang", "#"],
  ["Lomba", "/lomba"],
  ["Timeline", "/timeline"],
  ["Pengumuman", "/pengumuman"],
  ["FAQ", "/faq"],
  ["Kontak", "/kontak"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-0 right-0 top-4 z-50 px-4 md:px-8 flex justify-center pointer-events-none">
      <header className="pointer-events-auto glass-pill-nav w-full max-w-6xl rounded-2xl px-5 py-2.5 transition-all duration-300">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 font-black text-[#004551] transition hover:opacity-80">
            <span className="grid size-9 place-items-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-7 text-[#0b5a63] drop-shadow-sm">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
              </svg>
            </span>
            <span className="leading-tight hidden sm:block">
              <span className="block text-base tracking-tight drop-shadow-sm">GAMES 2026</span>
              <span className="block text-[9px] font-bold uppercase tracking-wide text-[#004551]/60">
                Gebyar Matematika Sains
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-5 lg:flex">
            {links.map(([label, to]) => (
              <NavLink
                key={label}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `relative py-1.5 text-xs xl:text-sm font-bold transition-colors duration-200 ${
                    isActive
                      ? "text-[#770525] drop-shadow-sm"
                      : "text-[#004551]/75 hover:text-[#0b5a63]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-[#faadb6] shadow-[0_0_8px_rgba(250,173,182,0.8)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <Link
              to="/daftar"
              className="primary-glossy ml-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs xl:text-sm font-black text-white"
            >
              Daftar Sekarang
              <Rocket size={14} className="text-[#faadb6]" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-[#c2e1df]/60 bg-white/60 text-[#004551] shadow-sm lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="mt-4 grid gap-2 border-t border-[#004551]/10 pt-4 lg:hidden">
            {links.map(([label, to]) => (
              <NavLink
                key={label}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-[#faadb6]/20 text-[#770525]"
                      : "text-[#004551] hover:bg-[#c2e1df]/30"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              onClick={() => setOpen(false)}
              to="/daftar"
              className="primary-glossy mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white"
            >
              Daftar Sekarang
              <Rocket size={14} className="text-[#faadb6]" />
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
