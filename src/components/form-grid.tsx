import { useTranslation } from 'react-i18next';
import { FormCard } from './form-card';
import { ErrorMessage } from './error-message';
import { NoData } from './no-data';
import { Skeleton } from './ui/skeleton';
interface Form {
  formId: string;
  title: string;
  totalFields: number;
  requiredFields: number;
}

interface FormGridProps {
  forms?: Form[];
  isLoading?: boolean;
  error?: Error | null;
  onFormClick?: (formId: string) => void;
}

export function FormCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 space-y-4 border-gray-200 dark:border-gray-800">
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function FormGrid({ forms, isLoading, error, onFormClick }: FormGridProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <FormCardSkeleton key={i} />
        ))}
      </div>
    );
  } else if (error) {
    return <ErrorMessage message={t('forms.error')} />;
  } else if (!forms || forms.length === 0) {
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
