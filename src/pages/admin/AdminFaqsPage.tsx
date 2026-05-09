import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import { deleteAdminFaq, getAdminFaqs, saveAdminFaq, type AdminFaqRow } from "../../services/adminFaqs";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

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

export function AdminFaqsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminFaqs, []);
  const [form, setForm] = useState<FaqForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  function editFaq(faq: AdminFaqRow) {
    setForm({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      sort_order: String(faq.sort_order),
      is_active: faq.is_active,
    });
  }

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
    setForm(emptyForm);
    reload();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus FAQ ini?")) return;
    const { error: deleteError } = await deleteAdminFaq(id);
    if (deleteError) setFormError(deleteError.message);
    reload();
  }

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">FAQ</h1>
      <p className="mt-2 text-sm text-slate-600">Pertanyaan dan jawaban yang tampil di halaman publik.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
        <FormTextarea label="Pertanyaan" value={form.question} onChange={(event) => setForm((current) => ({ ...current, question: event.target.value }))} required />
        <FormTextarea label="Jawaban" value={form.answer} onChange={(event) => setForm((current) => ({ ...current, answer: event.target.value }))} required />
        <FormInput label="Urutan" type="number" value={form.sort_order} onChange={(event) => setForm((current) => ({ ...current, sort_order: event.target.value }))} />
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={form.is_active} onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked }))} />
          Aktif
        </label>
        <div className="flex items-end gap-2">
          <button disabled={saving} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white disabled:bg-slate-400">{saving ? "Menyimpan..." : form.id ? "Update FAQ" : "Tambah FAQ"}</button>
          {form.id ? <button type="button" onClick={() => setForm(emptyForm)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Batal</button> : null}
        </div>
        {formError ? <div className="md:col-span-2"><ErrorState message={formError} /></div> : null}
      </form>
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada FAQ." />
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
                <tr key={faq.id} className="border-t border-slate-100 align-top">
                  <td className="p-3 font-semibold text-slate-950">{faq.question}</td>
                  <td className="max-w-xl p-3 text-slate-700">{faq.answer}</td>
                  <td className="p-3">{faq.sort_order}</td>
                  <td className="p-3"><BooleanBadge value={faq.is_active} /></td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => editFaq(faq)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold">Edit</button>
                      <button onClick={() => void handleDelete(faq.id)} className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-bold text-rose-700">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </section>
  );
}
