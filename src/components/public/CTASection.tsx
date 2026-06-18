import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="container-hero relative pb-12 pt-5 md:pb-16 md:pt-8 lg:pb-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 rounded-full bg-[#064252]/12 blur-[80px]" />

      <div className="cta-final-card cta-glass relative overflow-hidden rounded-[1.75rem] px-6 py-8 md:rounded-[2rem] md:px-10 md:py-9 lg:px-16 lg:py-10">
        <div className="math-grid-fine opacity-25" />

        {/* Left math graph */}
        <div className="cta-math-left pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 opacity-45 lg:block">
          <svg width="260" height="160" viewBox="0 0 260 160" fill="none">
            <text
              x="0"
              y="24"
              fill="#d8eeeb"
              fontSize="15"
              fontFamily="serif"
              fontStyle="italic"
            >
              f(x) =
            </text>
            <text
              x="52"
              y="18"
              fill="#d8eeeb"
              fontSize="13"
              fontFamily="serif"
              fontStyle="italic"
            >
              1
            </text>
            <line x1="42" y1="24" x2="76" y2="24" stroke="#d8eeeb" strokeWidth="1" />
            <text
              x="35"
              y="40"
              fill="#d8eeeb"
              fontSize="13"
              fontFamily="serif"
              fontStyle="italic"
            >
              1 + e⁻ˣ
            </text>

            <line x1="35" y1="130" x2="240" y2="130" stroke="#d8eeeb" strokeWidth="1.2" opacity="0.7" />
            <line x1="95" y1="35" x2="95" y2="145" stroke="#d8eeeb" strokeWidth="1.2" opacity="0.7" />

            <path
              d="M35 128 C78 128 88 116 104 92 C124 61 145 39 232 34"
              stroke="#d8eeeb"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />

            <circle cx="126" cy="68" r="3" fill="#faadb6" opacity="0.9" />
            <line x1="35" y1="100" x2="240" y2="100" stroke="#d8eeeb" strokeWidth="0.7" strokeDasharray="5 8" opacity="0.42" />
            <line x1="35" y1="70" x2="240" y2="70" stroke="#d8eeeb" strokeWidth="0.7" strokeDasharray="5 8" opacity="0.3" />
          </svg>
        </div>

        {/* Right wireframe */}
        <div className="cta-geo-right pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 opacity-80 lg:block">
          <svg width="260" height="180" viewBox="0 0 260 180" fill="none">
            {/* Cube */}
            <polygon points="116,36 176,66 116,96 56,66" stroke="#064252" strokeWidth="1.5" />
            <polygon points="56,66 116,96 116,158 56,126" stroke="#064252" strokeWidth="1.5" />
            <polygon points="176,66 116,96 116,158 176,126" stroke="#064252" strokeWidth="1.5" />
            <line x1="116" y1="36" x2="116" y2="96" stroke="#064252" strokeWidth="1.2" opacity="0.8" />

            {/* Pyramid */}
            <polygon points="178,150 234,104 246,166" stroke="#064252" strokeWidth="1.5" opacity="0.8" />
            <line x1="210" y1="38" x2="178" y2="150" stroke="#064252" strokeWidth="1.5" opacity="0.8" />
            <line x1="210" y1="38" x2="234" y2="104" stroke="#064252" strokeWidth="1.5" opacity="0.8" />
            <line x1="210" y1="38" x2="246" y2="166" stroke="#064252" strokeWidth="1.5" opacity="0.8" />

            <circle cx="210" cy="38" r="3" fill="#faadb6" />
            <circle cx="116" cy="96" r="3" fill="#c2e1df" />

            {/* Formulas for Cube & Pyramid */}
            <text x="80" y="22" fill="#064252" fontSize="12" fontFamily="serif" fontStyle="italic" opacity="0.85">V - E + F = 2</text>
            <text x="12" y="55" fill="#064252" fontSize="13" fontFamily="serif" fontStyle="italic" opacity="0.85">V = s³</text>
            <text x="12" y="135" fill="#064252" fontSize="13" fontFamily="serif" fontStyle="italic" opacity="0.85">A = 6s²</text>
            
            <text x="175" y="24" fill="#064252" fontSize="13" fontFamily="serif" fontStyle="italic" opacity="0.85">V = </text>
            <text x="198" y="17" fill="#064252" fontSize="11" fontFamily="serif" fontStyle="italic" opacity="0.85">1</text>
            <line x1="195" y1="22" x2="208" y2="22" stroke="#064252" strokeWidth="1" opacity="0.85" />
            <text x="198" y="32" fill="#064252" fontSize="11" fontFamily="serif" fontStyle="italic" opacity="0.85">3</text>
            <text x="212" y="24" fill="#064252" fontSize="13" fontFamily="serif" fontStyle="italic" opacity="0.85">B · h</text>
          </svg>
        </div>

        {/* Mobile decoration */}
        <div className="pointer-events-none absolute -right-16 -bottom-16 size-52 rounded-full border border-white/20 bg-[#064252]/12 md:hidden" />
        <div className="pointer-events-none absolute -left-16 top-0 size-48 rounded-full bg-[#064252]/18 blur-3xl md:hidden" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[#064252]/68 md:text-sm">
            Siap Jadi Bagian dari
          </p>

          <h2 className="games-display mt-2 text-[2.35rem] font-black leading-[0.95] tracking-[-0.04em] text-[#7E032F] drop-shadow-[0_8px_18px_rgba(126,3,47,0.12)] md:text-5xl lg:text-[3.55rem]">
            GAMES 2026?
          </h2>

          <p className="mx-auto mt-4 max-w-md text-[0.9rem] font-semibold leading-7 text-[#064252]/74 md:text-base">
            Kreatif dengan Angka, Sukses dengan Logika
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-8 md:gap-4">
            <Link
              to="/daftar"
              className="btn-glossy-maroon inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-black text-white sm:w-auto md:h-13 md:px-8"
            >
              Daftar Sekarang <ArrowRight size={17} />
            </Link>

            <a
              href="https://drive.google.com/drive/folders/1m79FvIwAUj5De740G9i0EMVVk2Iz7Cnc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-outline inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-black text-[#064252] sm:w-auto md:h-13 md:px-8"
            >
              Unduh Brosur <Download size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}