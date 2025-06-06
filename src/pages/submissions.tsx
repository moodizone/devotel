import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Typography } from '../components/ui/typography';
import { Table } from '../components/ui/table';
import { fetchSubmissions, type TableData } from '../services/submissions';

export default function Submissions() {
  const { t } = useTranslation();
  const [columns, setColumns] = React.useState<
    Array<{ key: string; label: string; visible: boolean }>
  >([]);

  const {
    data: tableData = { columns: [], data: [] },
    isLoading,
    error,
  } = useQuery<TableData>({
    queryKey: ['submissions'],
    queryFn: fetchSubmissions,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  React.useEffect(() => {
    if (tableData.columns.length > 0) {
      setColumns(
        tableData.columns.map((col, index) => ({
          key: col,
          label: col,
          visible: index < 3,
        }))
      );
    }
  }, [tableData.columns]);

  const handleToggleColumn = (columnKey: string) => {
    setColumns(prev =>
      prev.map(col => (col.key === columnKey ? { ...col, visible: !col.visible } : col))
    );
  };

  return (
    <div className="space-y-6">
      <Typography variant="h1">{t('submissions.title')}</Typography>
      <Table
        columns={columns}
        data={tableData.data}
        isLoading={isLoading}
        error={error?.message}
        onToggleColumn={handleToggleColumn}
      />
    </div>
  );
}
