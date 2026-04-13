import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardWrapperProps {
  children: ReactNode;
  className?: string;
}

export function CardWrapper({ children, className }: CardWrapperProps) {
  return (
    <div
      className={cn(
        'bg-[var(--color-primary)] rounded-xl p-6 shadow-md border border-[var(--color-secondary)]',
        'hover:shadow-lg transition-shadow duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}
