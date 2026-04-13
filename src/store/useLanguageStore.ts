import { create } from "zustand";

export type Language = "en" | "zh";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY = "go-master-language";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "zh";
}

function detectPreferredLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  if (isLanguage(storedLanguage)) {
    return storedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase();

  if (browserLanguage.startsWith("zh")) {
    return "zh";
  }

  return "en";
}

function persistLanguage(language: Language) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, language);
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: detectPreferredLanguage(),
  setLanguage: (lang) => {
    persistLanguage(lang);
    set({ language: lang });
  },
  toggleLanguage: () =>
    set((state) => {
      const nextLanguage: Language = state.language === "en" ? "zh" : "en";
      persistLanguage(nextLanguage);
      return { language: nextLanguage };
    }),
}));
