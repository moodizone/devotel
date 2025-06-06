import { Typography } from './typography';
import { Button } from './button';

interface NoDataProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function NoData({ message, actionLabel, onAction }: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <Typography variant="p" className="text-zinc-500 dark:text-zinc-400">
        {message}
      </Typography>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
} 