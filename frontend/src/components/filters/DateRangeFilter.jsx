import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useFilters } from '../../context/FilterContext';
import { formatDateRangeLabel } from '../../lib/dataFilters';

export function DateRangeFilter() {
  const { dateRange, setDateRange } = useFilters();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-slate-100 dark:bg-slate-800 border-0"
          data-testid="date-filter"
        >
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">{formatDateRangeLabel(dateRange)}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto p-0"
        data-testid="date-filter-popover"
      >
        <DayPicker
          mode="range"
          selected={dateRange}
          onSelect={(range) => setDateRange(range || {})}
          numberOfMonths={2}
          defaultMonth={dateRange?.from || new Date(2024, 6, 1)}
          className="p-3 rdp-filter"
        />
        <div className="flex justify-end gap-2 px-3 pb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDateRange({
              from: new Date(2024, 6, 1),
              to: new Date(2024, 11, 31)
            })}
            data-testid="date-filter-reset"
          >
            Reset
          </Button>
          <Button
            size="sm"
            onClick={() => setOpen(false)}
            data-testid="date-filter-apply"
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
