import {
  PieChart,
  Pie,
  Cell,
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

const COLORS = ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981'];

const tooltipContentStyle = {
  background: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: '8px'
};

const insightTypeBg = {
  opportunity: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30",
  risk: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30"
};

const insightLabelText = {
  opportunity: "text-emerald-600 dark:text-emerald-400",
  risk: "text-amber-600 dark:text-amber-400"
};

const insightCountText = {
  opportunity: "text-emerald-700 dark:text-emerald-300",
  risk: "text-amber-700 dark:text-amber-300"
};

export function CustomerSegmentationChart({ data }) {
  return (
    <ChartCard title="Customer Segmentation" subtitle="By value tier">
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
              label={({ segment, value }) => `${segment}: ${value}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.segment}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value}% (${props.payload.count.toLocaleString()} customers)`,
                props.payload.segment
              ]}
              contentStyle={tooltipContentStyle}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function ChurnTrendChart({ data }) {
  return (
    <ChartCard title="Churn Risk Trend" subtitle="At-risk vs churned customers">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAtRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorChurned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [value.toLocaleString(), '']} />
            <Legend />
            <Area type="monotone" dataKey="atRisk" name="At Risk" stroke="#F59E0B" fillOpacity={1} fill="url(#colorAtRisk)" strokeWidth={2} />
            <Area type="monotone" dataKey="churned" name="Churned" stroke="#EF4444" fillOpacity={1} fill="url(#colorChurned)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function ProductHoldingChart({ data }) {
  return (
    <ChartCard title="Product Holding by Segment" subtitle="Percentage of customers with each product">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
            <YAxis type="category" dataKey="segment" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={80} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [`${value}%`, '']} />
            <Legend />
            <Bar dataKey="savings" name="Savings" fill="#3B82F6" radius={[0, 2, 2, 0]} barSize={12} />
            <Bar dataKey="current" name="Current" fill="#06B6D4" radius={[0, 2, 2, 0]} barSize={12} />
            <Bar dataKey="cards" name="Cards" fill="#6366F1" radius={[0, 2, 2, 0]} barSize={12} />
            <Bar dataKey="loans" name="Loans" fill="#10B981" radius={[0, 2, 2, 0]} barSize={12} />
            <Bar dataKey="insurance" name="Insurance" fill="#8B5CF6" radius={[0, 2, 2, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function CustomerInsightsPanel({ insights }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-4">
        Customer Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className={cn(
              "p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer",
              insightTypeBg[insight.type]
            )}
            data-testid={`customer-insight-${insight.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={cn("text-xs font-medium uppercase tracking-wider", insightLabelText[insight.type])}>
                {insight.type}
              </span>
              <span className={cn("text-xl font-heading font-bold", insightCountText[insight.type])}>
                {insight.count.toLocaleString()}
              </span>
            </div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-1">{insight.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
