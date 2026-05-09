import { CSVExportButton } from "../../components/admin/CSVExportButton";
import { DataTable } from "../../components/admin/DataTable";
import { FilterBar } from "../../components/admin/FilterBar";
import { SearchInput } from "../../components/admin/SearchInput";

export function AdminRegistrationsPage() {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Peserta</h1>
          <p className="mt-2 text-sm text-slate-600">Daftar peserta dan validasi manual disiapkan untuk Phase 1.</p>
        </div>
        <CSVExportButton />
      </div>
      <div className="mt-6">
        <FilterBar>
          <div className="w-full max-w-sm"><SearchInput /></div>
        </FilterBar>
      </div>
      <div className="mt-4">
        <DataTable>
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr><th className="p-3">Kode</th><th className="p-3">Nama</th><th className="p-3">Lomba</th><th className="p-3">Pembayaran</th><th className="p-3">Berkas</th></tr>
            </thead>
            <tbody><tr><td className="p-3 text-slate-500" colSpan={5}>Belum ada data peserta.</td></tr></tbody>
          </table>
        </DataTable>
      </div>
    </section>
  );
}
