import { createElement } from "react";
import {
  ArrowRight,
  Bell,
  FileText,
  Megaphone,
  PlaySquare,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Announcement } from "../../types/models";
import { formatDate } from "../../utils/date";

// const announcementIcons = [FileText, PlaySquare, Rocket, Megaphone, Bell];

function getAnnouncementIcon(category?: string) {
  const text = `${category ?? ""}`.toLowerCase();

  if (text.includes("video") || text.includes("webinar")) return PlaySquare;
  if (text.includes("daftar") || text.includes("pendaftaran")) return Rocket;
  if (text.includes("panduan") || text.includes("teknis")) return FileText;
  if (text.includes("info") || text.includes("umum")) return Megaphone;

  return Bell;
}

export function AnnouncementCard({
  announcement,
  index = 0,
}: {
  announcement: Announcement;
  index?: number;
}) {
  const isPink = index % 3 === 2;
  const isDark = index % 3 === 0;

  return (
    <article
      className={[
        "group relative flex min-h-[190px] overflow-hidden rounded-[1.45rem] border p-5 transition-all duration-300",
        "shadow-[0_18px_44px_rgba(6,66,82,0.14),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-[28px]",
        "hover:-translate-y-1 hover:border-white/90 hover:shadow-[0_24px_58px_rgba(6,66,82,0.2),inset_0_1px_0_rgba(255,255,255,0.86)]",
        isDark
          ? "border-[#c2e1df]/50 bg-[linear-gradient(135deg,rgba(6,66,82,0.62)_0%,rgba(45,125,130,0.32)_48%,rgba(255,255,255,0.16)_100%)] text-white"
          : "border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.18)_52%,rgba(194,225,223,0.18)_100%)] text-[#064252]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.32),transparent_36%)]" />
      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-[#c2e1df]/18 blur-3xl" />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col pr-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={[
              "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black leading-none",
              isDark
                ? "border-white/16 bg-white/12 text-[#d8eeeb]"
                : "border-white/55 bg-white/35 text-[#064252]/65",
            ].join(" ")}
          >
            {formatDate(announcement.published_at)}
          </span>

          {announcement.category ? (
            <span
              className={[
                "inline-flex items-center rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.08em]",
                isDark
                  ? "border-[#faadb6]/25 bg-[#faadb6]/14 text-[#faadb6]"
                  : "border-[#faadb6]/35 bg-[#faadb6]/20 text-[#7E032F]",
              ].join(" ")}
            >
              {announcement.category}
            </span>
          ) : null}
        </div>

        <h3
          className={[
            "mt-4 line-clamp-2 text-[0.98rem] font-black leading-snug md:text-base",
            isDark ? "text-white" : "text-[#064252]",
          ].join(" ")}
        >
          {announcement.title}
        </h3>

        <p
          className={[
            "mt-3 line-clamp-3 text-[0.78rem] font-medium leading-6 md:text-sm",
            isDark ? "text-[#d8eeeb]/72" : "text-[#064252]/65",
          ].join(" ")}
        >
          {announcement.content}
        </p>

        <Link
          to={`/pengumuman/${announcement.slug}`}
          className={[
            "mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-[0.74rem] font-black transition group-hover:gap-2 md:text-xs",
            isDark ? "text-[#faadb6]" : "text-[#7E032F]",
          ].join(" ")}
        >
          Baca Selengkapnya <ArrowRight size={14} />
        </Link>
      </div>

      <div className="relative z-10 hidden shrink-0 items-center sm:flex">
        <div
          className={[
            "grid size-[4.4rem] place-items-center rounded-[1rem] border shadow-[0_14px_32px_rgba(6,66,82,0.16),inset_0_1px_0_rgba(255,255,255,0.56)] backdrop-blur-md transition group-hover:scale-105",
            isPink
              ? "border-[#faadb6]/45 bg-[#faadb6]/58 text-white shadow-[0_14px_34px_rgba(250,173,182,0.34)]"
              : "border-white/55 bg-white/20 text-[#d8eeeb]",
          ].join(" ")}
        >
          {createElement(getAnnouncementIcon(announcement.category), {
            size: 28,
            strokeWidth: 2.1,
          })}
        </div>
      </div>
    </article>
  );
}