import * as React from 'react';
import { Typography } from './ui/typography';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { useTranslation } from 'react-i18next';

interface FormCardProps {
  formId: string;
  title: string;
  totalFields: number;
  requiredFields: number;
  order: number;
  onClick?: () => void;
}

export function FormCard({
  formId,
  title,
  totalFields,
  requiredFields,
  order,
  onClick,
}: FormCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        onClick ? 'hover:bg-zinc-50 dark:hover:bg-zinc-900' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium ">{title}</CardTitle>
        <Typography variant="small" className="text-zinc-500 dark:text-zinc-400">
          #{order}
        </Typography>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col flex-wrap gap-4 pt-2 min-w-0">
          <div className="min-w-0 mt-4">
            <Typography variant="small" className="text-zinc-500 dark:text-zinc-400">
              {t('forms.formId')}
            </Typography>
            <Typography style={{ marginTop: 0 }} variant="p" className="font-medium block">
              {formId}
            </Typography>
          </div>
          <div className="min-w-0 mt-4">
            <Typography variant="small" className="text-zinc-500 dark:text-zinc-400">
              {t('forms.totalFields')}
            </Typography>
            <Typography style={{ marginTop: 0 }} variant="p" className="font-medium block">
              {totalFields}
            </Typography>
          </div>
          <div className="min-w-0 mt-4">
            <Typography variant="small" className="text-zinc-500 dark:text-zinc-400">
              {t('forms.requiredFields')}
            </Typography>
            <Typography
              style={{ marginTop: 0 }}
              variant="p"
              className="font-medium truncate max-w-[80px] block"
            >
              {requiredFields}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
