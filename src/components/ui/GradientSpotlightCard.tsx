import React from 'react';
import { Button } from './Button';

interface GradientSpotlightCardProps {
  headline: string;
  subheadline: string;
  buttonText?: string;
  gradient?: 'violet' | 'magenta' | 'orange';
  className?: string;
  onButtonClick?: () => void;
}

export const GradientSpotlightCard = ({
  headline,
  subheadline,
  buttonText,
  gradient = 'violet',
  className = '',
  onButtonClick
}: GradientSpotlightCardProps) => {
  
  const gradientStyles = {
    violet: 'bg-gradient-to-br from-[var(--color-gradient-violet-start)] to-[var(--color-gradient-violet-end)]',
    magenta: 'bg-gradient-to-br from-[var(--color-gradient-magenta-start)] to-[var(--color-gradient-magenta-end)]',
    orange: 'bg-gradient-to-br from-[var(--color-gradient-orange-start)] to-[var(--color-gradient-orange-end)]',
  };

  return (
    <div 
      className={`group flex flex-col justify-between ${gradientStyles[gradient]} rounded-[30px] p-8 md:p-12 shadow-2xl h-full ${className}`}
    >
      <div>
        <h3 className="font-display font-medium text-[32px] md:text-[40px] tracking-[-0.02em] text-[var(--color-ink)] mb-4 leading-[1.1]">
          {headline}
        </h3>
        <p className="font-ui font-normal text-[20px] md:text-[24px] tracking-[-0.01em] text-[rgba(255,255,255,0.9)] max-w-[80%] leading-[1.3]">
          {subheadline}
        </p>
      </div>

      {buttonText && (
        <div className="mt-12 flex justify-end">
          <Button 
            variant="secondary" 
            onClick={onButtonClick}
            className="bg-[rgba(255,255,255,0.15)] text-[var(--color-ink)] hover:bg-[rgba(255,255,255,0.25)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md"
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};
