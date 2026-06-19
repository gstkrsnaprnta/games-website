// FILE: src/pages/public/RegisterPage.tsx
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Copy,
  ArrowRight,
  Plus,
  Trash2,
  Info,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PublicFormInput } from "../../components/public/PublicFormInput";
import { PublicFormFileInput } from "../../components/public/PublicFormFileInput";
import { PublicFormSelect } from "../../components/public/PublicFormSelect";
import { PageHero } from "../../components/public/PageHero";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { getOpenCompetitions } from "../../services/competitions";
import { getActivePaymentMethods } from "../../services/paymentMethods";
import {
  submitRegistration,
  uploadPaymentProof,
  uploadIdCard,
} from "../../services/registrations";
import type {
  Competition,
  PaymentMethod,
  WhatsappContact,
} from "../../types/models";
import { useAsyncData } from "../../utils/useAsyncData";

// ── Tipe data form ──────────────────────────────────────────────────────────

type MemberForm = {
  name: string;
  identity_number: string;
  class_or_semester: string;
  id_card_file: File | null;
};

function emptyMember(): MemberForm {
  return {
    name: "",
    identity_number: "",
    class_or_semester: "",
    id_card_file: null,
  };
}

type FormState = {
  competition_id: string;
  level: string;
  team_name: string;
  leader_name: string;
  leader_identity_number: string;
  leader_class_or_semester: string;
  leader_id_card_file: File | null;
  email: string;
  whatsapp: string;
  institution: string;
  work_title: string;
  work_subtheme: string;
  payment_method_id: string;
  payment_proof_file: File | null;
  members: MemberForm[];
  agreement: boolean;
};

const initialForm: FormState = {
  competition_id: "",
  level: "",
  team_name: "",
  leader_name: "",
  leader_identity_number: "",
  leader_class_or_semester: "",
  leader_id_card_file: null,
  email: "",
  whatsapp: "",
  institution: "",
  work_title: "",
  work_subtheme: "",
  payment_method_id: "",
  payment_proof_file: null,
  members: [],
  agreement: false,
};

// Data yang ditampilkan & dipakai untuk pesan WA di halaman sukses.
// Di-snapshot terpisah dari `form` karena `form` di-reset setelah submit.
type SuccessInfo = {
  registration_code: string;
  leader_name: string;
  competition_name: string;
  institution: string;
  level: string;
  email: string;
  whatsapp: string;
  admin_whatsapp: string | null;
  admin_contact_name: string | null;
};

// ── Helper WhatsApp ───────────────────────────────────────────────────────────

// Cari kontak CP yang cocok dengan jenjang peserta. Kalau tidak ada yang
// spesifik untuk jenjang itu, fallback ke kontak yang levelnya dikosongkan
// (berlaku untuk semua jenjang). Kalau tidak ada sama sekali, return null.
function findWhatsappContact(
  contacts: WhatsappContact[] | null | undefined,
  level: string,
): WhatsappContact | null {
  if (!contacts || contacts.length === 0) return null;
  const specific = contacts.find((c) => c.level === level);
  if (specific) return specific;
  const fallback = contacts.find((c) => !c.level);
  return fallback ?? null;
}

// Normalisasi nomor lokal (08xx) maupun yang sudah berkode negara (62xx)
// menjadi format yang valid untuk wa.me (tanpa "+", tanpa "0" di depan).
function toWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("62")) return digits;
  return digits;
}

function buildConfirmationMessage(info: SuccessInfo): string {
  return [
    `Halo ${info.admin_contact_name ? `Kak ${info.admin_contact_name}` : "Panitia GAMES 2026"}.`,
    "Saya telah melakukan pendaftaran.",
    "",
    "=== DATA PENDAFTAR ===",
    `Kode Registrasi: ${info.registration_code}`,
    `Lomba: ${info.competition_name}`,
    `Nama Ketua: ${info.leader_name}`,
    `Instansi: ${info.institution}`,
    `Jenjang: ${info.level}`,
    `Email: ${info.email}`,
    `WhatsApp: ${info.whatsapp}`,
    "Status: Menunggu Verifikasi",
    "",
    "=== PERTANYAAN ===",
    "Mohon konfirmasi apakah data dan pembayaran saya sudah diterima.",
    "Terima kasih.",
  ].join("\n");
}

