import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import {
  deactivateAdminGallery,
  getAdminGalleries,
  saveAdminGallery,
  type AdminGalleryRow,
} from "../../services/adminGalleries";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Modal Form ───────────────────────────────────────────────────────────────

type GalleryFormModalProps = {
  isOpen: boolean;
  form: GalleryForm;
  formError: string;
  saving: boolean;
  onChange: (updated: Partial<GalleryForm>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

function GalleryFormModal({
  isOpen,
  form,
  formError,
  saving,
  onChange,
  onSubmit,
  onClose,
}: GalleryFormModalProps) {
  if (!isOpen) return null;

  const isEdit = Boolean(form.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 150ms ease-out" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-xl rounded-2xl bg-white shadow-2xl"
        style={{ animation: "scaleUp 150ms ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-black text-slate-900">
            {isEdit ? "Edit Galeri" : "Tambah Galeri"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup modal"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="grid gap-4 p-6 md:grid-cols-2">
          <FormInput
            label="Judul"
            value={form.title}
            onChange={(e) => onChange({ title: e.target.value })}
          />
          <FormInput
            label="Image URL"
            value={form.image_url}
            onChange={(e) => onChange({ image_url: e.target.value })}
            required
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
              className="h-4 w-4 rounded accent-cyan-600"
              checked={form.is_active}
              onChange={(e) => onChange({ is_active: e.target.checked })}
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

          {formError && (
            <div className="md:col-span-2">
              <ErrorState message={formError} />
            </div>
          )}

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-700 disabled:bg-slate-400"
            >
              {saving ? "Menyimpan..." : isEdit ? "Update Galeri" : "Tambah Galeri"}
            </button>
          </div>
        </form>
      </div>

      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(.95) } to { opacity: 1; transform: scale(1) } }
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

function DeleteConfirmModal({ isOpen, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 150ms ease-out" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
        style={{ animation: "scaleUp 150ms ease-out" }}
      >
        {/* Warning icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
          <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>

        <h3 className="text-center text-base font-black text-slate-900">Nonaktifkan Galeri?</h3>
        <p className="mt-2 text-center text-sm text-slate-500">
          Galeri ini akan dinonaktifkan dan tidak akan tampil di halaman publik. Tindakan ini dapat diubah kembali.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-amber-500 py-2 text-sm font-bold text-white transition-colors hover:bg-amber-600"
          >
            Ya, Nonaktifkan
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminGalleriesPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminGalleries, []);

  // Form & modal state
  const [form, setForm] = useState<GalleryForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // Delete confirmation state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function openCreateModal() {
    setForm(emptyForm);
    setFormError("");
    setIsFormModalOpen(true);
  }

  function openEditModal(gallery: AdminGalleryRow) {
    setForm({
      id: gallery.id,
      title: gallery.title ?? "",
      image_url: gallery.image_url,
      description: gallery.description ?? "",
      sort_order: String(gallery.sort_order),
      is_active: gallery.is_active,
    });
    setFormError("");
    setIsFormModalOpen(true);
  }

  function closeFormModal() {
    setIsFormModalOpen(false);
    setForm(emptyForm);
    setFormError("");
  }

  function handleFormChange(updated: Partial<GalleryForm>) {
    setForm((current) => ({ ...current, ...updated }));
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

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
    closeFormModal();
    reload();
  }

  // ── Delete ─────────────────────────────────────────────────────────────────

  function confirmDeactivate(id: string) {
    setDeleteTargetId(id);
  }

  async function handleDeactivate() {
    if (!deleteTargetId) return;
    const { error: updateError } = await deactivateAdminGallery(deleteTargetId);
    setDeleteTargetId(null);
    if (updateError) setFormError(updateError.message);
    reload();
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section>
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Galeri</h1>
          <p className="mt-1 text-sm text-slate-600">Daftar foto atau dokumentasi kegiatan.</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah Galeri
        </button>
      </div>

      {/* Global form error (outside modal, e.g. from deactivate) */}
      {formError && !isFormModalOpen && (
        <div className="mt-4">
          <ErrorState message={formError} />
        </div>
      )}

      <AdminPageState
        loading={loading}
        error={error}
        isEmpty={!data?.length}
        emptyDescription="Belum ada galeri."
      />

      {/* Table */}
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
                      <button
                        onClick={() => openEditModal(gallery)}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold transition-colors hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDeactivate(gallery.id)}
                        className="rounded-lg border border-amber-300 px-3 py-1 text-xs font-bold text-amber-700 transition-colors hover:bg-amber-50"
                      >
                        Nonaktifkan
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
      <GalleryFormModal
        isOpen={isFormModalOpen}
        form={form}
        formError={formError}
        saving={saving}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        onClose={closeFormModal}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onConfirm={() => void handleDeactivate()}
        onCancel={() => setDeleteTargetId(null)}
      />
    </section>
  );
}