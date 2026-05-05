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
import { ChartCard } from '../../components/dashboard/ChartCard';

const COLORS = ['#3B82F6', '#06B6D4', '#6366F1', '#10B981'];

const tooltipContentStyle = {
  background: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: '8px'
};

const dormantSparkline = [
  { month: 'Aug', value: 44 },
  { month: 'Sep', value: 43.5 },
  { month: 'Oct', value: 43 },
  { month: 'Nov', value: 42.5 },
  { month: 'Dec', value: 42.1 }
];

export function CASATrendChart({ data }) {
  return (
    <ChartCard title="CASA Growth Trend" subtitle="Savings vs Current Account balances">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [`$${value}B`, '']} />
            <Legend />
            <Area type="monotone" dataKey="savings" name="Savings" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSavings)" strokeWidth={2} />
            <Area type="monotone" dataKey="current" name="Current" stroke="#06B6D4" fillOpacity={1} fill="url(#colorCurrent)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function DepositMixChart({ data }) {
  return (
    <ChartCard title="Deposit Product Mix" subtitle="Distribution by account type">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Share']} contentStyle={tooltipContentStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function TopRegionsGrowthChart({ data }) {
  return (
    <ChartCard title="Top Regions by Growth" subtitle="Deposit growth performance" className="lg:col-span-2">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="branch" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={120} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [`${value}%`, 'Growth']} />
            <Bar dataKey="growth" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function DormantAccountsCard() {
  return (
    <ChartCard title="Dormant Accounts" subtitle="Trend over time">
      <div className="h-64 flex flex-col items-center justify-center">
        <div className="text-5xl font-heading font-bold text-slate-900 dark:text-white">42.1K</div>
        <p className="text-slate-500 mt-2">Total dormant accounts</p>
        <div className="flex items-center gap-2 mt-4 text-emerald-500">
          <span className="text-sm font-medium">-2.1% vs last month</span>
        </div>
        <div className="mt-6 w-full h-20">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dormantSparkline}>
              <Area type="monotone" dataKey="value" stroke="#10B981" fill="#10B98120" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  );
}
