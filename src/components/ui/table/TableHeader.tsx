import * as React from 'react';
import { useTranslation } from 'react-i18next';
import type { Column } from './types';

interface TableHeaderProps {
  columns: Column[];
  sortColumn?: string;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string, direction: 'asc' | 'desc') => void;
}

export const TableHeader = React.memo(({ columns, sortColumn, sortDirection, onSort }: TableHeaderProps) => {
  const { t } = useTranslation();
  const visibleColumns = columns.filter(col => col.visible);

  return (
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
                  onSort(
                    column.key,
                    sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc'
                  )
                }
                className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-50"
                title={
                  sortColumn === column.key
                    ? t('table.sortingBy', {
                        column: column.label,
                        direction:
                          sortDirection === 'asc' ? t('table.ascending') : t('table.descending'),
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
  );
}); 