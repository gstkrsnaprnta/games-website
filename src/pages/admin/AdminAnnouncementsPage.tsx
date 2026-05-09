import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormSelect } from "../../components/admin/FormSelect";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import {
  deleteAdminAnnouncement,
  getAdminAnnouncements,
  saveAdminAnnouncement,
  type AdminAnnouncementRow,
} from "../../services/adminAnnouncements";
import { getAdminCompetitions } from "../../services/adminCompetitions";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState } from "./adminPageUtils";

type AnnouncementForm = {
  id?: string;
  title: string;
  category: string;
  content: string;
  competition_id: string;
  status: "draft" | "published";
};

const emptyForm: AnnouncementForm = {
  title: "",
  category: "general",
  content: "",
  competition_id: "",
  status: "draft",
};

export function AdminAnnouncementsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminAnnouncements, []);
  const competitions = useAsyncData(getAdminCompetitions, []);
  const [form, setForm] = useState<AnnouncementForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  function editAnnouncement(announcement: AdminAnnouncementRow & { competition_id?: string | null }) {
    setForm({
      id: announcement.id,
      title: announcement.title,
      category: announcement.category,
      content: announcement.content ?? "",
      competition_id: announcement.competition_id ?? "",
      status: announcement.status,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (!form.title.trim() || !form.content.trim()) {
      setFormError("Judul dan konten wajib diisi.");
      return;
    }
    setSaving(true);
    const { error: saveError } = await saveAdminAnnouncement(
      {
        title: form.title.trim(),
        category: form.category.trim() || "general",
        content: form.content.trim(),
        competition_id: form.competition_id || null,
        status: form.status,
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

  async function handleDelete(id: string) {
    if (!confirm("Hapus pengumuman ini?")) return;
    const { error: deleteError } = await deleteAdminAnnouncement(id);
    if (deleteError) setFormError(deleteError.message);
    reload();
  }

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Pengumuman</h1>
      <p className="mt-2 text-sm text-slate-600">Draft dan pengumuman yang sudah diterbitkan.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
        <FormInput label="Judul" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required />
        <FormInput label="Kategori" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} />
        <FormSelect label="Lomba" value={form.competition_id} onChange={(event) => setForm((current) => ({ ...current, competition_id: event.target.value }))} options={[{ label: "Umum / semua lomba", value: "" }, ...(competitions.data?.map((competition) => ({ label: competition.name, value: competition.id })) ?? [])]} />
        <FormSelect label="Status" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as AnnouncementForm["status"] }))} options={[{ label: "Draft", value: "draft" }, { label: "Published", value: "published" }]} />
        <div className="md:col-span-2"><FormTextarea label="Konten" value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} required /></div>
        <div className="flex items-end gap-2">
          <button disabled={saving} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white disabled:bg-slate-400">{saving ? "Menyimpan..." : form.id ? "Update Pengumuman" : "Tambah Pengumuman"}</button>
          {form.id ? <button type="button" onClick={() => setForm(emptyForm)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Batal</button> : null}
        </div>
        {formError ? <div className="md:col-span-2"><ErrorState message={formError} /></div> : null}
      </form>
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
                <th className="p-3">Aksi</th>
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
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => editAnnouncement(announcement)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold">Edit</button>
                      <button onClick={() => void saveAdminAnnouncement({ title: announcement.title, category: announcement.category, content: announcement.content ?? "-", status: announcement.status === "published" ? "draft" : "published" }, announcement.id).then(() => reload())} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold">{announcement.status === "published" ? "Unpublish" : "Publish"}</button>
                      <button onClick={() => void handleDelete(announcement.id)} className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-bold text-rose-700">Hapus</button>
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
