import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { ErrorState } from "../../components/shared/ErrorState";
import { deactivateAdminSponsor, getAdminSponsors, saveAdminSponsor, type AdminSponsorRow } from "../../services/adminSponsors";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

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

export function AdminSponsorsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminSponsors, []);
  const [form, setForm] = useState<SponsorForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  function editSponsor(sponsor: AdminSponsorRow) {
    setForm({
      id: sponsor.id,
      name: sponsor.name,
      sponsor_type: sponsor.sponsor_type,
      website_url: sponsor.website_url ?? "",
      sort_order: String(sponsor.sort_order),
      is_active: sponsor.is_active,
    });
  }

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
    setForm(emptyForm);
    reload();
  }

  async function handleDeactivate(id: string) {
    if (!confirm("Nonaktifkan sponsor ini?")) return;
    const { error: updateError } = await deactivateAdminSponsor(id);
    if (updateError) setFormError(updateError.message);
    reload();
  }

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Sponsor dan Media Partner</h1>
      <p className="mt-2 text-sm text-slate-600">Daftar sponsor dan media partner event.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
        <FormInput label="Nama" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
        <FormInput label="Tipe" value={form.sponsor_type} onChange={(event) => setForm((current) => ({ ...current, sponsor_type: event.target.value }))} />
        <FormInput label="Website URL" value={form.website_url} onChange={(event) => setForm((current) => ({ ...current, website_url: event.target.value }))} />
        <FormInput label="Urutan" type="number" value={form.sort_order} onChange={(event) => setForm((current) => ({ ...current, sort_order: event.target.value }))} />
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={form.is_active} onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked }))} />
          Aktif
        </label>
        <div className="flex items-end gap-2">
          <button disabled={saving} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white disabled:bg-slate-400">{saving ? "Menyimpan..." : form.id ? "Update Sponsor" : "Tambah Sponsor"}</button>
          {form.id ? <button type="button" onClick={() => setForm(emptyForm)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Batal</button> : null}
        </div>
        {formError ? <div className="md:col-span-2"><ErrorState message={formError} /></div> : null}
      </form>
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada sponsor atau media partner." />
      <div className="mt-4">
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
                  <td className="p-3"><BooleanBadge value={sponsor.is_active} /></td>
                  <td className="p-3">{sponsor.sort_order}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => editSponsor(sponsor)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold">Edit</button>
                      <button onClick={() => void handleDeactivate(sponsor.id)} className="rounded-lg border border-amber-300 px-3 py-1 text-xs font-bold text-amber-700">Nonaktifkan</button>
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
