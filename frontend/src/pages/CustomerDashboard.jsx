import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  GitBranch, 
  AlertCircle 
} from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { ChartCard } from '../components/dashboard/ChartCard';
import { 
  customerKPIs, 
  customerSegmentation, 
  productHolding,
  churnTrend,
  customerInsights 
} from '../data/mockData';
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
import { cn } from '../lib/utils';

const COLORS = ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981'];

export default function CustomerDashboard() {
  const kpiIcons = {
    'Total Customers': Users,
    'New-to-Bank': UserPlus,
    'Active Customers': UserCheck,
    'Dormant Customers': UserX,
    'Cross-sell Ratio': GitBranch,
    'Churn Risk Count': AlertCircle
  };

  return (
    <div className="space-y-6" data-testid="customer-dashboard">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Customer 360 Analytics
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Customer growth, segmentation and cross-sell opportunity analysis
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(customerKPIs).map(([key, kpi]) => (
          <KPICard
            key={key}
            {...kpi}
            icon={kpiIcons[kpi.label]}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segmentation */}
        <ChartCard 
          title="Customer Segmentation" 
          subtitle="By value tier"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegmentation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ segment, value }) => `${segment}: ${value}%`}
                  labelLine={false}
                >
                  {customerSegmentation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}% (${props.payload.count.toLocaleString()} customers)`, 
                    props.payload.segment
                  ]}
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

        {/* Churn Risk Trend */}
        <ChartCard 
          title="Churn Risk Trend" 
          subtitle="At-risk vs churned customers"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={churnTrend}>
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
                  formatter={(value) => [value.toLocaleString(), '']}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="atRisk" 
                  name="At Risk"
                  stroke="#F59E0B" 
                  fillOpacity={1} 
                  fill="url(#colorAtRisk)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="churned" 
                  name="Churned"
                  stroke="#EF4444" 
                  fillOpacity={1} 
                  fill="url(#colorChurned)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Product Holding by Segment */}
      <ChartCard 
        title="Product Holding by Segment" 
        subtitle="Percentage of customers with each product"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productHolding} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis 
                type="number" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 100]}
              />
              <YAxis 
                type="category" 
                dataKey="segment" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
                width={80}
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
              <Bar dataKey="savings" name="Savings" fill="#3B82F6" radius={[0, 2, 2, 0]} barSize={12} />
              <Bar dataKey="current" name="Current" fill="#06B6D4" radius={[0, 2, 2, 0]} barSize={12} />
              <Bar dataKey="cards" name="Cards" fill="#6366F1" radius={[0, 2, 2, 0]} barSize={12} />
              <Bar dataKey="loans" name="Loans" fill="#10B981" radius={[0, 2, 2, 0]} barSize={12} />
              <Bar dataKey="insurance" name="Insurance" fill="#8B5CF6" radius={[0, 2, 2, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Customer Insights Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-4">
          Customer Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {customerInsights.map((insight, index) => (
            <div 
              key={index}
              className={cn(
                "p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer",
                insight.type === 'opportunity' 
                  ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30" 
                  : "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30"
              )}
              data-testid={`customer-insight-${index}`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={cn(
                  "text-xs font-medium uppercase tracking-wider",
                  insight.type === 'opportunity' ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                )}>
                  {insight.type}
                </span>
                <span className={cn(
                  "text-xl font-heading font-bold",
                  insight.type === 'opportunity' ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"
                )}>
                  {insight.count.toLocaleString()}
                </span>
              </div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-1">{insight.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
