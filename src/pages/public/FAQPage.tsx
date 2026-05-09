import { FAQAccordion } from "../../components/public/FAQAccordion";
import { PageHero } from "../../components/public/PageHero";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getFaqs } from "../../services/faqs";
import { useAsyncData } from "../../utils/useAsyncData";

export function FAQPage() {
  const { data, error, loading } = useAsyncData(getFaqs, []);

  return (
    <>
      <PageHero eyebrow="FAQ" title="Pertanyaan yang sering ditanyakan" description="Temukan jawaban singkat tentang pendaftaran, status peserta, dan informasi umum GAMES." />
      <section className="container-page max-w-4xl py-12">
        <div>
          {loading ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}
          {!loading && !error && data?.length === 0 ? <EmptyState description="FAQ belum tersedia." /> : null}
          {data && data.length > 0 ? <FAQAccordion items={data} /> : null}
        </div>
        <div className="mt-8 rounded-[1.6rem] bg-[#c2e1df]/50 p-6 text-center">
          <p className="font-bold text-[#004551]">Pertanyaan belum terjawab?</p>
          <a href="/kontak" className="mt-3 inline-flex rounded-full bg-[#770525] px-5 py-3 text-sm font-black text-white">Hubungi Panitia</a>
        </div>
      </section>
    </>
  );
}
