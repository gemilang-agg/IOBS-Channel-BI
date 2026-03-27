import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';

const alertStyles = {
  danger: {
    bg: 'bg-red-50 dark:bg-red-500/10',
    border: 'border-red-200 dark:border-red-500/30',
    icon: AlertTriangle,
    iconColor: 'text-red-500'
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-500/30',
    icon: AlertCircle,
    iconColor: 'text-amber-500'
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/30',
    icon: Info,
    iconColor: 'text-blue-500'
  }
};

export function AlertPanel({ alerts, title = "Active Alerts", className }) {
  const [visibleAlerts, setVisibleAlerts] = useState(alerts);

  const dismissAlert = (id) => {
    setVisibleAlerts(prev => prev.filter(a => a.id !== id));
  };

  if (visibleAlerts.length === 0) return null;

  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden",
        className
      )}
      data-testid="alert-panel"
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="font-heading font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <span className="ml-auto text-sm text-slate-500">
            {visibleAlerts.length} active
          </span>
        </div>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
        {visibleAlerts.map((alert) => {
          const style = alertStyles[alert.type] || alertStyles.info;
          const Icon = style.icon;
          
          return (
            <div 
              key={alert.id}
              className={cn(
                "p-4 flex items-start gap-3 transition-colors",
                style.bg
              )}
              data-testid={`alert-${alert.id}`}
            >
              <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", style.iconColor)} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-slate-900 dark:text-white">
                  {alert.title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  {alert.message}
                </p>
                <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
              </div>
              <button 
                onClick={() => dismissAlert(alert.id)}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                data-testid={`dismiss-alert-${alert.id}`}
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
