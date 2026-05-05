import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { Calendar as CalendarIcon, ChevronDown, GitCompare } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Switch } from '../ui/switch';
import { useFilters } from '../../context/FilterContext';
import {
  formatDateRangeLabel,
  DATE_PRESETS,
  getActivePresetId,
  getComparePresets,
  getComparePreset
} from '../../lib/dataFilters';
import { cn } from '../../lib/utils';

const COMPARE_PRESETS = getComparePresets();

export function DateRangeFilter() {
  const {
    dateRange,
    setDateRange,
    compareEnabled,
    setCompareEnabled,
    compareRange,
    setCompareRange
  } = useFilters();
  const [open, setOpen] = useState(false);
  const [activeComparePreset, setActiveComparePreset] = useState('previous-period');
  const activePresetId = getActivePresetId(dateRange);
  const activePreset = DATE_PRESETS.find((p) => p.id === activePresetId);
  const label = activePreset ? activePreset.label : formatDateRangeLabel(dateRange);

  const applyPreset = (preset) => {
    setDateRange(preset.range());
    if (compareEnabled && activeComparePreset) {
      const cp = getComparePreset(activeComparePreset);
      if (cp) setCompareRange(cp.compute(preset.range()));
    }
  };

  const handleToggleCompare = (next) => {
    setCompareEnabled(next);
    if (next) {
      const cp = getComparePreset(activeComparePreset);
      if (cp) setCompareRange(cp.compute(dateRange));
    } else {
      setCompareRange(null);
    }
  };

  const handleSelectComparePreset = (id) => {
    setActiveComparePreset(id);
    const cp = getComparePreset(id);
    if (cp && compareEnabled) setCompareRange(cp.compute(dateRange));
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
          {compareEnabled && (
            <span className="text-xs px-1.5 py-0.5 rounded-md bg-purple-500 text-white font-medium">
              vs
            </span>
          )}
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

          {/* Calendar + Compare */}
          <div>
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={(range) => setDateRange(range || {})}
              numberOfMonths={2}
              defaultMonth={dateRange?.from || new Date(2024, 6, 1)}
              className="p-3 rdp-filter"
            />

            {/* Compare-to row */}
            <div className="border-t border-slate-200 dark:border-slate-800 px-3 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Compare to
                </span>
                <Switch
                  checked={compareEnabled}
                  onCheckedChange={handleToggleCompare}
                  data-testid="compare-toggle"
                />
              </div>
              {compareEnabled && (
                <div className="flex items-center gap-1">
                  {COMPARE_PRESETS.map((cp) => (
                    <button
                      key={cp.id}
                      type="button"
                      onClick={() => handleSelectComparePreset(cp.id)}
                      data-testid={`compare-preset-${cp.id}`}
                      className={cn(
                        "text-xs px-2 py-1 rounded-md transition-colors",
                        activeComparePreset === cp.id
                          ? "bg-purple-500 text-white font-medium"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {cp.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {compareEnabled && compareRange && (
              <div className="px-3 pb-2 text-xs text-slate-500 dark:text-slate-400">
                Comparing against{' '}
                <span className="font-medium text-purple-500" data-testid="compare-range-label">
                  {formatDateRangeLabel(compareRange)}
                </span>
              </div>
            )}

            <div className="flex justify-end gap-2 px-3 pb-3 pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setDateRange({
                    from: new Date(2024, 6, 1),
                    to: new Date(2024, 11, 31)
                  });
                  setCompareEnabled(false);
                  setCompareRange(null);
                }}
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
