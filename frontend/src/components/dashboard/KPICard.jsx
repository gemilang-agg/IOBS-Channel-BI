import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

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
  const isNegativeGood = label.toLowerCase().includes('delinquency') || 
                         label.toLowerCase().includes('complaint') ||
                         label.toLowerCase().includes('dormant') ||
                         label.toLowerCase().includes('failed');
  
  // For metrics where "down" is good (like complaints, delinquency)
  const displayColor = isNegativeGood 
    ? (isPositive ? 'text-red-500' : 'text-emerald-500')
    : (isPositive ? 'text-emerald-500' : 'text-red-500');

  const formatValue = (val, unit) => {
    if (unit === 'B') return `$${val}B`;
    if (unit === 'M') return `$${val}M`;
    if (unit === '%') return `${val}%`;
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 card-hover",
        className
      )}
      data-testid={`kpi-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
          <p className="text-2xl font-heading font-bold text-slate-900 dark:text-white tabular-nums">
            {formatValue(value, unit)}
          </p>
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-500" />
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className={cn("flex items-center gap-1 mt-3", displayColor)}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium tabular-nums">
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-slate-400 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
}
