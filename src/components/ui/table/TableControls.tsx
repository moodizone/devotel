import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../button';
import { Menu } from '../menu';
import { Checkbox } from '../checkbox';
import { Typography } from '../typography';
import type { Column } from './types';

interface TableControlsProps {
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  columns: Column[];
  onToggleColumn?: (column: string) => void;
}

export const TableControls = React.memo(({
  itemsPerPage,
  onItemsPerPageChange,
  columns,
  onToggleColumn,
}: TableControlsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4 ml-auto">
      <div className="flex items-center gap-2">
        <Typography variant="small" className="text-zinc-500 dark:text-zinc-400">
          {t('table.itemsPerPage')}:
        </Typography>
        <select
          value={itemsPerPage}
          onChange={e => onItemsPerPageChange(Number(e.target.value))}
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
  );
}); 