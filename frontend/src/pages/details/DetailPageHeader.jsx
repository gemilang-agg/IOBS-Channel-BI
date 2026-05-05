import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function DetailPageHeader({ title, subtitle, backTo = '/dashboard', backLabel = 'Back to Dashboard' }) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <Button variant="ghost" size="sm" className="mb-3 -ml-2" asChild data-testid="detail-back-btn">
          <Link to={backTo}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLabel}
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
  );
}
