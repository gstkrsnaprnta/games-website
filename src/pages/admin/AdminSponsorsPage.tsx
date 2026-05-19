import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { ErrorState } from "../../components/shared/ErrorState";
import {
  deactivateAdminSponsor,
  getAdminSponsors,
  saveAdminSponsor,
  type AdminSponsorRow,
} from "../../services/adminSponsors";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

// ─── Types ────────────────────────────────────────────────────────────────────

type SponsorForm = {
  id?: string;
  name: string;
  sponsor_type: string;
  website_url: string;
  sort_order: string;
  is_active: boolean;
};

const emptyForm: SponsorForm = {
  name: "",
  sponsor_type: "sponsor",
  website_url: "",
  sort_order: "0",
  is_active: true,
};

// ─── Modal Form Component ─────────────────────────────────────────────────────

type SponsorFormModalProps = {
  isOpen: boolean;
  form: SponsorForm;
  formError: string;
  saving: boolean;
  onChange: (updated: Partial<SponsorForm>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

function SponsorFormModal({
  isOpen,
  form,
  formError,
  saving,
  onChange,
  onSubmit,
  onClose,
}: SponsorFormModalProps) {
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
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl"
        style={{ animation: "scaleUp 150ms ease-out" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 id="modal-title" className="text-base font-bold text-slate-900">
            {isEdit ? "Edit Sponsor" : "Tambah Sponsor"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="px-6 py-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Nama"
              value={form.name}
              onChange={(e) => onChange({ name: e.target.value })}
              required
            />
            <FormInput
              label="Tipe"
              value={form.sponsor_type}
              onChange={(e) => onChange({ sponsor_type: e.target.value })}
            />
            <FormInput
              label="Website URL"
              value={form.website_url}
              onChange={(e) => onChange({ website_url: e.target.value })}
            />
            <FormInput
              label="Urutan"
              type="number"
              value={form.sort_order}
              onChange={(e) => onChange({ sort_order: e.target.value })}
            />
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => onChange({ is_active: e.target.checked })}
                className="rounded border-slate-300 accent-cyan-600"
              />
              Aktif
            </label>

            {formError && (
              <div className="md:col-span-2">
                <ErrorState message={formError} />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 active:bg-cyan-800 disabled:bg-slate-400"
            >
              {saving ? "Menyimpan..." : isEdit ? "Update Sponsor" : "Tambah Sponsor"}
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
          from { opacity: 0; transform: scale(0.95) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
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
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        style={{ animation: "scaleUp 150ms ease-out" }}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-desc"
      >
        {/* Warning Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h3 id="delete-title" className="text-center text-base font-bold text-slate-900">
          Nonaktifkan Sponsor?
        </h3>
        <p id="delete-desc" className="mt-2 text-center text-sm text-slate-500">
          Sponsor ini akan dinonaktifkan dan tidak akan tampil di halaman publik. Tindakan ini dapat diubah kembali kapan saja.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:bg-slate-100"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700 active:bg-red-800"
          >
            Ya, Nonaktifkan
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminSponsorsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminSponsors, []);

  // Form state
  const [form, setForm] = useState<SponsorForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal visibility
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────

  function openCreateModal() {
    setForm(emptyForm);
    setFormError("");
    setIsFormModalOpen(true);
  }

  function openEditModal(sponsor: AdminSponsorRow) {
    setForm({
      id: sponsor.id,
      name: sponsor.name,
      sponsor_type: sponsor.sponsor_type,
      website_url: sponsor.website_url ?? "",
      sort_order: String(sponsor.sort_order),
      is_active: sponsor.is_active,
    });
    setFormError("");
    setIsFormModalOpen(true);
  }

  function closeFormModal() {
    setIsFormModalOpen(false);
    setForm(emptyForm);
    setFormError("");
  }

  // ── Handlers ─────────────────────────────────────────────────────────────

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!form.name.trim()) {
      setFormError("Nama sponsor wajib diisi.");
      return;
    }

    setSaving(true);
    const { error: saveError } = await saveAdminSponsor(
      {
        name: form.name.trim(),
        sponsor_type: form.sponsor_type.trim() || "sponsor",
        website_url: form.website_url.trim() || null,
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

  async function handleDeactivateConfirmed() {
    if (!deleteTargetId) return;
    const { error: updateError } = await deactivateAdminSponsor(deleteTargetId);
    if (updateError) setFormError(updateError.message);
    setDeleteTargetId(null);
    reload();
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section>
      {/* Page Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Sponsor dan Media Partner</h1>
          <p className="mt-1 text-sm text-slate-600">Daftar sponsor dan media partner event.</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700 active:bg-cyan-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5v14" />
          </svg>
          Tambah Sponsor
        </button>
      </div>

      {/* Page-level error (e.g. deactivate error) */}
      {formError && !isFormModalOpen && (
        <div className="mt-4">
          <ErrorState message={formError} />
        </div>
      )}

      <AdminPageState
        loading={loading}
        error={error}
        isEmpty={!data?.length}
        emptyDescription="Belum ada sponsor atau media partner."
      />

      {/* Data Table */}
      <div className="mt-6">
        <DataTable>
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Nama</th>
                <th className="p-3">Tipe</th>
                <th className="p-3">Website</th>
                <th className="p-3">Aktif</th>
                <th className="p-3">Urutan</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((sponsor) => (
                <tr key={sponsor.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold text-slate-950">{sponsor.name}</td>
                  <td className="p-3">{sponsor.sponsor_type}</td>
                  <td className="p-3">{sponsor.website_url ?? "-"}</td>
                  <td className="p-3">
                    <BooleanBadge value={sponsor.is_active} />
                  </td>
                  <td className="p-3">{sponsor.sort_order}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(sponsor)}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold transition hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(sponsor.id)}
                        className="rounded-lg border border-amber-300 px-3 py-1 text-xs font-bold text-amber-700 transition hover:bg-amber-50"
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

      {/* ── Modals ── */}
      <SponsorFormModal
        isOpen={isFormModalOpen}
        form={form}
        formError={formError}
        saving={saving}
        onChange={(updated) => setForm((cur) => ({ ...cur, ...updated }))}
        onSubmit={handleSubmit}
        onClose={closeFormModal}
      />

      <DeleteConfirmModal
        isOpen={deleteTargetId !== null}
        onConfirm={() => void handleDeactivateConfirmed()}
        onCancel={() => setDeleteTargetId(null)}
      />
    </section>
  );
}