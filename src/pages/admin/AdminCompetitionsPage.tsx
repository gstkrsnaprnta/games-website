import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormSelect } from "../../components/admin/FormSelect";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import {
  deleteAdminCompetition,
  getAdminCompetitions,
  saveAdminCompetition,
} from "../../services/adminCompetitions";
import type { Competition } from "../../types/models";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

// ─── Types ────────────────────────────────────────────────────────────────────

type CompetitionForm = {
  id?: string;
  name: string;
  code: string;
  participant_levels: string;
  registration_status: "open" | "closed";
  is_active: boolean;
  registration_fee: string;
  competition_type: "individual" | "team";
  short_description: string;
  description: string;
};

const emptyForm: CompetitionForm = {
  name: "",
  code: "",
  participant_levels: "",
  registration_status: "closed",
  is_active: true,
  registration_fee: "0",
  competition_type: "individual",
  short_description: "",
  description: "",
};

// ─── Modal Form Component ─────────────────────────────────────────────────────

type FormModalProps = {
  isOpen: boolean;
  form: CompetitionForm;
  formError: string;
  saving: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (updated: Partial<CompetitionForm>) => void;
};

function FormModal({
  isOpen,
  form,
  formError,
  saving,
  onClose,
  onSubmit,
  onChange,
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
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
        style={{ animation: "scaleUp 0.2s ease-out" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              {isEditing ? "Edit Lomba" : "Tambah Lomba"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? "Perbarui informasi cabang lomba."
                : "Isi detail untuk menambahkan cabang lomba baru."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="grid gap-4 p-6 md:grid-cols-2">
          <FormInput
            label="Nama lomba"
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            required
          />
          <FormInput
            label="Kode"
            value={form.code}
            onChange={(e) => onChange({ code: e.target.value })}
            required
          />
          <FormInput
            label="Jenjang peserta"
            placeholder="SD, SMP, SMA"
            value={form.participant_levels}
            onChange={(e) => onChange({ participant_levels: e.target.value })}
          />
          <FormInput
            label="Biaya pendaftaran"
            type="number"
            value={form.registration_fee}
            onChange={(e) => onChange({ registration_fee: e.target.value })}
          />
          <FormSelect
            label="Status pendaftaran"
            value={form.registration_status}
            onChange={(e) =>
              onChange({
                registration_status: e.target
                  .value as CompetitionForm["registration_status"],
              })
            }
            options={[
              { label: "Buka", value: "open" },
              { label: "Tutup", value: "closed" },
            ]}
          />
          <FormSelect
            label="Tipe lomba"
            value={form.competition_type}
            onChange={(e) =>
              onChange({
                competition_type: e.target
                  .value as CompetitionForm["competition_type"],
              })
            }
            options={[
              { label: "Individu", value: "individual" },
              { label: "Tim", value: "team" },
            ]}
          />
          <FormTextarea
            label="Deskripsi singkat"
            value={form.short_description}
            onChange={(e) => onChange({ short_description: e.target.value })}
          />
          <FormTextarea
            label="Deskripsi"
            value={form.description}
            onChange={(e) => onChange({ description: e.target.value })}
          />

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => onChange({ is_active: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-cyan-600 accent-cyan-600"
            />
            Aktif
          </label>

          {formError ? (
            <div className="md:col-span-2">
              <ErrorState message={formError} />
            </div>
          ) : null}

          {/* Footer Actions */}
          <div className="md:col-span-2 flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 active:bg-cyan-800 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {saving ? "Menyimpan..." : isEditing ? "Update Lomba" : "Tambah Lomba"}
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
          to   { opacity: 1; transform: scale(1)    translateY(0); }
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
        className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200 text-center"
        style={{ animation: "scaleUp 0.2s ease-out" }}
      >
        {/* Warning Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="h-7 w-7 text-rose-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h2 className="text-base font-black text-slate-950">Hapus Lomba?</h2>
        <p className="mt-2 text-sm text-slate-500">
          Data lomba ini akan dihapus secara permanen dan tidak dapat dikembalikan.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700 active:bg-rose-800"
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
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminCompetitionsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminCompetitions, []);

  const [form, setForm] = useState<CompetitionForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal visibility state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────

  function openCreateModal() {
    setForm(emptyForm);
    setFormError("");
    setIsFormOpen(true);
  }

  function openEditModal(competition: Competition) {
    setForm({
      id: competition.id,
      name: competition.name,
      code: competition.code,
      participant_levels: competition.participant_levels?.join(", ") ?? "",
      registration_status: competition.registration_status,
      is_active: competition.is_active,
      registration_fee: String(competition.registration_fee),
      competition_type: competition.competition_type,
      short_description: competition.short_description ?? "",
      description: competition.description ?? "",
    });
    setFormError("");
    setIsFormOpen(true);
  }

  function closeFormModal() {
    setIsFormOpen(false);
    setForm(emptyForm);
    setFormError("");
  }

  function handleFormChange(updated: Partial<CompetitionForm>) {
    setForm((current) => ({ ...current, ...updated }));
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.code.trim()) {
      setFormError("Nama dan kode lomba wajib diisi.");
      return;
    }
    setSaving(true);
    const { error: saveError } = await saveAdminCompetition(
      {
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        participant_levels: form.participant_levels
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        registration_status: form.registration_status,
        is_active: form.is_active,
        registration_fee: Number(form.registration_fee || 0),
        competition_type: form.competition_type,
        short_description: form.short_description || null,
        description: form.description || null,
      },
      form.id,
    );
    setSaving(false);
    if (saveError) {
      setFormError(saveError.message);
      return;
    }
    closeFormModal();
    reload();
  }

  // ── Delete ────────────────────────────────────────────────────────────────

  async function confirmDelete() {
    if (!deleteTargetId) return;
    const { error: deleteError } = await deleteAdminCompetition(deleteTargetId);
    setDeleteTargetId(null);
    if (deleteError) setFormError(deleteError.message);
    reload();
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section>
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Lomba</h1>
          <p className="mt-1 text-sm text-slate-600">
            Semua cabang lomba, termasuk yang nonaktif atau pendaftaran tertutup.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 active:bg-cyan-800 shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah Lomba
        </button>
      </div>

      <AdminPageState
        loading={loading}
        error={error}
        isEmpty={!data?.length}
        emptyDescription="Belum ada lomba."
      />

      {/* Data Table */}
      <div className="mt-6">
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
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((competition) => (
                <tr key={competition.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold text-slate-950">{competition.name}</td>
                  <td className="p-3 font-bold text-cyan-700">{competition.code}</td>
                  <td className="p-3">{competition.participant_levels?.join(", ") || "-"}</td>
                  <td className="p-3">
                    <span
                      className={
                        competition.registration_status === "open"
                          ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800"
                          : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"
                      }
                    >
                      {competition.registration_status === "open" ? "Buka" : "Tutup"}
                    </span>
                  </td>
                  <td className="p-3">
                    <BooleanBadge value={competition.is_active} />
                  </td>
                  <td className="p-3">Rp{competition.registration_fee.toLocaleString("id-ID")}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(competition)}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold transition hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(competition.id)}
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

      {/* Modals */}
      <FormModal
        isOpen={isFormOpen}
        form={form}
        formError={formError}
        saving={saving}
        onClose={closeFormModal}
        onSubmit={handleSubmit}
        onChange={handleFormChange}
      />

      <DeleteModal
        isOpen={Boolean(deleteTargetId)}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setDeleteTargetId(null)}
      />
    </section>
  );
}