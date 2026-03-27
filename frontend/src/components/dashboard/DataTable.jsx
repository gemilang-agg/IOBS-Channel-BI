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

export function DataTable({ 
  columns, 
  data, 
  title,
  className,
  showRank = false 
}) {
  const formatValue = (value, type) => {
    if (type === 'currency') {
      if (value >= 1000) return `$${(value).toLocaleString()}M`;
      return `$${value}M`;
    }
    if (type === 'percent') return `${value}%`;
    if (type === 'number') {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toLocaleString();
    }
    return value;
  };

  const renderCell = (row, column) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }

    if (column.type === 'trend') {
      const isPositive = value > 0;
      return (
        <div className={cn(
          "flex items-center gap-1",
          isPositive ? "text-emerald-500" : "text-red-500"
        )}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-mono text-sm">{isPositive ? '+' : ''}{value}%</span>
        </div>
      );
    }

    if (column.type === 'status') {
      const statusColors = {
        success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
        warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
        danger: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
        info: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
        running: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
        failed: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
      };
      return (
        <Badge className={cn("font-medium", statusColors[value] || statusColors.info)}>
          {value}
        </Badge>
      );
    }

    if (column.type === 'achievement') {
      const color = value >= 100 ? 'text-emerald-500' : value >= 90 ? 'text-amber-500' : 'text-red-500';
      return <span className={cn("font-mono font-medium", color)}>{value}%</span>;
    }

    return (
      <span className={cn(
        column.type === 'currency' || column.type === 'number' || column.type === 'percent' 
          ? "font-mono tabular-nums" 
          : ""
      )}>
        {formatValue(value, column.type)}
      </span>
    );
  };

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
                    column.align === 'right' && "text-right",
                    column.align === 'center' && "text-center"
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
                key={row.id || index}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                {showRank && (
                  <TableCell className="text-center font-medium text-slate-500">
                    {row.rank || index + 1}
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell 
                    key={column.key}
                    className={cn(
                      "text-slate-700 dark:text-slate-300",
                      column.align === 'right' && "text-right",
                      column.align === 'center' && "text-center"
                    )}
                  >
                    {renderCell(row, column)}
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
