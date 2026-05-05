import { useEffect, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  GitBranch, 
  AlertCircle 
} from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { 
  customerKPIs, 
  customerSegmentation, 
  productHolding,
  churnTrend,
  customerInsights
} from '../data/mockData';
import {
  CustomerSegmentationChart,
  ChurnTrendChart,
  ProductHoldingChart,
  CustomerInsightsPanel
} from './customer/CustomerSections';
import { useFilters } from '../context/FilterContext';
import { useExportMeta } from '../context/ExportContext';
import { filterByDateRange } from '../lib/dataFilters';
import { useDashboardKpis } from '../hooks/useDashboardKpis';

const kpiIcons = {
  'Total Customers': Users,
  'New-to-Bank': UserPlus,
  'Active Customers': UserCheck,
  'Dormant Customers': UserX,
  'Cross-sell Ratio': GitBranch,
  'Churn Risk Count': AlertCircle
};

export default function CustomerDashboard() {
  const { dateRange, region } = useFilters();
  const { registerExportMeta } = useExportMeta();
  const filteredChurn = useMemo(() => filterByDateRange(churnTrend, dateRange), [dateRange]);
  const { kpis, comparisonLabel } = useDashboardKpis(customerKPIs);

  useEffect(() => {
    registerExportMeta({
      title: 'Customer 360 Analytics',
      subtitle: region === 'all' ? 'All regions' : `${region} region`,
      kpis: Object.values(kpis),
      tables: [
        {
          title: 'Customer Segmentation',
          head: [['Segment', 'Share', 'Customers']],
          body: customerSegmentation.map((s) => [s.segment, `${s.value}%`, s.count.toLocaleString()])
        }
      ]
    });
  }, [kpis, region, registerExportMeta]);

  return (
    <div className="space-y-6" data-testid="customer-dashboard">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Customer 360 Analytics
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Customer growth, segmentation and cross-sell opportunity analysis
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(kpis).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} comparisonLabel={comparisonLabel} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerSegmentationChart data={customerSegmentation} />
        <ChurnTrendChart data={filteredChurn} />
      </div>

      <ProductHoldingChart data={productHolding} />

      <CustomerInsightsPanel insights={customerInsights} />
    </div>
  );
}
