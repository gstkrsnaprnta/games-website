import { Download } from "lucide-react";

type CSVExportButtonProps = {
  filename?: string;
  csv?: string;
  disabled?: boolean;
};

export function CSVExportButton({ filename = "export.csv", csv = "", disabled = false }: CSVExportButtonProps) {
  function handleDownload() {
    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      disabled={disabled || !csv}
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={16} /> Export CSV
    </button>
  );
}
