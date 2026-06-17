import { Mail, MessageCircle } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getSponsors, type Sponsor } from "../../services/sponsors";
import { getPartners, type Partner } from "../../services/partners";
import { useAsyncData } from "../../utils/useAsyncData";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Lomba", href: "/lomba" },
  { label: "Timeline", href: "/timeline" },
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Cek Status", href: "/cek-status" },
];

/* ─────────────────────────────────────────────
   Logo card — shared by Partners & Sponsors
───────────────────────────────────────────── */
function LogoCard({
  name,
  logo_url,
  website_url,
}: {
  name: string;
  logo_url: string | null;
  website_url: string | null;
}) {
  const inner = (
    <>
      <div className="flex h-20 w-full items-center justify-center rounded-lg bg-white/10 p-3">
        {logo_url ? (
          <img
            src={logo_url}
            alt={name}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-center text-[10px] font-black uppercase tracking-widest text-white/50">
            {name}
          </span>
        )}
      </div>
      <p className="mt-2.5 text-center text-[11px] font-semibold text-white/60">
        {name}
      </p>
    </>
  );

  const sharedCls =
    "flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm transition hover:bg-white/12 hover:border-white/20 w-32";

  if (website_url) {
    return (
      <a
        href={website_url}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedCls}
      >
        {inner}
      </a>
    );
  }

  return <div className={sharedCls}>{inner}</div>;
}

/* ─────────────────────────────────────────────
   Section wrapper with heading underline
───────────────────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="inline-block text-sm font-black text-white md:text-base">
        {children}
      </h3>
      <div className="mt-1.5 h-[2px] w-10 rounded-full bg-[#faadb6]" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Partner & Organizer Section
───────────────────────────────────────────── */
function PartnersSection() {
  const { data, loading } = useAsyncData<Partner[]>(
    async () => ({ data: await getPartners(), error: null }),
    [],
  );

  if (loading || !data || data.length === 0) return null;

  return (
    <div className="mt-8 border-t border-white/10 pt-8">
      <SectionHeading>Partner & Organizer</SectionHeading>
      <div className="flex flex-wrap gap-3">
        {data.map((p) => (
          <LogoCard
            key={p.id}
            name={p.name}
            logo_url={p.logo_url}
            website_url={p.website_url}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sponsors Section
───────────────────────────────────────────── */
function tierOrder(type: string | null) {
  const order: Record<string, number> = {
    platinum: 0,
    gold: 1,
    silver: 2,
    sponsor: 3,
  };
  return order[type ?? "sponsor"] ?? 99;
}

function SponsorsSection() {
  const { data, loading } = useAsyncData<Sponsor[]>(
    async () => ({ data: await getSponsors(), error: null }),
    [],
  );

  if (loading || !data || data.length === 0) return null;

  const sorted = [...data].sort(
    (a, b) => tierOrder(a.sponsor_type) - tierOrder(b.sponsor_type),
  );

  return (
    <div className="mt-8 border-t border-white/10 pt-8">
      <SectionHeading>Sponsor</SectionHeading>
      <div className="flex flex-wrap gap-3">
        {sorted.map((s) => (
          <LogoCard
            key={s.id}
            name={s.name}
            logo_url={s.logo_url}
            website_url={s.website_url}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="relative mt-0 overflow-hidden bg-[#064452] text-white">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-56 rounded-full bg-[#faadb6]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-64 rounded-full bg-[#c2e1df]/10 blur-3xl" />

      {/* Math decorations */}
      <span
        className="math-symbol math-symbol-light pointer-events-none hidden text-3xl md:block"
        style={{ top: "18%", right: "8%" }}
      >
        π
      </span>
      <span
        className="math-symbol math-symbol-light pointer-events-none hidden text-4xl md:block"
        style={{ bottom: "22%", left: "5%" }}
      >
        Σ
      </span>

      <div className="container-page relative py-8 md:py-12 lg:py-14">
        {/* Top grid */}
        <div className="grid gap-7 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-85"
            >
              <span className="flex size-11 shrink-0 items-center justify-center">
                <img
                  src="/logo-games.png"
                  alt="Logo GAMES 2026"
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <h2 className="games-display text-xl font-extrabold tracking-wide !text-black md:text-2xl">
                  GAMES 2026
                </h2>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c2e1df] md:text-[10px]">
                  Gebyar Matematika Sains
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-md text-xs font-medium leading-6 text-white/62 md:text-sm md:leading-7">
              Kompetisi matematika dan sains tingkat nasional untuk mengasah
              nalar, kreativitas, serta inovasi generasi muda Indonesia melalui
              semangat kompetisi, kolaborasi, dan prestasi.
            </p>
          </div>

          {/* Mobile quick sections */}
          <div className="grid grid-cols-2 gap-6 md:contents">
            {/* Navigation */}
            <div className="text-sm">
              <SectionHeading>Navigasi</SectionHeading>
              <div className="grid gap-2.5 text-xs font-medium text-white/62 md:gap-3 md:text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="inline-flex items-center gap-2 transition hover:text-white"
                  >
                    <span className="size-1 rounded-full bg-[#faadb6]" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="text-sm">
              <SectionHeading>Kontak</SectionHeading>
              <div className="grid gap-3 text-xs font-medium text-white/62 md:gap-4 md:text-sm">
                <a
                  href="mailto:hmpsmath.fmipauho@gmail.com"
                  className="flex items-start gap-2.5 transition hover:text-white"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-[#faadb6]" />
                  <span className="break-all">hmpsmath.fmipauho@gmail.com</span>
                </a>
                <div className="flex items-start gap-2.5">
                  <MessageCircle
                    size={15}
                    className="mt-0.5 shrink-0 text-[#faadb6]"
                  />
                  <div className="flex flex-col gap-1">
                    <a
                      href="https://wa.me/6285259925171"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Alwin: 0852 5992 5171
                    </a>
                    <a
                      href="https://wa.me/6282214237136"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Rusmiati: 0822 1423 7136
                    </a>
                    <a
                      href="https://wa.me/6282299928836"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mursyid: 0822 9992 8836
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="col-span-2 text-sm md:col-span-1">
              <SectionHeading>Sosial Media</SectionHeading>
              <div className="flex flex-wrap gap-3 text-xs font-medium text-white/68 md:grid md:gap-4 md:text-sm">
                <a
                  href="https://instagram.com/games.uho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 transition hover:bg-white/10 hover:text-white md:border-0 md:bg-transparent md:px-0 md:py-0"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-white/8 text-[#faadb6]">
                    <FaInstagram size={13} />
                  </span>
                  <span>@games.uho</span>
                </a>
                <a
                  href="https://www.tiktok.com/@hmpsmath.uho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 transition hover:bg-white/10 hover:text-white md:border-0 md:bg-transparent md:px-0 md:py-0"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-white/8 text-[#faadb6]">
                    <FaTiktok size={13} />
                  </span>
                  <span>@hmpsmath.uho</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Partner & Organizer */}
        <PartnersSection />

        {/* Sponsors */}
        <SponsorsSection />

        {/* Copyright */}
        <div className="mt-6 border-t border-white/10 pt-5 md:mt-8 md:pt-6">
          <div className="flex flex-col items-start justify-between gap-3 text-[11px] font-medium text-white/45 sm:flex-row sm:items-center">
            <p>© 2026 GAMES — Gebyar Matematika Sains. All rights reserved.</p>
            <div className="flex gap-5">
              <Link to="/faq" className="transition hover:text-white">
                FAQ
              </Link>
              <Link to="/kontak" className="transition hover:text-white">
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
