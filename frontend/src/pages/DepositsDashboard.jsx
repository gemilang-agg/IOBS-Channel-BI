import { useEffect, useMemo } from 'react';
import { Wallet, Landmark, PlusCircle, Moon, DollarSign, Percent } from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { DataTable } from '../components/dashboard/DataTable';
import { 
  depositKPIs, 
  casaTrendData, 
  depositMixData,
  branchDepositPerformance
} from '../data/mockData';
import {
  CASATrendChart,
  DepositMixChart,
  TopRegionsGrowthChart,
  DormantAccountsCard
} from './deposits/DepositsCharts';
import { useFilters } from '../context/FilterContext';
import { useExportMeta } from '../context/ExportContext';
import { filterByDateRange } from '../lib/dataFilters';
import { useDashboardKpis } from '../hooks/useDashboardKpis';

const kpiIcons = {
  'CASA Balance': Wallet,
  'Time Deposits': Landmark,
  'New Accounts': PlusCircle,
  'Dormant Accounts': Moon,
  'Avg Balance': DollarSign,
  'Cost of Funds': Percent
};

const branchColumns = [
  { key: 'branch', label: 'Branch' },
  { key: 'deposits', label: 'Deposits (M)', type: 'number', align: 'right' },
  { key: 'growth', label: 'Growth', type: 'trend', align: 'right' },
  { key: 'accounts', label: 'Accounts', type: 'number', align: 'right' }
];

export default function DepositsDashboard() {
  const { dateRange, region } = useFilters();
  const { registerExportMeta } = useExportMeta();
  const filteredCasa = useMemo(() => filterByDateRange(casaTrendData, dateRange), [dateRange]);
  const { kpis, comparisonLabel } = useDashboardKpis(depositKPIs);

  useEffect(() => {
    registerExportMeta({
      title: 'Deposits & CASA Dashboard',
      subtitle: region === 'all' ? 'All regions' : `${region} region`,
      kpis: Object.values(kpis),
      tables: [
        {
          title: 'Branch Deposit Performance',
          head: [['Branch', 'Deposits (M)', 'Growth', 'Accounts']],
          body: branchDepositPerformance.map((b) => [b.branch, `$${b.deposits}M`, `${b.growth > 0 ? '+' : ''}${b.growth}%`, b.accounts.toLocaleString()])
        }
      ]
    });
  }, [kpis, region, registerExportMeta]);

  return (
    <div className="space-y-6" data-testid="deposits-dashboard">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Deposit & CASA Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Savings, current accounts and deposit performance analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(kpis).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} comparisonLabel={comparisonLabel} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CASATrendChart data={filteredCasa} />
        <DepositMixChart data={depositMixData} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopRegionsGrowthChart data={branchDepositPerformance} />
        <DormantAccountsCard />
      </div>

      <DataTable
        title="Branch Performance by Deposits"
        columns={branchColumns}
        data={branchDepositPerformance}
        showRank
      />
    </div>
  );
}
