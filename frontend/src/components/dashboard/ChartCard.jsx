import { cn } from '../../lib/utils';

export function ChartCard({ title, subtitle, children, actions, className }) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden",
        className
      )}
      data-testid={`chart-card-${title?.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-heading font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
      <div className="p-5 pt-2">
        {children}
      </div>
    </div>
  );
}
