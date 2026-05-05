import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Each dashboard page registers its KPIs + tables for the PDF export.
 * Topbar's export button reads this context.
 */
const ExportContext = createContext(null);

const DEFAULT_META = {
  title: 'Channel BI Report',
  subtitle: '',
  kpis: [],
  tables: []
};

export function ExportProvider({ children }) {
  const [meta, setMeta] = useState(DEFAULT_META);

  const registerExportMeta = useCallback((next) => {
    setMeta({ ...DEFAULT_META, ...next });
  }, []);

  const value = useMemo(
    () => ({ meta, registerExportMeta }),
    [meta, registerExportMeta]
  );

  return <ExportContext.Provider value={value}>{children}</ExportContext.Provider>;
}

export function useExportMeta() {
  const ctx = useContext(ExportContext);
  if (!ctx) throw new Error('useExportMeta must be used within ExportProvider');
  return ctx;
}
