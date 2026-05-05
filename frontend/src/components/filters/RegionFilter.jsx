import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useFilters } from '../../context/FilterContext';

const REGIONS = ['all', 'North', 'South', 'East', 'West', 'Central'];

export function RegionFilter() {
  const { region, setRegion } = useFilters();
  return (
    <Select value={region} onValueChange={setRegion}>
      <SelectTrigger
        className="w-40 bg-slate-100 dark:bg-slate-800 border-0"
        data-testid="region-filter"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((r) => (
          <SelectItem key={r} value={r.toLowerCase()} data-testid={`region-option-${r.toLowerCase()}`}>
            {r === 'all' ? 'All Regions' : r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
