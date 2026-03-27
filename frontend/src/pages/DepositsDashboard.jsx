import { Wallet, Landmark, PlusCircle, Moon, DollarSign, Percent } from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { ChartCard } from '../components/dashboard/ChartCard';
import { DataTable } from '../components/dashboard/DataTable';
import { 
  depositKPIs, 
  casaTrendData, 
  depositMixData,
  branchDepositPerformance 
} from '../data/mockData';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#3B82F6', '#06B6D4', '#6366F1', '#10B981'];

export default function DepositsDashboard() {
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

  return (
    <div className="space-y-6" data-testid="deposits-dashboard">
      {/* Page Header */}
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
          <KPICard
            key={key}
            {...kpi}
            icon={kpiIcons[kpi.label]}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CASA Growth Trend */}
        <ChartCard 
          title="CASA Growth Trend" 
          subtitle="Savings vs Current Account balances"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={casaTrendData}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
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
                  tickFormatter={(v) => `$${v}B`}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${value}B`, '']}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="savings" 
                  name="Savings"
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorSavings)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="current" 
                  name="Current"
                  stroke="#06B6D4" 
                  fillOpacity={1} 
                  fill="url(#colorCurrent)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Deposit Mix */}
        <ChartCard 
          title="Deposit Product Mix" 
          subtitle="Distribution by account type"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={depositMixData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {depositMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Share']}
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Regions by Deposit Growth */}
        <ChartCard 
          title="Top Regions by Growth" 
          subtitle="Deposit growth performance"
          className="lg:col-span-2"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={branchDepositPerformance}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  tickFormatter={(v) => `${v}%`}
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
                  formatter={(value) => [`${value}%`, 'Growth']}
                />
                <Bar 
                  dataKey="growth" 
                  fill="#3B82F6" 
                  radius={[0, 4, 4, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Dormant Account Trend - Mini card */}
        <ChartCard 
          title="Dormant Accounts" 
          subtitle="Trend over time"
        >
          <div className="h-64 flex flex-col items-center justify-center">
            <div className="text-5xl font-heading font-bold text-slate-900 dark:text-white">
              42.1K
            </div>
            <p className="text-slate-500 mt-2">Total dormant accounts</p>
            <div className="flex items-center gap-2 mt-4 text-emerald-500">
              <span className="text-sm font-medium">-2.1% vs last month</span>
            </div>
            <div className="mt-6 w-full h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { month: 'Aug', value: 44 },
                  { month: 'Sep', value: 43.5 },
                  { month: 'Oct', value: 43 },
                  { month: 'Nov', value: 42.5 },
                  { month: 'Dec', value: 42.1 }
                ]}>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    fill="#10B98120" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Branch Performance Table */}
      <DataTable
        title="Branch Performance by Deposits"
        columns={branchColumns}
        data={branchDepositPerformance}
        showRank
      />
    </div>
  );
}
