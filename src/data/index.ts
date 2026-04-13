import { introToGoEn, introToGoZh } from './topics/intro-go';
import { goroutinesEn, goroutinesZh } from './topics/goroutines';
import type { ContentNode } from './types';
import type { Language } from '@/store/useLanguageStore';

export { categories } from './categories';
export * from './types';

export const allTopics: Record<Language, ContentNode[]> = {
  en: [
    introToGoEn,
    goroutinesEn,
  ],
  zh: [
    introToGoZh,
    goroutinesZh,
  ]
};
