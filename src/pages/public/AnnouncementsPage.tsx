import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  HelpCircle,
  Megaphone,
  MoreHorizontal,
  Search,
  Send,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getAnnouncements } from "../../services/announcements";
import type { Announcement } from "../../types/models";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";

const categories = ["Semua", "Pengumuman", "Informasi Lomba", "Pendaftaran", "Teknis", "Hasil", "Lainnya"];
const categoryIcons = [FileText, FileText, CalendarDays, FileText, HelpCircle, Trophy, MoreHorizontal];

export function AnnouncementsPage() {
  const { data, error, loading } = useAsyncData(getAnnouncements, []);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const announcements = useMemo(() => data ?? [], [data]);
  const filteredAnnouncements = useMemo(
    () => announcements.filter((announcement) => matchesSearch(announcement, search) && matchesCategory(announcement, activeCategory)),
    [activeCategory, announcements, search],
  );
  const categoryCounts = useMemo(
    () => categories.map((category) => ({ category, count: countCategory(announcements, category) })),
    [announcements],
  );

  return (
    <>
      <section className="container-page pt-28 md:pt-32">
        <div className="hero-glass relative grid min-h-[390px] overflow-hidden rounded-[2.35rem] md:grid-cols-[1fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <p className="mb-5 inline-flex w-fit rounded-full border border-[#faadb6]/45 bg-[#faadb6]/22 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#770525]">
              Pengumuman GAMES 2026
            </p>
            <h1 className="games-display max-w-2xl text-4xl font-black leading-[1.04] text-[#004551] md:text-5xl lg:text-6xl">
              Informasi Terbaru <span className="text-[#770525]">GAMES 2026</span>
            </h1>
            <p className="mt-5 max-w-md text-sm font-semibold leading-7 text-[#004551]/78 md:text-base">
              Dapatkan informasi terbaru seputar pendaftaran, kegiatan, dan pengumuman penting lainnya.
            </p>
            <label className="mt-7 flex max-w-md items-center gap-3 rounded-2xl border border-white/80 bg-white/62 px-5 py-4 text-[#004551] shadow-[0_16px_38px_rgba(0,69,81,0.1)] backdrop-blur-2xl">
              <Search size={20} className="shrink-0 text-[#004551]/60" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari pengumuman..."
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-[#004551]/45"
              />
            </label>
          </div>
          <AnnouncementHeroVisual />
        </div>
      </section>

      <section className="container-page py-10 md:py-12">
        <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-3 md:hidden">
          {categories.map((category, index) => {
            const Icon = categoryIcons[index];
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`grid min-w-[86px] shrink-0 gap-2 rounded-2xl px-3 py-3 text-center text-[11px] font-black ${
                  active ? "text-[#770525]" : "text-[#004551]"
                }`}
              >
                <span className={`mx-auto grid size-12 place-items-center rounded-full ${active ? "btn-glossy-maroon text-white" : "border border-white/75 bg-white/58 shadow-[0_12px_28px_rgba(0,69,81,0.1)]"}`}>
                  <Icon size={18} />
                </span>
                {category}
              </button>
            );
          })}
        </div>

        <div className="hidden items-center justify-between gap-4 md:flex">
          <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-6 py-3 text-sm font-black transition ${
                  activeCategory === category
                    ? "btn-glossy-maroon text-white"
                    : "border border-white/70 bg-white/55 text-[#004551] shadow-[0_12px_30px_rgba(0,69,81,0.08)] backdrop-blur-2xl hover:bg-white/75"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <button className="inline-flex shrink-0 items-center gap-12 rounded-full border border-white/75 bg-white/55 px-6 py-3 text-sm font-black text-[#004551] shadow-[0_12px_30px_rgba(0,69,81,0.08)] backdrop-blur-2xl">
            Terbaru <ChevronDown size={16} />
          </button>
        </div>

        <div className="mt-5 flex justify-end md:hidden">
          <button className="inline-flex items-center gap-10 rounded-full border border-white/75 bg-white/55 px-6 py-3 text-sm font-black text-[#004551] shadow-[0_12px_30px_rgba(0,69,81,0.08)] backdrop-blur-2xl">
            Terbaru <ChevronDown size={16} />
          </button>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="mb-6">
              {loading ? <LoadingState /> : null}
              {error ? <ErrorState message={error} /> : null}
              {!loading && !error && announcements.length === 0 ? <EmptyState description="Belum ada pengumuman terbit." /> : null}
              {!loading && !error && announcements.length > 0 && filteredAnnouncements.length === 0 ? (
                <EmptyState description="Tidak ada pengumuman yang cocok dengan pencarian/filter." />
              ) : null}
            </div>
            <div className="grid gap-4">
              {filteredAnnouncements.map((announcement, index) => (
                <AnnouncementRow key={announcement.id} announcement={announcement} index={index} />
              ))}
            </div>
            {filteredAnnouncements.length > 3 ? (
              <div className="mt-6 flex justify-center md:hidden">
                <button className="btn-glass-outline inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-black text-[#004551]">
                  Muat Lebih Banyak <ChevronDown size={16} />
                </button>
              </div>
            ) : null}
          </div>

          <aside className="hidden lg:grid h-fit gap-5">
            <div className="glass-card-premium rounded-[1.5rem] p-6">
              <h2 className="text-lg font-black text-[#004551]">Kategori</h2>
              <div className="mt-5 grid gap-2">
                {categoryCounts.map(({ category, count }, index) => {
                  const Icon = categoryIcons[index];
                  const active = activeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black transition ${
                        active ? "bg-[#faadb6]/24 text-[#770525]" : "text-[#004551] hover:bg-white/45"
                      }`}
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon size={16} />
                        {category === "Semua" ? "Semua Kategori" : category}
                      </span>
                      <span className="rounded-full bg-white/65 px-2.5 py-1 text-xs">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-[#faadb6]/35 bg-[#faadb6]/17 p-6 shadow-[0_18px_42px_rgba(119,5,37,0.08)] backdrop-blur-2xl">
              <div className="flex gap-4">
                <Bell size={22} className="mt-1 shrink-0 text-[#770525]" />
                <div>
                  <h2 className="font-black text-[#004551]">Pengumuman Penting</h2>
                  <p className="mt-3 text-sm font-medium leading-7 text-[#004551]/70">
                    Pastikan kamu selalu memantau pengumuman terbaru agar tidak ketinggalan informasi penting seputar GAMES 2026.
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-card-premium rounded-[1.5rem] p-6">
              <h2 className="font-black text-[#004551]">Butuh Bantuan?</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-[#004551]/70">
                Jika ada pertanyaan, jangan ragu menghubungi panitia melalui kontak yang tersedia.
              </p>
              <Link to="/kontak" className="btn-glossy-maroon mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black text-white">
                Hubungi Panitia
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function AnnouncementRow({ announcement, index }: { announcement: Announcement; index: number }) {
  const iconType = getAnnouncementIconType(announcement.category, index);
  const accent = index % 4 === 1 || announcement.category.toLowerCase().includes("lomba") ? "maroon" : "teal";

  return (
    <article className="glass-card-premium grid gap-4 rounded-[1.5rem] p-5 md:grid-cols-[132px_1fr_auto] md:items-center md:p-6">
      <div className={`grid size-24 place-items-center rounded-2xl text-white shadow-[0_18px_42px_rgba(0,69,81,0.16)] md:size-28 ${accent === "maroon" ? "bg-gradient-to-br from-[#770525] to-[#bd0f45]" : "bg-gradient-to-br from-[#004551] to-[#5fa6a5]"}`}>
        <AnnouncementIcon type={iconType} />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#faadb6]/25 px-3 py-1 text-xs font-black text-[#770525]">
            {formatDate(announcement.published_at)}
          </span>
          <span className="rounded-full bg-[#c2e1df]/55 px-3 py-1 text-xs font-black text-[#004551]">
            {formatCategory(announcement.category)}
          </span>
        </div>
        <h2 className="mt-3 text-xl font-black leading-tight text-[#004551]">{announcement.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm font-medium leading-7 text-[#004551]/72">{announcement.content}</p>
        <Link to={`/pengumuman/${announcement.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#770525]">
          Baca Selengkapnya <ArrowRight size={15} />
        </Link>
      </div>
      <Link
        to={`/pengumuman/${announcement.slug}`}
        className="hidden size-12 place-items-center rounded-full border border-white/75 bg-white/55 text-[#004551] shadow-[0_12px_30px_rgba(0,69,81,0.08)] transition hover:translate-x-1 hover:bg-white/80 md:grid"
        aria-label={`Baca ${announcement.title}`}
      >
        <ChevronRight size={22} />
      </Link>
    </article>
  );
}

function AnnouncementHeroVisual() {
  return (
    <div className="relative hidden min-h-[390px] items-center justify-center overflow-hidden md:flex">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#c2e1df]/16 to-[#004551]/70" />
      <span className="absolute left-16 top-12 font-mono text-xl font-bold text-[#c2e1df]/60">∫ f(n)β sin x</span>
      <span className="absolute left-40 top-20 font-mono text-2xl font-bold text-[#c2e1df]/65">f(x) = sin x</span>
      <span className="absolute right-16 bottom-12 font-mono text-xl font-bold text-[#c2e1df]/75">π = 3.14159</span>
      <div className="relative aspect-square w-[340px]">
        <div className="absolute inset-4 rounded-full border border-[#c2e1df]/38" />
        <div className="absolute inset-12 rounded-full border border-dashed border-[#c2e1df]/38" />
        <div className="absolute left-3 top-44 size-28 animate-float-reverse">
          <svg viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(194,225,223,0.72)]">
            <polygon points="50,8 84,28 84,72 50,94 16,72 16,28" fill="rgba(194,225,223,0.18)" stroke="#c2e1df" strokeWidth="2" />
            <line x1="16" y1="28" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
            <line x1="84" y1="28" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
            <line x1="50" y1="94" x2="50" y2="50" stroke="#c2e1df" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute right-2 top-44 size-28 animate-float">
          <svg viewBox="0 0 120 120" className="drop-shadow-[0_0_20px_rgba(194,225,223,0.72)]">
            <polygon points="60,8 108,102 12,102" fill="rgba(194,225,223,0.12)" stroke="#c2e1df" strokeWidth="2" />
            <line x1="60" y1="8" x2="70" y2="88" stroke="#c2e1df" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative grid size-44 place-items-center rounded-full border border-[#c2e1df]/55 bg-[#004551]/42 text-[#c2e1df] shadow-[inset_0_0_62px_rgba(194,225,223,0.35),0_0_50px_rgba(194,225,223,0.28)] backdrop-blur-2xl">
            <Megaphone size={96} strokeWidth={1.4} />
          </div>
        </div>
      </div>
    </div>
  );
}

function matchesSearch(announcement: Announcement, search: string) {
  const keyword = search.trim().toLowerCase();
  if (!keyword) return true;
  return `${announcement.title} ${announcement.content} ${announcement.category}`.toLowerCase().includes(keyword);
}

function matchesCategory(announcement: Announcement, category: string) {
  if (category === "Semua") return true;
  return normalizeCategory(announcement.category) === category;
}

function countCategory(announcements: Announcement[], category: string) {
  if (category === "Semua") return announcements.length;
  return announcements.filter((announcement) => normalizeCategory(announcement.category) === category).length;
}

function normalizeCategory(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("lomba")) return "Informasi Lomba";
  if (normalized.includes("daftar")) return "Pendaftaran";
  if (normalized.includes("teknis")) return "Teknis";
  if (normalized.includes("hasil")) return "Hasil";
  if (normalized.includes("pengumuman") || normalized.includes("general")) return "Pengumuman";
  return "Lainnya";
}

function formatCategory(category: string) {
  return normalizeCategory(category);
}

function AnnouncementIcon({ type }: { type: "calendar" | "send" | "trophy" | "file" }) {
  if (type === "calendar") return <CalendarDays size={42} strokeWidth={1.6} />;
  if (type === "send") return <Send size={42} strokeWidth={1.6} />;
  if (type === "trophy") return <Trophy size={42} strokeWidth={1.6} />;
  return <FileText size={42} strokeWidth={1.6} />;
}

function getAnnouncementIconType(category: string, index: number): "calendar" | "send" | "trophy" | "file" {
  const normalized = normalizeCategory(category);
  if (normalized === "Informasi Lomba") return "calendar";
  if (normalized === "Pendaftaran") return "send";
  if (normalized === "Hasil") return "trophy";
  if (normalized === "Teknis") return "file";
  return index % 3 === 1 ? "calendar" : index % 3 === 2 ? "send" : "file";
}
