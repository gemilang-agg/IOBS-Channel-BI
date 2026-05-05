import { 
  Smartphone, 
  Monitor, 
  CreditCard, 
  DollarSign, 
  XCircle, 
  TrendingUp 
} from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { AlertPanel } from '../components/dashboard/AlertPanel';
import { DataTable } from '../components/dashboard/DataTable';
import { 
  channelKPIs, 
  digitalAdoptionTrend, 
  transactionByChannel,
  failedTxnTrend,
  channelAlerts 
} from '../data/mockData';
import {
  DigitalAdoptionChart,
  FailedTxnTrendChart,
  TransactionByChannelChart
} from './channel/ChannelCharts';

const kpiIcons = {
  'Active Mobile Users': Smartphone,
  'Internet Banking Users': Monitor,
  'ATM Transactions': CreditCard,
  'Digital Txn Value': DollarSign,
  'Failed Txn Ratio': XCircle,
  'Channel Migration': TrendingUp
};

const channelColumns = [
  { key: 'channel', label: 'Channel' },
  { key: 'transactions', label: 'Transactions (M)', type: 'number', align: 'right' },
  { key: 'value', label: 'Value (B)', type: 'currency', align: 'right' },
  { key: 'growth', label: 'Growth', type: 'trend', align: 'right' }
];

export default function ChannelDashboard() {
  return (
    <div className="space-y-6" data-testid="channel-dashboard">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Digital Channel Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Mobile banking, internet banking, ATM and digital channel analytics
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(channelKPIs).map(([key, kpi]) => (
          <KPICard key={key} {...kpi} icon={kpiIcons[kpi.label]} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DigitalAdoptionChart data={digitalAdoptionTrend} />
        <FailedTxnTrendChart data={failedTxnTrend} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TransactionByChannelChart data={transactionByChannel} />
        <AlertPanel alerts={channelAlerts} title="Channel Alerts" />
      </div>

      <DataTable
        title="Channel Performance Summary"
        columns={channelColumns}
        data={transactionByChannel}
      />
    </div>
  );
}
