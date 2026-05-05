import { useParams, Navigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Wallet, CreditCard, Users, TrendingUp } from 'lucide-react';
import { KPICard } from '../../components/dashboard/KPICard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { DataTable } from '../../components/dashboard/DataTable';
import { regionPerformance, alerts, depositTrendData } from '../../data/mockData';
import { DetailPageHeader } from './DetailPageHeader';
import { AlertPanel } from '../../components/dashboard/AlertPanel';

const tooltipContentStyle = {
  background: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: '8px'
};

const scaleTrend = (data, factor) =>
  data.map((row) => ({
    month: row.month,
    casa: +(row.casa * factor).toFixed(2),
    td: +(row.td * factor).toFixed(2),
    deposits: +(row.deposits * factor).toFixed(2)
  }));

const sampleBranches = (region) => [
  { branch: `${region} Main`, deposits: 820, loans: 540, customers: 48200, growth: 9.1 },
  { branch: `${region} Central`, deposits: 645, loans: 420, customers: 38400, growth: 7.3 },
  { branch: `${region} North`, deposits: 512, loans: 310, customers: 28600, growth: 5.4 },
  { branch: `${region} East`, deposits: 387, loans: 225, customers: 19800, growth: 3.8 }
];

const branchColumns = [
  { key: 'branch', label: 'Branch' },
  { key: 'deposits', label: 'Deposits (M)', type: 'number', align: 'right' },
  { key: 'loans', label: 'Loans (M)', type: 'number', align: 'right' },
  { key: 'customers', label: 'Customers', type: 'number', align: 'right' },
  { key: 'growth', label: 'Growth', type: 'trend', align: 'right' }
];

export default function RegionDetail() {
  const { region: regionParam } = useParams();
  const regionKey = regionParam?.toLowerCase();
  const regionRow = regionPerformance.find((r) => r.region.toLowerCase() === regionKey);

  if (!regionRow) return <Navigate to="/dashboard" replace />;

  const regionName = regionRow.region;
  const totalDeposits = regionPerformance.reduce((s, r) => s + r.deposits, 0);
  const factor = regionRow.deposits / totalDeposits;
  const trend = scaleTrend(depositTrendData, factor);

  const kpis = {
    deposits: { value: regionRow.deposits, unit: 'B', change: regionRow.growth, trend: 'up', label: 'Region Deposits' },
    loans: { value: regionRow.loans, unit: 'B', change: regionRow.growth - 2, trend: 'up', label: 'Region Loans' },
    customers: { value: regionRow.customers, unit: '', change: regionRow.growth - 1, trend: 'up', label: 'Customers' },
    growth: { value: regionRow.growth, unit: '%', change: 0.6, trend: 'up', label: 'YoY Growth' }
  };

  const kpiIcons = {
    'Region Deposits': Wallet,
    'Region Loans': CreditCard,
    'Customers': Users,
    'YoY Growth': TrendingUp
  };

  const regionAlerts = alerts.filter((a) =>
    a.message?.toLowerCase().includes(regionKey) || a.title?.toLowerCase().includes(regionKey)
  );

  return (
    <div className="space-y-6" data-testid="region-detail-page">
      <DetailPageHeader
        title={`${regionName} Region`}
        subtitle="Deep-dive performance for this region"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(kpis).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Deposit Trend" subtitle={`${regionName} region share`} className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
                <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [`$${value}B`, '']} />
                <Legend />
                <Line type="monotone" dataKey="casa" name="CASA" stroke="#06B6D4" strokeWidth={2} />
                <Line type="monotone" dataKey="td" name="Time Deposits" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <AlertPanel
          alerts={regionAlerts.length ? regionAlerts : alerts.slice(0, 2)}
          title={`${regionName} Alerts`}
        />
      </div>

      <ChartCard title="Top Branches in Region" subtitle="Performance ranked by deposits">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleBranches(regionName)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
              <YAxis type="category" dataKey="branch" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={140} />
              <Tooltip contentStyle={tooltipContentStyle} />
              <Legend />
              <Bar dataKey="deposits" name="Deposits" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="loans" name="Loans" fill="#06B6D4" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <DataTable
        title="Branch Performance"
        columns={branchColumns}
        data={sampleBranches(regionName)}
        showRank
      />
    </div>
  );
}
