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

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Icon Components ──────────────────────────────────────────────────────────

function IconX({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconPlus({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function IconWarning({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );
}

// ─── Modal Overlay ────────────────────────────────────────────────────────────

function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
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
      {/* Content */}
      <div
        className="relative w-full"
        style={{ animation: "scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {children}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Form Modal ───────────────────────────────────────────────────────────────

function AnnouncementFormModal({
  form,
  setForm,
  competitions,
  saving,
  formError,
  onSubmit,
  onClose,
}: {
  form: AnnouncementForm;
  setForm: React.Dispatch<React.SetStateAction<AnnouncementForm>>;
  competitions: { id: string; name: string }[];
  saving: boolean;
  formError: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onClose: () => void;
}) {
  const isEditing = Boolean(form.id);

  return (
    <ModalOverlay onClose={onClose}>
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing ? "Edit Pengumuman" : "Tambah Pengumuman"}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {isEditing
                ? "Perbarui informasi pengumuman yang sudah ada."
                : "Buat pengumuman baru untuk peserta."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <IconX />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={(e) => void onSubmit(e)} className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <FormInput
                label="Judul"
                value={form.title}
                onChange={(e) =>
                  setForm((cur) => ({ ...cur, title: e.target.value }))
                }
                required
              />
            </div>
            <FormInput
              label="Kategori"
              value={form.category}
              onChange={(e) =>
                setForm((cur) => ({ ...cur, category: e.target.value }))
              }
            />
            <FormSelect
              label="Status"
              value={form.status}
              onChange={(e) =>
                setForm((cur) => ({
                  ...cur,
                  status: e.target.value as AnnouncementForm["status"],
                }))
              }
              options={[
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
              ]}
            />
            <div className="md:col-span-2">
              <FormSelect
                label="Lomba"
                value={form.competition_id}
                onChange={(e) =>
                  setForm((cur) => ({ ...cur, competition_id: e.target.value }))
                }
                options={[
                  { label: "Umum / semua lomba", value: "" },
                  ...competitions.map((c) => ({ label: c.name, value: c.id })),
                ]}
              />
            </div>
            <div className="md:col-span-2">
              <FormTextarea
                label="Konten"
                value={form.content}
                onChange={(e) =>
                  setForm((cur) => ({ ...cur, content: e.target.value }))
                }
                required
              />
            </div>
          </div>

          {formError && (
            <div className="mt-4">
              <ErrorState message={formError} />
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
            >
              {saving
                ? "Menyimpan..."
                : isEditing
                ? "Simpan Perubahan"
                : "Tambah Pengumuman"}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteConfirmModal({
  announcementTitle,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  announcementTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <ModalOverlay onClose={onCancel}>
      <div className="mx-auto max-w-sm rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
        <div className="p-6 text-center">
          {/* Warning Icon */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
            <IconWarning className="h-8 w-8 text-rose-500" />
          </div>

          <h3 className="text-base font-bold text-slate-900">Hapus Pengumuman?</h3>
          <p className="mt-2 text-sm text-slate-500">
            Anda akan menghapus pengumuman{" "}
            <span className="font-semibold text-slate-700">"{announcementTitle}"</span>.
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Actions */}
        <div className="flex gap-3 p-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 rounded-lg bg-rose-600 py-2 text-sm font-bold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300"
          >
            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminAnnouncementsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminAnnouncements, []);
  const competitions = useAsyncData(getAdminCompetitions, []);

  const [form, setForm] = useState<AnnouncementForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal visibility state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Helpers ──────────────────────────────────────────────────────────────

  function openCreateModal() {
    setForm(emptyForm);
    setFormError("");
    setIsFormModalOpen(true);
  }

  function openEditModal(
    announcement: AdminAnnouncementRow & { competition_id?: string | null }
  ) {
    setForm({
      id: announcement.id,
      title: announcement.title,
      category: announcement.category,
      content: announcement.content ?? "",
      competition_id: announcement.competition_id ?? "",
      status: announcement.status,
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
      form.id
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
    if (!deleteTarget) return;
    setIsDeleting(true);
    const { error: deleteError } = await deleteAdminAnnouncement(deleteTarget.id);
    setIsDeleting(false);
    if (deleteError) setFormError(deleteError.message);
    setDeleteTarget(null);
    reload();
  }

  async function handleTogglePublish(announcement: AdminAnnouncementRow) {
    await saveAdminAnnouncement(
      {
        title: announcement.title,
        category: announcement.category,
        content: announcement.content ?? "-",
        status: announcement.status === "published" ? "draft" : "published",
      },
      announcement.id
    );
    reload();
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section>
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Pengumuman</h1>
          <p className="mt-1 text-sm text-slate-600">
            Draft dan pengumuman yang sudah diterbitkan.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-700"
        >
          <IconPlus />
          Tambah Pengumuman
        </button>
      </div>

      {/* Global error (e.g. delete error) */}
      {formError && !isFormModalOpen && (
        <div className="mt-4">
          <ErrorState message={formError} />
        </div>
      )}

      {/* Table */}
      <AdminPageState
        loading={loading}
        error={error}
        isEmpty={!data?.length}
        emptyDescription="Belum ada pengumuman."
      />
      <div className="mt-6">
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
                <tr key={announcement.id} className="border-t border-slate-100 transition-colors hover:bg-slate-50/50">
                  <td className="p-3 font-semibold text-slate-950">
                    {announcement.title}
                  </td>
                  <td className="p-3 text-slate-600">{announcement.category}</td>
                  <td className="p-3">
                    <span
                      className={
                        announcement.status === "published"
                          ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800"
                          : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"
                      }
                    >
                      {announcement.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">
                    {formatDate(announcement.published_at)}
                  </td>
                  <td className="p-3 text-slate-600">
                    {announcement.competitions?.name ?? "-"}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(announcement)}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => void handleTogglePublish(announcement)}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        {announcement.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() =>
                          setDeleteTarget({
                            id: announcement.id,
                            title: announcement.title,
                          })
                        }
                        className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-50"
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

      {/* ── Modals ── */}

      {isFormModalOpen && (
        <AnnouncementFormModal
          form={form}
          setForm={setForm}
          competitions={competitions.data ?? []}
          saving={saving}
          formError={formError}
          onSubmit={handleSubmit}
          onClose={closeFormModal}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          announcementTitle={deleteTarget.title}
          onConfirm={() => void handleDeleteConfirm()}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
        />
      )}
    </section>
  );
}