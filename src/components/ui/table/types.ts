import type { TableData } from '../../../services/submissions';

export interface Column {
  key: string;
  label: string;
  visible: boolean;
}

export interface FilterConfig {
  key: string;
  label: string;
}

export interface TableProps {
  columns: Column[];
  data?: TableData['data'];
  uniqueKey: string;
  isLoading?: boolean;
  error?: string;
  onToggleColumn?: (column: string) => void;
  searchableColumns?: string[];
  andFilterColumns?: FilterConfig[];
  orFilterColumns?: FilterConfig[];
  onRowClick?: (row: Record<string, TableData['data']>) => void;
}
