import { useState } from "react";
import { DataTable } from "../../components/admin/DataTable";
import { FormInput } from "../../components/admin/FormInput";
import { FormSelect } from "../../components/admin/FormSelect";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { ErrorState } from "../../components/shared/ErrorState";
import { deleteAdminCompetition, getAdminCompetitions, saveAdminCompetition } from "../../services/adminCompetitions";
import type { Competition } from "../../types/models";
import { useAsyncData } from "../../utils/useAsyncData";
import { AdminPageState, BooleanBadge } from "./adminPageUtils";

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

export function AdminCompetitionsPage() {
  const { data, error, loading, reload } = useAsyncData(getAdminCompetitions, []);
  const [form, setForm] = useState<CompetitionForm>(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  function editCompetition(competition: Competition) {
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
  }

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
        participant_levels: form.participant_levels.split(",").map((item) => item.trim()).filter(Boolean),
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
    setForm(emptyForm);
    reload();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus lomba ini?")) return;
    const { error: deleteError } = await deleteAdminCompetition(id);
    if (deleteError) setFormError(deleteError.message);
    reload();
  }

  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Lomba</h1>
      <p className="mt-2 text-sm text-slate-600">Semua cabang lomba, termasuk yang nonaktif atau pendaftaran tertutup.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
        <FormInput label="Nama lomba" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
        <FormInput label="Kode" value={form.code} onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))} required />
        <FormInput label="Jenjang peserta" placeholder="SD, SMP, SMA" value={form.participant_levels} onChange={(event) => setForm((current) => ({ ...current, participant_levels: event.target.value }))} />
        <FormInput label="Biaya pendaftaran" type="number" value={form.registration_fee} onChange={(event) => setForm((current) => ({ ...current, registration_fee: event.target.value }))} />
        <FormSelect label="Status pendaftaran" value={form.registration_status} onChange={(event) => setForm((current) => ({ ...current, registration_status: event.target.value as CompetitionForm["registration_status"] }))} options={[{ label: "Buka", value: "open" }, { label: "Tutup", value: "closed" }]} />
        <FormSelect label="Tipe lomba" value={form.competition_type} onChange={(event) => setForm((current) => ({ ...current, competition_type: event.target.value as CompetitionForm["competition_type"] }))} options={[{ label: "Individu", value: "individual" }, { label: "Tim", value: "team" }]} />
        <FormTextarea label="Deskripsi singkat" value={form.short_description} onChange={(event) => setForm((current) => ({ ...current, short_description: event.target.value }))} />
        <FormTextarea label="Deskripsi" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={form.is_active} onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked }))} />
          Aktif
        </label>
        <div className="flex items-end gap-2">
          <button disabled={saving} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white disabled:bg-slate-400">{saving ? "Menyimpan..." : form.id ? "Update Lomba" : "Tambah Lomba"}</button>
          {form.id ? <button type="button" onClick={() => setForm(emptyForm)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Batal</button> : null}
        </div>
        {formError ? <div className="md:col-span-2"><ErrorState message={formError} /></div> : null}
      </form>
      <AdminPageState loading={loading} error={error} isEmpty={!data?.length} emptyDescription="Belum ada lomba." />
      <div className="mt-4">
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
                    <span className={competition.registration_status === "open" ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800" : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"}>
                      {competition.registration_status === "open" ? "Buka" : "Tutup"}
                    </span>
                  </td>
                  <td className="p-3"><BooleanBadge value={competition.is_active} /></td>
                  <td className="p-3">Rp{competition.registration_fee.toLocaleString("id-ID")}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => editCompetition(competition)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold">Edit</button>
                      <button onClick={() => void handleDelete(competition.id)} className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-bold text-rose-700">Hapus</button>
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
