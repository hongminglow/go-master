import { introToGoEn, introToGoZh } from './topics/intro-go';
import { goroutinesEn, goroutinesZh } from './topics/goroutines';
import { channelsEn, channelsZh } from './topics/channels';
import { contextEn, contextZh } from './topics/context';
import type { ContentNode } from './types';
import type { Language } from '@/store/useLanguageStore';

export { categories } from './categories';
export * from './types';

export const allTopics: Record<Language, ContentNode[]> = {
  en: [
    introToGoEn,
    goroutinesEn,
    channelsEn,
    contextEn,
  ],
  zh: [
    introToGoZh,
    goroutinesZh,
    channelsZh,
    contextZh,
  ]
};
