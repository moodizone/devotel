import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../components/ui/typography';
import { Button } from '../components/ui/button';
import { fetchSubmissions, type TableData } from '../services/submissions';
import { Table } from '../components/ui/table/index';
import { ErrorMessage } from '../components/error-message';
import { NoData } from '../components/no-data';

export default function Submissions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const renderContent = () => {
    if (error) {
      return <ErrorMessage message={t('submissions.error')} />;
    }

    if (!isLoading && tableData.data.length === 0) {
      return (
        <NoData
          message={t('submissions.noData')}
          actionLabel={t('submissions.new')}
          onAction={() => navigate('/forms')}
        />
      );
    }

    return (
      <Table
        columns={columns}
        data={tableData.data}
        uniqueKey="id"
        isLoading={isLoading}
        onToggleColumn={handleToggleColumn}
        searchableColumns={['Full Name']}
        andFilterColumns={[{ key: 'Gender', label: 'Gender' }]}
        orFilterColumns={[{ key: 'Insurance Type', label: 'Insurance Type' }]}
        onRowClick={row => navigate(`/submissions/${row.id}`)}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <Typography variant="h1">{t('submissions.title')}</Typography>
        <Button onClick={() => navigate('/forms')}>
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          {t('submissions.new')}
        </Button>
      </div>
      {renderContent()}
    </div>
  );
}
