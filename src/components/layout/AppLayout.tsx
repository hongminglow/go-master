import { useEffect, useMemo, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { SearchModal } from "../search/SearchModal";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/i18n/translations";
import { allTopics } from "@/data";

export function AppLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { language } = useLanguageStore();

  const localizedTitle = useMemo(() => {
    const t = translations[language];

    if (location.pathname === "/") {
      return t.home.pageTitle;
    }

    const topicMatch = location.pathname.match(/^\/topic\/([^/]+)$/);
    if (topicMatch) {
      const topicId = topicMatch[1];
      const topic = allTopics[language].find((item) => item.id === topicId);

      if (topic) {
        return t.topic.pageTitle(topic.name);
      }

      return t.app.defaultTitle;
    }

    return t.app.defaultTitle;
  }, [language, location.pathname]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen bg-[var(--color-background)] text-[var(--color-text)] selection:bg-[var(--color-cta)]/30">
      <Sidebar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="relative flex w-full flex-1 flex-col overflow-x-hidden">
        <ScrollRestoration />
        <div className="mx-auto flex-1 w-full max-w-5xl animate-in fade-in p-8 pb-24 duration-500 lg:p-12">
          <Outlet />
        </div>
      </main>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
