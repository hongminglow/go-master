import type { ContentSection } from "@/data/types";
import { translations } from "@/i18n/translations";
import { useLanguageStore } from "@/store/useLanguageStore";
import { ContentCard } from "./ContentCard";
import { QuoteCard } from "./QuoteCard";
import { TipCard } from "./TipCard";
import { WorkflowCard } from "./WorkflowCard";
import { CodeSnippet } from "./CodeSnippet";
import { ComparisonCard } from "./ComparisonCard";
import { DosDontsCard } from "./DosDontsCard";

interface Props {
  sections: ContentSection[];
}

export function ContentRenderer({ sections }: Props) {
  const { language } = useLanguageStore();
  const t = translations[language].content;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      {sections.map((section, idx) => {
        switch (section.type) {
          case "content":
            return <ContentCard key={idx} data={section.data} />;
          case "quote":
            return <QuoteCard key={idx} data={section.data} />;
          case "tip":
            return <TipCard key={idx} data={section.data} />;
          case "workflow":
            return <WorkflowCard key={idx} data={section.data} />;
          case "code":
            return <CodeSnippet key={idx} data={section.data} />;
          case "comparison":
            return <ComparisonCard key={idx} data={section.data} />;
          case "dos-donts":
            return <DosDontsCard key={idx} data={section.data} />;
          default:
            return (
              <div
                key={idx}
                className="rounded border border-red-500 bg-red-900/20 p-4 text-red-500"
              >
                {t.unsupportedBlock}
              </div>
            );
        }
      })}
    </div>
  );
}
