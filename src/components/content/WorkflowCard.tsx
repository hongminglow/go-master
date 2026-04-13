import type { WorkflowCardData } from '@/data/types';
import { CardWrapper } from './CardWrapper';

interface Props {
  data: WorkflowCardData;
}

export function WorkflowCard({ data }: Props) {
  return (
    <CardWrapper>
      <h3 className="text-xl font-bold mb-6 text-[var(--color-cta)] border-b border-[var(--color-secondary)] pb-2">
        {data.title}
      </h3>
      <div className="space-y-6">
        {data.steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 items-start group">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-secondary)] text-[var(--color-cta)] flex items-center justify-center font-bold border-2 border-[var(--color-cta)] transition-transform duration-300 group-hover:scale-110">
              {idx + 1}
            </div>
            <div>
              <h4 className="font-semibold text-lg">{step.title}</h4>
              <p className="opacity-80 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}
