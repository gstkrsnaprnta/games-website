import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <h2 className="text-lg font-bold">Gebyar Matematika Sains</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Sistem informasi dan pendaftaran lomba tahunan GAMES untuk peserta seluruh Indonesia.
          </p>
        </div>
        <div className="text-sm text-slate-300">
          <h3 className="font-semibold text-white">Navigasi</h3>
          <div className="mt-3 grid gap-2">
            <Link to="/lomba">Lomba</Link>
            <Link to="/pengumuman">Pengumuman</Link>
            <Link to="/cek-status">Cek Status</Link>
          </div>
        </div>
        <div className="text-sm text-slate-300">
          <h3 className="font-semibold text-white">Kontak</h3>
          <p className="mt-3">Email: panitia@games.example</p>
          <p>WhatsApp: 08xx-xxxx-xxxx</p>
        </div>
      </div>
    </footer>
  );
}
