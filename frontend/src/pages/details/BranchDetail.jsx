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
import { Wallet, CreditCard, Users, Star } from 'lucide-react';
import { KPICard } from '../../components/dashboard/KPICard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { DataTable } from '../../components/dashboard/DataTable';
import { branchLeaderboard, branchTargetVsActual, staffProductivity } from '../../data/mockData';
import { DetailPageHeader } from './DetailPageHeader';

const tooltipContentStyle = {
  background: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: '8px'
};

const staffColumns = [
  { key: 'name', label: 'Relationship Manager' },
  { key: 'accounts', label: 'Accounts', type: 'number', align: 'right' },
  { key: 'loans', label: 'Loans', type: 'number', align: 'right' },
  { key: 'revenue', label: 'Revenue', align: 'right', render: (value) => (
    <span className="font-mono">${(value / 1000).toFixed(0)}K</span>
  )}
];

export default function BranchDetail() {
  const { branch: branchParam } = useParams();
  const slug = branchParam?.toLowerCase();
  const branch = branchLeaderboard.find(
    (b) => b.branch.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!branch) return <Navigate to="/branches" replace />;

  const kpis = {
    achievement: { value: branch.achievement, unit: '%', change: 4.2, trend: 'up', label: 'Target Achievement' },
    deposits: { value: branch.deposits, unit: 'M', change: 6.8, trend: 'up', label: 'Deposits' },
    loans: { value: branch.loans, unit: 'M', change: 5.2, trend: 'up', label: 'Loans' },
    nps: { value: branch.nps, unit: '', change: 3.1, trend: 'up', label: 'NPS Score' }
  };

  const kpiIcons = {
    'Target Achievement': Star,
    Deposits: Wallet,
    Loans: CreditCard,
    'NPS Score': Users
  };

  return (
    <div className="space-y-6" data-testid="branch-detail-page">
      <DetailPageHeader
        title={branch.branch}
        subtitle={`Rank #${branch.rank} · Branch deep-dive`}
        backTo="/branches"
        backLabel="Back to Branches"
        breadcrumbs={[
          { label: 'Branches', to: '/branches' },
          { label: 'Leaderboard', to: '/branches' },
          { label: branch.branch }
        ]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(kpis).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Target vs Actual" subtitle="Monthly branch performance">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={branchTargetVsActual}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <Tooltip contentStyle={tooltipContentStyle} />
                <Legend />
                <Line type="monotone" dataKey="target" name="Target" stroke="#94A3B8" strokeDasharray="5 5" strokeWidth={2} />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Product Mix" subtitle="Deposit vs loan split">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { label: 'Deposits', value: branch.deposits },
                { label: 'Loans', value: branch.loans }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [`$${value}M`, '']} />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={64} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <DataTable
        title="Branch Relationship Managers"
        columns={staffColumns}
        data={staffProductivity}
        showRank
      />
    </div>
  );
}
