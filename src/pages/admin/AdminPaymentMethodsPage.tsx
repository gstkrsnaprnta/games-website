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

export function AdminPaymentMethodsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminPaymentMethods, []);
  const [form, setForm] = useState<PaymentMethodForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<{ title: string; description: string; onConfirm: () => Promise<void> } | null>(null);

  function editPaymentMethod(method: PaymentMethod) {
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
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!form.label.trim()) {
      setFormError("Label metode pembayaran wajib diisi.");
      return;
    }

    if (form.type === "bank_transfer" && (!form.bank_name.trim() || !form.account_number.trim() || !form.account_holder.trim())) {
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

    setForm(emptyForm);
    reload();
  }

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
      description: `Hapus ${method.label}? Database akan menolak jika metode ini sudah dipakai oleh peserta.`,
      onConfirm: async () => {
        const { error: deleteError } = await deleteAdminPaymentMethod(method.id);
        if (deleteError) setFormError(deleteError.message);
        reload();
      },
    });
  }

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Metode Pembayaran</h1>
      <p className="mt-2 text-sm text-slate-600">Kelola QRIS dan rekening transfer manual yang ditampilkan di halaman pendaftaran.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
        <FormSelect
          label="Tipe"
          value={form.type}
          onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as PaymentMethodType }))}
          options={typeOptions}
        />
        <FormInput label="Label" value={form.label} onChange={(event) => setForm((current) => ({ ...current, label: event.target.value }))} required />

        {form.type === "qris" ? (
          <FormInput label="URL gambar QRIS" value={form.qris_image_url} onChange={(event) => setForm((current) => ({ ...current, qris_image_url: event.target.value }))} required />
        ) : null}

        {form.type === "bank_transfer" ? (
          <>
            <FormInput label="Nama bank" value={form.bank_name} onChange={(event) => setForm((current) => ({ ...current, bank_name: event.target.value }))} required />
            <FormInput label="Nomor rekening" value={form.account_number} onChange={(event) => setForm((current) => ({ ...current, account_number: event.target.value }))} required />
            <FormInput label="Nama pemilik rekening" value={form.account_holder} onChange={(event) => setForm((current) => ({ ...current, account_holder: event.target.value }))} required />
          </>
        ) : null}

        <FormInput label="Urutan" type="number" value={form.sort_order} onChange={(event) => setForm((current) => ({ ...current, sort_order: event.target.value }))} />
        <div className="md:col-span-2">
          <FormTextarea label="Catatan / instruksi" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={form.is_active} onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked }))} />
          Aktif
        </label>
        <div className="flex items-end gap-2">
          <button disabled={saving} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white disabled:bg-slate-400">
            {saving ? "Menyimpan..." : form.id ? "Update Metode" : "Tambah Metode"}
          </button>
          {form.id ? <button type="button" onClick={() => setForm(emptyForm)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Batal</button> : null}
        </div>
        {formError ? <div className="md:col-span-2"><ErrorState message={formError} /></div> : null}
      </form>

      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada metode pembayaran." />
      <div className="mt-4">
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
                    {method.type === "bank_transfer" ? `${method.bank_name ?? "-"} - ${method.account_number ?? "-"} a.n. ${method.account_holder ?? "-"}` : null}
                    {method.type === "qris" ? method.qris_image_url ?? "-" : null}
                    {method.type === "ewallet" ? method.notes ?? "-" : null}
                  </td>
                  <td className="p-3"><BooleanBadge value={method.is_active} /></td>
                  <td className="p-3">{method.sort_order}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => editPaymentMethod(method)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold">Edit</button>
                      {method.is_active ? <button onClick={() => requestDeactivate(method)} className="rounded-lg border border-amber-300 px-3 py-1 text-xs font-bold text-amber-700">Nonaktifkan</button> : null}
                      <button onClick={() => requestDelete(method)} className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-bold text-rose-700">Hapus</button>
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

function formatPaymentType(type: PaymentMethodType) {
  if (type === "qris") return "QRIS";
  if (type === "bank_transfer") return "Transfer Bank";
  return "E-Wallet";
}
