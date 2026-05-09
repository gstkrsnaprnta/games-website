import { DataTable } from "../../components/admin/DataTable";
import { getAdminAnnouncements } from "../../services/adminAnnouncements";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState } from "./adminPageUtils";

export function AdminAnnouncementsPage() {
  const { data, error, loading } = useAsyncData(getAdminAnnouncements, []);

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Pengumuman</h1>
      <p className="mt-2 text-sm text-slate-600">Draft dan pengumuman yang sudah diterbitkan.</p>
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada pengumuman." />
      <div className="mt-4">
        <DataTable>
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Judul</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Status</th>
                <th className="p-3">Tanggal Terbit</th>
                <th className="p-3">Lomba</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((announcement) => (
                <tr key={announcement.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold text-slate-950">{announcement.title}</td>
                  <td className="p-3">{announcement.category}</td>
                  <td className="p-3">
                    <span className={announcement.status === "published" ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800" : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"}>
                      {announcement.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-3">{formatDate(announcement.published_at)}</td>
                  <td className="p-3">{announcement.competitions?.name ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </section>
  );
}
