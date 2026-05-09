import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormSelect } from "../../components/admin/FormSelect";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import { getAdminCompetitions } from "../../services/adminCompetitions";
import { deleteAdminTimeline, getAdminTimelines, saveAdminTimeline, type AdminTimelineRow } from "../../services/adminTimelines";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

type TimelineForm = {
  id?: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  competition_id: string;
  is_active: boolean;
  sort_order: string;
};

const emptyForm: TimelineForm = {
  title: "",
  description: "",
  start_date: "",
  end_date: "",
  competition_id: "",
  is_active: true,
  sort_order: "0",
};

export function AdminTimelinesPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminTimelines, []);
  const competitions = useAsyncData(getAdminCompetitions, []);
  const [form, setForm] = useState<TimelineForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  function editTimeline(item: AdminTimelineRow) {
    setForm({
      id: item.id,
      title: item.title,
      description: item.description ?? "",
      start_date: item.start_date,
      end_date: item.end_date ?? "",
      competition_id: item.competition_id ?? "",
      is_active: item.is_active,
      sort_order: String(item.sort_order),
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (!form.title.trim() || !form.start_date) {
      setFormError("Judul dan tanggal mulai wajib diisi.");
      return;
    }
    setSaving(true);
    const { error: saveError } = await saveAdminTimeline(
      {
        title: form.title.trim(),
        description: form.description.trim() || null,
        start_date: form.start_date,
        end_date: form.end_date || null,
        competition_id: form.competition_id || null,
        is_active: form.is_active,
        sort_order: Number(form.sort_order || 0),
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
    if (!confirm("Hapus timeline ini?")) return;
    const { error: deleteError } = await deleteAdminTimeline(id);
    if (deleteError) setFormError(deleteError.message);
    reload();
  }

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Timeline</h1>
      <p className="mt-2 text-sm text-slate-600">Semua agenda event dan agenda per lomba.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
        <FormInput label="Judul" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required />
        <FormSelect label="Lomba" value={form.competition_id} onChange={(event) => setForm((current) => ({ ...current, competition_id: event.target.value }))} options={[{ label: "Umum / semua lomba", value: "" }, ...(competitions.data?.map((competition) => ({ label: competition.name, value: competition.id })) ?? [])]} />
        <FormInput label="Tanggal mulai" type="date" value={form.start_date} onChange={(event) => setForm((current) => ({ ...current, start_date: event.target.value }))} required />
        <FormInput label="Tanggal selesai" type="date" value={form.end_date} onChange={(event) => setForm((current) => ({ ...current, end_date: event.target.value }))} />
        <FormInput label="Urutan" type="number" value={form.sort_order} onChange={(event) => setForm((current) => ({ ...current, sort_order: event.target.value }))} />
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={form.is_active} onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked }))} />
          Aktif
        </label>
        <div className="md:col-span-2"><FormTextarea label="Deskripsi" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} /></div>
        <div className="flex items-end gap-2">
          <button disabled={saving} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white disabled:bg-slate-400">{saving ? "Menyimpan..." : form.id ? "Update Timeline" : "Tambah Timeline"}</button>
          {form.id ? <button type="button" onClick={() => setForm(emptyForm)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Batal</button> : null}
        </div>
        {formError ? <div className="md:col-span-2"><ErrorState message={formError} /></div> : null}
      </form>
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
                <th className="p-3">Aksi</th>
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
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => editTimeline(item)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold">Edit</button>
                      <button onClick={() => void handleDelete(item.id)} className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-bold text-rose-700">Hapus</button>
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
