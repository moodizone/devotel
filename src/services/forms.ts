import { fetchAPI } from '../utils/fetchAPI';

export type FieldType = 'text' | 'number' | 'date' | 'select' | 'radio' | 'checkbox' | 'group';

export interface Validation {
  min?: number;
  max?: number;
  pattern?: string;
}

export interface DynamicOptions {
  dependsOn: string;
  endpoint: string;
  method: string;
}

export interface Visibility {
  dependsOn: string;
  condition: 'equals';
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  validation?: Validation;
  dynamicOptions?: DynamicOptions;
  visibility?: Visibility;
  fields?: FormField[];
}

export interface Form {
  formId: string;
  title: string;
  fields: FormField[];
}

export async function fetchForms(): Promise<Form[]> {
  const response = await fetchAPI<Form[]>('/insurance/forms');
  return response;
} 