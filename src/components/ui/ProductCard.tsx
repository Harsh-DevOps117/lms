import React from 'react';
interface ProductCardProps {
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  icon?: React.ReactNode;
  onBuy?: () => void;
  className?: string;
  featured?: boolean;
}
export const ProductCard = ({
  name,
  subtitle,
  price,
  originalPrice,
  icon,
  onBuy,
  className = '',
  featured = false,
}: ProductCardProps) => {
  return (
    <div 
      className={`relative flex flex-col p-[32px] rounded-none cursor-pointer transition-colors duration-300
        ${featured ? 'bg-[var(--color-surface-1)] border-t-2 border-t-[var(--color-primary)]' : 'bg-transparent border border-[rgba(255,255,255,0.1)]'}
        hover:bg-[rgba(255,255,255,0.03)]
        ${className}`}
      onClick={onBuy}
    >
      <div className="flex items-center gap-4 mb-[24px]">
        {icon && (
          <div className="w-[40px] h-[40px] flex items-center justify-center border border-[rgba(255,255,255,0.1)] bg-[var(--color-surface-1)] text-[var(--color-primary)]">
            {icon}
          </div>
        )}
        <h3 className="font-display font-semibold text-[24px] text-white tracking-tight uppercase">
          {name}
        </h3>
      </div>
      <div className="flex-1">
        <p className="font-ui text-[16px] text-[var(--color-ink-muted)] leading-relaxed mb-[32px]">
          {subtitle}
        </p>
      </div>
      <div className="flex items-end justify-between mt-auto border-t border-[rgba(255,255,255,0.1)] pt-[24px]">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[12px] text-[var(--color-ink-muted)] uppercase tracking-wider">
            Investment
          </span>
          <div className="flex items-baseline gap-3">
            <span className="font-display font-semibold text-[28px] text-white">
              {price}
            </span>
            {originalPrice && (
              <span className="font-mono text-[14px] text-[var(--color-ink-muted)] line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </div>
        <div className="text-[var(--color-primary)] font-mono text-[20px] font-bold">
          {'>_'}
        </div>
      </div>
    </div>
  );
}
