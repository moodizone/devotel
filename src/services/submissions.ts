import { fetchAPI } from '../utils/fetchAPI';

export type DataType = string | number | boolean;
export interface TableData {
  columns: string[];
  data: {
    [key: string]: DataType;
  }[];
}

export async function fetchSubmissions(): Promise<TableData> {
  const response = await fetchAPI<TableData>('/api/insurance/forms/submissions');
  return response;
}
