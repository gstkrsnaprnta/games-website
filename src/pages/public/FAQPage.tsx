import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
      <PageHero
        eyebrow="FAQ"
        title="Pertanyaan yang sering ditanyakan"
        description="Temukan jawaban singkat tentang pendaftaran, status peserta, dan informasi umum GAMES."
      />
      <section className="container-page max-w-3xl py-14">
        <div>
          {loading ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}
          {!loading && !error && data?.length === 0 ? <EmptyState description="FAQ belum tersedia." /> : null}
          {data && data.length > 0 ? <FAQAccordion items={data} /> : null}
        </div>

        {/* Contact CTA */}
        <div className="glass-panel mt-16 rounded-[2rem] p-8 text-center md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#c2e1df]/20" />
          <div className="relative z-10">
            <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-white shadow-sm text-[#004551]">
              <MessageCircle size={24} />
            </div>
            <p className="text-2xl font-black text-[#004551]">Pertanyaan belum terjawab?</p>
            <p className="mt-2 text-base text-[#004551]/60">Tim panitia GAMES siap membantu kamu.</p>
            <Link
              to="/kontak"
              className="btn-glossy-maroon mt-6 inline-flex rounded-full px-8 py-3.5 text-sm font-black text-white"
            >
              Hubungi Panitia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
