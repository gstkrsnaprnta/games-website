import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormSelect } from "../../components/admin/FormSelect";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import { getAdminCompetitions } from "../../services/adminCompetitions";
import {
  deleteAdminTimeline,
  getAdminTimelines,
  saveAdminTimeline,
  type AdminTimelineRow,
} from "../../services/adminTimelines";
import { formatDate } from "../../utils/date";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Form Modal ───────────────────────────────────────────────────────────────

type FormModalProps = {
  isOpen: boolean;
  form: TimelineForm;
  saving: boolean;
  formError: string;
  competitionOptions: { label: string; value: string }[];
  onChange: (patch: Partial<TimelineForm>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

function FormModal({
  isOpen,
  form,
  saving,
  formError,
  competitionOptions,
  onChange,
  onSubmit,
  onClose,
}: FormModalProps) {
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
      />

      {/* Modal Panel */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl"
        style={{ animation: "scaleUp 0.2s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              {isEditing ? "Edit Timeline" : "Tambah Timeline"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? "Perbarui data timeline yang sudah ada."
                : "Isi form di bawah untuk menambahkan timeline baru."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Judul"
              value={form.title}
              onChange={(e) => onChange({ title: e.target.value })}
              required
            />
            <FormSelect
              label="Lomba"
              value={form.competition_id}
              onChange={(e) => onChange({ competition_id: e.target.value })}
              options={competitionOptions}
            />
            <FormInput
              label="Tanggal mulai"
              type="date"
              value={form.start_date}
              onChange={(e) => onChange({ start_date: e.target.value })}
              required
            />
            <FormInput
              label="Tanggal selesai"
              type="date"
              value={form.end_date}
              onChange={(e) => onChange({ end_date: e.target.value })}
            />
            <FormInput
              label="Urutan"
              type="number"
              value={form.sort_order}
              onChange={(e) => onChange({ sort_order: e.target.value })}
            />
            <label className="flex items-center gap-2 self-end pb-1 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => onChange({ is_active: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
              />
              Aktif
            </label>
            <div className="md:col-span-2">
              <FormTextarea
                label="Deskripsi"
                value={form.description}
                onChange={(e) => onChange({ description: e.target.value })}
              />
            </div>
          </div>

          {formError && (
            <div className="mt-4">
              <ErrorState message={formError} />
            </div>
          )}

          {/* Footer Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-700 disabled:bg-slate-400"
            >
              {saving
                ? "Menyimpan..."
                : isEditing
                  ? "Simpan Perubahan"
                  : "Tambah Timeline"}
            </button>
          </div>
        </form>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

type DeleteModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function DeleteModal({ isOpen, onConfirm, onCancel }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.15s ease-out" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal Panel */}
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        style={{ animation: "scaleUp 0.2s ease-out" }}
      >
        {/* Warning Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-rose-600"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>

        <h3 className="text-center text-base font-black text-slate-950">
          Hapus Timeline?
        </h3>
        <p className="mt-2 text-center text-sm text-slate-500">
          Tindakan ini tidak dapat dibatalkan. Data timeline akan dihapus secara
          permanen.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-rose-700"
          >
            Ya, Hapus
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminTimelinesPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminTimelines, []);
  const competitions = useAsyncData(getAdminCompetitions, []);

  const [form, setForm] = useState<TimelineForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal visibility state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const competitionOptions = [
    { label: "Umum / semua lomba", value: "" },
    ...(competitions.data?.map((c) => ({ label: c.name, value: c.id })) ?? []),
  ];

  function openCreate() {
    setForm(emptyForm);
    setFormError("");
    setIsFormOpen(true);
  }

  function openEdit(item: AdminTimelineRow) {
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
    setFormError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setForm(emptyForm);
    setFormError("");
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
    closeForm();
    reload();
  }

  async function handleDeleteConfirm() {
    if (!deleteTargetId) return;
    const { error: deleteError } = await deleteAdminTimeline(deleteTargetId);
    if (deleteError) setFormError(deleteError.message);
    setDeleteTargetId(null);
    reload();
  }

  return (
    <section>
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Timeline</h1>
          <p className="mt-1 text-sm text-slate-600">
            Semua agenda event dan agenda per lomba.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-cyan-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5v14" />
          </svg>
          Tambah Timeline
        </button>
      </div>

      {/* Table */}
      <AdminPageState
        loading={loading}
        error={error}
        isEmpty={!data?.length}
        emptyDescription="Belum ada timeline."
      />

      {formError && !isFormOpen && (
        <div className="mt-4">
          <ErrorState message={formError} />
        </div>
      )}

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
                  <td className="p-3 font-semibold text-slate-950">
                    {item.title}
                  </td>
                  <td className="p-3">{formatDate(item.start_date)}</td>
                  <td className="p-3">{formatDate(item.end_date)}</td>
                  <td className="p-3">{item.competitions?.name ?? "-"}</td>
                  <td className="p-3">
                    <BooleanBadge value={item.is_active} />
                  </td>
                  <td className="p-3">{item.sort_order}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold transition-colors hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(item.id)}
                        className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-50"
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
      <FormModal
        isOpen={isFormOpen}
        form={form}
        saving={saving}
        formError={formError}
        competitionOptions={competitionOptions}
        onChange={(patch) => setForm((current) => ({ ...current, ...patch }))}
        onSubmit={handleSubmit}
        onClose={closeForm}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteTargetId !== null}
        onConfirm={() => void handleDeleteConfirm()}
        onCancel={() => setDeleteTargetId(null)}
      />
    </section>
  );
}