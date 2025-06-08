import * as React from 'react';
import {
  type ControllerRenderProps,
  type FieldError,
  type FieldValues,
  type UseFormGetValues,
  type UseFormSetValue,
} from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { Label } from './ui/label';
import { Select, SelectItem } from './ui/select';
import { getDynamicOptions, type SelectInput } from '../services/forms';

interface PropsType {
  error?: FieldError;
  field: SelectInput;
  label: string;
  prefix: string[];
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  controllerFields: ControllerRenderProps<FieldValues, string>;
}

function DynamicSelect({
  error,
  field,
  label,
  controllerFields,
  prefix,
  getValues,
  setValue,
}: PropsType) {
  const selectPath = [...prefix, field.id];
  const name = selectPath.join('.');
  const dependPath = field.dynamicOptions
    ? [...prefix, field.dynamicOptions.dependsOn].join('.')
    : '';
  const dependValue = field.dynamicOptions ? getValues(dependPath) : null;
  const preDependValue = React.useRef(null);
  const { isLoading, data: dynamicOptions } = useQuery({
    queryKey: [
      'dynamicOptions',
      field.dynamicOptions?.endpoint,
      field.dynamicOptions?.method,
      field.dynamicOptions?.dependsOn,
      dependValue,
    ],
    async queryFn() {
      if (field.dynamicOptions && dependValue) {
        return getDynamicOptions(
          field.dynamicOptions.endpoint,
          field.dynamicOptions.dependsOn,
          field.dynamicOptions.method,
          dependValue
        );
      }
      return Promise.resolve({ country: '', states: [] });
    },
    enabled: field.dynamicOptions && !!dependValue,
  });

  // reset value upon changing the dependOn
  React.useEffect(
    () => {
      if (field.dynamicOptions && preDependValue.current !== dependValue) {
        preDependValue.current = dependValue;
        setValue(name, '');
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dependValue, name, field.dynamicOptions]
  );

  let options: string[] = [];

  if (field.dynamicOptions && dynamicOptions) {
    options = dynamicOptions.states;
  } else if (field.options) {
    options = field.options;
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>{label}</Label>
      <Select
        id={field.id}
        value={controllerFields.value}
        onValueChange={controllerFields.onChange}
        defaultValue={''}
        isLoading={isLoading}
        className={error ? 'border-red-600 dark:border-red-500' : ''}
      >
        {options.map(option => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </Select>
      {error?.message && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{error.message}</p>
      )}
    </div>
  );
}

export default DynamicSelect;
