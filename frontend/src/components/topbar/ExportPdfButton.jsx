import { useState } from 'react';
import { Download, ChevronDown, FileText, FileImage, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useExportMeta } from '../../context/ExportContext';
import { exportQuickPdf, exportStructuredPdf } from '../../lib/pdfExport';

export function ExportPdfButton() {
  const { meta } = useExportMeta();
  const [busy, setBusy] = useState(null);

  const handleQuick = async () => {
    setBusy('quick');
    try {
      await exportQuickPdf({ title: meta.title });
    } catch (e) {
      console.error(e);
      alert('Quick export failed. See console for details.');
    } finally {
      setBusy(null);
    }
  };

  const handleFull = async () => {
    setBusy('full');
    try {
      await exportStructuredPdf(meta);
    } catch (e) {
      console.error(e);
      alert('Full report export failed. See console for details.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          disabled={busy !== null}
          data-testid="export-pdf-btn"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Export PDF
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={handleQuick}
          data-testid="export-pdf-quick"
        >
          <FileImage className="w-4 h-4 mr-2" />
          <div className="flex flex-col items-start">
            <span className="font-medium text-sm">Quick Export</span>
            <span className="text-xs text-slate-500">Screenshot of current page</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleFull}
          data-testid="export-pdf-full"
        >
          <FileText className="w-4 h-4 mr-2" />
          <div className="flex flex-col items-start">
            <span className="font-medium text-sm">Full Report</span>
            <span className="text-xs text-slate-500">KPIs, tables &amp; charts</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
