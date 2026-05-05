const MONTH_INDEX = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};

/**
 * Filter trend arrays (items with {month: 'Jan' | ...}) to those within [from, to].
 * Assumes all months belong to year 2024 for mock-data purposes.
 */
export function filterByDateRange(data, dateRange) {
  if (!Array.isArray(data) || !dateRange?.from || !dateRange?.to) return data;
  const fromMonth = dateRange.from.getMonth();
  const toMonth = dateRange.to.getMonth();
  return data.filter((row) => {
    if (!row.month || !(row.month in MONTH_INDEX)) return true;
    const idx = MONTH_INDEX[row.month];
    return idx >= fromMonth && idx <= toMonth;
  });
}

/**
 * Filter rows that have a `region` key. If region is 'all', returns data unchanged.
 */
export function filterByRegion(data, region) {
  if (!Array.isArray(data) || !region || region === 'all') return data;
  return data.filter((row) => row.region?.toLowerCase() === region.toLowerCase());
}

/**
 * Apply both filters.
 */
export function applyFilters(data, { dateRange, region } = {}) {
  return filterByRegion(filterByDateRange(data, dateRange), region);
}

/**
 * Scale KPI values by region share. When a single region is selected, each KPI's numeric
 * value is scaled by that region's portion of total deposits (a rough proxy so the mock
 * dashboard "feels" filtered). 'all' returns KPIs unchanged.
 */
export function scaleKpisByRegion(kpis, region, regionPerformance) {
  if (!region || region === 'all') return kpis;
  const totalDeposits = regionPerformance.reduce((s, r) => s + r.deposits, 0);
  const selected = regionPerformance.find(
    (r) => r.region.toLowerCase() === region.toLowerCase()
  );
  if (!selected || totalDeposits === 0) return kpis;
  const share = selected.deposits / totalDeposits;

  const scaled = {};
  Object.entries(kpis).forEach(([key, kpi]) => {
    // Leave ratio/percent KPIs untouched; scale absolute magnitudes only
    if (kpi.unit === '%') {
      scaled[key] = kpi;
    } else {
      scaled[key] = {
        ...kpi,
        value: Math.round(kpi.value * share * 100) / 100
      };
    }
  });
  return scaled;
}

export function formatDateRangeLabel(dateRange) {
  if (!dateRange?.from) return 'Select range';
  const fmt = (d) =>
    d?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
  if (!dateRange.to) return fmt(dateRange.from);
  return `${fmt(dateRange.from)} – ${fmt(dateRange.to)}`;
}
