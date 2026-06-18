import { useRef, useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { ErrorState } from "../../components/shared/ErrorState";
import {
  deactivateAdminSponsor,
  getAdminSponsors,
  saveAdminSponsor,
  uploadLogo,
  type AdminSponsorRow,
} from "../../services/adminSponsors";
import {
  deactivateAdminPartner,
  getAdminPartners,
  saveAdminPartner,
  type AdminPartnerRow,
} from "../../services/adminPartners";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

// ─── Shared Upload Field ──────────────────────────────────────────────────────

type LogoUploadFieldProps = {
  currentUrl: string | null;
  previewUrl: string | null;
  uploading: boolean;
  onFileChange: (file: File) => void;
};

function LogoUploadField({
  currentUrl,
  previewUrl,
  uploading,
  onFileChange,
}: LogoUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const displayUrl = previewUrl ?? currentUrl;

  return (
    <div className="md:col-span-2">
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        Logo
      </label>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
          {displayUrl ? (
            <img
              src={displayUrl}
              alt="preview"
              className="h-full w-full rounded-lg object-contain p-1"
            />
          ) : (
            <span className="text-[10px] text-slate-400">No logo</span>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            {uploading ? "Mengupload..." : "Pilih Foto"}
          </button>
          <p className="mt-1 text-[11px] text-slate-400">
            PNG, JPG, SVG — maks 2MB
          </p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileChange(file);
          }}
        />
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

type DeleteConfirmModalProps = {
  isOpen: boolean;
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function DeleteConfirmModal({
  isOpen,
  label,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 150ms ease-out" }}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        style={{ animation: "scaleUp 150ms ease-out" }}
        role="alertdialog"
        aria-modal="true"
      >
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
        <h3 className="text-center text-base font-bold text-slate-900">
          Nonaktifkan {label}?
        </h3>
        <p className="mt-2 text-center text-sm text-slate-500">
          Data ini akan dinonaktifkan dan tidak tampil di halaman publik. Dapat
          diaktifkan kembali kapan saja.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Ya, Nonaktifkan
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scaleUp { from{opacity:0;transform:scale(0.95) translateY(6px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  );
}

// ─── Sponsor Form Modal ───────────────────────────────────────────────────────

type SponsorForm = {
  id?: string;
  name: string;
  sponsor_type: string;
  website_url: string;
  sort_order: string;
  is_active: boolean;
  logo_url: string | null;
};

const emptySponsorForm: SponsorForm = {
  name: "",
  sponsor_type: "sponsor",
  website_url: "",
  sort_order: "0",
  is_active: true,
  logo_url: null,
};

type SponsorFormModalProps = {
  isOpen: boolean;
  form: SponsorForm;
  formError: string;
  saving: boolean;
  previewUrl: string | null;
  uploading: boolean;
  onChange: (updated: Partial<SponsorForm>) => void;
  onFileChange: (file: File) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

function SponsorFormModal({
  isOpen,
  form,
  formError,
  saving,
  previewUrl,
  uploading,
  onChange,
  onFileChange,
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
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl"
        style={{ animation: "scaleUp 150ms ease-out" }}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">
            {isEdit ? "Edit Sponsor" : "Tambah Sponsor"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
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
            <LogoUploadField
              currentUrl={form.logo_url}
              previewUrl={previewUrl}
              uploading={uploading}
              onFileChange={onFileChange}
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
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:bg-slate-400"
            >
              {saving
                ? "Menyimpan..."
                : isEdit
                  ? "Update Sponsor"
                  : "Tambah Sponsor"}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scaleUp { from{opacity:0;transform:scale(0.95) translateY(6px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  );
}

// ─── Partner Form Modal ───────────────────────────────────────────────────────

type PartnerForm = {
  id?: string;
  name: string;
  website_url: string;
  sort_order: string;
  is_active: boolean;
  logo_url: string | null;
};

const emptyPartnerForm: PartnerForm = {
  name: "",
  website_url: "",
  sort_order: "0",
  is_active: true,
  logo_url: null,
};

type PartnerFormModalProps = {
  isOpen: boolean;
  form: PartnerForm;
  formError: string;
  saving: boolean;
  previewUrl: string | null;
  uploading: boolean;
  onChange: (updated: Partial<PartnerForm>) => void;
  onFileChange: (file: File) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

function PartnerFormModal({
  isOpen,
  form,
  formError,
  saving,
  previewUrl,
  uploading,
  onChange,
  onFileChange,
  onSubmit,
  onClose,
}: PartnerFormModalProps) {
  if (!isOpen) return null;
  const isEdit = Boolean(form.id);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 150ms ease-out" }}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl"
        style={{ animation: "scaleUp 150ms ease-out" }}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">
            {isEdit ? "Edit Media Partner" : "Tambah Media Partner"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={onSubmit} className="px-6 py-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Nama"
              value={form.name}
              onChange={(e) => onChange({ name: e.target.value })}
              required
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
            <LogoUploadField
              currentUrl={form.logo_url}
              previewUrl={previewUrl}
              uploading={uploading}
              onFileChange={onFileChange}
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
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:bg-slate-400"
            >
              {saving
                ? "Menyimpan..."
                : isEdit
                  ? "Update Media Partner"
                  : "Tambah Media Partner"}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scaleUp { from{opacity:0;transform:scale(0.95) translateY(6px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminSponsorsPage() {
  // ── Sponsor state ─────────────────────────────────────────────────────────
  const {
    data: sponsorData,
    error: sponsorError,
    loading: sponsorLoading,
    reload: reloadSponsors,
  } = useAsyncData(getAdminSponsors, []);

  const [sponsorForm, setSponsorForm] = useState<SponsorForm>(emptySponsorForm);
  const [sponsorFormError, setSponsorFormError] = useState("");
  const [sponsorSaving, setSponsorSaving] = useState(false);
  const [sponsorUploading, setSponsorUploading] = useState(false);
  const [sponsorPreview, setSponsorPreview] = useState<string | null>(null);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [sponsorDeleteId, setSponsorDeleteId] = useState<string | null>(null);

  // ── Partner state ─────────────────────────────────────────────────────────
  const {
    data: partnerData,
    error: partnerError,
    loading: partnerLoading,
    reload: reloadPartners,
  } = useAsyncData(getAdminPartners, []);

  const [partnerForm, setPartnerForm] = useState<PartnerForm>(emptyPartnerForm);
  const [partnerFormError, setPartnerFormError] = useState("");
  const [partnerSaving, setPartnerSaving] = useState(false);
  const [partnerUploading, setPartnerUploading] = useState(false);
  const [partnerPreview, setPartnerPreview] = useState<string | null>(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerDeleteId, setPartnerDeleteId] = useState<string | null>(null);

  // ── Sponsor handlers ──────────────────────────────────────────────────────

  function openCreateSponsor() {
    setSponsorForm(emptySponsorForm);
    setSponsorPreview(null);
    setSponsorFormError("");
    setIsSponsorModalOpen(true);
  }

  function openEditSponsor(s: AdminSponsorRow) {
    setSponsorForm({
      id: s.id,
      name: s.name,
      sponsor_type: s.sponsor_type,
      website_url: s.website_url ?? "",
      sort_order: String(s.sort_order),
      is_active: s.is_active,
      logo_url: s.logo_url,
    });
    setSponsorPreview(null);
    setSponsorFormError("");
    setIsSponsorModalOpen(true);
  }

  function closeSponsorModal() {
    setIsSponsorModalOpen(false);
    setSponsorForm(emptySponsorForm);
    setSponsorPreview(null);
    setSponsorFormError("");
  }

  async function handleSponsorFileChange(file: File) {
    setSponsorUploading(true);
    setSponsorPreview(URL.createObjectURL(file));
    const { url, error } = await uploadLogo(file, "sponsors");
    setSponsorUploading(false);
    if (error) {
      setSponsorFormError(error.message);
      return;
    }
    setSponsorForm((cur) => ({ ...cur, logo_url: url }));
  }

  async function handleSponsorSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSponsorFormError("");
    if (!sponsorForm.name.trim()) {
      setSponsorFormError("Nama sponsor wajib diisi.");
      return;
    }
    setSponsorSaving(true);
    const { error } = await saveAdminSponsor(
      {
        name: sponsorForm.name.trim(),
        sponsor_type: sponsorForm.sponsor_type.trim() || "sponsor",
        website_url: sponsorForm.website_url.trim() || null,
        sort_order: Number(sponsorForm.sort_order || 0),
        is_active: sponsorForm.is_active,
        logo_url: sponsorForm.logo_url,
      },
      sponsorForm.id,
    );
    setSponsorSaving(false);
    if (error) {
      setSponsorFormError(error.message);
      return;
    }
    closeSponsorModal();
    reloadSponsors();
  }

  async function handleSponsorDeactivate() {
    if (!sponsorDeleteId) return;
    await deactivateAdminSponsor(sponsorDeleteId);
    setSponsorDeleteId(null);
    reloadSponsors();
  }

  // ── Partner handlers ──────────────────────────────────────────────────────

  function openCreatePartner() {
    setPartnerForm(emptyPartnerForm);
    setPartnerPreview(null);
    setPartnerFormError("");
    setIsPartnerModalOpen(true);
  }

  function openEditPartner(p: AdminPartnerRow) {
    setPartnerForm({
      id: p.id,
      name: p.name,
      website_url: p.website_url ?? "",
      sort_order: String(p.sort_order),
      is_active: p.is_active,
      logo_url: p.logo_url,
    });
    setPartnerPreview(null);
    setPartnerFormError("");
    setIsPartnerModalOpen(true);
  }

  function closePartnerModal() {
    setIsPartnerModalOpen(false);
    setPartnerForm(emptyPartnerForm);
    setPartnerPreview(null);
    setPartnerFormError("");
  }

  async function handlePartnerFileChange(file: File) {
    setPartnerUploading(true);
    setPartnerPreview(URL.createObjectURL(file));
    const { url, error } = await uploadLogo(file, "partners");
    setPartnerUploading(false);
    if (error) {
      setPartnerFormError(error.message);
      return;
    }
    setPartnerForm((cur) => ({ ...cur, logo_url: url }));
  }

  async function handlePartnerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPartnerFormError("");
    if (!partnerForm.name.trim()) {
      setPartnerFormError("Nama media partner wajib diisi.");
      return;
    }
    setPartnerSaving(true);
    const { error } = await saveAdminPartner(
      {
        name: partnerForm.name.trim(),
        website_url: partnerForm.website_url.trim() || null,
        sort_order: Number(partnerForm.sort_order || 0),
        is_active: partnerForm.is_active,
        logo_url: partnerForm.logo_url,
      },
      partnerForm.id,
    );
    setPartnerSaving(false);
    if (error) {
      setPartnerFormError(error.message);
      return;
    }
    closePartnerModal();
    reloadPartners();
  }

  async function handlePartnerDeactivate() {
    if (!partnerDeleteId) return;
    await deactivateAdminPartner(partnerDeleteId);
    setPartnerDeleteId(null);
    reloadPartners();
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section className="space-y-12">
      {/* ═══════════════ SPONSOR ═══════════════ */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-950">Sponsor</h1>
            <p className="mt-1 text-sm text-slate-600">
              Daftar sponsor event GAMES 2026.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateSponsor}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5v14" />
            </svg>
            Tambah Sponsor
          </button>
        </div>

        <AdminPageState
          loading={sponsorLoading}
          error={sponsorError}
          isEmpty={!sponsorData?.length}
          emptyDescription="Belum ada sponsor."
        />

        {!sponsorLoading && !sponsorError && !!sponsorData?.length && (
          <div className="mt-6">
            <DataTable>
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="p-3">Logo</th>
                    <th className="p-3">Nama</th>
                    <th className="p-3">Tipe</th>
                    <th className="p-3">Website</th>
                    <th className="p-3">Aktif</th>
                    <th className="p-3">Urutan</th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {sponsorData?.map((s: AdminSponsorRow) => (
                    <tr key={s.id} className="border-t border-slate-100">
                      <td className="p-3">
                        {s.logo_url ? (
                          <img
                            src={s.logo_url}
                            alt={s.name}
                            className="h-8 w-14 object-contain"
                          />
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>
                      <td className="p-3 font-semibold text-slate-950">
                        {s.name}
                      </td>
                      <td className="p-3">{s.sponsor_type}</td>
                      <td className="p-3 max-w-[160px] truncate">
                        {s.website_url ?? "-"}
                      </td>
                      <td className="p-3">
                        <BooleanBadge value={s.is_active} />
                      </td>
                      <td className="p-3">{s.sort_order}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditSponsor(s)}
                            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold transition hover:bg-slate-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setSponsorDeleteId(s.id)}
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
        )}
      </div>

      {/* ═══════════════ MEDIA PARTNER ═══════════════ */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-950">
              Media Partner
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Daftar media partner event GAMES 2026.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreatePartner}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5v14" />
            </svg>
            Tambah Media Partner
          </button>
        </div>

        <AdminPageState
          loading={partnerLoading}
          error={partnerError}
          isEmpty={!partnerData?.length}
          emptyDescription="Belum ada media partner."
        />

        {!partnerLoading && !partnerError && !!partnerData?.length && (
          <div className="mt-6">
            <DataTable>
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="p-3">Logo</th>
                    <th className="p-3">Nama</th>
                    <th className="p-3">Website</th>
                    <th className="p-3">Aktif</th>
                    <th className="p-3">Urutan</th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {partnerData?.map((p: AdminPartnerRow) => (
                    <tr key={p.id} className="border-t border-slate-100">
                      <td className="p-3">
                        {p.logo_url ? (
                          <img
                            src={p.logo_url}
                            alt={p.name}
                            className="h-8 w-14 object-contain"
                          />
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>
                      <td className="p-3 font-semibold text-slate-950">
                        {p.name}
                      </td>
                      <td className="p-3 max-w-[160px] truncate">
                        {p.website_url ?? "-"}
                      </td>
                      <td className="p-3">
                        <BooleanBadge value={p.is_active} />
                      </td>
                      <td className="p-3">{p.sort_order}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditPartner(p)}
                            className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold transition hover:bg-slate-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setPartnerDeleteId(p.id)}
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
        )}
      </div>

      {/* ── Modals ── */}
      <SponsorFormModal
        isOpen={isSponsorModalOpen}
        form={sponsorForm}
        formError={sponsorFormError}
        saving={sponsorSaving}
        previewUrl={sponsorPreview}
        uploading={sponsorUploading}
        onChange={(u) => setSponsorForm((c) => ({ ...c, ...u }))}
        onFileChange={handleSponsorFileChange}
        onSubmit={handleSponsorSubmit}
        onClose={closeSponsorModal}
      />

      <PartnerFormModal
        isOpen={isPartnerModalOpen}
        form={partnerForm}
        formError={partnerFormError}
        saving={partnerSaving}
        previewUrl={partnerPreview}
        uploading={partnerUploading}
        onChange={(u) => setPartnerForm((c) => ({ ...c, ...u }))}
        onFileChange={handlePartnerFileChange}
        onSubmit={handlePartnerSubmit}
        onClose={closePartnerModal}
      />

      <DeleteConfirmModal
        isOpen={sponsorDeleteId !== null}
        label="Sponsor"
        onConfirm={() => void handleSponsorDeactivate()}
        onCancel={() => setSponsorDeleteId(null)}
      />

      <DeleteConfirmModal
        isOpen={partnerDeleteId !== null}
        label="Media Partner"
        onConfirm={() => void handlePartnerDeactivate()}
        onCancel={() => setPartnerDeleteId(null)}
      />
    </section>
  );
}
