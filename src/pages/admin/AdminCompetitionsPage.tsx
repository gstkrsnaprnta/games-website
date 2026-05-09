import { DataTable } from "../../components/admin/DataTable";
import { getAdminCompetitions } from "../../services/adminCompetitions";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

export function AdminCompetitionsPage() {
  const { data, error, loading } = useAsyncData(getAdminCompetitions, []);

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Lomba</h1>
      <p className="mt-2 text-sm text-slate-600">Semua cabang lomba, termasuk yang nonaktif atau pendaftaran tertutup.</p>
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada lomba." />
      <div className="mt-4">
        <DataTable>
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Nama</th>
                <th className="p-3">Kode</th>
                <th className="p-3">Jenjang</th>
                <th className="p-3">Status Pendaftaran</th>
                <th className="p-3">Aktif</th>
                <th className="p-3">Biaya</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((competition) => (
                <tr key={competition.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold text-slate-950">{competition.name}</td>
                  <td className="p-3 font-bold text-cyan-700">{competition.code}</td>
                  <td className="p-3">{competition.participant_levels?.join(", ") || "-"}</td>
                  <td className="p-3">
                    <span className={competition.registration_status === "open" ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800" : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"}>
                      {competition.registration_status === "open" ? "Buka" : "Tutup"}
                    </span>
                  </td>
                  <td className="p-3"><BooleanBadge value={competition.is_active} /></td>
                  <td className="p-3">Rp{competition.registration_fee.toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </section>
  );
}
