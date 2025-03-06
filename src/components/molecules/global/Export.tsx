import { forwardRef, Ref, useImperativeHandle } from "react";
import * as XLSX from "xlsx";

interface ColumnConfig {
  key: string; // Key used in data
  label: string; // Label for the column header
}

interface ExportProps<T extends Record<string, unknown>> {
  data: T[]; // Array of objects representing table rows
  columns: ColumnConfig[]; // Array of column configurations
  onExportComplete: () => void; // Callback after export is complete
}

const Export = forwardRef(function Export<T extends Record<string, unknown>>(
  { data, columns, onExportComplete }: ExportProps<T>,
  ref: Ref<unknown> | undefined
) {
  // Expose the export logic to the parent
  useImperativeHandle(ref, () => ({
    handleExport,
  }));

  const handleExport = () => {
    if (data.length === 0) {
      alert("No data to export!");
      return;
    }

    // Extract keys and labels from columns
    const headers = columns.map((col) => col.key);
    const labels = columns.map((col) => col.label);

    // Create worksheet data
    const worksheetData = [
      labels, // First row: column labels
      ...data.map((row) => headers.map((key) => row[key] || "")), // Data rows
    ];

    // Create Excel worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Trigger file download
    XLSX.writeFile(workbook, "TableData.xlsx");

    // Notify parent
    onExportComplete();
  };

  return null; // This component does not render anything visible
});

Export.displayName = "Export";

export default Export;
