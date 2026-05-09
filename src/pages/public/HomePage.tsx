import { AnnouncementCard } from "../../components/public/AnnouncementCard";
import { CompetitionCard } from "../../components/public/CompetitionCard";
import { HeroSection } from "../../components/public/HeroSection";
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
      <section className="container-page py-10">
        {event.loading ? <LoadingState label="Memuat event aktif..." /> : null}
        {event.error ? <ErrorState message={event.error} /> : null}
        {!event.loading && !event.error && !event.data ? <EmptyState description="Event aktif belum dipilih." /> : null}
        {event.data ? (
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <p className="font-bold text-cyan-700">{event.data.year}</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{event.data.name}</h2>
            {event.data.theme ? <p className="mt-2 font-semibold text-slate-700">{event.data.theme}</p> : null}
            {event.data.description ? <p className="mt-3 max-w-3xl leading-7 text-slate-600">{event.data.description}</p> : null}
          </div>
        ) : null}
      </section>
      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-700">Cabang lomba</p>
            <h2 className="text-2xl font-black text-slate-950">Lomba aktif GAMES</h2>
          </div>
        </div>
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
      <section className="bg-slate-100 py-12">
        <div className="container-page grid gap-8 md:grid-cols-2">
          <div>
            <p className="font-bold text-cyan-700">Timeline</p>
            <h2 className="text-2xl font-black text-slate-950">Agenda terdekat</h2>
            <div className="mt-6 grid gap-5">
              {timelines.loading ? <LoadingState /> : null}
              {timelines.error ? <ErrorState message={timelines.error} /> : null}
              {!timelines.loading && !timelines.error && timelines.data?.length === 0 ? <EmptyState /> : null}
              {timelines.data?.slice(0, 3).map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-cyan-700">Pengumuman</p>
            <h2 className="text-2xl font-black text-slate-950">Informasi terbaru</h2>
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
    </>
  );
}
