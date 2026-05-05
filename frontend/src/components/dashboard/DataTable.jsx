import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

const STATUS_COLORS = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  running: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
};

function formatValue(value, type) {
  if (type === 'currency') {
    return value >= 1000 ? `$${value.toLocaleString()}M` : `$${value}M`;
  }
  if (type === 'percent') return `${value}%`;
  if (type === 'number') {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  }
  return value;
}

function getAchievementColor(value) {
  if (value >= 100) return 'text-emerald-500';
  if (value >= 90) return 'text-amber-500';
  return 'text-red-500';
}

function TrendCell({ value }) {
  const isPositive = value > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const colorClass = isPositive ? 'text-emerald-500' : 'text-red-500';
  const prefix = isPositive ? '+' : '';
  
  return (
    <div className={cn("flex items-center gap-1", colorClass)}>
      <TrendIcon className="w-4 h-4" />
      <span className="font-mono text-sm">{prefix}{value}%</span>
    </div>
  );
}

function StatusCell({ value }) {
  return (
    <Badge className={cn("font-medium", STATUS_COLORS[value] || STATUS_COLORS.info)}>
      {value}
    </Badge>
  );
}

function AchievementCell({ value }) {
  return (
    <span className={cn("font-mono font-medium", getAchievementColor(value))}>
      {value}%
    </span>
  );
}

function DefaultCell({ value, type }) {
  const isNumeric = type === 'currency' || type === 'number' || type === 'percent';
  return (
    <span className={isNumeric ? "font-mono tabular-nums" : ""}>
      {formatValue(value, type)}
    </span>
  );
}

function CellRenderer({ row, column }) {
  const value = row[column.key];
  
  if (column.render) {
    return column.render(value, row);
  }

  switch (column.type) {
    case 'trend':
      return <TrendCell value={value} />;
    case 'status':
      return <StatusCell value={value} />;
    case 'achievement':
      return <AchievementCell value={value} />;
    default:
      return <DefaultCell value={value} type={column.type} />;
  }
}

function getAlignClass(align) {
  if (align === 'right') return 'text-right';
  if (align === 'center') return 'text-center';
  return '';
}

export function DataTable({ 
  columns, 
  data, 
  title,
  className,
  showRank = false 
}) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden",
        className
      )}
      data-testid={`data-table-${title?.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {title && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-heading font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800/50">
              {showRank && (
                <TableHead className="w-12 text-center font-semibold text-slate-600 dark:text-slate-300">
                  #
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead 
                  key={column.key}
                  className={cn(
                    "font-semibold text-slate-600 dark:text-slate-300",
                    getAlignClass(column.align)
                  )}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow 
                key={row.id || `row-${index}`}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                {showRank && (
                  <TableCell className="text-center font-medium text-slate-500">
                    {row.rank || index + 1}
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell 
                    key={`${row.id || index}-${column.key}`}
                    className={cn(
                      "text-slate-700 dark:text-slate-300",
                      getAlignClass(column.align)
                    )}
                  >
                    <CellRenderer row={row} column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
