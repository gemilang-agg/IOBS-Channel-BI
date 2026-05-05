import { useEffect } from 'react';
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

const kpiIcons = {
  'Total Customers': Users,
  'New-to-Bank': UserPlus,
  'Active Customers': UserCheck,
  'Dormant Customers': UserX,
  'Cross-sell Ratio': GitBranch,
  'Churn Risk Count': AlertCircle
};

export default function CustomerDashboard() {
  const { dateRange } = useFilters();
  const { registerExportMeta } = useExportMeta();
  const filteredChurn = filterByDateRange(churnTrend, dateRange);

  useEffect(() => {
    registerExportMeta({
      title: 'Customer 360 Analytics',
      kpis: Object.values(customerKPIs),
      tables: [
        {
          title: 'Customer Segmentation',
          head: [['Segment', 'Share', 'Customers']],
          body: customerSegmentation.map((s) => [s.segment, `${s.value}%`, s.count.toLocaleString()])
        }
      ]
    });
  }, [registerExportMeta]);

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
        {Object.entries(customerKPIs).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} />
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
