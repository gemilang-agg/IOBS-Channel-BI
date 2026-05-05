import { 
  Target, 
  UserPlus, 
  CreditCard, 
  Wallet, 
  Users, 
  MessageSquare 
} from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useFilters } from '../context/FilterContext';
import { useExportMeta } from '../context/ExportContext';
import { filterByDateRange, scaleKpisByRegion } from '../lib/dataFilters';
import { regionPerformance } from '../data/mockData';

const getNpsBadgeClass = (nps) => {
  if (nps >= 75) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400";
  if (nps >= 60) return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400";
  return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";
};

const getAchievementColor = (achievement) => {
  if (achievement >= 100) return '#10B981';
  if (achievement >= 90) return '#F59E0B';
  return '#EF4444';
};

const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');

export default function BranchDashboard() {
  const navigate = useNavigate();
  const { dateRange, region } = useFilters();
  const { registerExportMeta } = useExportMeta();
  const filteredTarget = useMemo(() => filterByDateRange(branchTargetVsActual, dateRange), [dateRange]);
  const kpis = useMemo(() => scaleKpisByRegion(branchKPIs, region, regionPerformance), [region]);
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
      <Badge className={cn("font-mono", getNpsBadgeClass(value))}>
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

  useEffect(() => {
    registerExportMeta({
      title: 'Branch Performance Dashboard',
      subtitle: region === 'all' ? 'All regions' : `${region} region`,
      kpis: Object.values(kpis),
      tables: [
        {
          title: 'Branch Leaderboard',
          head: [['Rank', 'Branch', 'Achievement', 'Deposits (M)', 'Loans', 'NPS']],
          body: branchLeaderboard.map((b) => [b.rank, b.branch, `${b.achievement}%`, `$${b.deposits}M`, b.loans, b.nps])
        }
      ]
    });
  }, [kpis, region, registerExportMeta]);

  const handleBranchClick = (row) => navigate(`/details/branch/${slug(row.branch)}`);

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
        {Object.entries(kpis).map(([key, kpi]) => (
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
              <LineChart data={filteredTarget}>
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
                  {branchLeaderboard.map((entry) => (
                    <Bar 
                      key={`bar-${entry.branch}`} 
                      dataKey="achievement"
                      fill={getAchievementColor(entry.achievement)} 
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
          onRowClick={handleBranchClick}
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
