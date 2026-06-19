import * as XLSX from "xlsx";

/**
 * Utility to export an array of objects to a downloadable Excel (.xlsx) file.
 * @param data Array of objects representing the rows.
 * @param filename The name of the downloaded file (should end in .xlsx).
 * @param sheetName The name of the worksheet tab inside the Excel file.
 */
export function exportToExcel(data: Record<string, unknown>[], filename = "export.xlsx", sheetName = "Data") {
  if (data.length === 0) return;
  
  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Generate buffer and trigger automatic browser download
  XLSX.writeFile(workbook, filename);
}
