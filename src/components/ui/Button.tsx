import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'icon-circular';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary:
        'bg-[var(--color-primary)] text-[var(--color-on-primary)] px-[24px] py-[12px] rounded-full hover:bg-gray-200 active:scale-95 transition-all font-mono font-bold text-[13px] uppercase tracking-wider',
      secondary:
        'bg-transparent text-white border border-[rgba(255,255,255,0.2)] px-[24px] py-[12px] rounded-full hover:border-white hover:bg-[rgba(255,255,255,0.05)] active:scale-95 transition-all font-mono font-bold text-[13px] uppercase tracking-wider',
      accent:
        'bg-[var(--color-accent-orange)] text-white px-[24px] py-[12px] rounded-full hover:bg-orange-600 active:scale-95 transition-all font-mono font-bold text-[13px] uppercase tracking-wider',
      'icon-circular':
        'bg-[var(--color-surface-1)] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 active:scale-95 transition-transform border border-[rgba(255,255,255,0.1)]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
