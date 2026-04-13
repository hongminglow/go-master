import type { ComparisonCardData } from "@/data/types";
import { CardWrapper } from "./CardWrapper";
import { ArrowRight } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/i18n/translations";

interface Props {
  data: ComparisonCardData;
}

export function ComparisonCard({ data }: Props) {
  const { language } = useLanguageStore();
  const t = translations[language].content;

  return (
    <CardWrapper className="overflow-hidden border border-[var(--color-secondary)]">
      <h3 className="text-xl font-bold mb-6 text-center text-white/90">
        {data.title}
      </h3>

      <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-center">
        <div className="flex-1 bg-[var(--color-code)] p-4 rounded-lg border border-[var(--color-secondary)]">
          <div className="text-sm opacity-60 text-gray-300 font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-500/50" />
            {data.before.title || t.before}
          </div>
          <pre className="text-sm font-mono text-gray-400 overflow-x-auto opacity-80">
            {data.before.code}
          </pre>
        </div>

        <div className="flex items-center justify-center lg:py-0 py-2">
          <ArrowRight className="w-8 h-8 text-[var(--color-cta)] lg:rotate-0 rotate-90 opacity-50" />
        </div>

        <div className="flex-1 bg-[var(--color-code)] p-4 rounded-lg border border-green-900/50">
          <div className="text-sm text-green-300 font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            {data.after.title || t.after}
          </div>
          <pre className="text-sm font-mono text-green-100 overflow-x-auto">
            {data.after.code}
          </pre>
        </div>
      </div>
    </CardWrapper>
  );
}
