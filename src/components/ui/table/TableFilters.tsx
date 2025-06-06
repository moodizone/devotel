import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../button';
import { Menu } from '../menu';
import { Checkbox } from '../checkbox';
import { Input } from '../input';
import type { FilterConfig } from './types';

interface TableFiltersProps {
  searchableColumns: string[];
  andFilterColumns: FilterConfig[];
  orFilterColumns: FilterConfig[];
  filterOptions: Record<string, string[]>;
  searchQuery: string;
  andFilters: Record<string, string>;
  orFilters: Record<string, string[]>;
  onSearchChange: (value: string) => void;
  onAndFilterChange: (column: string, value: string) => void;
  onOrFilterChange: (column: string, values: string[]) => void;
}

export const TableFilters = React.memo(
  ({
    searchableColumns,
    andFilterColumns,
    orFilterColumns,
    filterOptions,
    searchQuery,
    andFilters,
    orFilters,
    onSearchChange,
    onAndFilterChange,
    onOrFilterChange,
  }: TableFiltersProps) => {
    const { t } = useTranslation();

    return (
      <div className="flex flex-wrap gap-4">
        {searchableColumns.length > 0 && (
          <div className="flex-1 min-w-[200px]">
            <Input
              type="search"
              placeholder={t('table.search')}
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {andFilterColumns.map(filter => (
          <div key={filter.key} className="w-[200px]">
            <select
              value={andFilters[filter.key] || ''}
              onChange={e => onAndFilterChange(filter.key, e.target.value)}
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50"
            >
              <option value="">{filter.label}</option>
              {filterOptions[filter.key]?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        {orFilterColumns.map(filter => (
          <div key={filter.key} className="w-[200px]">
            <Menu
              trigger={
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>
                    {filter.label}
                    {orFilters[filter.key]?.length > 0 && (
                      <span className="ml-2 text-zinc-500 dark:text-zinc-400">
                        ({orFilters[filter.key].length})
                      </span>
                    )}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Button>
              }
            >
              {filterOptions[filter.key]?.map(option => (
                <Checkbox
                  key={option}
                  label={option}
                  checked={orFilters[filter.key]?.includes(option) || false}
                  onChange={e => {
                    const currentValues = orFilters[filter.key] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    onOrFilterChange(filter.key, newValues);
                  }}
                />
              ))}
            </Menu>
          </div>
        ))}
      </div>
    );
  }
);
