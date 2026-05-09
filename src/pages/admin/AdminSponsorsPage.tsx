import { DataTable } from "../../components/admin/DataTable";
import { getAdminSponsors } from "../../services/adminSponsors";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

export function AdminSponsorsPage() {
  const { data, error, loading } = useAsyncData(getAdminSponsors, []);

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Sponsor dan Media Partner</h1>
      <p className="mt-2 text-sm text-slate-600">Daftar sponsor dan media partner event.</p>
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada sponsor atau media partner." />
      <div className="mt-4">
        <DataTable>
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Nama</th>
                <th className="p-3">Tipe</th>
                <th className="p-3">Website</th>
                <th className="p-3">Aktif</th>
                <th className="p-3">Urutan</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((sponsor) => (
                <tr key={sponsor.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold text-slate-950">{sponsor.name}</td>
                  <td className="p-3">{sponsor.sponsor_type}</td>
                  <td className="p-3">{sponsor.website_url ?? "-"}</td>
                  <td className="p-3"><BooleanBadge value={sponsor.is_active} /></td>
                  <td className="p-3">{sponsor.sort_order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </section>
  );
}
