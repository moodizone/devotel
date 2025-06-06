import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchForms, type Form, type GroupInput } from '../services/forms';
import { Typography } from '../components/ui/typography';
import { FormGrid } from '../components/form-grid';

function countFields(fields: Form['fields']): { total: number; required: number } {
  return fields.reduce(
    (acc, field) => {
      acc.total++;
      if (field.required) acc.required++;
      if ((field as GroupInput).fields) {
        const nested = countFields((field as GroupInput).fields);
        acc.total += nested.total;
        acc.required += nested.required;
      }
      return acc;
    },
    { total: 0, required: 0 }
  );
}

export default function Forms() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: forms,
    isLoading,
    error,
  } = useQuery<Form[]>({
    queryKey: ['forms'],
    queryFn: fetchForms,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
  const formData = React.useMemo(() => {
    return forms
      ? forms.map((form, index) => {
          const { total, required } = countFields(form.fields);
          return {
            formId: form.formId,
            title: form.title,
            totalFields: total,
            requiredFields: required,
            order: index + 1,
          };
        })
      : [];
  }, [forms]);

  return (
    <div className="space-y-6">
      <Typography variant="h1">{t('forms.title')}</Typography>
      <FormGrid
        forms={formData}
        isLoading={isLoading}
        error={error}
        onFormClick={formId => navigate(`/forms/${formId}`)}
      />
    </div>
  );
}
