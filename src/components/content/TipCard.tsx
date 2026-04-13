import type { TipCardData } from '@/data/types';
import { CardWrapper } from './CardWrapper';
import { AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Props {
  data: TipCardData;
}

export function TipCard({ data }: Props) {
  const iconMap = {
    info: <Info className="w-6 h-6 text-blue-400" />,
    danger: <AlertCircle className="w-6 h-6 text-[var(--color-cta)]" />,
    success: <CheckCircle2 className="w-6 h-6 text-green-400" />,
  };

  const bgMap = {
    info: 'bg-blue-700/20 border-blue-600/30',
    danger: 'bg-red-700/20 border-red-600/30',
    success: 'bg-green-700/20 border-green-600/30',
  };

  return (
    <CardWrapper className={cn('flex gap-4 items-start border', bgMap[data.variant])}>
      <div className="shrink-0 mt-1">{iconMap[data.variant]}</div>
      <div>
        <h3 className="font-bold text-lg mb-1">{data.title}</h3>
        <p className="opacity-90">{data.message}</p>
      </div>
    </CardWrapper>
  );
}
