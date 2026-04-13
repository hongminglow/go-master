# Go Master - The Golang Knowledge Platform

Go Master is an interactive, content-driven educational platform designed to take you from a complete beginner to an advanced concurrency expert in Go (Golang). Built with modern frontend architecture, the platform separates data from the UI to provide a scalable and robust reading experience.

## ✨ Core Features

- **Universal Fuzzy Search**: Find any topic instantly using the `Cmd+K` / `Ctrl+K` globally accessible search modal, complete with debounced logic to prevent thrashing.
- **Content-Decoupled Architecture**: All educational content is strictly separated into pure JSON/TypeScript objects within `src/data`. Creating a new article or updating syntax does not require touching any React components.
- **Component Ecosystem**: A suite of highly reusable, beautifully designed visualization components including:
  - Syntax-highlighted `CodeSnippet` blocks with copy functionality
  - Immersive `QuoteCard`s for core principles
  - Numbered `WorkflowCard`s for step-by-step guides
  - `ComparisonCard`s for Before/After syntax diffs
  - `DosDontsCard`s to outline best practices vs anti-patterns
  - Variant-based `TipCard`s for warnings and successes
- **Immersive Dark Red Theme**: Designed utilizing the `ui-ux-pro-max` developer-focused "Vibrant & Block-based" style but specialized for a striking dark-red aesthetic with the `Space Mono` geometric typeface.
- **Collapsible Sidebar Navigation**: A category-based hierarchical sidebar that supports an elegant, icon-only collapsed state to maximize screen real-estate.
- **Accessibility & Keyboard-First**: Seamless arrow-key navigation within the search modal and native `Enter` to jump straight to topics.

## 🛠 Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **React Router DOM v7**
- **Lucide React Icons**

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start the development server:**

   ```bash
   pnpm run dev
   ```

3. **Build for production:**
   ```bash
   pnpm run build
   ```

## 🏗 Content Management

To add a new topic, navigate to `src/data/topics/`. Create a new `.ts` file following the `ContentNode` interface structure. Then, register it in `src/data/index.ts` and add it to the `allTopics` array. The UI will automatically render the new topic with all its visual components flawlessly!
