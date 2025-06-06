import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from './typography';
import { Button } from './button';
import { Menu } from './menu';
import { Checkbox } from './checkbox';
import { Pagination } from './pagination';

interface Column {
  key: string;
  label: string;
  visible: boolean;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  isLoading?: boolean;
  error?: string;
  onToggleColumn?: (column: string) => void;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  isLoading,
  error,
  onToggleColumn,
}: TableProps<T>) {
  const { t } = useTranslation();
  const [sortColumn, setSortColumn] = React.useState<string>();
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const visibleColumns = columns.filter(col => col.visible);

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
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
  }, [data, sortColumn, sortDirection]);

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
        {' '}
        <Typography variant="p">{t('table.error')}</Typography>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center">
        <Typography variant="p" className="text-zinc-500 dark:text-zinc-400">
          {t('table.noRecords')}
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Typography variant="small" className="text-zinc-500 dark:text-zinc-400">
            {t('table.itemsPerPage')}:
          </Typography>
          <select
            value={itemsPerPage}
            onChange={e => handleItemsPerPageChange(Number(e.target.value))}
            className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-1 text-sm text-zinc-900 dark:text-zinc-50"
          >
            {[10, 20, 30, 50].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="relative z-50">
          <Menu
            trigger={
              <Button variant="outline" size="sm">
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
                  className="mr-2"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {t('table.visibility')}
              </Button>
            }
          >
            {columns.map(column => (
              <Checkbox
                key={column.key}
                label={column.label}
                checked={column.visible}
                onChange={() => onToggleColumn?.(column.key)}
              />
            ))}
          </Menu>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 w-full">
        <div className="relative w-full max-w-[calc(100vw-32px)]">
          <div className="overflow-x-auto w-full">
            <div className="w-full">
              <table className="w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                <thead>
                  <tr>
                    {visibleColumns.map(column => (
                      <th
                        key={column.key}
                        className="sticky top-0 z-20 px-4 py-3 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900"
                      >
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleSort(
                                column.key,
                                sortColumn === column.key && sortDirection === 'asc'
                                  ? 'desc'
                                  : 'asc'
                              )
                            }
                            className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-50"
                            title={
                              sortColumn === column.key
                                ? t('table.sortingBy', {
                                    column: column.label,
                                    direction:
                                      sortDirection === 'asc'
                                        ? t('table.ascending')
                                        : t('table.descending'),
                                  })
                                : t('table.sortBy', { column: column.label })
                            }
                          >
                            {column.label}
                            {sortColumn === column.key && (
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
                                className={`transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {paginatedData.map((row, rowIndex) => (
                    <tr
                      key={row.id || rowIndex}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                      {visibleColumns.map(column => (
                        <td
                          key={column.key}
                          className="whitespace-nowrap px-4 py-3 text-sm text-zinc-900 dark:text-zinc-50"
                        >
                          {row[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
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

function TableSkeleton({ columns }: { columns: Column[] }) {
  const visibleColumns = columns.filter(col => col.visible);

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 w-full">
        <div className="relative w-full max-w-[calc(100vw-32px)]">
          <div className="overflow-x-auto w-full">
            <div className="w-full">
              <table className="w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                <thead>
                  <tr>
                    {visibleColumns.map(column => (
                      <th
                        key={column.key}
                        className="sticky top-0 z-20 px-4 py-3 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900"
                      >
                        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {[1, 2, 3].map(row => (
                    <tr key={row}>
                      {visibleColumns.map(column => (
                        <td key={column.key} className="px-4 py-3">
                          <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
