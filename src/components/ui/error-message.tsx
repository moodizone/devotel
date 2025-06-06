import { Typography } from './typography';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center">
      <Typography variant="p">{message}</Typography>
    </div>
  );
} 