function buildWhatsAppConfirmationUrl(info: SuccessInfo): string | null {
  if (!info.admin_whatsapp) return null;
  const number = toWhatsAppNumber(info.admin_whatsapp);
  if (!number) return null;
  const message = buildConfirmationMessage(info);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// ── Komponen utama ───────────────────────────────────────────────────────────

export function RegisterPage() {
  const competitions = useAsyncData(getOpenCompetitions, []);
  const paymentMethods = useAsyncData(getActivePaymentMethods, []);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [successInfo, setSuccessInfo] = useState<SuccessInfo | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Kompetisi yang sedang dipilih
  const selectedCompetition = useMemo<Competition | null>(
    () => competitions.data?.find((c) => c.id === form.competition_id) ?? null,
    [competitions.data, form.competition_id],
  );

  // Jenjang yang tersedia berdasarkan kompetisi terpilih
  const availableLevels = useMemo<string[]>(() => {
    if (!selectedCompetition) return [];
    return selectedCompetition.participant_levels ?? [];
  }, [selectedCompetition]);

  // Metode pembayaran yang tersedia berdasarkan event kompetisi terpilih
  const availablePaymentMethods = useMemo<PaymentMethod[]>(
    () =>
      selectedCompetition?.event_id
        ? (paymentMethods.data?.filter(
            (m) => m.event_id === selectedCompetition.event_id,
          ) ?? [])
        : [],
    [paymentMethods.data, selectedCompetition],
  );

  const selectedPaymentMethod = useMemo<PaymentMethod | null>(
    () =>
      availablePaymentMethods.find((m) => m.id === form.payment_method_id) ??
      null,
    [availablePaymentMethods, form.payment_method_id],
  );

  // Jika hanya ada 1 metode pembayaran tersedia, pilih otomatis tanpa dropdown
  useEffect(() => {
    if (
      availablePaymentMethods.length === 1 &&
      form.payment_method_id !== availablePaymentMethods[0].id
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({
        ...prev,
        payment_method_id: availablePaymentMethods[0].id,
      }));
    }
  }, [availablePaymentMethods, form.payment_method_id]);

  // Apakah lomba ini tim (max_members > 1)?
  const isTeam = (selectedCompetition?.max_members ?? 1) > 1;
  const maxExtra = selectedCompetition
    ? selectedCompetition.max_members - 1
    : 0;
  const minExtra = selectedCompetition
    ? selectedCompetition.min_members - 1
    : 0;

  // ── Helpers update form ────────────────────────────────────────────────────

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateMember(
    index: number,
    key: keyof MemberForm,
    value: string | File | null,
  ) {
    setForm((prev) => {
      const updated = prev.members.map((m, i) =>
        i === index ? { ...m, [key]: value } : m,
      );
      return { ...prev, members: updated };
    });
  }

  function addMember() {
    if (form.members.length >= maxExtra) return;
    setForm((prev) => ({ ...prev, members: [...prev.members, emptyMember()] }));
  }

  function removeMember(index: number) {
    setForm((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  }

  // Reset level dan anggota saat kompetisi berubah
  function handleCompetitionChange(competitionId: string) {
    setForm((prev) => ({
      ...prev,
      competition_id: competitionId,
      level: "",
      team_name: "",
      work_title: "",
      work_subtheme: "",
      payment_method_id: "",
      members: [],
    }));
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!selectedCompetition) {
      setError("Pilih lomba yang tersedia.");
      return;
    }
    if (!form.level) {
      setError("Pilih jenjang pendidikan.");
      return;
    }
    if (!form.leader_name.trim()) {
      setError("Nama ketua/peserta wajib diisi.");
      return;
    }
    if (!form.email.trim()) {
      setError("Email wajib diisi.");
      return;
    }
    if (!form.whatsapp.trim()) {
      setError("Nomor WhatsApp wajib diisi.");
      return;
    }
    if (!form.institution.trim()) {
      setError("Asal sekolah/instansi wajib diisi.");
      return;
    }
    if (!form.leader_identity_number.trim()) {
      setError("NISN/NIM ketua wajib diisi.");
      return;
    }
    if (!form.leader_class_or_semester.trim()) {
      setError("Kelas/semester ketua wajib diisi.");
      return;
    }
    if (!form.leader_id_card_file) {
      setError("Upload kartu pelajar/KTM ketua wajib dilampirkan.");
      return;
    }
    if (isTeam && !form.team_name.trim()) {
      setError("Nama tim wajib diisi untuk pendaftaran tim.");
      return;
    }
    if (form.members.length < minExtra) {
      setError(
        `Lomba ini membutuhkan minimal ${selectedCompetition.min_members} peserta (termasuk ketua). Tambahkan ${minExtra - form.members.length} anggota lagi.`,
      );
      return;
    }
    for (let i = 0; i < form.members.length; i++) {
      const m = form.members[i];
      const no = i + 2;
      if (!m.name.trim()) {
        setError(`Nama anggota ${no} wajib diisi.`);
        return;
      }
      if (!m.identity_number.trim()) {
        setError(`NISN/NIM anggota ${no} wajib diisi.`);
        return;
      }
      if (!m.class_or_semester.trim()) {
        setError(`Kelas/semester anggota ${no} wajib diisi.`);
        return;
      }
      if (!m.id_card_file) {
        setError(`Upload kartu pelajar/KTM anggota ${no} wajib dilampirkan.`);
        return;
      }
    }
    if (selectedCompetition.has_work_submission) {
      if (!form.work_title.trim()) {
        setError("Judul karya wajib diisi.");
        return;
      }
      if (!form.work_subtheme) {
        setError("Subtema karya wajib dipilih.");
        return;
      }
    }
    if (!form.payment_method_id) {
      setError("Pilih metode pembayaran.");
      return;
    }
    if (!form.payment_proof_file) {
      setError("Upload bukti pembayaran wajib dilampirkan.");
      return;
    }
    if (!form.agreement) {
      setError("Centang pernyataan persetujuan untuk melanjutkan.");
      return;
    }

    setSubmitting(true);

    // Upload bukti pembayaran
    const uploadResult = await uploadPaymentProof(form.payment_proof_file);
    if (uploadResult.error || !uploadResult.url) {
      setSubmitting(false);
      setError(
        uploadResult.error?.message ??
          "Gagal mengunggah bukti pembayaran. Coba lagi.",
      );
      return;
    }

    // Upload semua kartu pelajar/KTM secara paralel (ketua + seluruh anggota)
    const idCardFiles = [
      form.leader_id_card_file,
      ...form.members.map((m) => m.id_card_file!),
    ];
    const idCardUploads = await Promise.all(
      idCardFiles.map((file) => uploadIdCard(file!)),
    );
    const firstIdCardError = idCardUploads.find((r) => r.error || !r.url);
    if (firstIdCardError) {
      setSubmitting(false);
      setError(
        firstIdCardError.error?.message ??
          "Gagal mengunggah kartu pelajar/KTM. Coba lagi.",
      );
      return;
    }
    const [leaderIdCardUrl, ...memberIdCardUrls] = idCardUploads.map(
      (r) => r.url!,
    );

    // Gabungkan ketua sebagai anggota pertama
    const allMembers = [
      {
        name: form.leader_name.trim(),
        role: "Ketua",
        identity_number: form.leader_identity_number.trim(),
        class_or_semester: form.leader_class_or_semester.trim(),
        id_card_url: leaderIdCardUrl,
      },
      ...form.members.map((m, i) => ({
        name: m.name.trim(),
        role: `Anggota ${i + 1}`,
        identity_number: m.identity_number.trim(),
        class_or_semester: m.class_or_semester.trim(),
        id_card_url: memberIdCardUrls[i],
      })),
    ];

    const result = await submitRegistration({
      competition_id: form.competition_id,
      team_name: form.team_name.trim(),
      leader_name: form.leader_name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      institution: form.institution.trim(),
      level: form.level,
      work_title: form.work_title.trim(),
      work_subtheme: form.work_subtheme,
      payment_method_id: form.payment_method_id,
      payment_proof_url: uploadResult.url,
      members: allMembers,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    // Cari kontak CP sesuai jenjang yang dipilih peserta, sebelum form di-reset
    const contact = findWhatsappContact(
      selectedCompetition.whatsapp_cp,
      form.level,
    );

    setSuccessInfo({
      registration_code: result.registration_code,
      leader_name: form.leader_name.trim(),
      competition_name: selectedCompetition.name,
      institution: form.institution.trim(),
      level: form.level,
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      admin_whatsapp: contact?.phone ?? null,
      admin_contact_name: contact?.name ?? null,
    });
    setForm(initialForm);
  }

  // ── Tampilan sukses ────────────────────────────────────────────────────────

  if (successInfo) {
    const waUrl = buildWhatsAppConfirmationUrl(successInfo);

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
                  {successInfo.registration_code}
                </p>

                <dl className="mt-5 grid gap-3 border-t border-[#004551]/10 pt-5 text-left text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-bold text-[#004551]/55">Nama</dt>
                    <dd className="text-right font-black text-[#004551]">
                      {successInfo.leader_name}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-bold text-[#004551]/55">Lomba</dt>
                    <dd className="text-right font-black text-[#004551]">
                      {successInfo.competition_name}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-bold text-[#004551]/55">Status</dt>
                    <dd>
                      <span className="rounded-full bg-[#7E032F]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#7E032F]">
                        Menunggu Verifikasi
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard?.writeText(
                    successInfo.registration_code,
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="btn-glass-outline mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black text-[#004551]"
              >
                <Copy size={16} />
                {copied ? "Tersalin!" : "Salin Kode"}
              </button>

              {waUrl ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-base font-black text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition hover:bg-[#1ebe5b]"
                >
                  <MessageCircle size={20} />
                  Konfirmasi Pendaftaran via WhatsApp
                  {successInfo.admin_contact_name
                    ? ` (${successInfo.admin_contact_name})`
                    : ""}
                </a>
              ) : (
                <p className="mx-auto mt-6 max-w-md rounded-xl bg-[#004551]/5 px-4 py-3 text-xs font-semibold leading-relaxed text-[#004551]/70">
                  Panitia akan menghubungi Anda melalui WhatsApp atau email
                  terdaftar dalam waktu maksimal 1x24 jam.
                </p>
              )}

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

  // ── Tampilan form utama ────────────────────────────────────────────────────

  return (
    <>
      <PageHero
        eyebrow="Pendaftaran"
        title="Daftarkan diri atau timmu"
        description="Isi data dengan benar dan lengkap. Nomor registrasi akan muncul setelah pendaftaran berhasil disimpan."
      />

      <section className="container-hero pb-14 pt-8 md:pb-16 md:pt-10">
        {/* State loading / error / kosong */}
        {(competitions.loading ||
          competitions.error ||
          paymentMethods.error ||
          (!competitions.loading &&
            !competitions.error &&
            (competitions.data?.length ?? 0) === 0)) && (
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
            (competitions.data?.length ?? 0) === 0 ? (
              <EmptyState description="Belum ada lomba yang membuka pendaftaran." />
            ) : null}
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* ── STEP 01: Pilih Lomba ───────────────────────────────────────── */}
            <FormGroup step="01" title="Pilih Lomba">
              <div className="md:col-span-2">
                <PublicFormSelect
                  label="Pilihan lomba"
                  value={form.competition_id}
                  onChange={(e) => handleCompetitionChange(e.target.value)}
                  required
                  options={[
                    { label: "Pilih lomba", value: "" },
                    ...(competitions.data?.map((c) => ({
                      label: c.name,
                      value: c.id,
                    })) ?? []),
                  ]}
                />
              </div>

              {/* Info lomba terpilih */}
              {selectedCompetition && (
                <div className="md:col-span-2 rounded-2xl border border-[#c2e1df]/70 bg-white/60 p-4 text-sm text-[#004551] shadow-[inset_0_1px_8px_rgba(6,66,82,0.04)]">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#004551]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#004551]">
                      {selectedCompetition.competition_type === "team"
                        ? `Tim (${selectedCompetition.min_members}–${selectedCompetition.max_members} orang)`
                        : selectedCompetition.max_members > 1
                          ? `Individu / Kelompok maks. ${selectedCompetition.max_members} orang`
                          : "Individu"}
                    </span>
                    {selectedCompetition.total_quota && (
                      <span className="rounded-full bg-[#7E032F]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#7E032F]">
                        Kuota: {selectedCompetition.total_quota} tim
                      </span>
                    )}
                    {selectedCompetition.max_teams_per_school && (
                      <span className="rounded-full bg-[#004551]/10 px-3 py-1 text-xs font-semibold text-[#004551]/70">
                        Maks. {selectedCompetition.max_teams_per_school} per
                        sekolah
                      </span>
                    )}
                  </div>
                  {selectedCompetition.has_work_submission && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#004551]/5 p-3">
                      <Info
                        size={15}
                        className="mt-0.5 shrink-0 text-[#004551]/60"
                      />
                      <p className="text-xs leading-relaxed text-[#004551]/70">
                        Lomba ini memerlukan pengumpulan karya tulis. Anda akan
                        diminta mengisi judul dan subtema karya.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Dropdown jenjang — opsi difilter sesuai participant_levels */}
              <div className="md:col-span-2">
                <PublicFormSelect
                  label="Jenjang pendidikan"
                  value={form.level}
                  onChange={(e) => updateField("level", e.target.value)}
                  required
                  disabled={availableLevels.length === 0}
                  options={[
                    { label: "Pilih jenjang", value: "" },
                    ...(availableLevels.includes("SD")
                      ? [{ label: "SD/sederajat", value: "SD" }]
                      : []),
                    ...(availableLevels.includes("SMP")
                      ? [{ label: "SMP/sederajat", value: "SMP" }]
                      : []),
                    ...(availableLevels.includes("SMA")
                      ? [{ label: "SMA/sederajat", value: "SMA" }]
                      : []),
                    ...(availableLevels.includes("Mahasiswa")
                      ? [{ label: "Mahasiswa", value: "Mahasiswa" }]
                      : []),
                  ]}
                />
              </div>
            </FormGroup>

            {/* ── STEP 02: Data Peserta / Ketua ──────────────────────────────── */}
            <FormGroup
              step="02"
              title={isTeam ? "Data Ketua Tim" : "Data Peserta"}
            >
              {isTeam && (
                <div className="md:col-span-2">
                  <PublicFormInput
                    label="Nama tim"
                    value={form.team_name}
                    onChange={(e) => updateField("team_name", e.target.value)}
                    required
                    placeholder="Contoh: Tim Euler"
                  />
                </div>
              )}

              <PublicFormInput
                label={isTeam ? "Nama ketua tim" : "Nama peserta"}
                value={form.leader_name}
                onChange={(e) => updateField("leader_name", e.target.value)}
                required
                placeholder="Nama lengkap sesuai identitas"
              />

              <PublicFormInput
                label="Email aktif"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
                placeholder="contoh@email.com"
              />

              <PublicFormInput
                label="Nomor WhatsApp aktif"
                type="tel"
                value={form.whatsapp}
                onChange={(e) => updateField("whatsapp", e.target.value)}
                required
                placeholder="08xxxxxxxxxx"
              />

              <div className="md:col-span-2">
                <PublicFormInput
                  label="Asal sekolah / universitas / instansi"
                  value={form.institution}
                  onChange={(e) => updateField("institution", e.target.value)}
                  required
                  placeholder="Nama lengkap sekolah/kampus"
                />
              </div>

              <PublicFormInput
                label={form.level === "Mahasiswa" ? "NIM" : "NISN"}
                value={form.leader_identity_number}
                onChange={(e) =>
                  updateField("leader_identity_number", e.target.value)
                }
                required
                placeholder={
                  form.level === "Mahasiswa"
                    ? "Nomor Induk Mahasiswa"
                    : "Nomor Induk Siswa Nasional"
                }
              />

              <PublicFormInput
                label={
                  form.level === "Mahasiswa"
                    ? "Semester saat ini"
                    : "Kelas saat ini"
                }
                value={form.leader_class_or_semester}
                onChange={(e) =>
                  updateField("leader_class_or_semester", e.target.value)
                }
                required
                placeholder={
                  form.level === "Mahasiswa"
                    ? "Contoh: Semester 4"
                    : "Contoh: XII IPA 2"
                }
              />

              <div className="md:col-span-2">
                <PublicFormFileInput
                  label={
                    form.level === "Mahasiswa"
                      ? "Upload KTM (gambar/PDF, maks. 1 MB)"
                      : "Upload kartu pelajar (gambar/PDF, maks. 1 MB)"
                  }
                  required
                  accept="image/*,application/pdf"
                  maxSizeBytes={1024 * 1024}
                  file={form.leader_id_card_file}
                  onChange={(file) => updateField("leader_id_card_file", file)}
                />
              </div>
            </FormGroup>

            {/* ── STEP 03: Anggota Tim (kondisional, hanya muncul jika tim) ─── */}
            {isTeam && selectedCompetition && (
              <FormGroup
                step="03"
                title={`Anggota Tim (${form.members.length}/${maxExtra})`}
              >
                {form.members.length === 0 && minExtra > 0 && (
                  <div className="md:col-span-2">
                    <p className="rounded-xl bg-[#7E032F]/5 px-4 py-3 text-xs font-semibold text-[#7E032F]">
                      Lomba ini membutuhkan minimal{" "}
                      {selectedCompetition.min_members} peserta. Tambahkan{" "}
                      {minExtra} anggota lagi.
                    </p>
                  </div>
                )}

                {form.members.map((member, index) => (
                  <div
                    key={index}
                    className="md:col-span-2 rounded-2xl border border-[#004551]/10 bg-white/50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest text-[#004551]/60">
                        Anggota {index + 2}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-[#7E032F] transition hover:bg-[#7E032F]/10"
                      >
                        <Trash2 size={13} /> Hapus
                      </button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <PublicFormInput
                        label="Nama lengkap"
                        value={member.name}
                        onChange={(e) =>
                          updateMember(index, "name", e.target.value)
                        }
                        required
                        placeholder="Nama sesuai identitas"
                      />
                      <PublicFormInput
                        label={form.level === "Mahasiswa" ? "NIM" : "NISN"}
                        value={member.identity_number}
                        onChange={(e) =>
                          updateMember(index, "identity_number", e.target.value)
                        }
                        required
                        placeholder={
                          form.level === "Mahasiswa"
                            ? "Nomor Induk Mahasiswa"
                            : "Nomor Induk Siswa Nasional"
                        }
                      />
                      <PublicFormInput
                        label={
                          form.level === "Mahasiswa"
                            ? "Semester saat ini"
                            : "Kelas saat ini"
                        }
                        value={member.class_or_semester}
                        onChange={(e) =>
                          updateMember(
                            index,
                            "class_or_semester",
                            e.target.value,
                          )
                        }
                        required
                        placeholder={
                          form.level === "Mahasiswa"
                            ? "Contoh: Semester 4"
                            : "Contoh: XI IPA 3"
                        }
                      />
                      <PublicFormFileInput
                        label={
                          form.level === "Mahasiswa"
                            ? "Upload KTM (gambar/PDF, maks. 1 MB)"
                            : "Upload kartu pelajar (gambar/PDF, maks. 1 MB)"
                        }
                        required
                        accept="image/*,application/pdf"
                        maxSizeBytes={1024 * 1024}
                        file={member.id_card_file}
                        onChange={(file) =>
                          updateMember(index, "id_card_file", file)
                        }
                      />
                    </div>
                  </div>
                ))}

                {form.members.length < maxExtra && (
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={addMember}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#004551]/20 py-4 text-sm font-bold text-[#004551]/60 transition hover:border-[#004551]/40 hover:text-[#004551]"
                    >
                      <Plus size={18} /> Tambah Anggota
                    </button>
                  </div>
                )}
              </FormGroup>
            )}

            {/* ── STEP 04: Karya Tulis (kondisional, hanya has_work_submission) */}
            {selectedCompetition?.has_work_submission && (
              <FormGroup step={isTeam ? "04" : "03"} title="Data Karya Tulis">
                {/* Info tema utama berdasarkan kompetisi */}
                <div className="md:col-span-2 rounded-2xl border border-[#c2e1df]/80 bg-[#004551]/5 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#004551]/60">
                    Tema Utama Lomba
                  </p>
                  <p className="mt-1.5 text-sm font-semibold leading-relaxed text-[#004551]">
                    {selectedCompetition.slug === "esai-regional"
                      ? "Breaking the Code: Mengasah Logika Matematika sebagai Senjata Kreatif di Era Kompetisi Global"
                      : selectedCompetition.slug === "lkti-nasional"
                        ? "Advancing Sustainable Development through Mathematical Thinking and Innovation"
                        : "—"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <PublicFormInput
                    label="Judul karya"
                    value={form.work_title}
                    onChange={(e) => updateField("work_title", e.target.value)}
                    required
                    placeholder="Judul lengkap karya Anda"
                  />
                </div>

                <div className="md:col-span-2">
                  <PublicFormSelect
                    label="Subtema karya"
                    value={form.work_subtheme}
                    onChange={(e) =>
                      updateField("work_subtheme", e.target.value)
                    }
                    required
                    options={[
                      { label: "Pilih subtema", value: "" },
                      ...(selectedCompetition.subthemes ?? []).map((s) => ({
                        label: s,
                        value: s,
                      })),
                    ]}
                  />
                </div>
              </FormGroup>
            )}

            {/* ── STEP 05: Pembayaran ────────────────────────────────────────── */}
            <FormGroup
              step={
                isTeam && selectedCompetition?.has_work_submission
                  ? "05"
                  : isTeam || selectedCompetition?.has_work_submission
                    ? "04"
                    : "03"
              }
              title="Pembayaran"
            >
              {/* Info biaya */}
              {selectedCompetition && (
                <div className="md:col-span-2 rounded-2xl border border-[#004551]/10 bg-white/55 p-4 text-[#004551]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7E032F]">
                    Biaya pendaftaran
                  </p>
                  <p className="mt-1 text-2xl font-black">
                    {formatCurrency(selectedCompetition.registration_fee)}
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-[#004551]/65">
                    Lakukan pembayaran sesuai instruksi di bawah, lalu upload
                    bukti pembayaran.
                  </p>
                </div>
              )}

              {/* Loading metode bayar */}
              {paymentMethods.loading && (
                <div className="md:col-span-2">
                  <LoadingState label="Memuat metode pembayaran..." />
                </div>
              )}

              {/* Tidak ada metode pembayaran */}
              {!paymentMethods.loading &&
                !paymentMethods.error &&
                selectedCompetition &&
                availablePaymentMethods.length === 0 && (
                  <div className="md:col-span-2">
                    <EmptyState description="Metode pembayaran aktif belum tersedia untuk event ini." />
                  </div>
                )}

              {/* Dropdown hanya ditampilkan jika ada lebih dari 1 metode pembayaran */}
              {availablePaymentMethods.length > 1 && (
                <PublicFormSelect
                  label="Metode pembayaran"
                  value={form.payment_method_id}
                  onChange={(e) =>
                    updateField("payment_method_id", e.target.value)
                  }
                  disabled={!selectedCompetition || paymentMethods.loading}
                  required
                  options={[
                    { label: "Pilih metode pembayaran", value: "" },
                    ...availablePaymentMethods.map((m) => ({
                      label: `${formatPaymentType(m.type)} — ${m.label}`,
                      value: m.id,
                    })),
                  ]}
                />
              )}

              {selectedPaymentMethod && (
                <div className="md:col-span-2">
                  <PaymentInstruction method={selectedPaymentMethod} />
                </div>
              )}

              <div className="md:col-span-2">
                <PublicFormFileInput
                  label="Upload bukti pembayaran (gambar/PDF, maks. 1 MB)"
                  required
                  accept="image/*,application/pdf"
                  maxSizeBytes={1024 * 1024}
                  file={form.payment_proof_file}
                  onChange={(file) => updateField("payment_proof_file", file)}
                />
              </div>
            </FormGroup>

            {/* ── Persetujuan + Submit ───────────────────────────────────────── */}
            <div className="glass-card-premium rounded-[2rem] p-6 md:p-8">
              <label className="flex cursor-pointer gap-4 text-sm font-semibold text-[#004551]">
                <input
                  type="checkbox"
                  checked={form.agreement}
                  onChange={(e) => updateField("agreement", e.target.checked)}
                  required
                  className="mt-1 size-5 shrink-0 cursor-pointer accent-[#7E032F]"
                />
                <span className="leading-relaxed">
                  Saya menyatakan bahwa seluruh data yang diisikan adalah benar
                  dan saya menyetujui seluruh syarat serta ketentuan lomba GAMES
                  2026.
                </span>
              </label>

              {error && (
                <div className="mt-5">
                  <ErrorState message={error} />
                </div>
              )}

              <button
                type="submit"
                disabled={
                  submitting ||
                  competitions.loading ||
                  paymentMethods.loading ||
                  !selectedCompetition
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

// ── Sub-komponen ──────────────────────────────────────────────────────────────

function PaymentInstruction({ method }: { method: PaymentMethod }) {
  return (
    <div className="rounded-2xl border border-[#c2e1df]/70 bg-white/60 p-5 text-sm text-[#004551] shadow-[inset_0_1px_8px_rgba(6,66,82,0.04)]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7E032F]">
        Instruksi pembayaran
      </p>
      <h3 className="mt-2 text-lg font-black">{method.label}</h3>

      {method.type === "qris" && (
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
            {method.notes ??
              "Scan QRIS, lakukan pembayaran sesuai biaya lomba, lalu upload bukti pembayaran."}
          </p>
        </div>
      )}

      {method.type === "bank_transfer" && (
        <dl className="mt-4 grid gap-3 rounded-2xl bg-white/70 p-4 md:grid-cols-3">
          <PaymentDetail label="Bank" value={method.bank_name ?? "—"} />
          <PaymentDetail
            label="Nomor rekening"
            value={method.account_number ?? "—"}
          />
          <PaymentDetail
            label="Atas nama"
            value={method.account_holder ?? "—"}
          />
          {method.notes && (
            <div className="md:col-span-3">
              <PaymentDetail label="Catatan" value={method.notes} />
            </div>
          )}
        </dl>
      )}

      {method.type === "ewallet" && (
        <p className="mt-4 leading-7 text-[#004551]/75">
          {method.notes ??
            "Ikuti instruksi e-wallet dari panitia, lalu upload bukti pembayaran."}
        </p>
      )}
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
