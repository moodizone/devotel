import { fetchAPI } from '../utils/fetchAPI';

export type DataType = string | number | boolean;
export interface TableData {
  columns: string[];
  data: {
    [key: string]: DataType;
  }[];
}
export interface SubmitResponseType {
  message: string;
  status: string;
}

export async function fetchSubmissions(): Promise<TableData> {
  const response = await fetchAPI<TableData>('/api/insurance/forms/submissions');
  return response;
}
export async function submitForm(payload: Record<string, unknown>) {
  const response = await fetchAPI<SubmitResponseType>('/api/insurance/forms/submit', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response;
}
