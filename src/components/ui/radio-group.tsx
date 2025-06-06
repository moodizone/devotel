import * as React from 'react';
import { cn } from '../../utils/cn';

interface RadioGroupProps {
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, children }, ref) => {
    return (
      <div ref={ref} className={cn('grid gap-2', className)} role="radiogroup">
        {children}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string;
  value: string;
  onChange?: (value: string) => void;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, onChange, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          ref={ref}
          checked={props.checked}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className={cn(
            'h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
