import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Typography } from '../components/ui/typography';
import { Button } from '../components/ui/button';
import { useTranslation } from 'react-i18next';
import { fetchForms } from '../services/forms';
import { FormBuilder } from '../components/form-builder';

export default function FormDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    data: forms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['forms'],
    queryFn: fetchForms,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const details = forms?.find(f => f.formId === id);

  //================================
  // Render
  //================================
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div>
          <Typography variant="h1">{t('formDetails.title')}</Typography>
          <Typography variant="h4">{details?.title}</Typography>
        </div>
        <Button variant="outline" onClick={() => navigate('/forms')} className="self-start">
          {t('formDetails.backToForms')}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-row gap-4">
              <div
                role="status"
                className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 animate-pulse"
              >
                <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[30%] mb-2.5"></div>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[60%] mb-2.5"></div>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[60%] mb-2.5"></div>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[70%]"></div>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="space-y-4">
          <Typography variant="p" className="text-red-500">
            {error instanceof Error ? error.message : t('formDetails.error')}
          </Typography>
          <Button onClick={() => navigate('/forms')}>{t('formDetails.backToForms')}</Button>
        </div>
      ) : // empty state
      !details ? (
        <div className="space-y-4">
          <Typography variant="p">{t('formDetails.notFound')}</Typography>
          <Button onClick={() => navigate('/forms')}>{t('formDetails.backToForms')}</Button>
        </div>
      ) : (
        <FormBuilder details={details} />
      )}
    </div>
  );
}
