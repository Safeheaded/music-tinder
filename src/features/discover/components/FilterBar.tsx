import { pl } from '@/messages/pl';
import { CITIES, GENRES, ROLES, type Filters } from '../schemas';

type FilterSelectProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (value: T | null) => void;
};

const FilterSelect = <T extends string>({
  label,
  options,
  value,
  onChange,
}: FilterSelectProps<T>) => (
  <label className="flex min-w-0 flex-1 flex-col gap-1 text-xs text-zinc-400">
    {label}
    <select
      className="rounded-lg bg-zinc-800 px-2 py-2 text-sm text-zinc-100"
      value={value ?? ''}
      onChange={(event) => onChange((event.target.value || null) as T | null)}
    >
      <option value="">{pl.discover.filters.any}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

type FilterBarProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export const FilterBar = ({ filters, onChange }: FilterBarProps) => (
  <div className="flex gap-2">
    <FilterSelect
      label={pl.discover.filters.role}
      options={ROLES}
      value={filters.role}
      onChange={(role) => onChange({ ...filters, role })}
    />
    <FilterSelect
      label={pl.discover.filters.genre}
      options={GENRES}
      value={filters.genre}
      onChange={(genre) => onChange({ ...filters, genre })}
    />
    <FilterSelect
      label={pl.discover.filters.city}
      options={CITIES}
      value={filters.city}
      onChange={(city) => onChange({ ...filters, city })}
    />
  </div>
);
