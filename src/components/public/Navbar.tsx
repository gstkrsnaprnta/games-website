import { Menu, Rocket, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  ["Beranda", "/"],
  ["Tentang", "/tentang"],
  ["Lomba", "/lomba"],
  ["Timeline", "/timeline"],
  ["Pengumuman", "/pengumuman"],
  ["FAQ", "/faq"],
  ["Kontak", "/kontak"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3 md:top-6 md:px-6">
      <header className="glass-pill-nav nav-glass-frame pointer-events-auto relative w-full max-w-[1180px] overflow-hidden rounded-[1.55rem] px-3 py-3 transition-all duration-300 md:rounded-[1.7rem] md:px-7">
        <span className="nav-edge-line nav-edge-line-top" aria-hidden="true" />
        <span className="nav-edge-line nav-edge-line-bottom" aria-hidden="true" />
        <span className="nav-right-glow" aria-hidden="true" />

        <nav className="relative z-10 flex items-center justify-between gap-3 md:gap-8">
          {/* Mobile menu button - left */}
          <button
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/70 bg-white/45 text-[#064252] shadow-sm backdrop-blur-md lg:hidden"
            aria-label="Menu"
            type="button"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex min-w-0 flex-1 items-center justify-center gap-2 text-[#064252] transition hover:opacity-85 lg:flex-none lg:justify-start lg:gap-3"
            aria-label="GAMES 2026"
          >
            <span className="nav-logo-glass grid size-10 shrink-0 place-items-center sm:size-11">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-7 text-[#064252] drop-shadow-sm sm:size-8"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
              </svg>
            </span>

            <span className="block min-w-0 leading-tight">
              <span className="block truncate text-[0.9rem] font-black tracking-tight sm:text-[1.08rem]">
                GAMES 2026
              </span>
              <span className="block truncate text-[0.45rem] font-extrabold uppercase tracking-[0.1em] text-[#064252]/58 sm:text-[0.56rem]">
                Gebyar Matematika Sains
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            {links.map(([label, to]) => {
              const isHashLink = to.includes("#");

              if (isHashLink) {
                return (
                  <a
                    key={label}
                    href={to}
                    className="nav-link-glass relative py-2 text-[0.86rem] font-bold text-[#064252]/76 transition duration-200 hover:text-[#064252]"
                  >
                    {label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={label}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `nav-link-glass relative py-2 text-[0.86rem] font-bold transition duration-200 ${
                      isActive
                        ? "text-[#7E032F]"
                        : "text-[#064252]/76 hover:text-[#064252]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive ? (
                        <span className="nav-active-line absolute -bottom-1 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full" />
                      ) : null}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/daftar"
            className="primary-glossy hidden shrink-0 items-center gap-2 rounded-full px-7 py-3 text-[0.88rem] font-black text-white lg:inline-flex"
          >
            <span className="relative z-10">Daftar Sekarang</span>
            <Rocket size={15} className="relative z-10 text-[#FAADB6]" />
          </Link>

          {/* Mobile CTA - right */}
          <Link
            to="/daftar"
            className="primary-glossy inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-black text-white lg:hidden"
          >
            <span className="relative z-10">Daftar</span>
            <Rocket size={13} className="relative z-10 text-[#FAADB6]" />
          </Link>
        </nav>

        {/* Mobile Menu */}
        {open ? (
          <div className="relative z-10 mt-4 grid gap-2 border-t border-white/50 pt-4 lg:hidden">
            {links.map(([label, to]) => {
              const isHashLink = to.includes("#");

              if (isHashLink) {
                return (
                  <a
                    key={label}
                    href={to}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-bold text-[#064252] transition hover:bg-[#C2E1DF]/30"
                  >
                    {label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={label}
                  to={to}
                  end={to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      isActive
                        ? "bg-[#FAADB6]/25 text-[#7E032F]"
                        : "text-[#064252] hover:bg-[#C2E1DF]/30"
                    }`
                  }
                >
                  {label}
                </NavLink>
              );
            })}
          </div>
        ) : null}
      </header>
    </div>
  );
}