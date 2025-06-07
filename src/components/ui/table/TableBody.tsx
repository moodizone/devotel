import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../button';
import { Typography } from '../typography';
import type { Column } from './types';
import type { DataType, TableData } from '../../../services/submissions';

interface TableBodyProps {
  data: TableData['data'];
  columns: Column[];
  uniqueKey: string;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onRowClick?: (row: { [key: string]: DataType }) => void;
}

export const TableBody = React.memo(
  ({ data, columns, uniqueKey, hasActiveFilters, onClearFilters, onRowClick }: TableBodyProps) => {
    const { t } = useTranslation();
    const visibleColumns = columns.filter(col => col.visible);

    if (data.length === 0) {
      return (
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          <tr>
            <td colSpan={visibleColumns.length} className="px-4 py-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Typography variant="p" className="text-zinc-500 dark:text-zinc-400">
                  {hasActiveFilters ? t('table.noResults') : t('table.noRecords')}
                </Typography>
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" onClick={onClearFilters}>
                    {t('table.clearFilters')}
                  </Button>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {data.map((row, rowIndex) => (
          <tr
            key={(row[uniqueKey] as string) || rowIndex}
            className={`hover:bg-zinc-50 dark:hover:bg-zinc-900 ${onRowClick ? 'cursor-pointer' : ''}`}
            onClick={() => onRowClick?.(row)}
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
    );
  }
);
