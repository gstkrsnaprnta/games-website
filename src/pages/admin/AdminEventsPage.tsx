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

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Event Form Modal ─────────────────────────────────────────────────────────

type EventFormModalProps = {
  isOpen: boolean;
  form: EventForm;
  saving: boolean;
  formError: string;
  onChange: (updater: (prev: EventForm) => EventForm) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

function EventFormModal({ isOpen, form, saving, formError, onChange, onSubmit, onClose }: EventFormModalProps) {
  if (!isOpen) return null;

  const isEditing = Boolean(form.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.15s ease-out" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
        style={{ animation: "scaleUp 0.2s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              {isEditing ? "Edit Event" : "Tambah Event"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing ? `Memperbarui data event · ID: ${form.id?.slice(0, 8)}…` : "Isi detail event baru di bawah ini."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="px-6 py-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Year"
              type="number"
              value={form.year}
              onChange={(e) => onChange((cur) => ({ ...cur, year: e.target.value }))}
              required
            />
            <FormInput
              label="Name"
              value={form.name}
              onChange={(e) => onChange((cur) => ({ ...cur, name: e.target.value }))}
              required
            />
            <FormInput
              label="Theme"
              value={form.theme}
              onChange={(e) => onChange((cur) => ({ ...cur, theme: e.target.value }))}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput
                label="Start date"
                type="date"
                value={form.start_date}
                onChange={(e) => onChange((cur) => ({ ...cur, start_date: e.target.value }))}
              />
              <FormInput
                label="End date"
                type="date"
                value={form.end_date}
                onChange={(e) => onChange((cur) => ({ ...cur, end_date: e.target.value }))}
              />
            </div>
            <div className="md:col-span-2">
              <FormTextarea
                label="Description"
                value={form.description}
                onChange={(e) => onChange((cur) => ({ ...cur, description: e.target.value }))}
              />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => onChange((cur) => ({ ...cur, is_active: e.target.checked }))}
                className="rounded"
              />
              Jadikan event aktif
            </label>
          </div>

          {formError && (
            <div className="mt-4">
              <ErrorState message={formError} />
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-5 flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {saving ? "Menyimpan…" : isEditing ? "Update Event" : "Simpan Event"}
            </button>
          </div>
        </form>
      </div>

      {/* Keyframe styles injected inline */}
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminEventsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminEvents, []);

  const [form, setForm] = useState<EventForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [confirm, setConfirm] = useState<{
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────

  function openCreateModal() {
    setForm(emptyForm);
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(event: Event) {
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
    setFormError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setForm(emptyForm);
    setFormError("");
  }

  // ── Submit ───────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

    closeModal();
    reload();
  }

  // ── Confirm Actions ──────────────────────────────────────────────────────

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

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <section>
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Events</h1>
          <p className="mt-1 text-sm text-slate-600">Kelola event tahunan dan pilih satu event aktif.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Tambah Event
        </button>
      </div>

      {/* Table */}
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada event." />
      <div className="mt-5">
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
                  <td className="p-3 text-slate-600">{event.theme ?? "-"}</td>
                  <td className="p-3 text-slate-600">
                    {formatDate(event.start_date)} – {formatDate(event.end_date)}
                  </td>
                  <td className="p-3">
                    <BooleanBadge value={event.is_active} />
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openEditModal(event)}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      {!event.is_active && (
                        <button
                          onClick={() => requestSetActive(event)}
                          className="rounded-lg border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50"
                        >
                          Set Aktif
                        </button>
                      )}
                      <button
                        onClick={() => requestDelete(event)}
                        className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-bold text-rose-700 transition hover:bg-rose-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>

      {/* Form Modal */}
      <EventFormModal
        isOpen={isModalOpen}
        form={form}
        saving={saving}
        formError={formError}
        onChange={setForm}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />

      {/* Confirm Dialog */}
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