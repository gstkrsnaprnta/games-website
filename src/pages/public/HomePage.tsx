import { AnnouncementCard } from "../../components/public/AnnouncementCard";
import { CompetitionCard } from "../../components/public/CompetitionCard";
import { HeroSection } from "../../components/public/HeroSection";
import { TimelineItem } from "../../components/public/TimelineItem";
import { sampleAnnouncements, sampleCompetitions, sampleTimelines } from "./sampleData";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-700">Cabang lomba</p>
            <h2 className="text-2xl font-black text-slate-950">Lomba aktif GAMES</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {sampleCompetitions.slice(0, 3).map((competition) => (
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
              {sampleTimelines.slice(0, 3).map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-cyan-700">Pengumuman</p>
            <h2 className="text-2xl font-black text-slate-950">Informasi terbaru</h2>
            <div className="mt-6 grid gap-4">
              {sampleAnnouncements.slice(0, 2).map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
