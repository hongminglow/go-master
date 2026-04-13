import { Link } from "react-router-dom";
import { categories, allTopics } from "@/data";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations } from "@/i18n/translations";
import { ArrowRight, Zap, ShieldCheck, Box, Activity } from "lucide-react";
import { CardWrapper } from "@/components/content/CardWrapper";

export function Home() {
  const { language } = useLanguageStore();
  const t = translations[language].home;
  const shortcutLabel = translations[language].app.shortcutLabel;

  const advantages = [
    {
      icon: Zap,
      title: t.advantages.blazingFast.title,
      desc: t.advantages.blazingFast.desc,
    },
    {
      icon: Box,
      title: t.advantages.simpleClean.title,
      desc: t.advantages.simpleClean.desc,
    },
    {
      icon: Activity,
      title: t.advantages.concurrency.title,
      desc: t.advantages.concurrency.desc,
    },
    {
      icon: ShieldCheck,
      title: t.advantages.typeSafe.title,
      desc: t.advantages.typeSafe.desc,
    },
  ];

  return (
    <div className="space-y-16">
      <section className="space-y-6 pt-12 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full">
          <img src="/favicon.svg" alt="Go Master" className="h-16 w-16" />
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-white/95 md:text-7xl">
          {t.heroTitlePrefix}{" "}
          <span className="text-[var(--color-cta)] underline decoration-wavy underline-offset-8">
            {t.heroTitleHighlight}
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[var(--color-text)]/70">
          {t.heroSubtitle}
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/topic/what-is-go"
            className="flex items-center gap-2 rounded-lg bg-[var(--color-cta)] px-8 py-3 font-bold text-white shadow-lg shadow-red-900/50 transition-colors duration-300 hover:bg-red-500"
          >
            {t.startLearning}
            <ArrowRight className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  ctrlKey: true,
                }),
              )
            }
            className="flex items-center gap-2 rounded-lg border border-[var(--color-secondary)] bg-[var(--color-primary)] px-8 py-3 font-bold text-white shadow-lg transition-colors duration-300 hover:bg-[var(--color-secondary)]"
          >
            {t.searchTopics}
            <kbd className="rounded bg-black/30 px-2 py-1 font-mono text-xs">
              {shortcutLabel}
            </kbd>
          </button>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="border-b border-[var(--color-secondary)] pb-4 text-3xl font-bold">
          {t.whyGo}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {advantages.map((adv, idx) => (
            <CardWrapper key={idx} className="group flex items-start gap-4">
              <div className="rounded-lg border border-[var(--color-secondary)] bg-[var(--color-background)] p-3 transition-colors group-hover:border-[var(--color-cta)]">
                <adv.icon className="h-6 w-6 text-[var(--color-cta)]" />
              </div>

              <div>
                <h3 className="mb-2 text-xl font-bold">{adv.title}</h3>
                <p className="leading-relaxed text-[var(--color-text)]/70">
                  {adv.desc}
                </p>
              </div>
            </CardWrapper>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="border-b border-[var(--color-secondary)] pb-4 text-3xl font-bold">
          {t.quickJump}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories[language].map((category) => {
            const categoryTopics = allTopics[language].filter(
              (topic) => topic.categoryId === category.id,
            );

            if (categoryTopics.length === 0) return null;

            return (
              <CardWrapper key={category.id} className="flex h-full flex-col">
                <h3 className="mb-4 text-lg font-bold text-[var(--color-cta)]">
                  {category.name}
                </h3>

                <ul className="flex-1 space-y-3">
                  {categoryTopics.slice(0, 4).map((topic) => (
                    <li key={topic.id}>
                      <Link
                        to={`/topic/${topic.id}`}
                        title={topic.name}
                        className="flex items-center gap-2 text-[var(--color-text)]/80 transition-all hover:text-white hover:underline decoration-[var(--color-cta)] underline-offset-4"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-secondary)]" />
                        <span className="truncate">{topic.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardWrapper>
            );
          })}
        </div>
      </section>
    </div>
  );
}
