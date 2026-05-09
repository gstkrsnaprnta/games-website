import { FormInput } from "../../components/admin/FormInput";
import { FormSelect } from "../../components/admin/FormSelect";
import { FormTextarea } from "../../components/admin/FormTextarea";

export function RegisterPage() {
  return (
    <section className="container-page max-w-3xl py-10">
      <h1 className="text-3xl font-black">Pendaftaran Peserta</h1>
      <p className="mt-3 text-slate-600">Form ini disiapkan untuk integrasi Supabase pada Phase 1.</p>
      <form className="mt-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-5">
        <FormSelect label="Pilihan lomba" options={[{ label: "LCT Matematika", value: "lct" }, { label: "Olimpiade Matematika", value: "olim" }]} />
        <FormSelect label="Jenjang" options={[{ label: "SD", value: "SD" }, { label: "SMP", value: "SMP" }, { label: "SMA", value: "SMA" }, { label: "Mahasiswa", value: "Mahasiswa" }]} />
        <FormInput label="Nama peserta utama / ketua tim" required />
        <FormInput label="Email" type="email" required />
        <FormInput label="Nomor WhatsApp" required />
        <FormInput label="Asal sekolah/kampus/instansi" required />
        <FormInput label="Nama tim" />
        <FormTextarea label="Anggota tim" placeholder="Satu nama per baris" />
        <FormInput label="Link bukti pembayaran" />
        <FormInput label="Link karya / berkas Google Drive" />
        <label className="flex gap-2 text-sm text-slate-700"><input type="checkbox" required /> Saya menyetujui syarat dan ketentuan lomba.</label>
        <button className="rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white">Kirim Pendaftaran</button>
      </form>
    </section>
  );
}
