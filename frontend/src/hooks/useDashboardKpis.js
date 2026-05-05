import { useMemo } from 'react';
import { useFilters } from '../context/FilterContext';
import {
  scaleKpisByRegion,
  computeComparisonKpis,
  formatDateRangeLabel
} from '../lib/dataFilters';
import { regionPerformance } from '../data/mockData';

/**
 * Apply region scaling and comparison-mode overrides (change/trend/comparisonValue)
 * to a dashboard's KPI map. Returns the resulting KPIs plus a comparisonLabel string
 * that pages can pass to KPICard.
 */
export function useDashboardKpis(originalKpis) {
  const { region, compareEnabled, compareRange } = useFilters();

  const kpis = useMemo(() => {
    const scaled = scaleKpisByRegion(originalKpis, region, regionPerformance);
    return compareEnabled && compareRange
      ? computeComparisonKpis(scaled, compareRange)
      : scaled;
  }, [originalKpis, region, compareEnabled, compareRange]);

  const comparisonLabel =
    compareEnabled && compareRange
      ? `vs ${formatDateRangeLabel(compareRange)}`
      : undefined;

  return { kpis, comparisonLabel };
}
