import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

const MARGIN = 12;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const normalizeFileName = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function captureElement(element) {
  return html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
    logging: false
  });
}

/**
 * Quick PDF: single full-content screenshot scaled to fit on one or more pages.
 */
export async function exportQuickPdf({ title = 'Dashboard Report', elementId = 'dashboard-export-root' } = {}) {
  const el = document.getElementById(elementId);
  if (!el) throw new Error(`Element #${elementId} not found`);

  const canvas = await captureElement(el);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const imgWidth = CONTENT_WIDTH;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const pageHeight = pdf.internal.pageSize.getHeight();

  let heightLeft = imgHeight;
  let position = MARGIN;

  pdf.addImage(imgData, 'PNG', MARGIN, position, imgWidth, imgHeight);
  heightLeft -= pageHeight - MARGIN;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight + MARGIN;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', MARGIN, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${normalizeFileName(title)}-${new Date().toISOString().slice(0, 10)}.pdf`);
}

/**
 * Structured "Full Report" PDF:
 * Header + KPIs grid + tables (via autoTable) + each chart rendered as image.
 *
 * @param {Object} opts
 * @param {string} opts.title  - report title
 * @param {string} [opts.subtitle]
 * @param {Array}  opts.kpis   - [{ label, value, unit, change, trend }]
 * @param {Array}  [opts.tables] - [{ title, head: [[...]], body: [[...], ...] }]
 * @param {string} [opts.chartsSelector] - CSS selector for chart cards to capture
 */
export async function exportStructuredPdf({
  title = 'Dashboard Report',
  subtitle = '',
  kpis = [],
  tables = [],
  chartsSelector = '[data-chart-card="true"]'
} = {}) {
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const pageHeight = pdf.internal.pageSize.getHeight();
  let cursorY = MARGIN;

  // Header
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(15, 23, 42);
  pdf.text(title, MARGIN, cursorY + 6);
  cursorY += 10;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(100, 116, 139);
  pdf.text(
    `${subtitle ? subtitle + ' · ' : ''}Generated ${new Date().toLocaleString()}`,
    MARGIN,
    cursorY + 4
  );
  cursorY += 10;

  pdf.setDrawColor(226, 232, 240);
  pdf.line(MARGIN, cursorY, PAGE_WIDTH - MARGIN, cursorY);
  cursorY += 6;

  // KPIs grid (2 cols × n rows)
  if (kpis.length) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(15, 23, 42);
    pdf.text('Key Performance Indicators', MARGIN, cursorY);
    cursorY += 4;

    const cellWidth = CONTENT_WIDTH / 3;
    const cellHeight = 18;
    kpis.forEach((kpi, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const x = MARGIN + col * cellWidth;
      const y = cursorY + row * cellHeight;

      pdf.setDrawColor(226, 232, 240);
      pdf.roundedRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2, 1, 1);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.text(kpi.label || '', x + 3, y + 6);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(15, 23, 42);
      const valueText = `${kpi.value}${kpi.unit || ''}`;
      pdf.text(valueText, x + 3, y + 12);

      if (kpi.change !== undefined) {
        const isUp = kpi.trend === 'up';
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(isUp ? 16 : 239, isUp ? 185 : 68, isUp ? 129 : 68);
        pdf.text(
          `${kpi.change > 0 ? '+' : ''}${kpi.change}%`,
          x + 3,
          y + 16
        );
      }
    });

    const rowsUsed = Math.ceil(kpis.length / 3);
    cursorY += rowsUsed * cellHeight + 4;
  }

  // Tables
  tables.forEach((table) => {
    if (cursorY > pageHeight - 40) {
      pdf.addPage();
      cursorY = MARGIN;
    }
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(15, 23, 42);
    pdf.text(table.title, MARGIN, cursorY);
    cursorY += 3;

    autoTable(pdf, {
      head: table.head,
      body: table.body,
      startY: cursorY,
      theme: 'striped',
      margin: { left: MARGIN, right: MARGIN },
      headStyles: { fillColor: [15, 23, 42], textColor: 255, fontSize: 9 },
      bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
      alternateRowStyles: { fillColor: [248, 250, 252] }
    });

    cursorY = pdf.lastAutoTable.finalY + 8;
  });

  // Charts
  const chartEls = Array.from(document.querySelectorAll(chartsSelector));
  for (const el of chartEls) {
    try {
      const canvas = await captureElement(el);
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = CONTENT_WIDTH;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (cursorY + imgHeight > pageHeight - MARGIN) {
        pdf.addPage();
        cursorY = MARGIN;
      }
      pdf.addImage(imgData, 'PNG', MARGIN, cursorY, imgWidth, imgHeight);
      cursorY += imgHeight + 6;
    } catch (err) {
      console.warn('Chart capture failed for element:', el, err);
    }
  }

  pdf.save(`${normalizeFileName(title)}-${new Date().toISOString().slice(0, 10)}.pdf`);
}
