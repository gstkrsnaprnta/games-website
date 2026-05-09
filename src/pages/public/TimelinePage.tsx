import { TimelineItem } from "../../components/public/TimelineItem";
import { sampleTimelines } from "./sampleData";

export function TimelinePage() {
  return <section className="container-page py-10"><h1 className="text-3xl font-black">Timeline</h1><div className="mt-8 grid gap-5">{sampleTimelines.map((item) => <TimelineItem key={item.id} item={item} />)}</div></section>;
}
