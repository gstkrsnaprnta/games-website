import { DataTable } from "../../components/admin/DataTable";
import { getAdminGalleries } from "../../services/adminGalleries";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

export function AdminGalleriesPage() {
  const { data, error, loading } = useAsyncData(getAdminGalleries, []);

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Galeri</h1>
      <p className="mt-2 text-sm text-slate-600">Daftar foto atau dokumentasi kegiatan.</p>
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada galeri." />
      <div className="mt-4">
        <DataTable>
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Judul</th>
                <th className="p-3">Image URL</th>
                <th className="p-3">Deskripsi</th>
                <th className="p-3">Aktif</th>
                <th className="p-3">Urutan</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((gallery) => (
                <tr key={gallery.id} className="border-t border-slate-100 align-top">
                  <td className="p-3 font-semibold text-slate-950">{gallery.title ?? "-"}</td>
                  <td className="max-w-xs truncate p-3 text-cyan-700">{gallery.image_url}</td>
                  <td className="max-w-md p-3 text-slate-700">{gallery.description ?? "-"}</td>
                  <td className="p-3"><BooleanBadge value={gallery.is_active} /></td>
                  <td className="p-3">{gallery.sort_order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </section>
  );
}
