import { useState } from "react";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import { deleteAdminEvent, getAdminEvents, saveAdminEvent, setAdminEventActive } from "../../services/adminEvents";
import type { Event } from "../../types/models";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

type EventForm = {
  id?: string;
  year: string;
  name: string;
  theme: string;
  description: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
};

const emptyForm: EventForm = {
  year: new Date().getFullYear().toString(),
  name: "",
  theme: "",
  description: "",
  start_date: "",
  end_date: "",
  is_active: false,
};

export function AdminEventsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminEvents, []);
  const [form, setForm] = useState<EventForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<{ title: string; description: string; onConfirm: () => Promise<void> } | null>(null);

  function editEvent(event: Event) {
    setForm({
      id: event.id,
      year: String(event.year),
      name: event.name,
      theme: event.theme ?? "",
      description: event.description ?? "",
      start_date: event.start_date ?? "",
      end_date: event.end_date ?? "",
      is_active: event.is_active,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const year = Number(form.year);
    if (!year || !form.name.trim()) {
      setFormError("Year dan name wajib diisi.");
      return;
    }

    setSaving(true);
    const { error: saveError } = await saveAdminEvent(
      {
        year,
        name: form.name.trim(),
        theme: form.theme.trim() || null,
        description: form.description.trim() || null,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
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

  function requestSetActive(event: Event) {
    setConfirm({
      title: "Aktifkan event?",
      description: `Event lain akan otomatis nonaktif. Aktifkan ${event.name}?`,
      onConfirm: async () => {
        const { error: activeError } = await setAdminEventActive(event.id);
        if (activeError) setFormError(activeError.message);
        reload();
      },
    });
  }

  function requestDelete(event: Event) {
    setConfirm({
      title: "Hapus event?",
      description: `Hapus ${event.name}? Database bisa menolak jika event masih dipakai data lomba atau peserta.`,
      onConfirm: async () => {
        const { error: deleteError } = await deleteAdminEvent(event.id);
        if (deleteError) setFormError(deleteError.message);
        reload();
      },
    });
  }

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Events</h1>
      <p className="mt-2 text-sm text-slate-600">Kelola event tahunan dan pilih satu event aktif.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
        <FormInput label="Year" type="number" value={form.year} onChange={(event) => setForm((current) => ({ ...current, year: event.target.value }))} required />
        <FormInput label="Name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
        <FormInput label="Theme" value={form.theme} onChange={(event) => setForm((current) => ({ ...current, theme: event.target.value }))} />
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput label="Start date" type="date" value={form.start_date} onChange={(event) => setForm((current) => ({ ...current, start_date: event.target.value }))} />
          <FormInput label="End date" type="date" value={form.end_date} onChange={(event) => setForm((current) => ({ ...current, end_date: event.target.value }))} />
        </div>
        <div className="md:col-span-2">
          <FormTextarea label="Description" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={form.is_active} onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked }))} />
          Jadikan event aktif
        </label>
        <div className="flex items-end gap-2">
          <button disabled={saving} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white disabled:bg-slate-400">{saving ? "Menyimpan..." : form.id ? "Update Event" : "Tambah Event"}</button>
          {form.id ? <button type="button" onClick={() => setForm(emptyForm)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Batal</button> : null}
        </div>
        {formError ? <div className="md:col-span-2"><ErrorState message={formError} /></div> : null}
      </form>

      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada event." />
      <div className="mt-4">
        <DataTable>
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3">Name</th>
                <th className="p-3">Theme</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Aktif</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((event) => (
                <tr key={event.id} className="border-t border-slate-100 align-top">
                  <td className="p-3 font-bold text-cyan-700">{event.year}</td>
                  <td className="p-3 font-semibold text-slate-950">{event.name}</td>
                  <td className="p-3">{event.theme ?? "-"}</td>
                  <td className="p-3">{formatDate(event.start_date)} - {formatDate(event.end_date)}</td>
                  <td className="p-3"><BooleanBadge value={event.is_active} /></td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => editEvent(event)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold">Edit</button>
                      {!event.is_active ? <button onClick={() => requestSetActive(event)} className="rounded-lg border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-700">Set Aktif</button> : null}
                      <button onClick={() => requestDelete(event)} className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-bold text-rose-700">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
      <ConfirmDialog
        open={Boolean(confirm)}
        title={confirm?.title ?? ""}
        description={confirm?.description ?? ""}
        onCancel={() => setConfirm(null)}
        onConfirm={async () => {
          await confirm?.onConfirm();
          setConfirm(null);
        }}
      />
    </section>
  );
}
