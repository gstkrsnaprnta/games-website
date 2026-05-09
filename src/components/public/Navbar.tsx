import { Menu, Trophy, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  ["Beranda", "/"],
  ["Lomba", "/lomba"],
  ["Timeline", "/timeline"],
  ["FAQ", "/faq"],
  ["Pengumuman", "/pengumuman"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-[#f2efeb]/82 backdrop-blur-xl">
      <nav className="container-page flex h-18 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3 font-black text-[#004551]">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#770525] text-white shadow-lg shadow-[#770525]/20">
            <Trophy size={20} />
          </span>
          <span>
            <span className="block text-lg leading-none">GAMES</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#770525]">2026</span>
          </span>
        </Link>
        <div className="hidden items-center gap-5 lg:flex">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "font-bold text-[#770525]" : "font-semibold text-[#004551]/70 transition hover:text-[#770525]")}>
              {label}
            </NavLink>
          ))}
          <Link to="/daftar" className="games-button rounded-full bg-[#770525] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#770525]/18">
            Daftar Sekarang
          </Link>
        </div>
        <button onClick={() => setOpen((value) => !value)} className="grid size-11 place-items-center rounded-2xl border border-[#004551]/15 bg-white/70 text-[#004551] lg:hidden" aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open ? (
        <div className="container-page pb-4 lg:hidden">
          <div className="grid gap-2 rounded-3xl border border-[#004551]/10 bg-white/90 p-3 shadow-xl">
            {links.map(([label, to]) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-bold text-[#004551] hover:bg-[#c2e1df]/45">
                {label}
              </NavLink>
            ))}
            <Link onClick={() => setOpen(false)} to="/daftar" className="rounded-2xl bg-[#770525] px-4 py-3 text-center font-black text-white">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
