import { DataTable } from "../../components/admin/DataTable";
import { getAdminFaqs } from "../../services/adminFaqs";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

export function AdminFaqsPage() {
  const { data, error, loading } = useAsyncData(getAdminFaqs, []);

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">FAQ</h1>
      <p className="mt-2 text-sm text-slate-600">Pertanyaan dan jawaban yang tampil di halaman publik.</p>
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada FAQ." />
      <div className="mt-4">
        <DataTable>
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Pertanyaan</th>
                <th className="p-3">Jawaban</th>
                <th className="p-3">Urutan</th>
                <th className="p-3">Aktif</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((faq) => (
                <tr key={faq.id} className="border-t border-slate-100 align-top">
                  <td className="p-3 font-semibold text-slate-950">{faq.question}</td>
                  <td className="max-w-xl p-3 text-slate-700">{faq.answer}</td>
                  <td className="p-3">{faq.sort_order}</td>
                  <td className="p-3"><BooleanBadge value={faq.is_active} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </section>
  );
}
