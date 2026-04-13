import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { CodeSnippetData } from "@/data/types";
import { CardWrapper } from "./CardWrapper";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/i18n/translations";

interface Props {
  data: CodeSnippetData;
}

export function CodeSnippet({ data }: Props) {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguageStore();
  const t = translations[language].content;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CardWrapper className="relative overflow-hidden border-[var(--color-secondary)] bg-[var(--color-code)] p-0">
      <div className="flex items-center justify-between border-b border-[var(--color-secondary)] bg-[var(--color-primary)] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500 opacity-80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-80" />
            <div className="h-3 w-3 rounded-full bg-green-500 opacity-80" />
          </div>
          {data.filename && (
            <span
              className="ml-2 text-xs font-mono opacity-60"
              title={data.filename}
            >
              {data.filename}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md p-1.5 transition-colors hover:bg-[var(--color-secondary)]"
          title={copied ? t.copied : t.copyCode}
          aria-label={copied ? t.copied : t.copyCode}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 opacity-60" />
          )}
        </button>
      </div>

      <div className="overflow-x-auto p-4 text-sm font-mono">
        <pre>
          <code className="text-gray-300">{data.code}</code>
        </pre>
      </div>
    </CardWrapper>
  );
}
