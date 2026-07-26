import React from 'react';
import { Button } from './Button';

interface CampaignTileProps {
  headline: string;
  buttonText: string;
  onButtonClick?: () => void;
  headlineColor?: string;
  imageUrl?: string;
}

export const CampaignTile = ({
  headline,
  buttonText,
  onButtonClick,
  headlineColor = 'var(--color-ink)',
}: CampaignTileProps) => {
  return (
    <div className="relative w-full py-24 px-6 md:px-12 flex flex-col justify-center items-center bg-[var(--color-canvas)] border-b border-[var(--color-hairline)] text-center">
      <div className="relative z-10 flex flex-col items-center max-w-[1440px] mx-auto">
        <h1 
          className="font-display text-[64px] md:text-[120px] uppercase leading-[0.85] tracking-tight mb-8"
          style={{ color: headlineColor }}
        >
          {headline}
        </h1>
        <Button 
          variant="primary" 
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
