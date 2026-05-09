import { AnnouncementCard } from "../../components/public/AnnouncementCard";
import { CompetitionCard } from "../../components/public/CompetitionCard";
import { HeroSection } from "../../components/public/HeroSection";
import { SectionHeading } from "../../components/public/SectionHeading";
import { TimelineItem } from "../../components/public/TimelineItem";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getAnnouncements } from "../../services/announcements";
import { getCompetitions } from "../../services/competitions";
import { getActiveEvent } from "../../services/events";
import { getTimelines } from "../../services/timelines";
import { useAsyncData } from "../../utils/useAsyncData";

export function HomePage() {
  const event = useAsyncData(getActiveEvent, []);
  const competitions = useAsyncData(getCompetitions, []);
  const timelines = useAsyncData(getTimelines, []);
  const announcements = useAsyncData(getAnnouncements, []);

  return (
    <>
      <HeroSection />
      <section className="container-page grid gap-4 py-8 md:grid-cols-4">
        {[
          ["5+", "Cabang Lomba"],
          ["SD-Mahasiswa", "Jenjang Peserta"],
          ["Nasional", "Cakupan Event"],
          ["Tahunan", "Program Edukasi"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[1.5rem] border border-[#004551]/10 bg-white/70 p-5 text-center shadow-sm">
            <p className="text-2xl font-black text-[#770525]">{value}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#004551]/65">{label}</p>
          </div>
        ))}
      </section>
      <section className="container-page py-12">
        {event.loading ? <LoadingState label="Memuat event aktif..." /> : null}
        {event.error ? <ErrorState message={event.error} /> : null}
        {!event.loading && !event.error && !event.data ? <EmptyState description="Event aktif belum dipilih." /> : null}
        {event.data ? (
          <div className="grid gap-8 rounded-[2rem] bg-[#004551] p-6 text-white md:grid-cols-[0.85fr_1.15fr] md:p-10">
            <div className="games-blob grid min-h-52 place-items-center bg-[#faadb6] p-8 text-center text-[#770525]">
              <div>
                <p className="text-6xl font-black">{event.data.year}</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.24em]">Event Aktif</p>
              </div>
            </div>
            <div className="self-center">
              <p className="font-black text-[#faadb6]">Tentang GAMES</p>
              <h2 className="mt-2 text-3xl font-black md:text-5xl">{event.data.name}</h2>
              {event.data.theme ? <p className="mt-3 font-bold text-[#c2e1df]">{event.data.theme}</p> : null}
              {event.data.description ? <p className="mt-4 max-w-3xl leading-8 text-white/75">{event.data.description}</p> : null}
            </div>
          </div>
        ) : null}
      </section>
      <section className="container-page py-12">
        <SectionHeading eyebrow="Cabang lomba" title="Pilih tantangan terbaikmu" description="Dari adu cepat matematika sampai karya ilmiah, setiap cabang dirancang untuk menguji strategi, logika, dan keberanian tampil." />
        <div className="grid gap-4 md:grid-cols-3">
          {competitions.loading ? <LoadingState /> : null}
          {competitions.error ? <ErrorState message={competitions.error} /> : null}
          {!competitions.loading && !competitions.error && competitions.data?.length === 0 ? (
            <EmptyState description="Lomba aktif belum tersedia." />
          ) : null}
          {competitions.data?.slice(0, 3).map((competition) => (
            <CompetitionCard key={competition.id} competition={competition} />
          ))}
        </div>
      </section>
      <section className="bg-[#c2e1df]/45 py-14">
        <div className="container-page grid gap-8 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Timeline" title="Agenda terdekat" />
            <div className="mt-6 grid gap-5">
              {timelines.loading ? <LoadingState /> : null}
              {timelines.error ? <ErrorState message={timelines.error} /> : null}
              {!timelines.loading && !timelines.error && timelines.data?.length === 0 ? <EmptyState /> : null}
              {timelines.data?.slice(0, 3).map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Pengumuman" title="Informasi terbaru" />
            <div className="mt-6 grid gap-4">
              {announcements.loading ? <LoadingState /> : null}
              {announcements.error ? <ErrorState message={announcements.error} /> : null}
              {!announcements.loading && !announcements.error && announcements.data?.length === 0 ? <EmptyState /> : null}
              {announcements.data?.slice(0, 2).map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="container-page py-16">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#770525] to-[#004551] p-8 text-center text-white md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#faadb6]">Siap bertanding?</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Daftarkan tim atau dirimu di GAMES 2026</h2>
          <a href="/daftar" className="games-button mt-8 inline-flex rounded-full bg-white px-6 py-4 font-black text-[#770525]">Daftar Sekarang</a>
        </div>
      </section>
    </>
  );
}
