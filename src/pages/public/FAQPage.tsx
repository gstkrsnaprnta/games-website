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
        {/* Section label */}

        {/* FAQ list */}
        <div>
          {loading ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}
          {!loading && !error && data?.length === 0 ? (
            <EmptyState description="FAQ belum tersedia." />
          ) : null}
          {data && data.length > 0 ? <FAQAccordion items={data} /> : null}
        </div>

        {/* Contact CTA — pakai inner-page-hero style, konsisten dengan halaman inner lainnya */}
        <div className="relative mt-16 overflow-hidden rounded-[2rem] text-center inner-page-hero p-8 md:p-12">
          {/* Dekorasi elemen geometris kecil — mirip competition hero */}
          <div
            className="pointer-events-none absolute right-6 top-6 h-16 w-16 opacity-40"
            style={{
              clipPath: "polygon(52% 8%, 100% 88%, 12% 76%)",
              background:
                "linear-gradient(135deg, rgba(250,173,182,0.5), rgba(126,3,47,0.6))",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 rotate-45 opacity-30"
            style={{
              border: "1.5px solid rgba(194,225,223,0.7)",
              background:
                "linear-gradient(45deg,transparent 45%,rgba(216,238,235,0.7) 46%,rgba(216,238,235,0.7) 54%,transparent 55%),linear-gradient(-45deg,transparent 45%,rgba(216,238,235,0.7) 46%,rgba(216,238,235,0.7) 54%,transparent 55%)",
            }}
          />

          <div className="relative z-10">
            {/* Icon — rounded glass, konsisten dengan stats strip HomePage */}
            <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full border border-white/75 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_6px_18px_rgba(6,68,82,0.12)] backdrop-blur-md">
              <MessageCircle
                size={24}
                className="text-[#7E032F]"
                strokeWidth={2.15}
              />
            </div>

            <p className="text-2xl font-black tracking-[-0.03em] text-[#064452]">
              Pertanyaan belum terjawab?
            </p>
            <p className="mt-2 font-semibold text-[#064452]/65">
              Tim panitia GAMES siap membantu kamu.
            </p>

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
