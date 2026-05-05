import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartCard } from '../../components/dashboard/ChartCard';

const COLORS = ['#3B82F6', '#06B6D4', '#6366F1', '#10B981', '#8B5CF6'];

const tooltipContentStyle = {
  background: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: '8px'
};

const renderLegendValue = (value) => (
  <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>
);

export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
      <p className="font-medium text-sm text-slate-900 dark:text-white mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey || entry.name} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === 'number' && entry.value >= 1 ? `$${entry.value}B` : entry.value}
        </p>
      ))}
    </div>
  );
};

export function DepositGrowthChart({ data }) {
  return (
    <ChartCard title="Deposit Growth Trend" subtitle="CASA vs Time Deposits">
      <div className="h-72 kiosk-sm:h-80 kiosk:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCasa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="casa" name="CASA" stroke="#06B6D4" fillOpacity={1} fill="url(#colorCasa)" strokeWidth={2} />
            <Area type="monotone" dataKey="td" name="Time Deposits" stroke="#3B82F6" fillOpacity={1} fill="url(#colorDeposits)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function LoanPortfolioTrendChart({ data }) {
  return (
    <ChartCard title="Loan Portfolio Trend" subtitle="Disbursement & Outstanding">
      <div className="h-72 kiosk-sm:h-80 kiosk:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="disbursement" name="Disbursement (M)" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2 }} activeDot={{ r: 6 }} />
            <Line yAxisId="right" type="monotone" dataKey="outstanding" name="Outstanding (B)" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function RevenueByProductChart({ data }) {
  return (
    <ChartCard title="Revenue by Product" subtitle="Current period distribution">
      <div className="h-64 kiosk-sm:h-72 kiosk:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, 'Share']}
              contentStyle={tooltipContentStyle}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={renderLegendValue}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function RegionPerformanceChart({ data }) {
  return (
    <ChartCard title="Region Performance" subtitle="Deposits & Loans by Region" className="lg:col-span-2">
      <div className="h-64 kiosk-sm:h-72 kiosk:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
            <YAxis type="category" dataKey="region" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={60} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="deposits" name="Deposits" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="loans" name="Loans" fill="#06B6D4" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
