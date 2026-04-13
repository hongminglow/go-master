import { Navigate, useParams } from "react-router-dom";
import { allTopics, categories } from "@/data";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/i18n/translations";
import { ContentRenderer } from "@/components/content/ContentRenderer";

export function Topic() {
  const { id } = useParams();
  const { language } = useLanguageStore();
  const t = translations[language].topic;

  const topic = allTopics[language].find((item) => item.id === id);

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  const category = categories[language].find(
    (item) => item.id === topic.categoryId,
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="border-b border-[var(--color-secondary)] pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white/95 tracking-tight">
          {topic.name}
        </h1>
      </header>

      <ContentRenderer sections={topic.content.sections} />
    </div>
  );
}
