import { FAQAccordion } from "../../components/public/FAQAccordion";
import { sampleFaqs } from "./sampleData";

export function FAQPage() {
  return <section className="container-page py-10"><h1 className="text-3xl font-black">FAQ</h1><div className="mt-8"><FAQAccordion items={sampleFaqs} /></div></section>;
}
