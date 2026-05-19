import { useState } from "react";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormSelect } from "../../components/admin/FormSelect";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import {
  deactivateAdminPaymentMethod,
  deleteAdminPaymentMethod,
  getAdminPaymentMethods,
  saveAdminPaymentMethod,
} from "../../services/adminPaymentMethods";
import type { PaymentMethod, PaymentMethodType } from "../../types/models";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

// ─────────────────────────────────────────────────────────────────────────────
// Types & constants
// ─────────────────────────────────────────────────────────────────────────────

type PaymentMethodForm = {
  id?: string;
  type: PaymentMethodType;
  label: string;
  bank_name: string;
  account_number: string;
  account_holder: string;
  qris_image_url: string;
  notes: string;
  sort_order: string;
  is_active: boolean;
};

const emptyForm: PaymentMethodForm = {
  type: "qris",
  label: "",
  bank_name: "",
  account_number: "",
  account_holder: "",
  qris_image_url: "",
  notes: "",
  sort_order: "0",
  is_active: true,
};

const typeOptions = [
  { label: "QRIS", value: "qris" },
  { label: "Transfer Bank", value: "bank_transfer" },
  { label: "E-Wallet", value: "ewallet" },
];

// ─────────────────────────────────────────────────────────────────────────────
// FormModal component
// ─────────────────────────────────────────────────────────────────────────────

interface FormModalProps {
  isOpen: boolean;
  form: PaymentMethodForm;
  formError: string;
  saving: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (field: Partial<PaymentMethodForm>) => void;
}

