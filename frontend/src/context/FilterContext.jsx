import { createContext, useContext, useState, useMemo } from 'react';

const DEFAULT_RANGE = {
  from: new Date(2024, 6, 1),  // Jul 1, 2024
  to: new Date(2024, 11, 31)   // Dec 31, 2024
};

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [dateRange, setDateRange] = useState(DEFAULT_RANGE);
  const [region, setRegion] = useState('all');

  const value = useMemo(() => ({
    dateRange,
    setDateRange,
    region,
    setRegion,
    isRangeDefault:
      dateRange?.from?.getTime() === DEFAULT_RANGE.from.getTime() &&
      dateRange?.to?.getTime() === DEFAULT_RANGE.to.getTime(),
    isRegionAll: region === 'all'
  }), [dateRange, region]);

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within FilterProvider');
  return ctx;
}
