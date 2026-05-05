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
import { ChartCard } from '../../components/dashboard/ChartCard';
import { cn } from '../../lib/utils';

const tooltipContentStyle = {
  background: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: '8px'
};

const statusBgClass = {
  danger: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30",
  warning: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30",
  info: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30"
};

const statusTextClass = {
  danger: "text-red-600 dark:text-red-400",
  warning: "text-amber-600 dark:text-amber-400",
  info: "text-blue-600 dark:text-blue-400"
};

export function DisbursementTrendChart({ data }) {
  return (
    <ChartCard title="Disbursement Trend" subtitle="By product category">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [`$${value}M`, '']} />
            <Legend />
            <Area type="monotone" dataKey="personal" name="Personal" stroke="#3B82F6" fillOpacity={1} fill="url(#colorPersonal)" strokeWidth={2} stackId="1" />
            <Area type="monotone" dataKey="home" name="Home" stroke="#06B6D4" fillOpacity={1} fill="url(#colorHome)" strokeWidth={2} stackId="1" />
            <Area type="monotone" dataKey="auto" name="Auto" stroke="#10B981" fillOpacity={1} fill="url(#colorAuto)" strokeWidth={2} stackId="1" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function DelinquencyBucketsChart({ data }) {
  return (
    <ChartCard title="Delinquency Distribution" subtitle="Accounts by DPD bucket">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="bucket" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [value.toLocaleString(), 'Accounts']} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((entry) => (
                <Bar key={`bar-${entry.bucket}`} dataKey="value" fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function RiskHighlightsPanel({ items }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-4">
        Risk Highlights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.indicator}
            className={cn("p-4 rounded-lg border", statusBgClass[item.status])}
            data-testid={`risk-highlight-${item.indicator.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <p className="text-sm text-slate-600 dark:text-slate-400">{item.indicator}</p>
            <div className="flex items-end justify-between mt-2">
              <span className={cn("text-2xl font-heading font-bold", statusTextClass[item.status])}>
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
  );
}
