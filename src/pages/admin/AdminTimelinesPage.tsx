import { DataTable } from "../../components/admin/DataTable";
import { getAdminTimelines } from "../../services/adminTimelines";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

export function AdminTimelinesPage() {
  const { data, error, loading } = useAsyncData(getAdminTimelines, []);

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Timeline</h1>
      <p className="mt-2 text-sm text-slate-600">Semua agenda event dan agenda per lomba.</p>
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada timeline." />
      <div className="mt-4">
        <DataTable>
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Judul</th>
                <th className="p-3">Mulai</th>
                <th className="p-3">Selesai</th>
                <th className="p-3">Lomba</th>
                <th className="p-3">Aktif</th>
                <th className="p-3">Urutan</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold text-slate-950">{item.title}</td>
                  <td className="p-3">{formatDate(item.start_date)}</td>
                  <td className="p-3">{formatDate(item.end_date)}</td>
                  <td className="p-3">{item.competitions?.name ?? "-"}</td>
                  <td className="p-3"><BooleanBadge value={item.is_active} /></td>
                  <td className="p-3">{item.sort_order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </section>
  );
}
