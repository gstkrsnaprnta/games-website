import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  CalendarDays,
  Check,
  CircleDot,
  Code,
  Download,
  FileText,
  FlaskConical,
  Mail,
  MessageCircle,
  Microscope,
  Rocket,
  ShieldCheck,
  Trophy,
  Users,
  WalletCards,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getCompetitionBySlug } from "../../services/competitions";
import type { Competition, Timeline } from "../../types/models";
import { COMPETITION_DETAILS } from "../../data/competitionDetails";
import { useAsyncData } from "../../utils/useAsyncData";

const iconMap: Record<string, ReactNode> = {
  LCT: <Trophy size={34} />,
  LCTM: <Trophy size={34} />,
  OLIM: <BookOpen size={34} />,
  FIS: <Atom size={34} />,
  KIM: <FlaskConical size={34} />,
  BIO: <Microscope size={34} />,
  KS: <Code size={34} />,
  LKTI: <FileText size={34} />,
  ESAI: <FileText size={34} />,
  CALC: <BookOpen size={34} />,
  MS: <BookOpen size={34} />,
};

// ─── Types ────────────────────────────────────────────────────────────────────

type DetailTimeline = {
  title: string;
  dateLabel: string; // sudah diformat, siap tampil
  description?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DATE_FMT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", DATE_FMT);
}

/** Buat label tanggal dari start_date + end_date opsional. */
function buildDateLabel(start: string, end: string | null): string {
  const startLabel = formatDate(start);
  if (!end || end === start) return startLabel;
  // Jika bulan+tahun sama, cukup tampilkan "1 - 10 Juni 2026"
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return `${startDate.getDate()} - ${formatDate(end)}`;
  }
  return `${startLabel} – ${formatDate(end)}`;
}

