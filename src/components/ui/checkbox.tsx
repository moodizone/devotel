import * as React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className={`rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 focus:ring-zinc-500 dark:focus:ring-zinc-400 ${className}`}
        {...props}
      />
      {label && (
        <span className="text-sm text-zinc-900 dark:text-zinc-50">
          {label}
        </span>
      )}
    </label>
  );
} 