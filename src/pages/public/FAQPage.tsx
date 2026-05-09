import { FAQAccordion } from "../../components/public/FAQAccordion";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getFaqs } from "../../services/faqs";
import { useAsyncData } from "../../utils/useAsyncData";

export function FAQPage() {
  const { data, error, loading } = useAsyncData(getFaqs, []);

  return (
    <section className="container-page py-10">
      <h1 className="text-3xl font-black">FAQ</h1>
      <div className="mt-8">
        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && data?.length === 0 ? <EmptyState description="FAQ belum tersedia." /> : null}
        {data && data.length > 0 ? <FAQAccordion items={data} /> : null}
      </div>
    </section>
  );
}
