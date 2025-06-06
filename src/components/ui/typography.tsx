import * as React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | 'code' | 'lead' | 'large' | 'small' | 'muted';
  as?: keyof JSX.IntrinsicElements;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'p', as, ...props }, ref) => {
    const Component = as || variant;

    const variants = {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-900 dark:text-zinc-50',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50',
      p: 'leading-7 [&:not(:first-child)]:mt-6 text-zinc-900 dark:text-zinc-50',
      blockquote: 'mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-900 dark:border-zinc-700 dark:text-zinc-50',
      code: 'relative rounded bg-zinc-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50',
      lead: 'text-xl text-zinc-700 dark:text-zinc-300',
      large: 'text-lg font-semibold text-zinc-900 dark:text-zinc-50',
      small: 'text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50',
      muted: 'text-sm text-zinc-500 dark:text-zinc-400',
    };

    return (
      <Component
        className={`${variants[variant]} ${className}`}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Typography.displayName = 'Typography';

export { Typography, type TypographyProps }; 