import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="container-page pb-20 pt-10 relative">
      {/* Background glow for the section */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#c2e1df]/30 to-transparent -z-10 blur-3xl" />
      
      <div className="cta-glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-16">
        
        {/* Math Decor - Sigmoid Curve Graph */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none hidden lg:block">
          <svg width="250" height="150" viewBox="0 0 250 150">
            {/* Grid */}
            <line x1="25" y1="0" x2="25" y2="150" stroke="#004551" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="125" y1="0" x2="125" y2="150" stroke="#004551" strokeWidth="1" />
            <line x1="225" y1="0" x2="225" y2="150" stroke="#004551" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="0" y1="75" x2="250" y2="75" stroke="#004551" strokeWidth="1" />
            
            {/* Curve */}
            <path d="M 0 140 C 80 140, 90 10, 250 10" fill="none" stroke="#770525" strokeWidth="2" />
            
            {/* Formula Text */}
            <text x="0" y="20" fill="#004551" fontSize="14" fontFamily="serif" fontStyle="italic">
              f(x) = 
              <tspan x="45" y="15">1</tspan>
              <tspan x="38" y="22">───</tspan>
              <tspan x="35" y="32">1+e⁻ˣ</tspan>
            </text>
          </svg>
        </div>

        {/* Math Decor - Geometric Wireframe */}
        <div className="absolute right-10 bottom-0 opacity-20 pointer-events-none hidden lg:block">
          <svg width="200" height="150" viewBox="0 0 200 150">
            {/* Cube wireframe */}
            <polygon points="100,50 150,30 150,80 100,100" fill="none" stroke="#004551" strokeWidth="1.5" />
            <polygon points="50,70 100,50 100,100 50,120" fill="none" stroke="#004551" strokeWidth="1.5" />
            <polygon points="100,50 150,30 100,10 50,30" fill="none" stroke="#004551" strokeWidth="1.5" />
            {/* Inner lines */}
            <line x1="50" y1="30" x2="50" y2="70" stroke="#004551" strokeWidth="1.5" />
            <line x1="100" y1="10" x2="100" y2="50" stroke="#004551" strokeWidth="1.5" />
            
            {/* Pyramid wireframe */}
            <polygon points="140,140 180,110 190,150" fill="none" stroke="#004551" strokeWidth="1.5" />
            <line x1="160" y1="70" x2="140" y2="140" stroke="#004551" strokeWidth="1.5" />
            <line x1="160" y1="70" x2="180" y2="110" stroke="#004551" strokeWidth="1.5" />
            <line x1="160" y1="70" x2="190" y2="150" stroke="#004551" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative text-center z-10 max-w-2xl mx-auto">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#004551]/60">
            Siap Jadi Bagian dari
          </p>
          <h2 className="games-display mt-2 text-4xl font-black md:text-5xl lg:text-6xl text-[#770525] drop-shadow-sm">
            GAMES 2026?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#004551]/75 font-medium">
            Tunjukkan kemampuan terbaikmu dan raih prestasi tingkat nasional!
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/daftar"
              className="btn-glossy-maroon inline-flex items-center gap-2 rounded-full px-8 py-4 font-black text-white"
            >
              Daftar Sekarang <ArrowRight size={18} />
            </Link>
            <a
              href="#"
              className="btn-glass-outline inline-flex items-center gap-2 rounded-full px-8 py-4 font-black text-[#004551]"
            >
              Unduh Brosur <Download size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
