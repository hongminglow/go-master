import { useState, type ComponentType } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { categories, allTopics } from "@/data";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/i18n/translations";
import { cn } from "@/utils/cn";
import {
  ChevronLeft,
  ChevronRight,
  Hexagon,
  Search,
  BookOpen,
  TerminalSquare,
  Activity,
  Cpu,
  Globe,
} from "lucide-react";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  BookOpen,
  TerminalSquare,
  Activity,
  Cpu,
};

interface Props {
  onOpenSearch: () => void;
}

export function Sidebar({ onOpenSearch }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {},
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguageStore();

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? false : !prev[id], // Default true means if undefined, we want it false when toggling
    }));
  };

  const isCategoryOpen = (id: string) => {
    return openCategories[id] ?? true; // Default to open
  };

  const appT = translations[language].app;
  const sidebarT = translations[language].sidebar;

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen shrink-0 flex-col border-r border-[var(--color-secondary)] bg-[var(--color-primary)]/50 backdrop-blur-md transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-72",
      )}
    >
      <div className="relative flex items-center justify-between border-b border-[var(--color-secondary)] p-4">
        {!isCollapsed ? (
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-[var(--color-cta)] transition-opacity"
            title={sidebarT.homeLabel}
            aria-label={sidebarT.homeLabel}
          >
            <img src="/favicon.svg" alt="app-logo" className="h-8 w-8 shrink-0" />
            <span className="truncate">{appT.name}</span>
          </Link>
        ) : (
          <Link
            to="/"
            className="mx-auto text-[var(--color-cta)]"
            title={sidebarT.homeLabel}
            aria-label={sidebarT.homeLabel}
          >
            <img src="/favicon.svg" alt="app-logo" className="h-8 w-8" />
          </Link>
        )}

        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className={cn(
            "rounded-lg p-2 text-[var(--color-text)] opacity-70 transition-colors hover:bg-[var(--color-secondary)] hover:opacity-100",
            isCollapsed &&
              "absolute -right-4 top-5 border border-[var(--color-secondary)] bg-[var(--color-primary)]",
          )}
          aria-label={isCollapsed ? sidebarT.expand : sidebarT.collapse}
          title={isCollapsed ? sidebarT.expand : sidebarT.collapse}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="p-4">
        <button
          type="button"
          onClick={onOpenSearch}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg border border-[var(--color-secondary)] bg-[var(--color-background)] p-2 text-sm text-[var(--color-text)]/50 transition-colors hover:border-[var(--color-cta)]",
            isCollapsed && "justify-center",
          )}
          aria-label={sidebarT.search}
          title={
            isCollapsed
              ? `${sidebarT.search} (${sidebarT.shortcutHint})`
              : sidebarT.search
          }
        >
          <Search className="h-4 w-4 shrink-0" />
          {!isCollapsed && (
            <>
              <span>{sidebarT.search}</span>
              <kbd className="ml-auto rounded bg-[var(--color-secondary)] px-1.5 py-0.5 text-xs">
                {sidebarT.shortcutHint}
              </kbd>
            </>
          )}
        </button>
      </div>

      <div className="thin-scrollbar flex-1 space-y-6 overflow-y-auto px-3 py-2">
        {categories[language].map((category) => {
          const Icon = iconMap[category.icon] || Hexagon;
          const categoryTopics = allTopics[language].filter(
            (topic) => topic.categoryId === category.id,
          );
          const isActiveCategory = categoryTopics.some(
            (topic) => location.pathname === `/topic/${topic.id}`
          );

          return (
            <div key={category.id} className="space-y-2">
              <div
                onClick={() => {
                  if (isCollapsed) {
                    const firstTopic = categoryTopics[0];
                    if (firstTopic) {
                      navigate(`/topic/${firstTopic.id}`);
                    }
                  } else {
                    toggleCategory(category.id);
                  }
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-2 px-2 text-sm font-bold uppercase tracking-wider transition-colors hover:text-[var(--color-text)]",
                  isCollapsed && "justify-center",
                  isCollapsed && isActiveCategory ? "text-[var(--color-cta)]" : "text-[var(--color-text)]/60"
                )}
                title={category.name}
              >
                <Icon
                  className={cn(
                    "shrink-0",
                    isCollapsed ? "h-6 w-6" : "h-4 w-4",
                  )}
                />
                {!isCollapsed && (
                  <span className="truncate" title={category.name}>
                    {category.name}
                  </span>
                )}
              </div>

              {!isCollapsed && isCategoryOpen(category.id) && (
                <div className="space-y-1 pl-4">
                  {categoryTopics.map((topic) => {
                    const isActive = location.pathname === `/topic/${topic.id}`;

                    return (
                      <Link
                        key={topic.id}
                        to={`/topic/${topic.id}`}
                        title={topic.name}
                        className={cn(
                          "block truncate rounded-lg px-3 py-2 text-sm transition-all duration-300",
                          isActive
                            ? "bg-[var(--color-secondary)] font-semibold text-[var(--color-cta)]"
                            : "text-[var(--color-text)]/80 hover:bg-[var(--color-secondary)]/50 hover:text-[var(--color-text)]",
                        )}
                      >
                        {topic.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-[var(--color-secondary)] p-4">
        <button
          type="button"
          onClick={toggleLanguage}
          className={cn(
            "flex cursor-pointer w-full items-center gap-2 rounded-lg p-2 text-[var(--color-text)]/80 transition-colors hover:bg-[var(--color-secondary)] hover:text-[var(--color-text)]",
            isCollapsed && "justify-center",
          )}
          title={sidebarT.switchLanguage}
          aria-label={sidebarT.switchLanguage}
        >
          <Globe className="h-5 w-5 shrink-0" />
          {!isCollapsed && (
            <span
              className="truncate text-sm font-semibold"
              title={sidebarT.currentLanguage}
            >
              {sidebarT.currentLanguage}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