/** Ubah array Timeline dari DB ke DetailTimeline untuk tampilan. */
function toDetailTimelines(timelines: Timeline[]): DetailTimeline[] {
  return timelines.map((t) => ({
    title: t.title,
    dateLabel: buildDateLabel(t.start_date, t.end_date),
    description: t.description ?? undefined,
  }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function CompetitionDetailPage() {
  const { slug } = useParams();
  const {
    data: competition,
    error,
    loading,
  } = useAsyncData(() => getCompetitionBySlug(slug ?? ""), [slug]);

  if (loading) {
    return (
      <section className="container-hero py-28">
        <LoadingState />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-hero py-28">
        <ErrorState message={error} />
      </section>
    );
  }

  if (!competition) {
    return (
      <section className="container-hero py-28">
        <EmptyState title="Lomba tidak ditemukan" />
      </section>
    );
  }

  const resolvedTimelines =
    Array.isArray(competition.timelines) && competition.timelines.length > 0
      ? toDetailTimelines(competition.timelines)
      : undefined;

  const resolvedStages =
    Array.isArray(competition.stages) && competition.stages.length > 0
      ? competition.stages.map((s) => ({
          title: s.title,
          description: s.description ?? "",
        }))
      : undefined;

  let detail = COMPETITION_DETAILS[competition.slug];

  if (!detail) {
    console.warn(
      `Warning: Detail lomba untuk slug "${competition.slug}" tidak ditemukan di master data COMPETITION_DETAILS. Menggunakan fallback.`
    );

    const typeLabel = competition.competition_type === "team" ? "tim" : "peserta";
    const fallbackPhone = "0822-5941-9645";
    const fallbackEmail = "hmpsmath.fmipauho@gmail.com";
    const fallbackInstagram = "@games.uho";

    detail = {
      slug: competition.slug,
      code: competition.code,
      fullName: competition.name,
      category: (competition.name.toLowerCase().includes("nasional") || competition.slug.toLowerCase().includes("nasional")) ? "Nasional" : "Regional",
      participantLevels: competition.participant_levels ?? ["Umum"],
      participationMode: competition.competition_type ?? "individual",
      memberLimits: { min: competition.min_members ?? 1, max: competition.max_members ?? 1 },
      shortDescription: competition.short_description ?? "Kompetisi matematika dan sains tingkat nasional untuk mengasah kemampuan berpikir kritis, logis, dan kreatif.",
      description: competition.description ?? "Kompetisi matematika dan sains tingkat nasional untuk mengasah kemampuan berpikir kritis, logis, dan kreatif.",
      requirements: [
        `Peserta mendaftar sebagai ${typeLabel} sesuai cabang lomba yang dipilih.`,
        "Peserta mengisi formulir pendaftaran dengan data yang benar.",
        "Peserta melampirkan berkas yang diminta oleh panitia.",
        "Peserta membayar biaya pendaftaran sesuai ketentuan.",
        "Peserta wajib mengikuti tata tertib lomba."
      ],
      requiredUploads: [
        "Scan kartu identitas pelajar/KTM yang masih berlaku",
        "Bukti pembayaran pendaftaran"
      ],
      materials: [],
      stages: [
        { title: "Pendaftaran", description: "Peserta mengisi formulir dan melengkapi persyaratan." },
        { title: "Verifikasi", description: "Panitia memeriksa data peserta dan bukti pembayaran." },
        { title: "Pelaksanaan", description: "Peserta mengikuti lomba sesuai jadwal cabang lomba." },
        { title: "Pengumuman", description: "Pemenang diumumkan melalui website dan kanal resmi." }
      ],
      mechanisms: [
        {
          title: "Sistem Pelaksanaan",
          items: [
            "Lomba dilaksanakan sesuai format yang ditentukan panitia.",
            "Peserta wajib hadir tepat waktu pada sesi yang telah dijadwalkan.",
            "Peserta mengikuti instruksi teknis yang disampaikan saat technical meeting."
          ]
        }
      ],
      timelines: [
        {
          title: "Pelaksanaan Lomba",
          dateLabel: "Sesuai jadwal resmi panitia",
          description: "Jadwal dan tata tertib lengkap dapat diunduh di panduan teknis."
        }
      ],
      fees: [
        {
          label: "Biaya Pendaftaran",
          period: "Periode Pendaftaran",
          price: formatCurrency(competition.registration_fee ?? 0, competition.competition_type ?? "individual")
        }
      ],
      contactPersons: [
        {
          name: "Panitia GAMES",
          phone: fallbackPhone,
          waUrl: `https://wa.me/${fallbackPhone.replace(/\D/g, "")}`
        }
      ],
      downloads: [
        {
          title: `Panduan Teknis ${competition.name}`,
          meta: "PDF · Diperbarui panitia",
          url: competition.guidebook_url
        }
      ],
      faq: [],
      generalContacts: {
        phone: fallbackPhone,
        email: fallbackEmail,
        instagram: fallbackInstagram
      }
    };
  }

  const finalTimelines = resolvedTimelines;
  const finalStages = resolvedStages;
  const finalMechanisms =
    Array.isArray(competition.mechanisms) && competition.mechanisms.length > 0
      ? competition.mechanisms.map((m) => ({
          title: m.title,
          items: m.items,
        }))
      : undefined;
  const isOpen = competition.registration_status === "open";
  const priceLabel = formatCurrency(
    competition.registration_fee,
    competition.competition_type,
  );

  return (
    <main className="container-hero pb-14 pt-28 md:pb-18 md:pt-32">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/lomba"
          className="inline-grid size-11 place-items-center rounded-full border border-white/80 bg-white/62 text-[#064452] shadow-[0_14px_32px_rgba(6,68,82,0.12),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl transition hover:-translate-x-1 hover:bg-white/85"
          aria-label="Kembali ke daftar lomba"
        >
          <ArrowLeft size={19} />
        </Link>
      </div>

      {/* Header */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.86)_0%,rgba(248,240,231,0.78)_44%,rgba(216,238,235,0.34)_100%)] px-6 py-8 text-center shadow-[0_22px_58px_rgba(6,68,82,0.12),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-[26px] md:rounded-[2.4rem] md:px-10 md:py-10">
        <div className="pointer-events-none absolute -right-20 top-0 size-64 rounded-full bg-[#c2e1df]/28 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 size-64 rounded-full bg-[#f8f0e7]/70 blur-3xl" />

        <div className="relative z-10">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-[#7E032F] to-[#a60b3a] text-white shadow-[0_22px_50px_rgba(126,3,47,0.28)] md:size-24">
            {iconMap[competition.code] ?? <BookOpen size={34} />}
          </div>

          <div className="mt-5 flex justify-center">
            <span
              className={
                isOpen
                  ? "rounded-full border border-[#c2e1df]/70 bg-[#c2e1df]/60 px-4 py-2 text-xs font-black text-[#064452]"
                  : "rounded-full border border-stone-200 bg-stone-100/80 px-4 py-2 text-xs font-black text-stone-600"
              }
            >
              {isOpen ? "Pendaftaran Dibuka" : "Pendaftaran Ditutup"}
            </span>
          </div>

          <h1 className="games-display mx-auto mt-5 max-w-3xl text-[2.15rem] font-black leading-tight tracking-[-0.04em] text-[#064452] md:text-5xl">
            {competition.name}
          </h1>

          <p className="mx-auto mt-2 max-w-3xl text-base font-bold leading-7 text-[#064452]/72 md:text-lg">
            {detail.description}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {detail.participantLevels?.map((level) => (
              <span
                key={level}
                className="rounded-full border border-[#faadb6]/45 bg-[#faadb6]/24 px-4 py-2 text-xs font-black text-[#7E032F]"
              >
                {level}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/85 bg-white/62 px-4 py-2 text-xs font-black text-[#064452]">
              <Users size={13} />
              {detail.participationMode === "team" ? "Tim" : "Individu"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/85 bg-white/62 px-4 py-2 text-xs font-black text-[#064452]">
              <WalletCards size={13} />
              {priceLabel}
            </span>
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            {isOpen ? (
              <Link
                to="/daftar"
                className="btn-glossy-maroon inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-black text-white"
              >
                Daftar Sekarang <Rocket size={16} />
              </Link>
            ) : null}
            <a
              href={competition.guidebook_url || (detail.downloads && detail.downloads[0]?.url) || "https://drive.google.com/drive/folders/1m79FvIwAUj5De740G9i0EMVVk2Iz7Cnc"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-outline inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-black text-[#064452]"
            >
              Unduh Panduan <Download size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Quick info cards */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          icon={<Users size={20} />}
          label="Jenjang Peserta"
          value={detail.participantLevels.join(", ") || "-"}
        />
        <InfoCard
          icon={<Users size={20} />}
          label="Tipe Peserta"
          value={
            detail.participationMode === "team"
              ? `Tim (${detail.memberLimits.min}-${detail.memberLimits.max} orang)`
              : "Individu"
          }
        />
        <InfoCard
          icon={<WalletCards size={20} />}
          label="Biaya Pendaftaran"
          value={priceLabel}
        />
      </section>

      {/* Content sections */}
      <div className="mt-7 grid gap-6">
        {/* Timeline */}
        {competition.show_timeline !== false && finalTimelines && finalTimelines.length > 0 && (
          <DetailSection
            icon={<CalendarDays size={21} />}
            title="Timeline Kompetisi"
          >
            <div className="relative mt-5 space-y-4">
              <div className="absolute bottom-5 left-[1.03rem] top-5 w-px rounded-full bg-gradient-to-b from-[#c2e1df] via-[#9fd8d4] to-[#7E032F]/55" />
              {finalTimelines.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="relative flex gap-4"
                >
                  <div className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-white/85 bg-white/75 shadow-sm">
                    <div className="size-2.5 rounded-full bg-[#0b5a63]" />
                  </div>
                  <div className="min-w-0 pb-2">
                    <h3 className="text-sm font-black text-[#064452]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-bold text-[#064452]/55">
                      {item.dateLabel}
                    </p>
                    {item.description ? (
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#064452]/72">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </DetailSection>
        )}

        {/* Tahapan */}
        {competition.show_stages !== false && finalStages && finalStages.length > 0 && (
          <DetailSection icon={<CircleDot size={21} />} title="Tahapan Kompetisi">
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {finalStages.map((stage, index) => (
                <div
                  key={`${stage.title}-${index}`}
                  className="flex gap-4 rounded-2xl border border-white/75 bg-white/52 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                >
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#c2e1df]/70 text-sm font-black text-[#064452]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-black text-[#064452]">{stage.title}</h3>
                    {stage.description ? (
                      <p className="mt-1 text-sm font-semibold leading-6 text-[#064452]/68">
                        {stage.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </DetailSection>
        )}

        {/* Silabus / Subtema */}
        {detail.syllabus && detail.syllabus.length > 0 ? (
          <DetailSection icon={<BookOpen size={21} />} title="Materi / Silabus Lomba">
            <div className="mt-5 space-y-6">
              {detail.syllabus.map((category) => (
                <div
                  key={category.title}
                  className="rounded-2xl border border-white/75 bg-white/48 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                >
                  <h3 className="font-black text-[#064452] border-b border-[#0b5a63]/15 pb-2 mb-3">
                    {category.title}
                  </h3>
                  <ul className="grid gap-3 text-sm font-semibold leading-6 text-[#064452]/72 sm:grid-cols-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <span className="text-[#0b5a63] font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DetailSection>
        ) : (
          detail.materials && detail.materials.length > 0 && (
            <DetailSection
              icon={<BookOpen size={21} />}
              title={
                detail.code === "LKTI" || detail.code === "ESAI"
                  ? "Subtema Lomba"
                  : "Materi / Silabus Lomba"
              }
            >
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {detail.materials.map((material) => (
                  <div
                    key={material}
                    className="flex items-center gap-3 rounded-2xl border border-white/75 bg-white/50 px-4 py-3 text-sm font-black text-[#064452] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                  >
                    <div className="size-2 rounded-full bg-[#0b5a63] shrink-0" />
                    <span>{material}</span>
                  </div>
                ))}
              </div>
            </DetailSection>
          )
        )}

        {/* Mekanisme */}
        {competition.show_mechanisms !== false && finalMechanisms && finalMechanisms.length > 0 && (
          <DetailSection icon={<Trophy size={21} />} title="Mekanisme Lomba">
            <div className="mt-5 grid gap-4">
              {finalMechanisms.map((mechanism) => (
                <article
                  key={mechanism.title}
                  className="rounded-2xl border border-white/75 bg-white/48 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                >
                  <h3 className="font-black text-[#064452]">{mechanism.title}</h3>
                  <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-[#064452]/72">
                    {mechanism.items.map((item, idx) => (
                      <li key={`${item}-${idx}`} className="flex gap-3">
                        <Check
                          size={16}
                          className="mt-1 shrink-0 text-[#0b5a63]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </DetailSection>
        )}

        {/* Ketentuan Hasil Karya */}
        {detail.rules && detail.rules.length > 0 && (
          <DetailSection icon={<ShieldCheck size={21} />} title="Ketentuan Hasil Karya">
            <ul className="mt-5 grid gap-3 text-sm font-semibold leading-7 text-[#064452]/74">
              {detail.rules.map((rule, idx) => (
                <li key={idx} className="flex gap-3">
                  <Check size={18} className="mt-1 shrink-0 text-[#0b5a63]" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </DetailSection>
        )}

        {/* Persyaratan */}
        <DetailSection icon={<ShieldCheck size={21} />} title="Persyaratan">
          <div className="mt-5 space-y-6">
            <div>
              <h3 className="text-sm font-black text-[#064452] uppercase tracking-wider mb-3">Ketentuan Peserta</h3>
              <ul className="grid gap-3 text-sm font-semibold leading-7 text-[#064452]/74">
                {detail.requirements.map((rule) => (
                  <li key={rule} className="flex gap-3">
                    <Check size={18} className="mt-1 shrink-0 text-[#0b5a63]" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            {detail.requiredUploads && detail.requiredUploads.length > 0 && (
              <div>
                <h3 className="text-sm font-black text-[#064452] uppercase tracking-wider mb-3">Berkas yang Wajib Diunggah</h3>
                <ul className="grid gap-3 text-sm font-semibold leading-7 text-[#064452]/74">
                  {detail.requiredUploads.map((file) => (
                    <li key={file} className="flex gap-3">
                      <Check size={18} className="mt-1 shrink-0 text-[#0b5a63]" />
                      <span>{file}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DetailSection>

        {/* Sistematika Penulisan */}
        {detail.writingSystem && (
          <DetailSection icon={<FileText size={21} />} title="Sistematika Penulisan Naskah">
            <div className="mt-5 space-y-6 text-left">
              {detail.writingSystem.abstract && detail.writingSystem.abstract.length > 0 && (
                <div>
                  <h3 className="text-sm font-black text-[#064452] uppercase tracking-wider mb-3">
                    {detail.code === "ESAI" ? "Format Penulisan Naskah Esai" : "Format Penulisan Abstrak"}
                  </h3>
                  <ul className="grid gap-2 text-sm font-semibold leading-6 text-[#064452]/74">
                    {detail.writingSystem.abstract.map((item, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <span className="text-[#0b5a63] font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {detail.writingSystem.initial && detail.writingSystem.initial.length > 0 && (
                <div>
                  <h3 className="text-sm font-black text-[#064452] uppercase tracking-wider mb-3">
                    {detail.code === "ESAI" ? "Format Penulisan Essay Bagian Awal" : "Karya Tulis Ilmiah (Bagian Awal)"}
                  </h3>
                  <ul className="grid gap-2 text-sm font-semibold leading-6 text-[#064452]/74">
                    {detail.writingSystem.initial.map((item, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <span className="text-[#0b5a63] font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {detail.writingSystem.core && detail.writingSystem.core.length > 0 && (
                <div>
                  <h3 className="text-sm font-black text-[#064452] uppercase tracking-wider mb-3">
                    {detail.code === "ESAI" ? "Format Penulisan Essay Bagian Inti" : "Karya Tulis Ilmiah (Bagian Inti)"}
                  </h3>
                  <ul className="grid gap-2 text-sm font-semibold leading-6 text-[#064452]/74">
                    {detail.writingSystem.core.map((item, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <span className="text-[#0b5a63] font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {detail.writingSystem.requirements && detail.writingSystem.requirements.length > 0 && (
                <div>
                  <h3 className="text-sm font-black text-[#064452] uppercase tracking-wider mb-3">Persyaratan Penulisan</h3>
                  <ul className="grid gap-2 text-sm font-semibold leading-6 text-[#064452]/74">
                    {detail.writingSystem.requirements.map((item, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <span className="text-[#0b5a63] font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DetailSection>
        )}

        {/* Biaya */}
        <DetailSection
          icon={<WalletCards size={21} />}
          title="Biaya Pendaftaran"
        >
          <div className="mt-5 grid gap-3">
            {detail.fees.map((fee) => (
              <div
                key={fee.label}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/75 bg-white/50 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
              >
                <div>
                  <h3 className="font-black text-[#064452]">{fee.label}</h3>
                  {fee.period ? (
                    <p className="mt-1 text-xs font-semibold text-[#064452]/58">
                      {fee.period}
                    </p>
                  ) : null}
                </div>
                <p className="text-sm font-black text-[#7E032F]">{fee.price}</p>
              </div>
            ))}
          </div>
        </DetailSection>

        {/* Kontak */}
        <DetailSection
          icon={<MessageCircle size={21} />}
          title="Kontak Panitia"
        >
          <div className="mt-5 grid gap-3 text-sm font-semibold text-[#064452]/74 text-left">
            {detail.contactPersons.map((cp) => (
              <a
                key={cp.name}
                href={cp.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/45 px-4 py-3 hover:bg-white/60 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#0b5a63]"><MessageCircle size={17} /></span>
                  <span>{cp.name} ({cp.phone})</span>
                </div>
                <span className="text-xs font-black text-[#0b5a63] uppercase">Hubungi WA</span>
              </a>
            ))}
            {detail.generalContacts.email && (
              <ContactRow icon={<Mail size={17} />} value={detail.generalContacts.email} />
            )}
            {detail.generalContacts.instagram && (
              <ContactRow
                icon={<MessageCircle size={17} />}
                value={detail.generalContacts.instagram}
              />
            )}
          </div>
        </DetailSection>

        {/* FAQ */}
        {detail.faq && detail.faq.length > 0 && (
          <DetailSection icon={<BookOpen size={21} />} title="FAQ (Tanya Jawab)">
            <div className="mt-5 space-y-4">
              {detail.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/75 bg-white/48 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                >
                  <h3 className="font-black text-[#064452]">{item.question}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#064452]/72">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </DetailSection>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden rounded-[1.8rem] border border-white/90 bg-[linear-gradient(90deg,rgba(194,225,223,0.5)_0%,rgba(248,240,231,0.78)_42%,rgba(255,255,255,0.9)_100%)] p-6 shadow-[0_18px_44px_rgba(6,68,82,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[24px] md:p-8">
          <div className="relative z-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="games-display text-2xl font-black leading-tight text-[#7E032F]">
                Siap untuk bergabung?
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#064452]/72">
                Daftarkan tim atau dirimu sekarang dan raih prestasi terbaik di
                GAMES 2026.
              </p>
            </div>
            {isOpen ? (
              <Link
                to="/daftar"
                className="btn-glossy-maroon inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-black text-white"
              >
                Daftar Sekarang <ArrowRight size={16} />
              </Link>
            ) : (
              <span className="inline-flex h-12 items-center justify-center rounded-full bg-white/60 px-8 text-sm font-black text-[#064452]/55">
                Pendaftaran Ditutup
              </span>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DetailSection({
  id,
  icon,
  title,
  children,
}: {
  id?: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-[1.6rem] border border-white/88 bg-white/62 p-5 shadow-[0_16px_38px_rgba(6,68,82,0.09),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-[22px] md:p-7"
    >
      <div className="flex items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#c2e1df]/55 text-[#064452]">
          {icon}
        </div>
        <h2 className="text-xl font-black text-[#064452]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-[1.35rem] border border-white/88 bg-white/62 p-5 shadow-[0_14px_34px_rgba(6,68,82,0.08),inset_0_1px_0_rgba(255,255,255,0.94)] backdrop-blur-[22px]">
      <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/75 bg-white/62 text-[#064452] shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#064452]/50">
          {label}
        </p>
        <p className="mt-1 text-sm font-black text-[#064452]">{value}</p>
      </div>
    </div>
  );
}

function ContactRow({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/45 px-4 py-3">
      <span className="text-[#0b5a63]">{icon}</span>
      <span>{value}</span>
    </div>
  );
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatCurrency(value: number, type: Competition["competition_type"]) {
  if (value <= 0) return "Gratis";
  return `${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value)} / ${type === "team" ? "tim" : "peserta"}`;
}