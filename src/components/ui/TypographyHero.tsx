'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Button } from './Button';

interface TypographyHeroProps {
  headline: React.ReactNode;
  subheadline: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export const TypographyHero = ({
  headline,
  subheadline,
  buttonText,
  onButtonClick,
}: TypographyHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.framer-hero-text',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full pt-[160px] pb-[96px] px-6 bg-[var(--color-canvas)] flex flex-col items-center justify-center text-center"
    >
      <div className="max-w-[1000px] mx-auto flex flex-col items-center">
        <h1 className="framer-hero-text font-display text-[60px] sm:text-[85px] md:text-[110px] font-medium leading-[0.85] tracking-[-0.05em] text-[var(--color-ink)] mb-8">
          {headline}
        </h1>
        
        <p className="framer-hero-text font-ui text-[18px] font-normal leading-[1.3] tracking-[-0.01em] text-[var(--color-ink-muted)] max-w-[600px] mb-10">
          {subheadline}
        </p>

        <div className="framer-hero-text flex flex-col sm:flex-row items-center gap-4">
          <Button variant="primary" onClick={onButtonClick}>
            {buttonText}
          </Button>
          <Button variant="secondary" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
            View courses
          </Button>
        </div>
      </div>
    </section>
  );
};
