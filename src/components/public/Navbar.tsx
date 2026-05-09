import { Menu, Trophy } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const links = [
  ["Lomba", "/lomba"],
  ["Timeline", "/timeline"],
  ["FAQ", "/faq"],
  ["Pengumuman", "/pengumuman"],
  ["Kontak", "/kontak"],
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-950">
          <span className="grid size-9 place-items-center rounded-lg bg-cyan-600 text-white">
            <Trophy size={20} />
          </span>
          GAMES
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "text-cyan-700" : "text-slate-600")}>
              {label}
            </NavLink>
          ))}
          <Link to="/daftar" className="rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white">
            Daftar
          </Link>
        </div>
        <button className="grid size-10 place-items-center rounded-lg border border-slate-200 md:hidden" aria-label="Menu">
          <Menu size={20} />
        </button>
      </nav>
    </header>
  );
}
