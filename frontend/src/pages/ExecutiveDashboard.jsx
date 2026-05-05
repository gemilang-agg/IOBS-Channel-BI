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

export default function ExecutiveDashboard() {
  return (
    <div className="space-y-6 kiosk-sm:space-y-8 kiosk:space-y-10" data-testid="executive-dashboard">
      {/* Page Header */}
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 kiosk-sm:gap-5 kiosk:gap-6">
        {Object.entries(executiveKPIs).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 kiosk-sm:gap-8 kiosk:gap-10">
        <DepositGrowthChart data={depositTrendData} />
        <LoanPortfolioTrendChart data={loanTrendData} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 kiosk-sm:gap-8 kiosk:gap-10">
        <RevenueByProductChart data={revenueByProduct} />
        <RegionPerformanceChart data={regionPerformance} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 kiosk-sm:gap-8 kiosk:gap-10">
        <DataTable
          title="Regional Performance Summary"
          columns={regionColumns}
          data={regionPerformance}
          className="lg:col-span-2"
        />
        <AlertPanel alerts={alerts} />
      </div>
    </div>
  );
}
