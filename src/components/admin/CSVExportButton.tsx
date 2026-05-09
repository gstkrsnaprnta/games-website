import { Download } from "lucide-react";

export function CSVExportButton() {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">
      <Download size={16} /> Export CSV
    </button>
  );
}
