import { 
  AlertTriangle, 
  Clock, 
  XCircle, 
  DollarSign, 
  Users, 
  RefreshCw 
} from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { ChartCard } from '../components/dashboard/ChartCard';
import { DataTable } from '../components/dashboard/DataTable';
import { 
  riskKPIs, 
  delinquencyTrend, 
  recoveryByTeam,
  productRiskComparison 
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
  ResponsiveContainer
} from 'recharts';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

export default function RiskDashboard() {
  const kpiIcons = {
    'PAR 30': AlertTriangle,
    'PAR 90': Clock,
    'NPL Ratio': XCircle,
    'Recovery Collected': DollarSign,
    'In Collections': Users,
    'Restructured': RefreshCw
  };

  const recoveryColumns = [
    { key: 'team', label: 'Collection Team' },
    { key: 'collected', label: 'Collected (M)', type: 'number', align: 'right' },
    { key: 'target', label: 'Target (M)', type: 'number', align: 'right' },
    { key: 'rate', label: 'Recovery Rate', align: 'center', render: (value) => (
      <Badge className={cn(
        "font-mono",
        value >= 80 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
        value >= 70 ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
        "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
      )}>
        {value}%
      </Badge>
    )}
  ];

  const productRiskColumns = [
    { key: 'product', label: 'Product' },
    { key: 'npl', label: 'NPL %', type: 'percent', align: 'right' },
    { key: 'par30', label: 'PAR 30 %', type: 'percent', align: 'right' },
    { key: 'provision', label: 'Provision %', type: 'percent', align: 'right' },
    { 
      key: 'status', 
      label: 'Status', 
      align: 'center',
      render: (_, row) => (
        <Badge className={cn(
          row.npl <= 2 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
          row.npl <= 3 ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
          "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
        )}>
          {row.npl <= 2 ? 'Low Risk' : row.npl <= 3 ? 'Medium' : 'High Risk'}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6" data-testid="risk-dashboard">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Risk & Collections Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Asset quality monitoring and collection performance analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(riskKPIs).map(([key, kpi]) => (
          <KPICard
            key={key}
            {...kpi}
            icon={kpiIcons[kpi.label]}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delinquency Trend */}
        <ChartCard 
          title="Delinquency Trend" 
          subtitle="PAR ratios over time"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={delinquencyTrend}>
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
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}%`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="par30" 
                  name="PAR 30"
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  dot={{ fill: '#F59E0B', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="par60" 
                  name="PAR 60"
                  stroke="#F97316" 
                  strokeWidth={2}
                  dot={{ fill: '#F97316', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="par90" 
                  name="PAR 90"
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Recovery by Team */}
        <ChartCard 
          title="Recovery Performance" 
          subtitle="By collection team"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recoveryByTeam}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis 
                  dataKey="team" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${value}M`, '']}
                />
                <Legend />
                <Bar 
                  dataKey="target" 
                  name="Target"
                  fill="#94A3B8" 
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
                <Bar 
                  dataKey="collected" 
                  name="Collected"
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Risk Comparison */}
        <DataTable
          title="Product Risk Comparison"
          columns={productRiskColumns}
          data={productRiskComparison}
        />

        {/* Recovery Team Performance */}
        <DataTable
          title="Collection Team Performance"
          columns={recoveryColumns}
          data={recoveryByTeam}
        />
      </div>
    </div>
  );
}
