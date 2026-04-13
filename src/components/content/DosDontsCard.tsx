import type { DosDontsCardData } from "@/data/types";
import { CardWrapper } from "./CardWrapper";
import { CheckCircle2, XCircle } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/i18n/translations";

interface Props {
  data: DosDontsCardData;
}

export function DosDontsCard({ data }: Props) {
  const { language } = useLanguageStore();
  const t = translations[language].content;

  return (
    <CardWrapper>
      <h3 className="text-xl font-bold mb-6 text-center border-b border-[var(--color-secondary)] pb-2 text-[var(--color-text)] opacity-90">
        {data.title}
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-green-900/30 bg-green-900/10 p-4">
          <h4 className="mb-4 flex items-center gap-2 font-bold uppercase tracking-widest text-green-500">
            <CheckCircle2 className="w-5 h-5" />
            {t.dos}
          </h4>

          <ul className="space-y-3">
            {data.dos.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 opacity-90">
                <span className="mt-1 text-green-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-red-900/30 bg-red-900/10 p-4">
          <h4 className="mb-4 flex items-center gap-2 font-bold uppercase tracking-widest text-red-500">
            <XCircle className="w-5 h-5" />
            {t.donts}
          </h4>

          <ul className="space-y-3">
            {data.donts.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 opacity-90">
                <span className="mt-1 text-red-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardWrapper>
  );
}