function FormModal({ isOpen, form, formError, saving, onClose, onSubmit, onChange }: FormModalProps) {
  if (!isOpen) return null;

  const isEdit = Boolean(form.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-xl animate-in fade-in zoom-in-95 duration-200 rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 id="modal-title" className="text-lg font-black text-slate-950">
            {isEdit ? "Edit Metode Pembayaran" : "Tambah Metode Pembayaran"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} className="grid gap-4 px-6 py-5 md:grid-cols-2 max-h-[70vh] overflow-y-auto">
          <FormSelect
            label="Tipe"
            value={form.type}
            onChange={(e) => onChange({ type: e.target.value as PaymentMethodType })}
            options={typeOptions}
          />
          <FormInput
            label="Label"
            value={form.label}
            onChange={(e) => onChange({ label: e.target.value })}
            required
          />

          {form.type === "qris" && (
            <div className="md:col-span-2">
              <FormInput
                label="URL Gambar QRIS"
                value={form.qris_image_url}
                onChange={(e) => onChange({ qris_image_url: e.target.value })}
                required
              />
            </div>
          )}

          {form.type === "bank_transfer" && (
            <>
              <FormInput
                label="Nama Bank"
                value={form.bank_name}
                onChange={(e) => onChange({ bank_name: e.target.value })}
                required
              />
              <FormInput
                label="Nomor Rekening"
                value={form.account_number}
                onChange={(e) => onChange({ account_number: e.target.value })}
                required
              />
              <div className="md:col-span-2">
                <FormInput
                  label="Nama Pemilik Rekening"
                  value={form.account_holder}
                  onChange={(e) => onChange({ account_holder: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          <FormInput
            label="Urutan"
            type="number"
            value={form.sort_order}
            onChange={(e) => onChange({ sort_order: e.target.value })}
          />

          <div className="md:col-span-2">
            <FormTextarea
              label="Catatan / Instruksi"
              value={form.notes}
              onChange={(e) => onChange({ notes: e.target.value })}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => onChange({ is_active: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
            />
            Aktif
          </label>

          {formError && (
            <div className="md:col-span-2">
              <ErrorState message={formError} />
            </div>
          )}

          {/* Footer actions inside form so submit works */}
          <div className="md:col-span-2 flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {saving ? "Menyimpan..." : isEdit ? "Update Metode" : "Simpan Metode"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────────────────────────────────────

export function AdminPaymentMethodsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminPaymentMethods, []);

  const [form, setForm] = useState<PaymentMethodForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirm, setConfirm] = useState<{
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  // ── helpers ──────────────────────────────────────────────────────────────

  function openCreateModal() {
    setForm(emptyForm);
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(method: PaymentMethod) {
    setForm({
      id: method.id,
      type: method.type,
      label: method.label,
      bank_name: method.bank_name ?? "",
      account_number: method.account_number ?? "",
      account_holder: method.account_holder ?? "",
      qris_image_url: method.qris_image_url ?? "",
      notes: method.notes ?? "",
      sort_order: String(method.sort_order),
      is_active: method.is_active,
    });
    setFormError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setForm(emptyForm);
    setFormError("");
  }

  function handleFormChange(partial: Partial<PaymentMethodForm>) {
    setForm((current) => ({ ...current, ...partial }));
  }

  // ── submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!form.label.trim()) {
      setFormError("Label metode pembayaran wajib diisi.");
      return;
    }

    if (
      form.type === "bank_transfer" &&
      (!form.bank_name.trim() || !form.account_number.trim() || !form.account_holder.trim())
    ) {
      setFormError("Nama bank, nomor rekening, dan nama pemilik wajib diisi untuk transfer bank.");
      return;
    }

    if (form.type === "qris" && !form.qris_image_url.trim()) {
      setFormError("URL gambar QRIS wajib diisi untuk metode QRIS.");
      return;
    }

    setSaving(true);
    const { error: saveError } = await saveAdminPaymentMethod(
      {
        type: form.type,
        label: form.label.trim(),
        bank_name: form.bank_name.trim() || null,
        account_number: form.account_number.trim() || null,
        account_holder: form.account_holder.trim() || null,
        qris_image_url: form.qris_image_url.trim() || null,
        notes: form.notes.trim() || null,
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

    closeModal();
    reload();
  }

  // ── confirm actions ───────────────────────────────────────────────────────

  function requestDeactivate(method: PaymentMethod) {
    setConfirm({
      title: "Nonaktifkan metode pembayaran?",
      description: `${method.label} tidak akan ditampilkan lagi ke peserta baru.`,
      onConfirm: async () => {
        const { error: updateError } = await deactivateAdminPaymentMethod(method.id);
        if (updateError) setFormError(updateError.message);
        reload();
      },
    });
  }

  function requestDelete(method: PaymentMethod) {
    setConfirm({
      title: "Hapus metode pembayaran?",
      description: `Hapus "${method.label}"? Database akan menolak jika metode ini sudah dipakai oleh peserta.`,
      onConfirm: async () => {
        const { error: deleteError } = await deleteAdminPaymentMethod(method.id);
        if (deleteError) setFormError(deleteError.message);
        reload();
      },
    });
  }

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <section>
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Metode Pembayaran</h1>
          <p className="mt-1 text-sm text-slate-600">
            Kelola QRIS dan rekening transfer manual yang ditampilkan di halaman pendaftaran.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-cyan-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Tambah Metode
        </button>
      </div>

      {/* Global form errors shown outside modal (e.g. deactivate/delete errors) */}
      {formError && !isModalOpen && (
        <div className="mt-4">
          <ErrorState message={formError} />
        </div>
      )}

      {/* Table */}
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada metode pembayaran." />
      <div className="mt-6">
        <DataTable>
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Label</th>
                <th className="p-3">Tipe</th>
                <th className="p-3">Detail</th>
                <th className="p-3">Aktif</th>
                <th className="p-3">Urutan</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((method) => (
                <tr key={method.id} className="border-t border-slate-100 align-top">
                  <td className="p-3 font-semibold text-slate-950">{method.label}</td>
                  <td className="p-3">{formatPaymentType(method.type)}</td>
                  <td className="p-3 text-slate-700">
                    {method.type === "bank_transfer"
                      ? `${method.bank_name ?? "-"} · ${method.account_number ?? "-"} a.n. ${method.account_holder ?? "-"}`
                      : null}
                    {method.type === "qris" ? method.qris_image_url ?? "-" : null}
                    {method.type === "ewallet" ? method.notes ?? "-" : null}
                  </td>
                  <td className="p-3">
                    <BooleanBadge value={method.is_active} />
                  </td>
                  <td className="p-3">{method.sort_order}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openEditModal(method)}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold transition-colors hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      {method.is_active && (
                        <button
                          onClick={() => requestDeactivate(method)}
                          className="rounded-lg border border-amber-300 px-3 py-1 text-xs font-bold text-amber-700 transition-colors hover:bg-amber-50"
                        >
                          Nonaktifkan
                        </button>
                      )}
                      <button
                        onClick={() => requestDelete(method)}
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

      {/* Form Modal (Create & Edit) */}
      <FormModal
        isOpen={isModalOpen}
        form={form}
        formError={formError}
        saving={saving}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onChange={handleFormChange}
      />

      {/* Delete / Deactivate Confirmation Dialog */}
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

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatPaymentType(type: PaymentMethodType) {
  if (type === "qris") return "QRIS";
  if (type === "bank_transfer") return "Transfer Bank";
  return "E-Wallet";
}