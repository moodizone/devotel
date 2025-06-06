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

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 5) {
      // If total pages is 5 or less, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (page > 3) {
      pages.push('...');
    }

    // Show pages around current page
    for (let i = Math.max(2, page - 1); i <= Math.min(page + 1, totalPages - 1); i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

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
          {getPageNumbers().map((pageNum, index) => (
            pageNum === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 text-zinc-500 dark:text-zinc-400">
                ...
              </span>
            ) : (
              <Button
                key={pageNum}
                variant={pageNum === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(pageNum as number)}
              >
                {pageNum}
              </Button>
            )
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
