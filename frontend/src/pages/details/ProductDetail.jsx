import { useParams, Navigate } from 'react-router-dom';
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
import { DollarSign, TrendingUp, Percent, Target } from 'lucide-react';
import { KPICard } from '../../components/dashboard/KPICard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { DataTable } from '../../components/dashboard/DataTable';
import { revenueByProduct, regionPerformance } from '../../data/mockData';
import { DetailPageHeader } from './DetailPageHeader';

const tooltipContentStyle = {
  background: 'white',
  border: '1px solid #E2E8F0',
  borderRadius: '8px'
};

const productTrend = (baseValue) => [
  { month: 'Jul', revenue: +(baseValue * 0.86).toFixed(1), growth: 4.2 },
  { month: 'Aug', revenue: +(baseValue * 0.89).toFixed(1), growth: 4.8 },
  { month: 'Sep', revenue: +(baseValue * 0.92).toFixed(1), growth: 5.1 },
  { month: 'Oct', revenue: +(baseValue * 0.96).toFixed(1), growth: 5.6 },
  { month: 'Nov', revenue: +(baseValue * 0.98).toFixed(1), growth: 6.0 },
  { month: 'Dec', revenue: +(baseValue * 1.0).toFixed(1), growth: 6.4 }
];

const productRegionColumns = [
  { key: 'region', label: 'Region' },
  { key: 'revenue', label: 'Revenue (M)', type: 'number', align: 'right' },
  { key: 'share', label: 'Share', type: 'percent', align: 'right' },
  { key: 'growth', label: 'Growth', type: 'trend', align: 'right' }
];

export default function ProductDetail() {
  const { product: productParam } = useParams();
  const slug = productParam?.toLowerCase();
  const product = revenueByProduct.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!product) return <Navigate to="/dashboard" replace />;

  const totalRevenue = 124; // from exec KPI (in M)
  const productRevenueM = +(totalRevenue * product.value / 100).toFixed(1);
  const totalRegionDeposits = regionPerformance.reduce((s, r) => s + r.deposits, 0);
  const byRegion = regionPerformance.map((r) => {
    const share = r.deposits / totalRegionDeposits;
    return {
      region: r.region,
      revenue: +(productRevenueM * share).toFixed(2),
      share: +(share * 100).toFixed(1),
      growth: +(r.growth - 1 + product.value / 20).toFixed(1)
    };
  });

  const kpis = {
    revenue: { value: productRevenueM, unit: 'M', change: 6.4, trend: 'up', label: 'Revenue' },
    share: { value: product.value, unit: '%', change: 1.2, trend: 'up', label: 'Revenue Share' },
    growth: { value: 6.4, unit: '%', change: 0.8, trend: 'up', label: 'MoM Growth' },
    margin: { value: 22.8, unit: '%', change: 0.5, trend: 'up', label: 'Gross Margin' }
  };

  const kpiIcons = {
    Revenue: DollarSign,
    'Revenue Share': Percent,
    'MoM Growth': TrendingUp,
    'Gross Margin': Target
  };

  return (
    <div className="space-y-6" data-testid="product-detail-page">
      <DetailPageHeader
        title={`${product.name} Product`}
        subtitle="Revenue and distribution deep-dive"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(kpis).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Trend" subtitle="Last 6 months">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productTrend(productRevenueM)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [`$${value}M`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke={product.fill || '#3B82F6'} strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Revenue by Region" subtitle={`${product.name} split`}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byRegion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip contentStyle={tooltipContentStyle} formatter={(value) => [`$${value}M`, 'Revenue']} />
                <Bar dataKey="revenue" fill={product.fill || '#3B82F6'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <DataTable
        title="Revenue by Region"
        columns={productRegionColumns}
        data={byRegion}
        showRank
      />
    </div>
  );
}
