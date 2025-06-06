import * as React from 'react';
import type { Column } from './types';

interface TableSkeletonProps {
  columns: Column[];
}

export const TableSkeleton = React.memo(({ columns }: TableSkeletonProps) => {
  const visibleColumns = columns.filter(col => col.visible);
  const minColumns = Math.max(visibleColumns.length, 3);

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
                    {Array.from({ length: minColumns }).map((_, index) => (
                      <th
                        key={index}
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
                      {Array.from({ length: minColumns }).map((_, index) => (
                        <td key={index} className="px-4 py-3">
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
}); 