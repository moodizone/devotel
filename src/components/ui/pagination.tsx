import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { Typography } from './typography';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <Typography variant="small" className="text-zinc-500 dark:text-zinc-400">
        {t('table.showing')} {(page - 1) * itemsPerPage + 1} {t('table.to')}{' '}
        {Math.min(page * itemsPerPage, totalItems)} {t('table.of')} {totalItems}{' '}
        {t('table.results')}
      </Typography>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          {t('pagination.previous')}
        </Button>

        {/* Show all page numbers on desktop */}
        <div className="hidden md:flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <Button
              key={pageNum}
              variant={pageNum === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </Button>
          ))}
        </div>

        {/* Show only current page on mobile */}
        <div className="md:hidden">
          <Button variant="default" size="sm">
            {page}
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          {t('pagination.next')}
        </Button>
      </div>
    </div>
  );
}
