import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import { deactivateAdminGallery, getAdminGalleries, saveAdminGallery, type AdminGalleryRow } from "../../services/adminGalleries";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

type GalleryForm = {
  id?: string;
  title: string;
  image_url: string;
  description: string;
  sort_order: string;
  is_active: boolean;
};

const emptyForm: GalleryForm = {
  title: "",
  image_url: "",
  description: "",
  sort_order: "0",
  is_active: true,
};

export function AdminGalleriesPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminGalleries, []);
  const [form, setForm] = useState<GalleryForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  function editGallery(gallery: AdminGalleryRow) {
    setForm({
      id: gallery.id,
      title: gallery.title ?? "",
      image_url: gallery.image_url,
      description: gallery.description ?? "",
      sort_order: String(gallery.sort_order),
      is_active: gallery.is_active,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (!form.image_url.trim()) {
      setFormError("Image URL wajib diisi.");
      return;
    }
    setSaving(true);
    const { error: saveError } = await saveAdminGallery(
      {
        title: form.title.trim() || null,
        image_url: form.image_url.trim(),
        description: form.description.trim() || null,
        sort_order: Number(form.sort_order || 0),
        is_active: form.is_active,
      },
      form.id,
    );
    setSaving(false);
    if (saveError) {
      setFormError(saveError.message);
      return;
    }
    setForm(emptyForm);
    reload();
  }

  async function handleDeactivate(id: string) {
    if (!confirm("Nonaktifkan galeri ini?")) return;
    const { error: updateError } = await deactivateAdminGallery(id);
    if (updateError) setFormError(updateError.message);
    reload();
  }

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Galeri</h1>
      <p className="mt-2 text-sm text-slate-600">Daftar foto atau dokumentasi kegiatan.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
        <FormInput label="Judul" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
        <FormInput label="Image URL" value={form.image_url} onChange={(event) => setForm((current) => ({ ...current, image_url: event.target.value }))} required />
        <FormInput label="Urutan" type="number" value={form.sort_order} onChange={(event) => setForm((current) => ({ ...current, sort_order: event.target.value }))} />
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={form.is_active} onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked }))} />
          Aktif
        </label>
        <div className="md:col-span-2"><FormTextarea label="Deskripsi" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} /></div>
        <div className="flex items-end gap-2">
          <button disabled={saving} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white disabled:bg-slate-400">{saving ? "Menyimpan..." : form.id ? "Update Galeri" : "Tambah Galeri"}</button>
          {form.id ? <button type="button" onClick={() => setForm(emptyForm)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Batal</button> : null}
        </div>
        {formError ? <div className="md:col-span-2"><ErrorState message={formError} /></div> : null}
      </form>
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
                <th className="p-3">Aksi</th>
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
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => editGallery(gallery)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold">Edit</button>
                      <button onClick={() => void handleDeactivate(gallery.id)} className="rounded-lg border border-amber-300 px-3 py-1 text-xs font-bold text-amber-700">Nonaktifkan</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </section>
  );
}
