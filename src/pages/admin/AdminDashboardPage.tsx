export function AdminDashboardPage() {
  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Total peserta", "Pembayaran pending", "Berkas perlu validasi"].map((label) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black text-slate-950">0</p>
          </div>
        ))}
      </div>
    </section>
  );
}
