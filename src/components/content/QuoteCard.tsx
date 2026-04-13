import type { QuoteCardData } from '@/data/types';
import { CardWrapper } from './CardWrapper';
import { Quote } from 'lucide-react';

interface Props {
  data: QuoteCardData;
}

export function QuoteCard({ data }: Props) {
  return (
    <CardWrapper className="relative overflow-hidden pl-10 border-l-4 border-l-[var(--color-cta)] bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]">
      <Quote className="absolute top-6 left-4 w-16 h-16 text-[var(--color-cta)] opacity-10 -translate-x-4 -translate-y-4" />
      <blockquote className="relative z-10 text-xl font-bold italic mb-4 leading-relaxed">
        "{data.quote}"
      </blockquote>
      {(data.author || data.role) && (
        <div className="flex items-center gap-2 mt-4 text-sm">
          <div className="w-8 h-px bg-[var(--color-cta)] opacity-50" />
          <span className="font-semibold text-white/90">{data.author}</span>
          {data.role && (
            <>
              <span className="opacity-50 text-white/50">•</span>
              <span className="opacity-70 italic text-white/70">{data.role}</span>
            </>
          )}
        </div>
      )}
    </CardWrapper>
  );
}
