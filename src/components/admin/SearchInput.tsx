import { Search } from "lucide-react";

export function SearchInput() {
  return (
    <label className="relative block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
      <input className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm" placeholder="Cari data..." />
    </label>
  );
}
