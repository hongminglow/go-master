export interface ContentNode {
  id: string;
  name: string;
  categoryId: string;
  content: {
    sections: ContentSection[];
  };
}

export type ContentSection =
  | { type: 'content'; data: ContentCardData }
  | { type: 'quote'; data: QuoteCardData }
  | { type: 'tip'; data: TipCardData }
  | { type: 'workflow'; data: WorkflowCardData }
  | { type: 'timeline'; data: TimelineCardData }
  | { type: 'list'; data: ListCardData }
  | { type: 'code'; data: CodeSnippetData }
  | { type: 'preview'; data: PreviewCardData }
  | { type: 'comparison'; data: ComparisonCardData }
  | { type: 'live-comparison'; data: LiveComparisonCardData }
  | { type: 'table'; data: TableCardData }
  | { type: 'dos-donts'; data: DosDontsCardData };

export interface ContentCardData {
  title?: string;
  paragraphs: string[];
}

export interface QuoteCardData {
  quote: string;
  author?: string;
  role?: string;
}

export interface TipCardData {
  variant: 'info' | 'danger' | 'success';
  title: string;
  message: string;
}

export interface WorkflowCardData {
  title: string;
  steps: { title: string; description: string }[];
}

export interface TimelineCardData {
  title: string;
  events: { date: string; title: string; description: string }[];
}

export interface ListCardData {
  title: string;
  items: string[];
  ordered?: boolean;
}

export interface CodeSnippetData {
  language: string;
  code: string;
  filename?: string;
}

export interface PreviewCardData {
  title: string;
  html: string;
  css?: string;
}

export interface ComparisonCardData {
  title: string;
  before: { title?: string; code: string; language: string };
  after: { title?: string; code: string; language: string };
}

export interface LiveComparisonCardData {
  title: string;
  beforeHtml: string;
  afterHtml: string;
}

export interface TableCardData {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface DosDontsCardData {
  title: string;
  dos: string[];
  donts: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // We'll use lucide-react icons based on this string
}
