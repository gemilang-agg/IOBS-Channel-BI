import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const NEGATIVE_METRICS = [
  'delinquency', 'complaint', 'dormant', 'failed', 
  'cost of funds', 'par', 'npl', 'churn'
];

function isNegativeMetric(label) {
  const lowerLabel = label.toLowerCase();
  return NEGATIVE_METRICS.some(metric => lowerLabel.includes(metric));
}

function formatValue(val, unit) {
  if (unit === 'B') return `$${val}B`;
  if (unit === 'M') return `$${val}M`;
  if (unit === '%') return `${val}%`;
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
  return val.toLocaleString();
}

function getTrendColor(isPositive, isNegativeGood) {
  if (isNegativeGood) {
    return isPositive ? 'text-red-500' : 'text-emerald-500';
  }
  return isPositive ? 'text-emerald-500' : 'text-red-500';
}

function TrendIndicator({ isPositive, change }) {
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const prefix = isPositive ? '+' : '';
  
  return (
    <>
      <TrendIcon className="w-4 h-4 kiosk:w-5 kiosk:h-5" />
      <span className="text-sm kiosk-sm:text-base kiosk:text-lg font-medium tabular-nums">
        {prefix}{change}%
      </span>
      <span className="text-xs kiosk-sm:text-sm kiosk:text-base text-slate-400 ml-1">vs last period</span>
    </>
  );
}

export function KPICard({ 
  label, 
  value, 
  unit = '', 
  change, 
  trend, 
  icon: Icon,
  className 
}) {
  const isPositive = trend === 'up';
  const isNegativeGood = isNegativeMetric(label);
  const displayColor = getTrendColor(isPositive, isNegativeGood);

  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 card-hover",
        "kiosk-sm:p-6 kiosk-md:p-7 kiosk:p-8",
        className
      )}
      data-testid={`kpi-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm kiosk-sm:text-base kiosk:text-lg text-slate-500 dark:text-slate-400 font-medium">{label}</p>
          <p className="text-2xl kiosk-sm:text-3xl kiosk:text-4xl font-heading font-bold text-slate-900 dark:text-white tabular-nums">
            {formatValue(value, unit)}
          </p>
        </div>
        {Icon && (
          <div className="w-10 h-10 kiosk-sm:w-12 kiosk-sm:h-12 kiosk:w-14 kiosk:h-14 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
            <Icon className="w-5 h-5 kiosk-sm:w-6 kiosk-sm:h-6 kiosk:w-7 kiosk:h-7 text-blue-500" />
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className={cn("flex items-center gap-1 mt-3 kiosk:mt-4", displayColor)}>
          <TrendIndicator isPositive={isPositive} change={change} />
        </div>
      )}
    </div>
  );
}
