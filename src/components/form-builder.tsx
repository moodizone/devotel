import { useForm, Controller, type ValidationRule } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import type { Form, FormFieldType, GroupInput } from '../services/forms';
import { Button } from './ui/button';
import { Label } from './ui/label';
import DynamicSelect from './DynamicSelect';
import { submitForm, type SubmitResponseType } from '../services/submissions';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from './ui/modal';

interface FormBuilderProps {
  details: Form;
}

export function FormBuilder({ details }: FormBuilderProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseData, setResponseData] = useState<{
    response: SubmitResponseType;
    data: Record<string, unknown>;
  } | null>(null);
  const { control, getValues, handleSubmit, formState, setValue, watch } = useForm({
    mode: 'onSubmit',
  });
  watch();

  //================================
  // Handlers
  //================================
  async function onSubmit(data: Record<string, unknown>) {
    const response = await submitForm(data);
    setResponseData({ response, data });
    setIsModalOpen(true);
  }
  const isFieldVisible = (field: FormFieldType, prefix: string[]) => {
    if (!field.visibility) return true;

    const { dependsOn, condition, value } = field.visibility;
    const path = [...prefix, dependsOn].join('.');
    const dependentValue = getValues(path);

    return condition === 'equals' && dependentValue === value;
  };
  // Function to render a single form field
  const renderField = (field: FormFieldType, prefix: string[] = []) => {
    const path = [...prefix, field.id];
    const name = path.join('.');
    const label = field.required ? field.label + '*' : field.label;

    if (!isFieldVisible(field, prefix)) {
      return null;
    }

    switch (field.type) {
      case 'text': {
        let pattern: ValidationRule<RegExp> | undefined = undefined;

        if (field.validation?.pattern) {
          const value = new RegExp(field.validation.pattern);
          pattern = {
            value,
            message: t('formDetails.validation.invalidFormat', { field: field.label }),
          };
        }

        return (
          <Controller
            key={field.id}
            name={name}
            control={control}
            rules={{
              required: field.required
                ? t('formDetails.validation.required', { field: field.label })
                : false,
              pattern,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="space-y-2">
                <Label htmlFor={field.id}>{label}</Label>
                <Input
                  id={field.id}
                  type="text"
                  value={value || ''}
                  onChange={onChange}
                  className={error ? 'border-red-600 dark:border-red-500' : ''}
                />
                {error?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
                    {error.message}
                  </p>
                )}
              </div>
            )}
          />
        );
      }
      case 'number': {
        return (
          <Controller
            key={field.id}
            name={name}
            control={control}
            rules={{
              required: field.required
                ? t('formDetails.validation.required', { field: field.label })
                : false,
              min: field.validation?.min
                ? {
                    value: field.validation.min,
                    message: t('formDetails.validation.min', {
                      field: field.label,
                      min: field.validation.min,
                    }),
                  }
                : undefined,
              max: field.validation?.max
                ? {
                    value: field.validation.max,
                    message: t('formDetails.validation.max', {
                      field: field.label,
                      max: field.validation.max,
                    }),
                  }
                : undefined,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="space-y-2">
                <Label htmlFor={field.id}>{label}</Label>
                <Input
                  type="number"
                  value={value || ''}
                  onChange={onChange}
                  className={error ? 'border-red-600 dark:border-red-500' : ''}
                />
                {error?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
                    {error.message}
                  </p>
                )}
              </div>
            )}
          />
        );
      }
      case 'radio': {
        return (
          <Controller
            key={field.id}
            name={name}
            control={control}
            rules={{
              required: field.required
                ? t('formDetails.validation.select', { field: field.label })
                : false,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="space-y-2">
                <Label htmlFor={field.id}>{label}</Label>
                <RadioGroup value={value} onValueChange={onChange}>
                  {field.options.map(option => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} name={name} id={`${field.id}-${option}`} />
                      <label htmlFor={`${field.id}-${option}`} className="text-sm font-medium">
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
                {error?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
                    {error.message}
                  </p>
                )}
              </div>
            )}
          />
        );
      }
      case 'date': {
        return (
          <Controller
            key={field.id}
            name={name}
            control={control}
            rules={{
              required: field.required
                ? t('formDetails.validation.required', { field: field.label })
                : false,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="space-y-2">
                <Label htmlFor={field.id}>{label}</Label>
                <Input
                  type="date"
                  value={value || ''}
                  onChange={onChange}
                  className={error ? 'border-red-600 dark:border-red-500' : ''}
                />
                {error?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
                    {error.message}
                  </p>
                )}
              </div>
            )}
          />
        );
      }
      case 'group': {
        return (
          <Card key={field.id} className="w-full">
            <CardHeader>
              <CardTitle>{field.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(field as GroupInput).fields.map(f => renderField(f, path))}
            </CardContent>
          </Card>
        );
      }
      case 'select': {
        return (
          <Controller
            key={field.id}
            name={name}
            control={control}
            rules={{
              required: field.required
                ? t('formDetails.validation.required', { field: field.label })
                : false,
            }}
            render={({ field: controllerFields, fieldState: { error } }) => (
              <DynamicSelect
                prefix={prefix}
                error={error}
                field={field}
                getValues={getValues}
                setValue={setValue}
                label={label}
                controllerFields={controllerFields}
              />
            )}
          />
        );
      }
      default:
        return null;
    }
  };

  //================================
  // Render
  //================================
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {details.fields.map(field => renderField(field))}
        <div className="flex justify-end">
          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? t('formDetails.submitting') : t('formDetails.submit')}
          </Button>
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent className="max-w-2xl">
          <ModalHeader>
            <ModalTitle>{t('formDetails.result.title')}</ModalTitle>
            <ModalDescription>{t('formDetails.result.description')}</ModalDescription>
          </ModalHeader>
          <div className="space-y-6 p-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-left rtl:text-right">
                {t('formDetails.result.response')}
              </h3>
              <pre
                className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 overflow-auto max-h-[300px] font-mono text-sm border border-zinc-200 dark:border-zinc-800 ltr"
                dir="ltr"
              >
                {JSON.stringify(responseData?.response, null, 2)}
              </pre>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-left rtl:text-right">
                {t('formDetails.result.submittedData')}
              </h3>
              <pre
                className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 overflow-auto max-h-[300px] font-mono text-sm border border-zinc-200 dark:border-zinc-800 ltr"
                dir="ltr"
              >
                {JSON.stringify(responseData?.data, null, 2)}
              </pre>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
