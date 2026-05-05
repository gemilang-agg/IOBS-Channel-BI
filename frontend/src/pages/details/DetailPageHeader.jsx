import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { Button } from '../../components/ui/button';

/**
 * Breadcrumbs: an array of { label, to? } — the last item renders as text.
 * Example: [{label: 'Executive', to: '/dashboard'}, {label: 'East Region'}]
 */
export function DetailPageHeader({ title, subtitle, breadcrumbs = [], backTo, backLabel }) {
  const fallbackBackTo = backTo || breadcrumbs[breadcrumbs.length - 2]?.to || '/dashboard';
  const fallbackBackLabel =
    backLabel || `Back to ${breadcrumbs[breadcrumbs.length - 2]?.label || 'Dashboard'}`;

  return (
    <div className="space-y-3">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"
          data-testid="detail-breadcrumbs"
        >
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
            data-testid="breadcrumb-home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <span key={crumb.to || crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                {!isLast && crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                    data-testid={`breadcrumb-${idx}`}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="text-slate-900 dark:text-white font-medium"
                    data-testid={`breadcrumb-current`}
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      )}

      {/* Header row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2"
            asChild
            data-testid="detail-back-btn"
          >
            <Link to={fallbackBackTo}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {fallbackBackLabel}
            </Link>
          </Button>
          <h1 className="font-heading text-2xl kiosk-sm:text-3xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
