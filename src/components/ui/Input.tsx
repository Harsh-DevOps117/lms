import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from './Button';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'bg-[var(--color-soft-cloud)] text-[var(--color-ink)] px-4 py-3 rounded-[24px] outline-none font-ui text-[16px] w-full',
          'focus:bg-[var(--color-canvas)] focus:ring-[2px] focus:ring-[var(--color-ink)] focus:shadow-[0_0_0_12px_var(--color-soft-cloud)] transition-all',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
