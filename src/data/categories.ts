import type { Category } from './types';
import type { Language } from '@/store/useLanguageStore';

export const categories: Record<Language, Category[]> = {
  en: [
    { id: 'intro', name: 'Introduction to Go', icon: 'BookOpen' },
    { id: 'basics', name: 'Go Basics', icon: 'TerminalSquare' },
    { id: 'concurrency', name: 'Concurrency', icon: 'Activity' },
    { id: 'advanced', name: 'Advanced Topics', icon: 'Cpu' },
  ],
  zh: [
    { id: 'intro', name: 'Go 语言初探', icon: 'BookOpen' },
    { id: 'basics', name: 'Go 基础语法', icon: 'TerminalSquare' },
    { id: 'concurrency', name: '玩转高并发', icon: 'Activity' },
    { id: 'advanced', name: '进阶与底层', icon: 'Cpu' },
  ],
};
