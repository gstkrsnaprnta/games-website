import { useMemo, useState } from "react";
import { Copy } from "lucide-react";
import { FormInput } from "../../components/admin/FormInput";
import { FormSelect } from "../../components/admin/FormSelect";
import { FormTextarea } from "../../components/admin/FormTextarea";
import { PageHero } from "../../components/public/PageHero";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getOpenCompetitions } from "../../services/competitions";
import {
  createRegistration,
  createRegistrationMembers,
  getNextRegistrationCode,
} from "../../services/registrations";
import { useAsyncData } from "../../utils/useAsyncData";

type FormState = {
  competition_id: string;
  level: string;
  participant_type: "individual" | "team";
  team_name: string;
  leader_name: string;
  email: string;
  whatsapp: string;
  institution: string;
  payment_proof_url: string;
  submission_url: string;
  members: string;
  agreement: boolean;
};

const initialForm: FormState = {
  competition_id: "",
  level: "",
  participant_type: "individual",
  team_name: "",
  leader_name: "",
  email: "",
  whatsapp: "",
  institution: "",
  payment_proof_url: "",
  submission_url: "",
  members: "",
  agreement: false,
};

export function RegisterPage() {
  const competitions = useAsyncData(getOpenCompetitions, []);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [successCode, setSuccessCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedCompetition = useMemo(
    () => competitions.data?.find((competition) => competition.id === form.competition_id) ?? null,
    [competitions.data, form.competition_id],
  );

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccessCode("");

    if (!selectedCompetition?.event_id) {
      setError("Pilih lomba yang tersedia.");
      return;
    }

    if (!form.level || !form.leader_name || !form.email || !form.whatsapp || !form.institution || !form.agreement) {
      setError("Lengkapi semua field wajib dan centang persetujuan.");
      return;
    }

    if (form.participant_type === "team" && !form.team_name.trim()) {
      setError("Nama tim wajib diisi untuk pendaftaran tim.");
      return;
    }

    setSubmitting(true);
    const registrationId = crypto.randomUUID();
    const codeResult = await getNextRegistrationCode(form.competition_id);

    if (codeResult.error || !codeResult.data) {
      setSubmitting(false);
      setError(codeResult.error?.message ?? "Nomor registrasi belum bisa dibuat.");
      return;
    }

    const registrationResult = await createRegistration({
      id: registrationId,
      event_id: selectedCompetition.event_id,
      competition_id: form.competition_id,
      registration_code: codeResult.data,
      participant_type: form.participant_type,
      team_name: form.team_name.trim() || null,
      leader_name: form.leader_name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      institution: form.institution.trim(),
      level: form.level,
      payment_proof_url: form.payment_proof_url.trim() || null,
      submission_url: form.submission_url.trim() || null,
      payment_status: form.payment_proof_url.trim() ? "pending" : "unpaid",
      submission_status: form.submission_url.trim() ? "pending" : "not_required",
    });

    if (registrationResult.error) {
      setSubmitting(false);
      setError(registrationResult.error.message);
      return;
    }

    const members = form.members
      .split("\n")
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => ({ registration_id: registrationId, name, role: "Anggota" }));

    const membersResult = await createRegistrationMembers(members);
    setSubmitting(false);

    if (membersResult.error) {
      setError(membersResult.error.message);
      return;
    }

    setSuccessCode(codeResult.data);
    setForm(initialForm);
  }

  if (successCode) {
    return (
      <section className="container-page max-w-3xl py-14">
        <div className="rounded-[2rem] border border-[#004551]/10 bg-[#c2e1df]/70 p-6 text-center shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#770525]">Pendaftaran berhasil</p>
          <h1 className="mt-3 text-3xl font-black text-[#004551] md:text-5xl">Simpan nomor registrasi kamu</h1>
          <p className="mt-6 rounded-[1.4rem] bg-white p-5 text-2xl font-black text-[#770525] md:text-4xl">{successCode}</p>
          <button
            type="button"
            onClick={() => void navigator.clipboard?.writeText(successCode)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#770525] px-5 py-3 text-sm font-black text-white"
          >
            <Copy size={16} /> Salin Kode
          </button>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#004551]/75">
            Gunakan nomor ini bersama email atau WhatsApp untuk cek status pendaftaran.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Pendaftaran" title="Daftarkan diri atau timmu" description="Isi data dengan benar. Nomor registrasi akan muncul setelah pendaftaran berhasil disimpan." />
      <section className="container-page max-w-4xl py-12">
        <div className="mb-6">
          {competitions.loading ? <LoadingState /> : null}
          {competitions.error ? <ErrorState message={competitions.error} /> : null}
          {!competitions.loading && !competitions.error && competitions.data?.length === 0 ? (
            <EmptyState description="Belum ada lomba yang membuka pendaftaran." />
          ) : null}
        </div>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <FormGroup step="01" title="Pilih Lomba">
            <FormSelect label="Pilihan lomba" value={form.competition_id} onChange={(event) => updateField("competition_id", event.target.value)} required options={[{ label: "Pilih lomba", value: "" }, ...(competitions.data?.map((competition) => ({ label: competition.name, value: competition.id })) ?? [])]} />
            <FormSelect label="Jenjang" value={form.level} onChange={(event) => updateField("level", event.target.value)} required options={[{ label: "Pilih jenjang", value: "" }, { label: "SD/sederajat", value: "SD" }, { label: "SMP/sederajat", value: "SMP" }, { label: "SMA/sederajat", value: "SMA" }, { label: "Mahasiswa", value: "Mahasiswa" }]} />
          </FormGroup>
          <FormGroup step="02" title="Data Peserta / Ketua">
            <FormSelect label="Tipe peserta" value={form.participant_type} onChange={(event) => updateField("participant_type", event.target.value as FormState["participant_type"])} options={[{ label: "Individu", value: "individual" }, { label: "Tim", value: "team" }]} />
            <FormInput label="Nama peserta utama / ketua tim" value={form.leader_name} onChange={(event) => updateField("leader_name", event.target.value)} required />
            <FormInput label="Email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
            <FormInput label="Nomor WhatsApp" value={form.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} required />
            <FormInput label="Asal sekolah/kampus/instansi" value={form.institution} onChange={(event) => updateField("institution", event.target.value)} required />
          </FormGroup>
          <FormGroup step="03" title="Data Tim / Anggota">
            <FormInput label="Nama tim" value={form.team_name} onChange={(event) => updateField("team_name", event.target.value)} />
            <FormTextarea label="Anggota tim" placeholder="Satu nama per baris" value={form.members} onChange={(event) => updateField("members", event.target.value)} />
          </FormGroup>
          <FormGroup step="04" title="Pembayaran / Berkas">
            <FormInput label="Link bukti pembayaran" value={form.payment_proof_url} onChange={(event) => updateField("payment_proof_url", event.target.value)} />
            <FormInput label="Link karya / berkas Google Drive" value={form.submission_url} onChange={(event) => updateField("submission_url", event.target.value)} />
          </FormGroup>
          <div className="games-card rounded-[1.5rem] p-5">
            <label className="flex gap-3 text-sm font-semibold text-[#004551]">
              <input type="checkbox" checked={form.agreement} onChange={(event) => updateField("agreement", event.target.checked)} required />
              Saya menyetujui syarat dan ketentuan lomba.
            </label>
            {error ? <div className="mt-4"><ErrorState message={error} /></div> : null}
            <button disabled={submitting || competitions.loading} className="games-button mt-5 w-full rounded-full bg-[#770525] px-6 py-4 font-black text-white disabled:cursor-not-allowed disabled:bg-stone-400">
              {submitting ? "Mengirim..." : "Kirim Pendaftaran"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

function FormGroup({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <section className="games-card rounded-[1.7rem] p-5 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-[#770525] text-sm font-black text-white">{step}</span>
        <h2 className="text-xl font-black text-[#004551]">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}
