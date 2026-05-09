import { FilterBar } from "../../components/admin/FilterBar";
import { SearchInput } from "../../components/admin/SearchInput";

export function AdminPlaceholderPage({ title }: { title: string }) {
  return (
    <section>
      <h1 className="text-2xl font-black text-slate-950">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">CRUD halaman ini disiapkan untuk Phase 1.</p>
      <div className="mt-6">
        <FilterBar>
          <div className="w-full max-w-sm"><SearchInput /></div>
          <button className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white">Tambah Data</button>
        </FilterBar>
      </div>
    </section>
  );
}
