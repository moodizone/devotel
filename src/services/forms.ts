import { fetchAPI } from '../utils/fetchAPI';

//================================
// Common properties
//================================
export interface BaseFormField {
  id: string;
  label: string;
  required?: boolean;
  visibility?: {
    dependsOn: BaseFormField['id'];
    condition: 'equals';
    value: string;
  };
}

//================================
// Specific properties
//================================
export interface TextInput extends BaseFormField {
  type: 'text';
  validation?: {
    pattern?: string;
  };
}

export interface NumberInput extends BaseFormField {
  type: 'number';
  validation?: {
    min?: number;
    max?: number;
  };
}

export interface RadioInput extends BaseFormField {
  type: 'radio';
  options: string[];
}

export interface CheckboxInput extends BaseFormField {
  type: 'checkbox';
  options: string[];
}

export interface DateInput extends BaseFormField {
  type: 'date';
}

export interface SelectInput extends BaseFormField {
  type: 'select';
  options?: string[];
  dynamicOptions?: {
    dependsOn: BaseFormField['id'];
    endpoint: string;
    method: 'GET';
  };
}

export interface GroupInput extends BaseFormField {
  type: 'group';
  fields: FormFieldType[];
}

export type FormFieldType =
  | TextInput
  | NumberInput
  | RadioInput
  | CheckboxInput
  | DateInput
  | GroupInput
  | SelectInput;

export interface Form {
  formId: string;
  title: string;
  fields: FormFieldType[];
}
export interface StateResponse {
  country: string;
  states: string[];
}

export async function fetchForms() {
  const response = await fetchAPI<Form[]>('/api/insurance/forms');
  return response;
}
export async function getDynamicOptions(
  endpoint: string,
  dependOn: string,
  method: string,
  value: string | number
) {
  const response = await fetchAPI<StateResponse>(
    `${endpoint}?${dependOn}=${encodeURIComponent(value.toString())}`,
    {
      method,
    }
  );
  return response;
}
