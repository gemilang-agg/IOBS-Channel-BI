import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useFilters } from '../../context/FilterContext';
import { formatDateRangeLabel, DATE_PRESETS, getActivePresetId } from '../../lib/dataFilters';
import { cn } from '../../lib/utils';

export function DateRangeFilter() {
  const { dateRange, setDateRange } = useFilters();
  const [open, setOpen] = useState(false);
  const activePresetId = getActivePresetId(dateRange);
  const activePreset = DATE_PRESETS.find((p) => p.id === activePresetId);
  const label = activePreset ? activePreset.label : formatDateRangeLabel(dateRange);

  const applyPreset = (preset) => {
    setDateRange(preset.range());
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-slate-100 dark:bg-slate-800 border-0"
          data-testid="date-filter"
        >
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">{label}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto p-0"
        data-testid="date-filter-popover"
      >
        <div className="flex">
          {/* Presets rail */}
          <div className="w-44 border-r border-slate-200 dark:border-slate-800 p-2 flex flex-col gap-1">
            <p className="text-xs font-semibold text-slate-500 px-2 py-1.5 uppercase tracking-wider">
              Quick Ranges
            </p>
            {DATE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                data-testid={`date-preset-${preset.id}`}
                className={cn(
                  "text-left text-sm px-2 py-1.5 rounded-md transition-colors",
                  activePresetId === preset.id
                    ? "bg-blue-500 text-white font-medium"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div>
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
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
