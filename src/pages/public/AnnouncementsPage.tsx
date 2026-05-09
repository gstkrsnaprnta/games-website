import { AnnouncementCard } from "../../components/public/AnnouncementCard";
import { sampleAnnouncements } from "./sampleData";

export function AnnouncementsPage() {
  return <section className="container-page py-10"><h1 className="text-3xl font-black">Pengumuman</h1><div className="mt-8 grid gap-4 md:grid-cols-2">{sampleAnnouncements.map((item) => <AnnouncementCard key={item.id} announcement={item} />)}</div></section>;
}
