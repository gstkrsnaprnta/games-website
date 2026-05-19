import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import {
  deleteAdminFaq,
  getAdminFaqs,
  saveAdminFaq,
  type AdminFaqRow,
} from "../../services/adminFaqs";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

// ─── Types ────────────────────────────────────────────────────────────────────

type FaqForm = {
  id?: string;
  question: string;
  answer: string;
  sort_order: string;
  is_active: boolean;
};

const emptyForm: FaqForm = {
  question: "",
  answer: "",
  sort_order: "0",
  is_active: true,
};

// ─── Modal Form Component ─────────────────────────────────────────────────────

type FaqModalProps = {
  isOpen: boolean;
  form: FaqForm;
  saving: boolean;
  formError: string;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof FaqForm, value: string | boolean) => void;
};

function FaqModal({
  isOpen,
  form,
  saving,
  formError,
  onClose,
  onSubmit,
  onChange,
}: FaqModalProps) {
  if (!isOpen) return null;

  const isEditing = Boolean(form.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.15s ease-out" }}
    >
      {/* Overlay */}
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
              {isEditing ? "Edit FAQ" : "Tambah FAQ"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? "Perbarui pertanyaan dan jawaban yang sudah ada."
                : "Isi form di bawah untuk menambahkan FAQ baru."}
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
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <FormTextarea
                label="Pertanyaan"
                value={form.question}
                onChange={(e) => onChange("question", e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <FormTextarea
                label="Jawaban"
                value={form.answer}
                onChange={(e) => onChange("answer", e.target.value)}
                required
              />
            </div>
            <FormInput
              label="Urutan"
              type="number"
              value={form.sort_order}
              onChange={(e) => onChange("sort_order", e.target.value)}
            />
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 self-end pb-2">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => onChange("is_active", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
              />
              Aktif
            </label>

            {formError ? (
              <div className="md:col-span-2">
                <ErrorState message={formError} />
              </div>
            ) : null}
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {saving ? "Menyimpan..." : isEditing ? "Update FAQ" : "Tambah FAQ"}
            </button>
          </div>
        </form>
      </div>

      {/* Keyframe animations injected inline (no extra CSS file needed) */}
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

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function DeleteConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.15s ease-out" }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        style={{ animation: "scaleUp 0.2s ease-out" }}
      >
        {/* Warning Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-rose-600"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h3 className="text-base font-black text-slate-950">Hapus FAQ ini?</h3>
        <p className="mt-1 text-sm text-slate-500">
          Tindakan ini tidak dapat dibatalkan. FAQ yang dihapus tidak dapat
          dipulihkan kembali.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-rose-600 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
          >
            Ya, Hapus
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export function AdminFaqsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminFaqs, []);

  // Form state
  const [form, setForm] = useState<FaqForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal visibility
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // Delete confirmation
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function openCreateModal() {
    setForm(emptyForm);
    setFormError("");
    setIsFormModalOpen(true);
  }

  function openEditModal(faq: AdminFaqRow) {
    setForm({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      sort_order: String(faq.sort_order),
      is_active: faq.is_active,
    });
    setFormError("");
    setIsFormModalOpen(true);
  }

  function closeFormModal() {
    setIsFormModalOpen(false);
    setForm(emptyForm);
    setFormError("");
  }

  function handleFieldChange(field: keyof FaqForm, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  // ── CRUD ───────────────────────────────────────────────────────────────────

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!form.question.trim() || !form.answer.trim()) {
      setFormError("Pertanyaan dan jawaban wajib diisi.");
      return;
    }

    setSaving(true);
    const { error: saveError } = await saveAdminFaq(
      {
        question: form.question.trim(),
        answer: form.answer.trim(),
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

    closeFormModal();
    reload();
  }

  async function handleDeleteConfirm() {
    if (!deleteTargetId) return;
    const { error: deleteError } = await deleteAdminFaq(deleteTargetId);
    if (deleteError) setFormError(deleteError.message);
    setDeleteTargetId(null);
    reload();
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section>
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950">FAQ</h1>
          <p className="mt-1 text-sm text-slate-500">
            Pertanyaan dan jawaban yang tampil di halaman publik.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700"
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tambah FAQ
        </button>
      </div>

      {/* Table */}
      <AdminPageState
        loading={loading}
        error={error}
        isEmpty={!data?.length}
        emptyDescription="Belum ada FAQ."
      />

      <div className="mt-4">
        <DataTable>
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Pertanyaan</th>
                <th className="p-3">Jawaban</th>
                <th className="p-3">Urutan</th>
                <th className="p-3">Aktif</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((faq) => (
                <tr
                  key={faq.id}
                  className="border-t border-slate-100 align-top"
                >
                  <td className="p-3 font-semibold text-slate-950">
                    {faq.question}
                  </td>
                  <td className="max-w-xl p-3 text-slate-700">{faq.answer}</td>
                  <td className="p-3">{faq.sort_order}</td>
                  <td className="p-3">
                    <BooleanBadge value={faq.is_active} />
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(faq)}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold transition hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(faq.id)}
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

      {/* Form Modal (Create / Edit) */}
      <FaqModal
        isOpen={isFormModalOpen}
        form={form}
        saving={saving}
        formError={formError}
        onClose={closeFormModal}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onConfirm={() => void handleDeleteConfirm()}
        onCancel={() => setDeleteTargetId(null)}
      />
    </section>
  );
}