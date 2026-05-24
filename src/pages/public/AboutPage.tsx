import {
  Atom,
  BookOpen,
  Calculator,
  Calendar,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Leaf,
  LineChart,
  Network,
  PenLine,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  University,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const tujuan = [
  {
    icon: <Sparkles size={18} strokeWidth={2.2} />,
    text: "Meningkatkan minat dan motivasi generasi muda dalam bidang matematika dan sains.",
  },
  {
    icon: <Target size={18} strokeWidth={2.2} />,
    text: "Menjadi wadah pengembangan kemampuan akademik, logika, dan inovasi peserta.",
  },
  {
    icon: <Trophy size={18} strokeWidth={2.2} />,
    text: "Mendorong lahirnya kompetisi akademik yang sehat dan berkualitas.",
  },
  {
    icon: <Network size={18} strokeWidth={2.2} />,
    text: "Memperluas jejaring keilmuan antara siswa, mahasiswa, dosen, dan institusi pendidikan.",
  },
  {
    icon: <Zap size={18} strokeWidth={2.2} />,
    text: "Mengembangkan semangat berpikir kritis dan kreatif melalui kompetisi dan seminar nasional.",
  },
  {
    icon: <GraduationCap size={18} strokeWidth={2.2} />,
    text: "Mendukung peningkatan kualitas pendidikan di Sulawesi Tenggara dan Indonesia.",
  },
];

const bidang = [
  {
    icon: Calculator,
    label: "Olimpiade Matematika",
    desc: "Uji kemampuan logika dan pemecahan masalah matematika tingkat lanjut.",
    tag: "Individu",
    level: "SMA · Mahasiswa",
  },
  {
    icon: Zap,
    label: "Lomba Cepat Tepat Matematika",
    desc: "Kompetisi tim berbasis kecepatan dan ketepatan menjawab soal matematika.",
    tag: "Tim",
    level: "SMP · SMA",
  },
  {
    icon: Users,
    label: "Seminar Nasional",
    desc: "Forum ilmiah bertaraf nasional menghadirkan pakar matematika dan sains.",
    tag: "Umum",
    level: "Semua Jenjang",
  },
  {
    icon: LineChart,
    label: "Trading Competition",
    desc: "Simulasi perdagangan berbasis analisis statistik dan matematika keuangan.",
    tag: "Tim",
    level: "Mahasiswa",
  },
  {
    icon: Atom,
    label: "Calculus Competition",
    desc: "Kompetisi kalkulus tingkat lanjut menguji penguasaan konsep dan aplikasi.",
    tag: "Individu",
    level: "Mahasiswa",
  },
  {
    icon: FlaskConical,
    label: "Mathematical Statistics",
    desc: "Kompetisi statistika matematis dengan pendekatan analitik dan komputasi.",
    tag: "Individu",
    level: "Mahasiswa",
  },
  {
    icon: PenLine,
    label: "Lomba Karya Tulis Ilmiah",
    desc: "Ajang riset dan inovasi ilmiah dalam bidang matematika dan sains terapan.",
    tag: "Tim",
    level: "SMA · Mahasiswa",
  },
];

const misi = [
  "Menyelenggarakan kompetisi akademik yang berkualitas dan berintegritas.",
  "Mengembangkan potensi siswa dan mahasiswa dalam bidang matematika dan sains.",
  "Menjadi ruang kolaborasi dan pertukaran wawasan akademik.",
  "Mendorong inovasi, kreativitas, dan daya saing generasi muda.",
  "Menghadirkan kegiatan edukatif yang berdampak positif bagi masyarakat pendidikan.",
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export function AboutPage() {
  return (
    <>
      {/* ===== Hero — pola CompetitionsPage ===== */}
      <section className="container-hero relative pt-28 pb-3 md:pt-32 md:pb-8">
        <div className="inner-page-hero relative overflow-hidden rounded-[2rem] border border-white/90 px-6 py-8 shadow-[0_24px_60px_rgba(6,68,82,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] md:grid md:min-h-[360px] md:grid-cols-[0.9fr_1.1fr] md:items-center md:rounded-[2.35rem] md:px-12 md:py-12 lg:px-14">
          {/* Visual background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute right-0 top-0 hidden h-full w-[46%] items-center justify-center md:flex">
              <div className="relative aspect-square w-[300px] lg:w-[340px]">
                <div className="absolute inset-8 rounded-full bg-[#004551]/38 shadow-[inset_0_0_72px_rgba(194,225,223,0.55),0_0_54px_rgba(194,225,223,0.3)] backdrop-blur-xl" />
                <div className="absolute inset-8 rounded-full border border-[#c2e1df]/55" />
                <div className="absolute inset-14 rounded-full border border-dashed border-[#c2e1df]/50" />
                <svg
                  viewBox="0 0 120 120"
                  className="absolute inset-0 h-full w-full"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="43"
                    fill="none"
                    stroke="rgba(216,238,235,0.4)"
                    strokeWidth="1.2"
                    strokeDasharray="5 5"
                  />
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="50"
                    ry="16"
                    fill="none"
                    stroke="rgba(216,238,235,0.45)"
                    strokeWidth="1.3"
                  />
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="16"
                    ry="50"
                    fill="none"
                    stroke="rgba(216,238,235,0.45)"
                    strokeWidth="1.3"
                  />
                  <line
                    x1="60"
                    y1="10"
                    x2="60"
                    y2="110"
                    stroke="rgba(216,238,235,0.35)"
                    strokeWidth="1"
                  />
                  <line
                    x1="10"
                    y1="60"
                    x2="110"
                    y2="60"
                    stroke="rgba(216,238,235,0.35)"
                    strokeWidth="1"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-white">
                  <div className="text-center">
                    <div className="text-[3.2rem] font-black leading-none drop-shadow-[0_0_18px_rgba(216,238,235,0.6)] lg:text-[4rem]">
                      Σ
                    </div>
                    <div className="-mt-1 text-lg font-black lg:text-2xl">
                      k²
                    </div>
                  </div>
                </div>
                <div className="glass-chip absolute -right-4 top-8 rounded-xl px-3 py-1.5 font-mono text-[10px] font-black text-[#004551]">
                  a² + b² = c²
                </div>
                <div className="glass-chip absolute -left-4 bottom-16 rounded-xl px-3 py-1.5 font-mono text-[10px] font-black text-[#7E032F]">
                  f(x) = sin x
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-[16.8rem] md:max-w-lg">
            {/* Breadcrumb */}

            <h1 className="games-display mt-5 text-[2.18rem] font-black leading-[0.96] tracking-[-0.055em] text-[#064452] min-[390px]:text-[2.42rem] md:text-[4.25rem] lg:text-[4.8rem]">
              Tentang
              <br />
              Games
              <br />
              {/* <span className="text-[#7E032F]">Gebyar Matematika Sains</span> */}
            </h1>

            <p className="mt-5 max-w-[15rem] text-[0.84rem] font-semibold leading-6 text-[#064452]/78 min-[390px]:max-w-[16.5rem] min-[390px]:text-[0.9rem] md:max-w-md md:text-base md:leading-7">
              Ajang kompetisi, seminar nasional, dan pengembangan akademik
              tingkat regional dan nasional.
              <span className="hidden md:inline">
                {" "}
                Diselenggarakan oleh HMPS Matematika FMIPA Universitas Halu
                Oleo.
              </span>
            </p>

            <div className="mt-6 flex w-full max-w-[260px] flex-col items-start gap-3 md:mt-8 md:max-w-none md:flex-row">
              <Link
                to="/lomba"
                className="primary-glossy inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-black text-white md:h-12 md:w-auto md:px-8"
              >
                Lihat Lomba
                <Rocket size={15} className="text-[#ffd5df]" />
              </Link>
              <Link
                to="/timeline"
                className="btn-glass-outline inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-black text-[#064452] md:h-12 md:w-auto md:px-8"
              >
                Timeline
                <Calendar size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Deskripsi ===== */}
      <section className="container-hero relative pt-6 pb-10 lg:pb-14">
        <div className="pointer-events-none absolute left-0 top-0 size-[340px] rounded-full bg-[#064252]/8 blur-[100px] -z-10" />

        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.34)_48%,rgba(194,225,223,0.26)_72%,rgba(6,66,82,0.22)_100%)] p-6 shadow-[0_18px_46px_rgba(6,66,82,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[28px] md:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full border-[3px] border-[#faadb6]/25 opacity-60" />
          <div className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full border-[2px] border-[#7E032F]/15" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
            <div className="shrink-0">
              <div className="relative inline-flex">
                <div className="absolute inset-0 rounded-2xl bg-[#7E032F] opacity-20 blur-xl" />
                <div className="relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-[#7E032F] to-[#9f0a3a] text-white shadow-[0_16px_32px_rgba(126,3,47,0.25)] md:size-20">
                  <Sparkles size={28} strokeWidth={2.1} />
                </div>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="games-display mb-4 text-[1.65rem] font-black leading-tight tracking-[-0.04em] text-[#064252] md:text-[2rem]">
                Tentang GAMES 2026
              </h2>
              <p className="mb-4 text-[0.93rem] font-semibold leading-7 text-[#064252]/75 md:text-base md:leading-8">
                <strong className="font-black text-[#064252]">
                  Gebyar Matematika Sains (GAMES) 2026
                </strong>{" "}
                merupakan ajang kompetisi, seminar nasional, dan pengembangan
                akademik yang diselenggarakan oleh Himpunan Mahasiswa Program
                Studi Matematika FMIPA Universitas Halu Oleo.
              </p>
              <p className="text-[0.93rem] font-semibold leading-7 text-[#064252]/70 md:text-base md:leading-8">
                Kegiatan ini menjadi wadah bagi siswa dan mahasiswa untuk
                mengembangkan kemampuan berpikir logis, inovatif, dan kompetitif
                dalam bidang matematika, sains, serta teknologi melalui berbagai
                cabang perlombaan tingkat regional dan nasional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Tujuan ===== */}
      <section className="container-hero relative pb-10 lg:pb-14">
        <div className="pointer-events-none absolute -right-20 top-0 size-[360px] rounded-full bg-[#faadb6]/10 blur-[100px] -z-10" />

        <SectionHeading eyebrow="Mengapa GAMES?" title="Tujuan Kegiatan" />

        <div className="mt-7 grid gap-3 sm:grid-cols-2 md:mt-9 lg:grid-cols-3">
          {tujuan.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-[1.3rem] border border-white/70 bg-white/30 p-4 shadow-[0_8px_28px_rgba(6,66,82,0.07),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-[18px] transition hover:-translate-y-0.5 hover:bg-white/45 md:p-5"
            >
              <div className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#7E032F]/15 to-[#faadb6]/30 text-[#7E032F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                {item.icon}
              </div>
              <p className="text-[0.82rem] font-semibold leading-6 text-[#064252]/78 md:text-[0.88rem]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Bidang Unggulan — card grid ala CompetitionCard ===== */}
      <section className="container-hero relative pb-10 lg:pb-14">
        <div className="pointer-events-none absolute -left-20 top-8 size-[400px] rounded-full bg-[#c2e1df]/14 blur-[120px] -z-10" />

        <SectionHeading
          eyebrow="Kompetisi &amp; Kegiatan"
          title="Bidang Unggulan"
        />

        <div className="mt-7 grid gap-5 md:mt-9 md:grid-cols-2 lg:grid-cols-3">
          {bidang.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={i}
                to="/lomba"
                className="group glass-card-premium flex flex-col justify-between rounded-[1.35rem] p-5 transition md:p-6"
              >
                {/* Top row */}
                <div>
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-[#7E032F] opacity-25 blur-lg transition-opacity group-hover:opacity-45" />
                      <div className="relative grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#7E032F] to-[#9f0a3a] text-white shadow-[0_16px_28px_rgba(126,3,47,0.22)] transition group-hover:scale-105 group-hover:from-[#064252] group-hover:to-[#0b5a63] md:size-14">
                        <Icon size={20} strokeWidth={2.25} />
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="rounded-full border border-white/60 bg-white/42 px-2.5 py-1 text-[8.5px] font-black uppercase tracking-[0.08em] text-[#064252]/70 backdrop-blur-md">
                        {item.tag}
                      </span>
                      <span className="rounded-full border border-[#faadb6]/55 bg-[#fff3f6]/70 px-2.5 py-1 text-[8.5px] font-black uppercase tracking-[0.08em] text-[#7E032F]/80 backdrop-blur-md">
                        {item.level}
                      </span>
                    </div>
                  </div>

                  <h3 className="line-clamp-2 text-[0.98rem] font-black leading-tight tracking-[-0.02em] text-[#064252] md:text-lg">
                    {item.label}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-[0.76rem] font-semibold leading-5 text-[#064252]/68 md:mt-4 md:text-sm md:leading-6">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom link */}
                <span className="mt-5 inline-flex items-center gap-1 text-[0.72rem] font-black text-[#7E032F] md:text-xs">
                  Selengkapnya{" "}
                  <ChevronRight
                    size={13}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== Visi & Misi ===== */}
      <section className="container-hero relative pb-12 lg:pb-16">
        <div className="pointer-events-none absolute right-0 top-0 size-[420px] rounded-full bg-[#064252]/8 blur-[120px] -z-10" />

        <SectionHeading
          eyebrow="Arah &amp; Cita-cita"
          title="Visi &amp; Misi"
        />

        <div className="mt-7 grid gap-4 md:mt-9 md:grid-cols-2 md:gap-6">
          {/* Visi */}
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/80 bg-gradient-to-br from-[#7E032F]/90 to-[#9f0a3a]/80 p-6 shadow-[0_20px_48px_rgba(126,3,47,0.22),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-[18px] md:p-7">
            <div className="pointer-events-none absolute -right-10 -bottom-10 size-44 rounded-full bg-white/5 blur-2xl" />
            <div className="pointer-events-none absolute right-4 top-4 size-24 rounded-full border border-white/12" />

            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-white/18 backdrop-blur-md">
                <Sparkles
                  size={18}
                  className="text-[#faadb6]"
                  strokeWidth={2.2}
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60">
                Visi
              </p>
            </div>

            <p className="text-[0.95rem] font-bold leading-7 text-white/90 md:text-base md:leading-8">
              Menjadi ajang pengembangan akademik dan inovasi yang inspiratif,
              kompetitif, dan berkontribusi terhadap kemajuan pendidikan
              matematika dan sains di Indonesia.
            </p>
          </div>

          {/* Misi */}
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.34)_60%,rgba(194,225,223,0.28)_100%)] p-6 shadow-[0_18px_44px_rgba(6,66,82,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[22px] md:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-[#064252]/12">
                <Target
                  size={18}
                  className="text-[#064252]"
                  strokeWidth={2.2}
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#064252]/55">
                Misi
              </p>
            </div>

            <ol className="space-y-3">
              {misi.map((m, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#7E032F]/12 text-[9px] font-black text-[#7E032F]">
                    {i + 1}
                  </span>
                  <p className="text-[0.82rem] font-semibold leading-6 text-[#064252]/78 md:text-[0.88rem]">
                    {m}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== Penyelenggara ===== */}
      <section className="container-hero relative pb-10 lg:pb-14">
        <div className="pointer-events-none absolute -left-20 bottom-0 size-[360px] rounded-full bg-[#faadb6]/10 blur-[100px] -z-10" />

        <SectionHeading eyebrow="Institusi" title="Penyelenggara" />

        <div className="mt-7 overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.34)_48%,rgba(194,225,223,0.26)_72%,rgba(6,66,82,0.22)_100%)] shadow-[0_18px_46px_rgba(6,66,82,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[28px] md:mt-9">
          <div className="h-1.5 bg-gradient-to-r from-[#7E032F] via-[#faadb6] to-[#064252]" />

          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
              <div className="flex shrink-0 items-center gap-4">
                {[
                  { color: "from-[#7E032F] to-[#9f0a3a]" },
                  { color: "from-[#064252] to-[#0b5a63]" },
                  { color: "from-[#064252]/70 to-[#064252]" },
                ].map((logo, i) => (
                  <div
                    key={i}
                    className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${logo.color} shadow-[0_10px_28px_rgba(6,66,82,0.2)] md:size-16`}
                  >
                    <University
                      size={22}
                      className="text-white"
                      strokeWidth={2.1}
                    />
                  </div>
                ))}
              </div>

              <div className="flex-1">
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#7E032F]">
                  Diselenggarakan oleh
                </p>
                <h3 className="games-display mb-2 text-[1.3rem] font-black leading-tight tracking-[-0.03em] text-[#064252] md:text-[1.55rem]">
                  Himpunan Mahasiswa Program Studi Matematika
                </h3>
                <p className="text-[0.86rem] font-semibold leading-6 text-[#064252]/70 md:text-[0.92rem]">
                  Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)
                  <br />
                  Universitas Halu Oleo — Kendari, Sulawesi Tenggara
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bottom CTA ===== */}
      <section className="container-hero relative mt-8 pb-12 md:mt-10 md:pb-14">
        <div className="relative overflow-hidden rounded-[1.65rem] border border-white/85 bg-[linear-gradient(90deg,rgba(194,225,223,0.54)_0%,rgba(248,240,231,0.78)_35%,rgba(255,255,255,0.9)_100%)] px-6 py-6 shadow-[0_18px_44px_rgba(6,68,82,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[24px] md:px-8 md:py-7">
          <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-[260px] opacity-35 md:block">
            <svg
              className="absolute left-8 top-1/2 -translate-y-1/2"
              width="150"
              height="120"
              viewBox="0 0 150 120"
              fill="none"
            >
              <polygon
                points="75,10 130,38 75,66 20,38"
                stroke="#064452"
                strokeWidth="1.4"
                opacity="0.55"
              />
              <polygon
                points="20,38 75,66 75,112 20,84"
                stroke="#064452"
                strokeWidth="1.4"
                opacity="0.42"
              />
              <polygon
                points="130,38 75,66 75,112 130,84"
                stroke="#064452"
                strokeWidth="1.4"
                opacity="0.42"
              />
            </svg>
            <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_0%_50%,rgba(6,68,82,0.32),transparent_62%)]" />
          </div>

          <div className="relative z-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="md:pl-[190px]">
              <h2 className="games-display text-[1.45rem] font-black leading-tight tracking-[-0.03em] text-[#7E032F] md:text-2xl">
                Siap bergabung di GAMES 2026?
              </h2>
              <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-[#064452]/72">
                Daftarkan diri sekarang dan tunjukkan kemampuan terbaikmu di
                ajang kompetisi nasional.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                to="/lomba"
                className="btn-glass-outline inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-[#064452]"
              >
                Lihat Lomba
              </Link>
              <Link
                to="/daftar"
                className="btn-glossy-maroon inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-white"
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   SHARED SECTION HEADING
───────────────────────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-end gap-4">
      <div className="h-9 w-1.5 shrink-0 rounded-full bg-[#faadb6] shadow-[0_0_18px_rgba(250,173,182,0.55)] md:h-10" />
      <div>
        <p
          className="mb-1 hidden text-[10px] font-black uppercase tracking-[0.24em] text-[#7E032F] md:block"
          dangerouslySetInnerHTML={{ __html: eyebrow }}
        />
        <h2
          className="games-display text-[1.85rem] font-black leading-tight tracking-[-0.04em] text-[#064252] min-[390px]:text-[2.05rem] md:text-4xl"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
    </div>
  );
}
