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
import { ChartCard } from '../../components/dashboard/ChartCard';

const tooltipContentStyle = {
  background: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: '8px'
};

export function DigitalAdoptionChart({ data }) {
  return (
    <ChartCard title="Digital Adoption Trend" subtitle="Active users by channel">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [value.toLocaleString(), '']} />
            <Legend />
            <Area type="monotone" dataKey="mobile" name="Mobile App" stroke="#3B82F6" fillOpacity={1} fill="url(#colorMobile)" strokeWidth={2} />
            <Area type="monotone" dataKey="web" name="Internet Banking" stroke="#06B6D4" fillOpacity={1} fill="url(#colorWeb)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function FailedTxnTrendChart({ data }) {
  return (
    <ChartCard title="Failed Transaction Trend" subtitle="Failure rate by channel">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [`${value}%`, '']} />
            <Legend />
            <Line type="monotone" dataKey="mobile" name="Mobile" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="web" name="Web" stroke="#06B6D4" strokeWidth={2} dot={{ fill: '#06B6D4', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="atm" name="ATM" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function TransactionByChannelChart({ data }) {
  return (
    <ChartCard title="Transaction Volume by Channel" subtitle="Monthly breakdown" className="lg:col-span-2">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="channel" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `${v}M`} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [`${value}M`, '']} />
            <Legend />
            <Bar dataKey="transactions" name="Transactions" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
            <Bar dataKey="value" name="Value (B)" fill="#06B6D4" radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
