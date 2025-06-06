import * as React from 'react';
import { FormCard } from './form-card';
import { ErrorMessage } from './error-message';
import { NoData } from './no-data';
import { useTranslation } from 'react-i18next';

interface Form {
  formId: string;
  title: string;
  totalFields: number;
  requiredFields: number;
}

interface FormGridProps {
  forms: Form[];
  isLoading?: boolean;
  error?: Error | null;
  onFormClick?: (formId: string) => void;
}

export function FormGrid({ forms: initialForms, isLoading, error, onFormClick }: FormGridProps) {
  const { t } = useTranslation();
  const [forms, setForms] = React.useState<Form[]>(initialForms);

  React.useEffect(() => {
    setForms(initialForms);
  }, [initialForms]);

  if (error) {
    return <ErrorMessage message={t('forms.error')} />;
  }

  if (!isLoading && forms.length === 0) {
    return <NoData message={t('forms.noData')} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {forms.map(form => (
        <FormCard
          key={form.formId}
          formId={form.formId}
          title={form.title}
          totalFields={form.totalFields}
          requiredFields={form.requiredFields}
          onClick={() => onFormClick?.(form.formId)}
        />
      ))}
    </div>
  );
}
