import { useMemo, useState } from "react";
import { CheckCircle, Copy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PublicFormInput } from "../../components/public/PublicFormInput";
import { PublicFormSelect } from "../../components/public/PublicFormSelect";
import { PublicFormTextarea } from "../../components/public/PublicFormTextarea";
import { PageHero } from "../../components/public/PageHero";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getOpenCompetitions } from "../../services/competitions";
import { getActivePaymentMethods } from "../../services/paymentMethods";
import {
  createRegistration,
  createRegistrationMembers,
  getNextRegistrationCode,
} from "../../services/registrations";
import type { PaymentMethod } from "../../types/models";
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
  payment_method_id: string;
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
  payment_method_id: "",
  payment_proof_url: "",
  submission_url: "",
  members: "",
  agreement: false,
};

export function RegisterPage() {
  const competitions = useAsyncData(getOpenCompetitions, []);
  const paymentMethods = useAsyncData(getActivePaymentMethods, []);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [successCode, setSuccessCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedCompetition = useMemo(
    () =>
      competitions.data?.find(
        (competition) => competition.id === form.competition_id,
      ) ?? null,
    [competitions.data, form.competition_id],
  );
  const selectedEventId = selectedCompetition?.event_id ?? "";

  const availablePaymentMethods = useMemo(
    () =>
      selectedEventId
        ? (paymentMethods.data?.filter(
            (method) => method.event_id === selectedEventId,
          ) ?? [])
        : [],
    [paymentMethods.data, selectedEventId],
  );

  const selectedPaymentMethod = useMemo(
    () =>
      availablePaymentMethods.find(
        (method) => method.id === form.payment_method_id,
      ) ?? null,
    [availablePaymentMethods, form.payment_method_id],
  );

  function updateField<Key extends keyof FormState>(
    key: Key,
    value: FormState[Key],
  ) {
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

    if (
      !form.level ||
      !form.leader_name ||
      !form.email ||
      !form.whatsapp ||
      !form.institution ||
      !form.agreement
    ) {
      setError("Lengkapi semua field wajib dan centang persetujuan.");
      return;
    }

    if (form.participant_type === "team" && !form.team_name.trim()) {
      setError("Nama tim wajib diisi untuk pendaftaran tim.");
      return;
    }

    if (!form.payment_method_id || !selectedPaymentMethod) {
      setError("Pilih metode pembayaran yang tersedia.");
      return;
    }

    if (!form.payment_proof_url.trim()) {
      setError(
        "Link bukti pembayaran wajib diisi setelah melakukan pembayaran manual.",
      );
      return;
    }

    setSubmitting(true);
    const registrationId = crypto.randomUUID();
    const codeResult = await getNextRegistrationCode(form.competition_id);

    if (codeResult.error || !codeResult.data) {
      setSubmitting(false);
      setError(
        codeResult.error?.message ?? "Nomor registrasi belum bisa dibuat.",
      );
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
      payment_method_id: form.payment_method_id,
      payment_proof_url: form.payment_proof_url.trim() || null,
      submission_url: form.submission_url.trim() || null,
      payment_status: form.payment_proof_url.trim() ? "pending" : "unpaid",
      submission_status: form.submission_url.trim()
        ? "pending"
        : "not_required",
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
      .map((name) => ({
        registration_id: registrationId,
        name,
        role: "Anggota",
      }));

    const membersResult = await createRegistrationMembers(members);
    setSubmitting(false);

    if (membersResult.error) {
      setError(membersResult.error.message);
      return;
    }

    setSuccessCode(codeResult.data);
    setForm(initialForm);
  }

  // ── Success state ────────────────────────────────────────────────────────
  if (successCode) {
    return (
      <section className="container-hero py-20">
        <div className="mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.34)_48%,rgba(194,225,223,0.26)_72%,rgba(6,66,82,0.22)_100%)] p-8 text-center shadow-[0_18px_46px_rgba(6,66,82,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[28px] md:p-12">
            <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-[#c2e1df]/30 blur-[80px]" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 size-64 rounded-full bg-[#faadb6]/20 blur-[80px]" />

            <div className="relative">
              <div className="mx-auto mb-6 grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-[#004551] to-[#0a5a68] text-white shadow-[0_10px_30px_rgba(0,69,81,0.25)]">
                <CheckCircle size={36} className="text-[#c2e1df]" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#7E032F]">
                Pendaftaran berhasil
              </p>
              <h1 className="games-display mt-3 text-3xl font-black text-[#004551] drop-shadow-sm md:text-4xl">
                Simpan nomor registrasi kamu
              </h1>

              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#004551]/10 bg-white p-6 shadow-[inset_0_2px_12px_rgba(6,66,82,0.06)]">
                <p className="text-3xl font-black tracking-wider text-[#7E032F] md:text-4xl">
                  {successCode}
                </p>
              </div>

              <button
                type="button"
                onClick={() => void navigator.clipboard?.writeText(successCode)}
                className="btn-glossy-maroon mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-black text-white"
              >
                <Copy size={16} /> Salin Kode
              </button>

              <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#004551]/60">
                Gunakan nomor ini bersama email atau WhatsApp untuk cek status
                pendaftaran secara berkala.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 border-t border-[#004551]/10 pt-8">
                <Link
                  to="/cek-status"
                  className="btn-glass-outline inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black text-[#004551]"
                >
                  Cek Status <ArrowRight size={16} />
                </Link>
                <Link
                  to="/"
                  className="rounded-full px-6 py-3 text-sm font-bold text-[#004551]/50 transition hover:text-[#004551]"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Main form ────────────────────────────────────────────────────────────
  return (
    <>
      <PageHero
        eyebrow="Pendaftaran"
        title="Daftarkan diri atau timmu"
        description="Isi data dengan benar. Nomor registrasi akan muncul setelah pendaftaran berhasil disimpan."
      />

      {/* Gunakan container-hero agar lebar sama dengan PageHero */}
      <section className="container-hero pb-14 pt-8 md:pb-16 md:pt-10">
        {/* Loading / error states */}
        {(competitions.loading ||
          competitions.error ||
          paymentMethods.error ||
          (!competitions.loading &&
            !competitions.error &&
            competitions.data?.length === 0)) && (
          <div className="mb-6">
            {competitions.loading ? <LoadingState /> : null}
            {competitions.error ? (
              <ErrorState message={competitions.error} />
            ) : null}
            {paymentMethods.error ? (
              <ErrorState message={paymentMethods.error} />
            ) : null}
            {!competitions.loading &&
            !competitions.error &&
            competitions.data?.length === 0 ? (
              <EmptyState description="Belum ada lomba yang membuka pendaftaran." />
            ) : null}
          </div>
        )}

        {/* Center-constrain the form without breaking the outer container width */}
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Step 01 */}
            <FormGroup step="01" title="Pilih Lomba">
              <PublicFormSelect
                label="Pilihan lomba"
                value={form.competition_id}
                onChange={(event) =>
                  updateField("competition_id", event.target.value)
                }
                required
                options={[
                  { label: "Pilih lomba", value: "" },
                  ...(competitions.data?.map((competition) => ({
                    label: competition.name,
                    value: competition.id,
                  })) ?? []),
                ]}
              />
              <PublicFormSelect
                label="Jenjang"
                value={form.level}
                onChange={(event) => updateField("level", event.target.value)}
                required
                options={[
                  { label: "Pilih jenjang", value: "" },
                  { label: "SD/sederajat", value: "SD" },
                  { label: "SMP/sederajat", value: "SMP" },
                  { label: "SMA/sederajat", value: "SMA" },
                  { label: "Mahasiswa", value: "Mahasiswa" },
                ]}
              />
            </FormGroup>

            {/* Step 02 */}
            <FormGroup step="02" title="Data Peserta / Ketua">
              <PublicFormSelect
                label="Tipe peserta"
                value={form.participant_type}
                onChange={(event) =>
                  updateField(
                    "participant_type",
                    event.target.value as FormState["participant_type"],
                  )
                }
                options={[
                  { label: "Individu", value: "individual" },
                  { label: "Tim", value: "team" },
                ]}
              />
              <PublicFormInput
                label="Nama peserta utama / ketua tim"
                value={form.leader_name}
                onChange={(event) =>
                  updateField("leader_name", event.target.value)
                }
                required
              />
              <PublicFormInput
                label="Email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
              <PublicFormInput
                label="Nomor WhatsApp"
                value={form.whatsapp}
                onChange={(event) =>
                  updateField("whatsapp", event.target.value)
                }
                required
              />
              <div className="md:col-span-2">
                <PublicFormInput
                  label="Asal sekolah/kampus/instansi"
                  value={form.institution}
                  onChange={(event) =>
                    updateField("institution", event.target.value)
                  }
                  required
                />
              </div>
            </FormGroup>

            {/* Step 03 */}
            <FormGroup step="03" title="Data Tim / Anggota">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#004551]">
                  Nama tim
                </span>
                <input
                  value={form.team_name}
                  onChange={(event) =>
                    updateField("team_name", event.target.value)
                  }
                  className="games-input flex-1"
                />
              </div>
              <PublicFormTextarea
                label="Anggota tim"
                placeholder="Satu nama per baris"
                value={form.members}
                onChange={(event) => updateField("members", event.target.value)}
                className="h-full"
              />
            </FormGroup>

            {/* Step 04 */}
            <FormGroup step="04" title="Pembayaran / Berkas">
              {selectedCompetition ? (
                <div className="rounded-2xl border border-[#004551]/10 bg-white/55 p-4 text-[#004551] md:col-span-2">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7E032F]">
                    Biaya lomba
                  </p>
                  <p className="mt-1 text-2xl font-black">
                    {formatCurrency(selectedCompetition.registration_fee)}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-[#004551]/65">
                    Lakukan pembayaran manual ke salah satu metode aktif
                    panitia, lalu tempel link bukti pembayaran.
                  </p>
                </div>
              ) : null}

              {paymentMethods.loading ? (
                <div className="md:col-span-2">
                  <LoadingState label="Memuat metode pembayaran..." />
                </div>
              ) : null}

              {!paymentMethods.loading &&
              !paymentMethods.error &&
              selectedCompetition &&
              availablePaymentMethods.length === 0 ? (
                <div className="md:col-span-2">
                  <EmptyState description="Metode pembayaran aktif belum tersedia untuk event ini." />
                </div>
              ) : null}

              <PublicFormSelect
                label="Metode pembayaran"
                value={form.payment_method_id}
                onChange={(event) =>
                  updateField("payment_method_id", event.target.value)
                }
                disabled={!selectedCompetition || paymentMethods.loading}
                required
                options={[
                  { label: "Pilih metode pembayaran", value: "" },
                  ...availablePaymentMethods.map((method) => ({
                    label: `${formatPaymentType(method.type)} - ${method.label}`,
                    value: method.id,
                  })),
                ]}
              />

              <PublicFormInput
                label="Link bukti pembayaran"
                value={form.payment_proof_url}
                onChange={(event) =>
                  updateField("payment_proof_url", event.target.value)
                }
                required
              />

              {selectedPaymentMethod ? (
                <div className="md:col-span-2">
                  <PaymentInstruction method={selectedPaymentMethod} />
                </div>
              ) : null}

              <div className="md:col-span-2">
                <PublicFormInput
                  label="Link karya / berkas Google Drive (opsional)"
                  value={form.submission_url}
                  onChange={(event) =>
                    updateField("submission_url", event.target.value)
                  }
                />
              </div>
            </FormGroup>

            {/* Agreement + Submit */}
            <div className="glass-card-premium rounded-[2rem] p-6 md:p-8">
              <label className="flex cursor-pointer gap-4 text-sm font-semibold text-[#004551]">
                <input
                  type="checkbox"
                  checked={form.agreement}
                  onChange={(event) =>
                    updateField("agreement", event.target.checked)
                  }
                  required
                  className="mt-1 size-5 shrink-0 cursor-pointer accent-[#7E032F]"
                />
                <span className="leading-relaxed">
                  Saya menyatakan bahwa data yang diisikan adalah benar dan saya
                  menyetujui seluruh syarat serta ketentuan lomba GAMES 2026.
                </span>
              </label>

              {error ? (
                <div className="mt-5">
                  <ErrorState message={error} />
                </div>
              ) : null}

              <button
                disabled={
                  submitting || competitions.loading || paymentMethods.loading
                }
                className="btn-glossy-maroon mt-6 w-full rounded-full px-6 py-4 text-base font-black text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                {submitting ? "Memproses Pendaftaran..." : "Kirim Pendaftaran"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PaymentInstruction({ method }: { method: PaymentMethod }) {
  return (
    <div className="rounded-2xl border border-[#c2e1df]/70 bg-white/60 p-5 text-sm text-[#004551] shadow-[inset_0_1px_8px_rgba(6,66,82,0.04)]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7E032F]">
        Instruksi pembayaran
      </p>
      <h3 className="mt-2 text-lg font-black">{method.label}</h3>

      {method.type === "qris" ? (
        <div className="mt-4 grid gap-4 md:grid-cols-[180px_1fr]">
          {method.qris_image_url ? (
            <img
              src={method.qris_image_url}
              alt={`QRIS ${method.label}`}
              className="aspect-square w-full max-w-[180px] rounded-2xl border border-[#004551]/10 bg-white object-cover p-2"
            />
          ) : (
            <div className="grid aspect-square max-w-[180px] place-items-center rounded-2xl border border-dashed border-[#004551]/20 bg-white/70 text-xs font-bold text-[#004551]/50">
              QRIS belum tersedia
            </div>
          )}
          <p className="leading-7 text-[#004551]/75">
            {method.notes ||
              "Scan QRIS, lakukan pembayaran sesuai biaya lomba, lalu tempel link bukti pembayaran."}
          </p>
        </div>
      ) : null}

      {method.type === "bank_transfer" ? (
        <dl className="mt-4 grid gap-3 rounded-2xl bg-white/70 p-4 md:grid-cols-3">
          <PaymentDetail label="Bank" value={method.bank_name ?? "-"} />
          <PaymentDetail
            label="Nomor rekening"
            value={method.account_number ?? "-"}
          />
          <PaymentDetail
            label="Atas nama"
            value={method.account_holder ?? "-"}
          />
          {method.notes ? (
            <div className="md:col-span-3">
              <PaymentDetail label="Catatan" value={method.notes} />
            </div>
          ) : null}
        </dl>
      ) : null}

      {method.type === "ewallet" ? (
        <p className="mt-4 leading-7 text-[#004551]/75">
          {method.notes ||
            "Ikuti instruksi e-wallet dari panitia, lalu tempel link bukti pembayaran."}
        </p>
      ) : null}
    </div>
  );
}

function PaymentDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-black uppercase tracking-[0.14em] text-[#004551]/55">
        {label}
      </dt>
      <dd className="mt-1 font-black text-[#004551]">{value}</dd>
    </div>
  );
}

function formatPaymentType(type: PaymentMethod["type"]) {
  if (type === "qris") return "QRIS";
  if (type === "bank_transfer") return "Transfer Bank";
  return "E-Wallet";
}

function formatCurrency(value: number) {
  if (value <= 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function FormGroup({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card-premium rounded-[2rem] p-6 md:p-8">
      <div className="mb-6 flex items-center gap-4 border-b border-[#004551]/10 pb-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#7E032F] to-[#9b0b34] text-sm font-black text-white shadow-[0_6px_16px_rgba(126,3,47,0.28)]">
          {step}
        </span>
        <h2 className="text-xl font-black text-[#004551]">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}
