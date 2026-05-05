import { useEffect } from 'react';
import { 
  CreditCard, 
  Wallet, 
  CheckCircle, 
  Banknote, 
  AlertTriangle, 
  RefreshCw 
} from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { DataTable } from '../components/dashboard/DataTable';
import { 
  lendingKPIs, 
  disbursementTrend, 
  delinquencyBuckets,
  loanPortfolio,
  riskHighlights 
} from '../data/mockData';
import {
  DisbursementTrendChart,
  DelinquencyBucketsChart,
  RiskHighlightsPanel
} from './lending/LendingSections';
import { useFilters } from '../context/FilterContext';
import { useExportMeta } from '../context/ExportContext';
import { filterByDateRange } from '../lib/dataFilters';

const kpiIcons = {
  'Loan Disbursement': CreditCard,
  'Outstanding Balance': Wallet,
  'Approval Rate': CheckCircle,
  'Avg Ticket Size': Banknote,
  'PAR/NPL': AlertTriangle,
  'Recovery Rate': RefreshCw
};

const portfolioColumns = [
  { key: 'product', label: 'Product' },
  { key: 'amount', label: 'Amount (B)', type: 'currency', align: 'right' },
  { key: 'npl', label: 'NPL %', type: 'percent', align: 'right' },
  { key: 'growth', label: 'Growth', type: 'trend', align: 'right' }
];

export default function LendingDashboard() {
  const { dateRange } = useFilters();
  const { registerExportMeta } = useExportMeta();
  const filteredDisbursement = filterByDateRange(disbursementTrend, dateRange);

  useEffect(() => {
    registerExportMeta({
      title: 'Lending Dashboard',
      kpis: Object.values(lendingKPIs),
      tables: [
        {
          title: 'Loan Portfolio',
          head: [['Product', 'Amount (B)', 'NPL %', 'Growth']],
          body: loanPortfolio.map((p) => [p.product, `$${p.amount}B`, `${p.npl}%`, `${p.growth > 0 ? '+' : ''}${p.growth}%`])
        }
      ]
    });
  }, [registerExportMeta]);

  return (
    <div className="space-y-6" data-testid="lending-dashboard">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Lending Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Consumer lending, mortgage and personal loan performance analytics
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(lendingKPIs).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DisbursementTrendChart data={filteredDisbursement} />
        <DelinquencyBucketsChart data={delinquencyBuckets} />
      </div>

      <RiskHighlightsPanel items={riskHighlights} />

      <DataTable
        title="Loan Portfolio Comparison"
        columns={portfolioColumns}
        data={loanPortfolio}
      />
    </div>
  );
}
