import { FileText, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-4 md:pt-28">
      <div className="container-page relative z-10">
        {/* Massive Glass Container */}
        <div className="hero-glass relative grid min-h-[420px] lg:min-h-[500px] xl:min-h-[560px] overflow-hidden rounded-[2.5rem] items-stretch md:grid-cols-[1.1fr_0.9fr]">
          
          {/* Subtle dividing line and glow inside the card */}
          <div className="absolute top-0 bottom-0 left-[55%] w-px bg-gradient-to-b from-transparent via-[#c2e1df]/30 to-transparent hidden md:block" />
          
          {/* Left Content Area (Cream Frosted) */}
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-10 lg:p-14">
            <div className="mb-4 lg:mb-6 self-start inline-flex items-center gap-2 rounded-full bg-[#faadb6]/25 px-4 py-1.5 lg:py-2 text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-[#770525] border border-[#faadb6]/40 shadow-sm">
              Event Kompetisi Nasional
            </div>

            <h1 className="games-display text-5xl md:text-[56px] lg:whitespace-nowrap lg:text-[64px] xl:text-[80px] font-black leading-[0.9] text-[#004551] drop-shadow-md">
              GAMES <span className="text-[#770525] text-5xl md:text-[52px] lg:text-[60px] xl:text-[76px]">2026</span>
            </h1>
            <p className="mt-3 lg:mt-4 text-lg lg:text-xl xl:text-2xl font-bold text-[#004551]/80 tracking-tight">
              Gebyar Matematika Sains
            </p>
            <p className="mt-4 lg:mt-6 max-w-md text-sm lg:text-base leading-relaxed text-[#004551]/80 font-medium">
              Kompetisi Matematika dan Sains tingkat Nasional untuk mengasah nalar, kreativitas, dan inovasi generasi muda Indonesia.
            </p>

            <div className="mt-6 lg:mt-10 flex flex-wrap items-center gap-3 lg:gap-4">
              <Link
                to="/daftar"
                className="primary-glossy inline-flex items-center gap-2 rounded-full px-6 py-3 lg:px-8 lg:py-3.5 text-xs lg:text-sm font-black text-white"
              >
                Daftar Sekarang <Rocket size={16} className="text-[#faadb6]" />
              </Link>
              <Link
                to="/lomba"
                className="btn-glass-outline inline-flex items-center gap-2 rounded-full px-5 py-3 lg:px-6 lg:py-3.5 text-xs lg:text-sm font-bold text-[#004551]"
              >
                Lihat Panduan <FileText size={16} />
              </Link>
            </div>
          </div>

          {/* Right Visual Area (Dark Teal Frosted) */}
          <div className="relative flex items-center justify-center overflow-hidden p-6 lg:p-8">
            
            {/* The Glowing Orb */}
            <div className="relative aspect-square w-[280px] md:w-[320px] lg:w-[400px] xl:w-[480px]">
              
              {/* Outer Glow Halo (mint-glow) */}
              <div className="absolute inset-[-1.5rem] rounded-full mint-glow opacity-60 animate-pulse-glow" />
              
              {/* Main Sphere (Stronger opacity & glass) */}
              <div className="absolute inset-2 rounded-full bg-[#004551]/40 border-2 border-[#c2e1df]/50 backdrop-blur-xl shadow-[inset_0_0_80px_rgba(159,216,212,0.6),_0_0_50px_rgba(159,216,212,0.3)]">
                
                {/* SVG Grid & Shapes inside orb (Increased opacity) */}
                <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c2e1df" stopOpacity="1" />
                      <stop offset="100%" stopColor="#0b5a63" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  {/* Latitude / Longitude lines */}
                  <ellipse cx="50" cy="50" rx="46" ry="16" fill="none" stroke="url(#glow)" strokeWidth="0.8" />
                  <ellipse cx="50" cy="50" rx="16" ry="46" fill="none" stroke="url(#glow)" strokeWidth="0.8" />
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#c2e1df" strokeWidth="0.5" strokeDasharray="3 3" />
                  
                  {/* Grid Lines */}
                  <line x1="50" y1="4" x2="50" y2="96" stroke="#c2e1df" strokeWidth="0.8" opacity="0.6" />
                  <line x1="4" y1="50" x2="96" y2="50" stroke="#c2e1df" strokeWidth="0.8" opacity="0.6" />
                  
                  {/* Glowing intersection points */}
                  <circle cx="50" cy="34" r="2" fill="#d8eeeb" className="animate-pulse-glow" />
                  <circle cx="50" cy="66" r="2" fill="#d8eeeb" className="animate-pulse-glow" />
                  <circle cx="34" cy="50" r="2" fill="#d8eeeb" className="animate-pulse-glow" />
                  <circle cx="66" cy="50" r="2" fill="#d8eeeb" className="animate-pulse-glow" />
                  <circle cx="50" cy="50" r="3" fill="#edf8f6" className="animate-pulse-glow" />
                </svg>

                {/* Center Math Symbol */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-5xl lg:text-7xl font-black drop-shadow-[0_0_25px_rgba(216,238,235,1)] text-[#edf8f6]">Σ</span>
                  <span className="absolute bottom-1/4 mb-1 lg:-mb-1 text-[10px] lg:text-sm font-bold tracking-widest text-[#d8eeeb]">k=1</span>
                  <span className="absolute top-1/4 mt-1 lg:-mt-3 text-[9px] lg:text-xs font-bold text-[#d8eeeb]">n</span>
                  <span className="absolute left-1/2 ml-6 lg:ml-10 top-1/2 -mt-3 lg:-mt-5 text-2xl lg:text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">k²</span>
                </div>
              </div>

              {/* Floating Geometric Shapes (More visible) */}
              {/* Pink Pyramid Top Right */}
              <div className="absolute -right-4 lg:-right-8 top-4 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="relative size-20 lg:size-28">
                  <svg viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(250,173,182,0.6)]">
                    <polygon points="50,10 90,80 10,80" fill="url(#pinkGrad)" stroke="#faadb6" strokeWidth="2" opacity="0.9" />
                    <polygon points="50,10 90,80 60,70" fill="#770525" opacity="0.7" />
                    <line x1="50" y1="10" x2="60" y2="70" stroke="#faadb6" strokeWidth="2" />
                    <line x1="10" y1="80" x2="60" y2="70" stroke="#faadb6" strokeWidth="1.5" strokeDasharray="3 3" />
                    <defs>
                      <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#faadb6" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#770525" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Cyan Cube Bottom Left */}
              <div className="absolute -left-6 lg:-left-10 bottom-6 lg:bottom-8 animate-float-reverse" style={{ animationDelay: '1s' }}>
                <div className="relative size-16 lg:size-24">
                  <svg viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(159,216,212,0.5)]">
                    <polygon points="50,20 80,40 80,80 50,100 20,80 20,40" fill="none" stroke="#9fd8d4" strokeWidth="2" />
                    <line x1="20" y1="40" x2="50" y2="60" stroke="#9fd8d4" strokeWidth="2" />
                    <line x1="80" y1="40" x2="50" y2="60" stroke="#9fd8d4" strokeWidth="2" />
                    <line x1="50" y1="100" x2="50" y2="60" stroke="#9fd8d4" strokeWidth="2" />
                    <polygon points="50,20 80,40 50,60 20,40" fill="#9fd8d4" opacity="0.35" />
                  </svg>
                </div>
              </div>

              {/* Floating Formula Chips (glass-chip, more readable) */}
              <div className="glass-chip animate-float absolute -right-2 lg:-right-6 top-6 lg:top-8 rounded-lg lg:rounded-xl px-2 lg:px-4 py-1 lg:py-2 font-mono text-[10px] lg:text-sm font-black text-[#002b32]">
                a² + b² = c²
              </div>

              <div className="glass-chip animate-float-reverse absolute -left-4 lg:-left-8 top-1/3 rounded-lg lg:rounded-xl px-2 lg:px-3 py-1 lg:py-1.5 font-mono text-[9px] lg:text-xs font-black text-[#770525]" style={{ animationDelay: '2s' }}>
                f(x) = sin x
              </div>

              <div className="glass-chip animate-float absolute right-2 lg:right-2 bottom-[20%] rounded-lg lg:rounded-xl px-2 lg:px-4 py-1 lg:py-2 font-mono text-[9px] lg:text-xs font-black text-[#0b5a63]" style={{ animationDelay: '1.5s' }}>
                d/dx ∫ f(x)dx = f(x)
              </div>

              <div className="glass-chip animate-float-reverse absolute left-2 lg:left-4 bottom-0 lg:bottom-2 rounded-lg lg:rounded-xl px-2 lg:px-3 py-1 lg:py-1.5 font-mono text-[9px] lg:text-xs font-black text-[#770525]" style={{ animationDelay: '2.5s' }}>
                π ≈ 3.14159
              </div>
            </div>
            
            {/* Soft decorative grid lines in the background of the right side */}
            <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
              <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(194,225,223,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(194,225,223,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
