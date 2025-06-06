import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '../typography';
import { Pagination } from '../pagination';
import { TableHeader } from './TableHeader';
import { TableFilters } from './TableFilters';
import { TableControls } from './TableControls';
import { TableBody } from './TableBody';
import { TableSkeleton } from './TableSkeleton';
import type { TableProps } from './types';

export function Table({
  columns,
  data,
  uniqueKey,
  isLoading,
  error,
  onToggleColumn,
  searchableColumns = [],
  andFilterColumns = [],
  orFilterColumns = [],
  onRowClick,
}: TableProps) {
  const { t } = useTranslation();
  const [sortColumn, setSortColumn] = React.useState<string>();
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [andFilters, setAndFilters] = React.useState<Record<string, string>>({});
  const [orFilters, setOrFilters] = React.useState<Record<string, string[]>>({});

  // Get visible searchable columns
  const visibleSearchableColumns = React.useMemo(
    () => searchableColumns.filter(col => columns.find(c => c.key === col)?.visible),
    [searchableColumns, columns]
  );

  // Get visible filter columns
  const visibleAndFilterColumns = React.useMemo(
    () => andFilterColumns.filter(filter => columns.find(c => c.key === filter.key)?.visible),
    [andFilterColumns, columns]
  );

  const visibleOrFilterColumns = React.useMemo(
    () => orFilterColumns.filter(filter => columns.find(c => c.key === filter.key)?.visible),
    [orFilterColumns, columns]
  );

  // Generate filter options dynamically from data
  const filterOptions = React.useMemo(() => {
    const options: Record<string, string[]> = {};

    // Generate options for AND filters
    visibleAndFilterColumns.forEach(filter => {
      const uniqueValues = Array.from(
        new Set(data.map(row => row[filter.key]?.toString()).filter(Boolean))
      ).sort();
      options[filter.key] = uniqueValues;
    });

    // Generate options for OR filters
    visibleOrFilterColumns.forEach(filter => {
      const uniqueValues = Array.from(
        new Set(data.map(row => row[filter.key]?.toString()).filter(Boolean))
      ).sort();
      options[filter.key] = uniqueValues;
    });

    return options;
  }, [data, visibleAndFilterColumns, visibleOrFilterColumns]);

  //================================
  // Handlers
  //================================
  const handleSort = React.useCallback((column: string, direction: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortDirection(direction);
  }, []);

  const handlePageChange = React.useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleItemsPerPageChange = React.useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  }, []);

  const handleAndFilterChange = React.useCallback((column: string, value: string) => {
    setAndFilters(prev => ({
      ...prev,
      [column]: value,
    }));
    setPage(1);
  }, []);

  const handleOrFilterChange = React.useCallback((column: string, values: string[]) => {
    setOrFilters(prev => ({
      ...prev,
      [column]: values,
    }));
    setPage(1);
  }, []);

  const handleClearFilters = React.useCallback(() => {
    setSearchQuery('');
    setAndFilters({});
    setOrFilters({});
    setPage(1);
  }, []);

  const handleSearchChange = React.useCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, []);

  // Filter and search data
  const filteredData = React.useMemo(() => {
    return data.filter(row => {
      if (searchQuery) {
        const searchMatch = visibleSearchableColumns.some(column => {
          const value = row[column]?.toString().toLowerCase() || '';
          return value.includes(searchQuery.toLowerCase());
        });
        if (!searchMatch) return false;
      }

      for (const [column, value] of Object.entries(andFilters)) {
        if (value && row[column]?.toString() !== value) {
          return false;
        }
      }

      for (const [column, values] of Object.entries(orFilters)) {
        if (values.length > 0 && !values.includes(row[column]?.toString())) {
          return false;
        }
      }

      return true;
    });
  }, [data, searchQuery, andFilters, orFilters, visibleSearchableColumns]);

  const hasActiveFilters = React.useMemo(
    () =>
      Boolean(searchQuery) ||
      Object.values(andFilters).some(Boolean) ||
      Object.values(orFilters).some(values => values.length > 0),
    [searchQuery, andFilters, orFilters]
  );

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  if (isLoading) {
    return <TableSkeleton columns={columns} />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center">
        <Typography variant="p">{t('table.error')}</Typography>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-4">
        <TableFilters
          searchableColumns={visibleSearchableColumns}
          andFilterColumns={visibleAndFilterColumns}
          orFilterColumns={visibleOrFilterColumns}
          filterOptions={filterOptions}
          searchQuery={searchQuery}
          andFilters={andFilters}
          orFilters={orFilters}
          onSearchChange={handleSearchChange}
          onAndFilterChange={handleAndFilterChange}
          onOrFilterChange={handleOrFilterChange}
        />
        <TableControls
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          columns={columns}
          onToggleColumn={onToggleColumn}
        />
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 w-full">
        <div className="relative w-full max-w-[calc(100vw-32px)]">
          <div className="overflow-x-auto w-full">
            <div className="w-full">
              <table className="w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                <TableHeader
                  columns={columns}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
                <TableBody
                  data={paginatedData}
                  columns={columns}
                  uniqueKey={uniqueKey}
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={handleClearFilters}
                  onRowClick={onRowClick}
                />
              </table>
            </div>
          </div>
        </div>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
