import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#004551] text-white">
      <div className="absolute -left-16 -top-16 size-64 rounded-full bg-[#faadb6]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 size-72 rounded-full bg-[#c2e1df]/20 blur-3xl" />
      <div className="container-page relative grid gap-8 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <h2 className="games-display text-2xl font-black">GAMES 2026</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/72">
            Gebyar Matematika Sains, ruang kompetisi matematika dan sains untuk pelajar serta mahasiswa Indonesia.
          </p>
        </div>
        <div className="text-sm text-white/72">
          <h3 className="font-semibold text-white">Navigasi</h3>
          <div className="mt-3 grid gap-2">
            <Link to="/">Beranda</Link>
            <Link to="/lomba">Lomba</Link>
            <Link to="/pengumuman">Pengumuman</Link>
            <Link to="/cek-status">Cek Status</Link>
          </div>
        </div>
        <div className="text-sm text-white/72">
          <h3 className="font-semibold text-white">Kontak</h3>
          <p className="mt-3">Email: panitia@games.example</p>
          <p>WhatsApp: 08xx-xxxx-xxxx</p>
        </div>
        <div className="text-sm text-white/72">
          <h3 className="font-semibold text-white">Sosial</h3>
          <div className="mt-3 grid gap-2">
            <span>Instagram: @games.official</span>
            <span>TikTok: @games.official</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
