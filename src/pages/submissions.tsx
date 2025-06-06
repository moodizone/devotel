import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Typography } from '../components/ui/typography';
import { Table } from '../components/ui/table';
import { fetchSubmissions, type TableData } from '../services/submissions';

export default function Submissions() {
  const [columns, setColumns] = React.useState<
    Array<{ key: string; label: string; visible: boolean }>
  >([]);

  const {
    data: tableData = { columns: [], data: [] },
    isLoading,
    error,
  } = useQuery<TableData>({
    queryKey: ['submissions'],
    async queryFn() {
      const data = await fetchSubmissions();

      if (data) {
        setColumns(
          data.columns.map((col, index) => ({
            key: col,
            label: col,
            visible: index < 3,
          }))
        );
      }
      return data;
    },
  });

  const handleToggleColumn = (columnKey: string) => {
    setColumns(prev =>
      prev.map(col => (col.key === columnKey ? { ...col, visible: !col.visible } : col))
    );
  };

  return (
    <div className="space-y-6">
      <Typography variant="h1">Submissions</Typography>
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
