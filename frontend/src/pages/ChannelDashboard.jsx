import { 
  Smartphone, 
  Monitor, 
  CreditCard, 
  DollarSign, 
  XCircle, 
  TrendingUp 
} from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { ChartCard } from '../components/dashboard/ChartCard';
import { AlertPanel } from '../components/dashboard/AlertPanel';
import { DataTable } from '../components/dashboard/DataTable';
import { 
  channelKPIs, 
  digitalAdoptionTrend, 
  transactionByChannel,
  failedTxnTrend,
  channelAlerts 
} from '../data/mockData';
import {
  LineChart,
  Line,
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

export default function ChannelDashboard() {
  const kpiIcons = {
    'Active Mobile Users': Smartphone,
    'Internet Banking Users': Monitor,
    'ATM Transactions': CreditCard,
    'Digital Txn Value': DollarSign,
    'Failed Txn Ratio': XCircle,
    'Channel Migration': TrendingUp
  };

  const channelColumns = [
    { key: 'channel', label: 'Channel' },
    { key: 'transactions', label: 'Transactions (M)', type: 'number', align: 'right' },
    { key: 'value', label: 'Value (B)', type: 'currency', align: 'right' },
    { key: 'growth', label: 'Growth', type: 'trend', align: 'right' }
  ];

  return (
    <div className="space-y-6" data-testid="channel-dashboard">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Digital Channel Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Mobile banking, internet banking, ATM and digital channel analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(channelKPIs).map(([key, kpi]) => (
          <KPICard
            key={key}
            {...kpi}
            icon={kpiIcons[kpi.label]}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Digital Adoption Trend */}
        <ChartCard 
          title="Digital Adoption Trend" 
          subtitle="Active users by channel"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={digitalAdoptionTrend}>
                <defs>
                  <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWeb" x1="0" y1="0" x2="0" y2="1">
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
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [value.toLocaleString(), '']}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="mobile" 
                  name="Mobile App"
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorMobile)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="web" 
                  name="Internet Banking"
                  stroke="#06B6D4" 
                  fillOpacity={1} 
                  fill="url(#colorWeb)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Failed Transaction Trend */}
        <ChartCard 
          title="Failed Transaction Trend" 
          subtitle="Failure rate by channel"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={failedTxnTrend}>
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
                  dataKey="mobile" 
                  name="Mobile"
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="web" 
                  name="Web"
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  dot={{ fill: '#06B6D4', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="atm" 
                  name="ATM"
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction by Channel */}
        <ChartCard 
          title="Transaction Volume by Channel" 
          subtitle="Monthly breakdown"
          className="lg:col-span-2"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionByChannel}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis 
                  dataKey="channel" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  tickFormatter={(v) => `${v}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}M`, '']}
                />
                <Legend />
                <Bar 
                  dataKey="transactions" 
                  name="Transactions"
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
                <Bar 
                  dataKey="value" 
                  name="Value (B)"
                  fill="#06B6D4" 
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Alerts */}
        <AlertPanel alerts={channelAlerts} title="Channel Alerts" />
      </div>

      {/* Channel Performance Table */}
      <DataTable
        title="Channel Performance Summary"
        columns={channelColumns}
        data={transactionByChannel}
      />
    </div>
  );
}
