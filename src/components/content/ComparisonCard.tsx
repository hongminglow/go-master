import type { ComparisonCardData } from "@/data/types";
import { CardWrapper } from "./CardWrapper";
import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
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
        <div className="flex-1 min-w-0 bg-rose-950/85 p-4 rounded-lg border border-rose-900 opacity-85">
          <div className="text-sm text-rose-300 font-bold mb-2 uppercase tracking-wider flex items-center gap-2 opacity-90">
            <XCircle className="w-4 h-4 text-rose-500" />
            {data.before.title || t.before}
          </div>
          <pre className="text-sm font-mono text-rose-50 overflow-x-auto no-scrollbar">
            {data.before.code}
          </pre>
        </div>

        <div className="flex items-center justify-center lg:py-0 py-2">
          <ArrowRight className="w-8 h-8 text-[var(--color-cta)] lg:rotate-0 rotate-90 opacity-40" />
        </div>

        <div className="flex-1 min-w-0 bg-emerald-950/85 p-4 rounded-lg border border-emerald-800">
          <div className="text-sm text-emerald-300 font-bold mb-2 uppercase tracking-wider flex items-center gap-2 opacity-90">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {data.after.title || t.after}
          </div>
          <pre className="text-sm font-mono text-emerald-50 overflow-x-auto no-scrollbar">
            {data.after.code}
          </pre>
        </div>
      </div>
    </CardWrapper>
  );
}
