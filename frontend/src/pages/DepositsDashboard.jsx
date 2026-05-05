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
        {Object.entries(depositKPIs).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CASATrendChart data={casaTrendData} />
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
