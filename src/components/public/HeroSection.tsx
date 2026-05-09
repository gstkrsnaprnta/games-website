import { ArrowRight, Medal } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="bg-white">
      <div className="container-page grid min-h-[560px] items-center gap-10 py-14 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700">
            <Medal size={16} /> Lomba matematika dan sains tahunan
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-normal text-slate-950 md:text-6xl">
            Gebyar Matematika Sains (GAMES)
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Pusat informasi resmi, pendaftaran peserta, dan pengumuman lomba GAMES untuk jenjang SD, SMP, SMA,
            hingga mahasiswa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/daftar" className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white">
              Daftar Sekarang <ArrowRight size={18} />
            </Link>
            <Link to="/lomba" className="rounded-lg border border-slate-300 px-5 py-3 font-bold text-slate-800">
              Lihat Lomba
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-amber-50 p-6">
          <div className="grid aspect-square place-items-center rounded-lg bg-white shadow-sm">
            <div className="text-center">
              <p className="text-7xl font-black text-cyan-700">G</p>
              <p className="mt-3 text-sm font-semibold text-slate-600">Matematika. Sains. Prestasi.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
