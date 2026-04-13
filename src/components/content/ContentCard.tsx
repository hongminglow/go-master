import type { ContentCardData } from '@/data/types';
import { CardWrapper } from './CardWrapper';

interface Props {
  data: ContentCardData;
}

export function ContentCard({ data }: Props) {
  return (
    <CardWrapper>
      {data.title && (
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-cta)]">
          {data.title}
        </h2>
      )}
      <div className="space-y-4">
        {data.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-[var(--color-text)] opacity-90 leading-relaxed text-base">
            {paragraph}
          </p>
        ))}
      </div>
    </CardWrapper>
  );
}
