import { 
  CreditCard, 
  Wallet, 
  CheckCircle, 
  Banknote, 
  AlertTriangle, 
  RefreshCw 
} from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { ChartCard } from '../components/dashboard/ChartCard';
import { DataTable } from '../components/dashboard/DataTable';
import { 
  lendingKPIs, 
  disbursementTrend, 
  delinquencyBuckets,
  loanPortfolio,
  riskHighlights 
} from '../data/mockData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { cn } from '../lib/utils';

export default function LendingDashboard() {
  const kpiIcons = {
    'Loan Disbursement': CreditCard,
    'Outstanding Balance': Wallet,
    'Approval Rate': CheckCircle,
    'Avg Ticket Size': Banknote,
    'PAR/NPL': AlertTriangle,
    'Recovery Rate': RefreshCw
  };

  const portfolioColumns = [
    { key: 'product', label: 'Product' },
    { key: 'amount', label: 'Amount (B)', type: 'currency', align: 'right' },
    { key: 'npl', label: 'NPL %', type: 'percent', align: 'right' },
    { key: 'growth', label: 'Growth', type: 'trend', align: 'right' }
  ];

  return (
    <div className="space-y-6" data-testid="lending-dashboard">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Lending Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Consumer lending, mortgage and personal loan performance analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(lendingKPIs).map(([key, kpi]) => (
          <KPICard
            key={key}
            {...kpi}
            icon={kpiIcons[kpi.label]}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disbursement Trend */}
        <ChartCard 
          title="Disbursement Trend" 
          subtitle="By product category"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={disbursementTrend}>
                <defs>
                  <linearGradient id="colorPersonal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area 
                  type="monotone" 
                  dataKey="personal" 
                  name="Personal"
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorPersonal)" 
                  strokeWidth={2}
                  stackId="1"
                />
                <Area 
                  type="monotone" 
                  dataKey="home" 
                  name="Home"
                  stroke="#06B6D4" 
                  fillOpacity={1} 
                  fill="url(#colorHome)" 
                  strokeWidth={2}
                  stackId="1"
                />
                <Area 
                  type="monotone" 
                  dataKey="auto" 
                  name="Auto"
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#colorAuto)" 
                  strokeWidth={2}
                  stackId="1"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Delinquency Buckets */}
        <ChartCard 
          title="Delinquency Distribution" 
          subtitle="Accounts by DPD bucket"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={delinquencyBuckets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis 
                  dataKey="bucket" 
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
                  formatter={(value) => [value.toLocaleString(), 'Accounts']}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                >
                  {delinquencyBuckets.map((entry, index) => (
                    <Bar key={`bar-${index}`} dataKey="value" fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Risk Highlights */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-4">
          Risk Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {riskHighlights.map((item, index) => (
            <div 
              key={index}
              className={cn(
                "p-4 rounded-lg border",
                item.status === 'danger' && "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30",
                item.status === 'warning' && "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30",
                item.status === 'info' && "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30"
              )}
              data-testid={`risk-highlight-${index}`}
            >
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.indicator}</p>
              <div className="flex items-end justify-between mt-2">
                <span className={cn(
                  "text-2xl font-heading font-bold",
                  item.status === 'danger' && "text-red-600 dark:text-red-400",
                  item.status === 'warning' && "text-amber-600 dark:text-amber-400",
                  item.status === 'info' && "text-blue-600 dark:text-blue-400"
                )}>
                  {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                </span>
                <span className={cn(
                  "text-sm font-medium",
                  item.change.startsWith('+') ? "text-red-500" : "text-emerald-500"
                )}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loan Portfolio Table */}
      <DataTable
        title="Loan Portfolio Comparison"
        columns={portfolioColumns}
        data={loanPortfolio}
      />
    </div>
  );
}
