import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  CreditCard, 
  DollarSign, 
  Users, 
  Smartphone,
  AlertTriangle 
} from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { AlertPanel } from '../components/dashboard/AlertPanel';
import { DataTable } from '../components/dashboard/DataTable';
import { 
  executiveKPIs, 
  depositTrendData, 
  loanTrendData,
  revenueByProduct,
  regionPerformance,
  alerts 
} from '../data/mockData';
import {
  DepositGrowthChart,
  LoanPortfolioTrendChart,
  RevenueByProductChart,
  RegionPerformanceChart
} from './executive/ExecutiveCharts';
import { useFilters } from '../context/FilterContext';
import { useExportMeta } from '../context/ExportContext';
import { applyFilters, filterByDateRange, scaleKpisByRegion } from '../lib/dataFilters';

const kpiIcons = {
  'Total Deposits': Wallet,
  'Loans Outstanding': CreditCard,
  'Fee-Based Income': DollarSign,
  'New Customers': Users,
  'Active Digital Users': Smartphone,
  'Delinquency Ratio': AlertTriangle
};

const regionColumns = [
  { key: 'region', label: 'Region' },
  { key: 'deposits', label: 'Deposits (B)', type: 'currency', align: 'right' },
  { key: 'loans', label: 'Loans (B)', type: 'currency', align: 'right' },
  { key: 'customers', label: 'Customers', type: 'number', align: 'right' },
  { key: 'growth', label: 'Growth', type: 'trend', align: 'right' }
];

const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');

export default function ExecutiveDashboard() {
  const navigate = useNavigate();
  const { dateRange, region } = useFilters();
  const { registerExportMeta } = useExportMeta();

  const filteredDeposits = useMemo(() => filterByDateRange(depositTrendData, dateRange), [dateRange]);
  const filteredLoans = useMemo(() => filterByDateRange(loanTrendData, dateRange), [dateRange]);
  const filteredRegion = useMemo(() => applyFilters(regionPerformance, { region }), [region]);
  const kpis = useMemo(() => scaleKpisByRegion(executiveKPIs, region, regionPerformance), [region]);

  useEffect(() => {
    registerExportMeta({
      title: 'Executive Dashboard',
      subtitle: region === 'all' ? 'All regions' : `${region} region`,
      kpis: Object.values(kpis),
      tables: [
        {
          title: 'Regional Performance',
          head: [['Region', 'Deposits (B)', 'Loans (B)', 'Customers', 'Growth']],
          body: filteredRegion.map((r) => [r.region, `$${r.deposits}B`, `$${r.loans}B`, r.customers.toLocaleString(), `${r.growth > 0 ? '+' : ''}${r.growth}%`])
        }
      ]
    });
  }, [kpis, filteredRegion, region, registerExportMeta]);

  const handleRegionClick = (row) => navigate(`/details/region/${row.region.toLowerCase()}`);
  const handleProductClick = (slice) => navigate(`/details/product/${slug(slice.name)}`);

  return (
    <div className="space-y-6 kiosk-sm:space-y-8 kiosk:space-y-10" data-testid="executive-dashboard">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl kiosk-sm:text-3xl kiosk:text-4xl font-bold text-slate-900 dark:text-white">
            Executive Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 kiosk-sm:text-lg kiosk:text-xl">
            Real-time overview of retail banking performance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 kiosk-sm:gap-5 kiosk:gap-6">
        {Object.entries(kpis).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 kiosk-sm:gap-8 kiosk:gap-10">
        <DepositGrowthChart data={filteredDeposits} />
        <LoanPortfolioTrendChart data={filteredLoans} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 kiosk-sm:gap-8 kiosk:gap-10">
        <RevenueByProductChart data={revenueByProduct} onProductClick={handleProductClick} />
        <RegionPerformanceChart data={filteredRegion} onRegionClick={handleRegionClick} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 kiosk-sm:gap-8 kiosk:gap-10">
        <DataTable
          title="Regional Performance Summary"
          columns={regionColumns}
          data={filteredRegion}
          className="lg:col-span-2"
          onRowClick={handleRegionClick}
        />
        <AlertPanel alerts={alerts} />
      </div>
    </div>
  );
}
