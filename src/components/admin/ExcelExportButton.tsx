import { Download } from "lucide-react";
import { exportToExcel } from "../../utils/excel";

type ExcelExportButtonProps = {
  filename?: string;
  data: Record<string, unknown>[];
  disabled?: boolean;
  sheetName?: string;
};

export function ExcelExportButton({
  filename = "export.xlsx",
  data,
  disabled = false,
  sheetName = "Data Registrasi"
}: ExcelExportButtonProps) {
  function handleDownload() {
    if (!data || data.length === 0) return;
    exportToExcel(data, filename, sheetName);
  }

  return (
    <button
      type="button"
      disabled={disabled || !data || data.length === 0}
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={16} /> Export Excel
    </button>
  );
}
