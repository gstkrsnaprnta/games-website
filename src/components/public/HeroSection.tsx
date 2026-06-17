import { FileText, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import maskot from "../../assets/maskot.png"; // sesuaikan path

export function HeroSection() {
  return (
    <section className="relative pt-[6.8rem] pb-5 md:pt-28 md:pb-8">
      <div className="container-hero relative z-10">
        {/* =========================
            MOBILE HERO
        ========================= */}
        <div className="hero-mobile-card md:hidden">
          <div className="hero-mobile-content">
            <span className="inline-flex rounded-full border border-[#f3c1cc] bg-[#fff3f6]/90 px-5 py-2 text-[8px] font-black uppercase tracking-[0.08em] text-[#7e032f] shadow-[0_8px_20px_rgba(126,3,47,0.08)]">
              Event Kompetisi Nasional
            </span>

            <h1 className="mt-6 leading-[0.92]">
              <span className="block text-[4rem] font-black tracking-[-0.06em] text-[#004551] drop-shadow-[0_10px_18px_rgba(0,69,81,0.14)]">
                GAMES
              </span>
              <span className="block text-[3.7rem] font-black tracking-[-0.06em] text-[#7e032f] drop-shadow-[0_10px_18px_rgba(126,3,47,0.16)]">
                2026
              </span>
            </h1>

            <h2 className="mt-5 text-[1.05rem] font-extrabold leading-snug text-[#3f6976]">
              Gebyar Matematika Sains
            </h2>

            <p className="mt-6 text-[0.95rem] leading-[1.9] text-[#436775]">
              Kompetisi Matematika dan Sains tingkat Nasional untuk mengasah
              nalar dan kreativitas generasi muda Indonesia.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/daftar"
                className="primary-glossy inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-black text-white"
              >
                <span className="relative z-10 whitespace-nowrap">
                  Daftar Sekarang
                </span>
                <Rocket size={15} className="relative z-10 text-[#ffd5df]" />
              </Link>

              <Link
                to="/lomba"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#cde8e4] bg-white/78 px-5 text-sm font-black text-[#004551] shadow-[0_14px_28px_rgba(0,69,81,0.08)] backdrop-blur-md"
              >
                <span className="whitespace-nowrap">Lihat Panduan</span>
                <FileText size={16} />
              </Link>
            </div>
          </div>

          <div className="hero-mobile-visual" aria-hidden="true">
            <div className="hero-mobile-math-bg" />
            <div className="hero-mobile-grid" />

            <div className="hero-mobile-chip hero-mobile-chip-formula">
              a² + b² = c²
            </div>

            <div className="hero-mobile-chip hero-mobile-chip-pi">
              π ≈ 3.14159
            </div>

            <img
              src={maskot}
              alt=""
              className="hero-mobile-mascot"
              draggable={false}
            />
          </div>
        </div>

        {/* =========================
            DESKTOP HERO
        ========================= */}
        <div className="hero-glass glass-panel-premium relative hidden min-h-[520px] overflow-hidden rounded-[2.65rem] md:grid md:grid-cols-[0.98fr_1.02fr] xl:min-h-[540px]">
          <div className="absolute bottom-10 top-10 left-[49%] hidden w-px bg-gradient-to-b from-transparent via-white/35 to-transparent shadow-[0_0_18px_rgba(194,225,223,0.35)] md:block" />

          {/* left content */}
          <div className="relative z-30 flex flex-col justify-center md:p-10 lg:p-14">

            <h1 className="games-display font-black leading-[0.9] text-[#064252] drop-shadow-md md:text-[4.25rem] lg:whitespace-nowrap lg:text-[4.8rem] xl:text-[5.15rem]">
              GAMES{" "}
              <span className="text-[#7E032F] drop-shadow-[0_7px_16px_rgba(126,3,47,0.18)]">
                2026
              </span>
            </h1>

            <p className="mt-4 text-2xl font-bold tracking-tight text-[#064252]/82">
              Gebyar Matematika Sains
            </p>

            <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-[#064252]/80">
              Kompetisi Matematika dan Sains tingkat Regional dan Nasional yang
              menjadi wadah pengembangan nalar, kreativitas, inovasi, serta
              prestasi generasi muda Indonesia melalui berbagai cabang kompetisi
              yang menantang dan inspiratif.
              <span className="mt-2 block font-bold text-[#7E032F]">
                Kreatif dengan Angka, Sukses dengan Logika
              </span>
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/daftar"
                className="primary-glossy inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-black text-white"
              >
                <span className="relative z-10">Daftar Sekarang</span>
                <Rocket size={16} className="relative z-10 text-[#faadb6]" />
              </Link>

              <Link
                to="/lomba"
                className="btn-glass-outline inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-[#064252]"
              >
                Lihat Panduan <FileText size={16} />
              </Link>
            </div>
          </div>

          {/* right visual */}
          <div className="hero-visual-panel relative z-20 flex min-h-full items-center justify-center overflow-hidden p-8 xl:p-10">
            <div className="math-grid-fine opacity-70" />

            <div className="absolute right-10 top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full bg-[#c2e1df]/30 blur-[48px]" />
            <div className="absolute right-[-3rem] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-[#064252]/26 blur-[78px]" />

            <div className="pointer-events-none absolute right-[5%] top-1/2 aspect-square w-[460px] -translate-y-1/2 opacity-95 xl:w-[520px]">
              <div className="absolute inset-[-1.2rem] rounded-full mint-glow opacity-45 animate-pulse-glow" />

              <div className="absolute inset-5 rounded-full border border-white/30 bg-[#064252]/18 shadow-[inset_0_0_90px_rgba(159,216,212,0.38),0_0_58px_rgba(159,216,212,0.26)] backdrop-blur-xl">
                <svg
                  className="absolute inset-0 h-full w-full opacity-80"
                  viewBox="0 0 100 100"
                >
                  <ellipse
                    className="orb-ring-line"
                    cx="50"
                    cy="50"
                    rx="45"
                    ry="15"
                  />
                  <ellipse
                    className="orb-ring-line"
                    cx="50"
                    cy="50"
                    rx="15"
                    ry="45"
                  />
                  <circle className="orb-dashed-line" cx="50" cy="50" r="45" />
                  <line
                    className="orb-axis-line"
                    x1="50"
                    y1="5"
                    x2="50"
                    y2="95"
                  />
                  <line
                    className="orb-axis-line"
                    x1="5"
                    y1="50"
                    x2="95"
                    y2="50"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-7xl font-black text-[#edf8f6] drop-shadow-[0_0_25px_rgba(216,238,235,1)]">
                    Σ
                  </span>
                  <span className="absolute bottom-1/4 -mb-1 text-sm font-bold tracking-widest text-[#d8eeeb]">
                    k=1
                  </span>
                  <span className="absolute top-1/4 -mt-3 text-xs font-bold text-[#d8eeeb]">
                    n
                  </span>
                  <span className="absolute left-1/2 top-1/2 ml-10 -mt-5 text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                    k²
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-mascot-wrap pointer-events-none absolute bottom-[-10px] right-[3%] z-30 flex items-end justify-center xl:right-[4%]">
              <img
                src={maskot}
                alt="Maskot GAMES 2026"
                className="hero-mascot-img w-[330px] max-w-none select-none xl:w-[365px]"
                draggable={false}
              />
            </div>

            <div className="glass-chip absolute right-[5%] top-[18%] z-40 rounded-xl px-4 py-2 font-mono text-sm font-black text-[#002b32]">
              a² + b² = c²
            </div>

            <div className="glass-chip absolute left-[6%] top-[36%] z-30 rounded-xl px-3 py-1.5 font-mono text-xs font-black text-[#7E032F]">
              f(x) = sin x
            </div>

            <div className="glass-chip absolute bottom-[22%] right-[7%] z-30 rounded-xl px-4 py-2 font-mono text-xs font-black text-[#0b5a63]">
              d/dx ∫ f(x)dx = f(x)
            </div>

            <div className="glass-chip absolute bottom-[10%] left-[16%] z-40 rounded-xl px-3 py-1.5 font-mono text-xs font-black text-[#7E032F]">
              π ≈ 3.14159
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
