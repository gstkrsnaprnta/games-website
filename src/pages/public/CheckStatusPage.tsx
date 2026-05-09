import { FormInput } from "../../components/admin/FormInput";

export function CheckStatusPage() {
  return (
    <section className="container-page max-w-xl py-10">
      <h1 className="text-3xl font-black">Cek Status Pendaftaran</h1>
      <form className="mt-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-5">
        <FormInput label="Nomor registrasi" placeholder="GAMES-2026-LCT-0001" />
        <FormInput label="Email atau WhatsApp" />
        <button className="rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white">Cek Status</button>
      </form>
    </section>
  );
}
