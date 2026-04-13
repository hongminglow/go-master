import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, FileText, BookOpen, TerminalSquare, Activity, Cpu } from "lucide-react";
import { allTopics, categories } from "@/data";
import { useDebounce } from "@/hooks/useDebounce";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/i18n/translations";
import { cn } from "@/utils/cn";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  TerminalSquare,
  Activity,
  Cpu,
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { language } = useLanguageStore();
  const t = translations[language].search;

  const results = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return allTopics[language];
    }

    const normalizedQueryParts = normalizedQuery.split(" ").filter(Boolean);

    return allTopics[language].filter((topic) => {
      const searchableText = `${topic.name} ${(topic.tags || []).join(" ")}`.toLowerCase();
      return normalizedQueryParts.every(part => searchableText.includes(part));
    });
  }, [debouncedQuery, language]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [debouncedQuery, language]);

  useEffect(() => {
    setQuery("");
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 100);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results.length > 0) {
            navigate(`/topic/${results[selectedIndex].id}`);
            onClose();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-[var(--color-secondary)] bg-[var(--color-primary)] shadow-2xl"
        style={{ isolation: "isolate" }}
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-secondary)] bg-[var(--color-background)]/50 px-4">
          <Search className="h-5 w-5 shrink-0 text-[var(--color-text)]/50" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 border-none bg-transparent py-4 text-lg text-[var(--color-text)] placeholder:text-[var(--color-text)]/30 focus:outline-none focus:ring-0"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            title={t.close}
            className="rounded-md p-1 text-[var(--color-text)]/50 hover:bg-[var(--color-secondary)] hover:text-[var(--color-text)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="thin-scrollbar max-h-[60vh] overflow-y-auto p-2">
          {debouncedQuery && results.length === 0 ? (
            <div className="p-8 text-center text-[var(--color-text)]/50">
              {t.noResults} "{debouncedQuery}"
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {results.map((topic, idx) => {
                const categoryDef = categories[language].find(c => c.id === topic.categoryId);
                const Icon = categoryDef ? (iconMap[categoryDef.icon] || FileText) : FileText;
                
                return (
                  <div
                    key={topic.id}
                    onClick={() => {
                      navigate(`/topic/${topic.id}`);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors duration-150",
                      idx === selectedIndex
                        ? "bg-[var(--color-secondary)] text-[var(--color-cta)]"
                        : "text-[var(--color-text)]/80 hover:bg-[var(--color-secondary)]/50",
                    )}
                  >
                    <Icon
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0",
                        idx === selectedIndex
                          ? "text-[var(--color-cta)]"
                          : "opacity-50",
                      )}
                    />
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <span className="truncate font-semibold" title={topic.name}>
                        {topic.name}
                      </span>
                      {topic.tags && topic.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 opacity-80 pointer-events-none">
                          {topic.tags.map((tag) => (
                            <span key={tag} className="bg-[var(--color-primary)] px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider opacity-70">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
