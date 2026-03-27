import { 
  Target, 
  UserPlus, 
  CreditCard, 
  Wallet, 
  Users, 
  MessageSquare 
} from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { ChartCard } from '../components/dashboard/ChartCard';
import { DataTable } from '../components/dashboard/DataTable';
import { 
  branchKPIs, 
  branchLeaderboard, 
  branchTargetVsActual,
  staffProductivity 
} from '../data/mockData';
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
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

export default function BranchDashboard() {
  const kpiIcons = {
    'Target Achievement': Target,
    'New Accounts': UserPlus,
    'Loan Bookings': CreditCard,
    'Branch Deposits': Wallet,
    'Service Volume': Users,
    'Complaints': MessageSquare
  };

  const leaderboardColumns = [
    { key: 'branch', label: 'Branch' },
    { key: 'achievement', label: 'Achievement', type: 'achievement', align: 'center' },
    { key: 'deposits', label: 'Deposits (M)', type: 'number', align: 'right' },
    { key: 'loans', label: 'Loans', type: 'number', align: 'right' },
    { key: 'nps', label: 'NPS', align: 'center', render: (value) => (
      <Badge className={cn(
        "font-mono",
        value >= 75 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
        value >= 60 ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
        "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
      )}>
        {value}
      </Badge>
    )}
  ];

  const staffColumns = [
    { key: 'name', label: 'Relationship Manager' },
    { key: 'accounts', label: 'Accounts', type: 'number', align: 'right' },
    { key: 'loans', label: 'Loans', type: 'number', align: 'right' },
    { key: 'revenue', label: 'Revenue', align: 'right', render: (value) => (
      <span className="font-mono">${(value / 1000).toFixed(0)}K</span>
    )}
  ];

  return (
    <div className="space-y-6" data-testid="branch-dashboard">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Branch Performance Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Branch and regional performance monitoring
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(branchKPIs).map(([key, kpi]) => (
          <KPICard
            key={key}
            {...kpi}
            icon={kpiIcons[kpi.label]}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Target vs Actual */}
        <ChartCard 
          title="Target vs Actual Performance" 
          subtitle="Monthly comparison"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={branchTargetVsActual}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  name="Target"
                  stroke="#94A3B8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual"
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Branch Comparison */}
        <ChartCard 
          title="Branch Comparison" 
          subtitle="Top 5 branches by achievement"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={branchLeaderboard}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 130]}
                />
                <YAxis 
                  type="category" 
                  dataKey="branch" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  width={120}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}%`, 'Achievement']}
                />
                <ReferenceLine x={100} stroke="#94A3B8" strokeDasharray="3 3" />
                <Bar 
                  dataKey="achievement" 
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                >
                  {branchLeaderboard.map((entry, index) => (
                    <Bar 
                      key={`bar-${index}`} 
                      dataKey="achievement"
                      fill={entry.achievement >= 100 ? '#10B981' : entry.achievement >= 90 ? '#F59E0B' : '#EF4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Leaderboard */}
        <DataTable
          title="Branch Leaderboard"
          columns={leaderboardColumns}
          data={branchLeaderboard}
          showRank
        />

        {/* Staff Productivity */}
        <DataTable
          title="Top Relationship Managers"
          columns={staffColumns}
          data={staffProductivity}
          showRank
        />
      </div>
    </div>
  );
}
