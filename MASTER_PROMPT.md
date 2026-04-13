# AI Blueprint: Enterprise Content Platform Template

**Purpose**: This is a universal, reusable template for AI Agents building documentation hubs, knowledge bases, dashboards, or content-driven platforms. When executing tasks against this template, **you must strictly act as a senior UI/UX engineer and architect.**

---

## 🏗️ Core AI Directives

When building the application, **you should always** implement the following core features natively:

1. **Collapsible Sidebar**: A category-based navigation sidebar that includes an icon-only collapsed state, and the categories themselves MUST act as accordions to toggle topic visibility. When collapsed, clicking a category icon MUST immediately navigate the user to the first topic in that category instead of pointlessly expanding.
2. **Global Fuzzy Search**: A universally accessible Command+K (Cmd+K / Ctrl+K) modal with debounced fuzzy search logic (target 300ms delay) that searches across both topic titles AND arrays of topic `tags`. Search results MUST be fully styled, showcasing matching topic `tags` beneath the title and rendering the corresponding category's icon next to the result.
3. **Content-Decoupled Architecture**: Structure the codebase so that data (`/src/data/`) is strictly separated from UI components. Changing text or adding items should NEVER require mutating React components.
4. **Keyboard-First Navigation**: Map arrows, Enter, and Escape to all search modals and menus.
5. **Modern Tech Stack**: Utilize React, Tailwind CSS (utility-first, standard config), and standard ecosystem routers (e.g., `react-router-dom`).

## 📐 Architecture & Standards

### File Organization

You should structure the repository professionally:

```
src/
├── components/
│   ├── layout/          # AppLayout, Sidebar, Main containers
│   ├── navigation/      # Links, Accordions
│   ├── search/          # SearchModal, Fuzzy matching
│   ├── content/         # Reusable content visualization cards
│   └── common/          # Global UI elements (Buttons, Icons)
├── services/            # Pure data management, search services
├── hooks/               # useDebounce, useKeyboardShortcut
├── data/                # Data primitives, categories, and topic maps
└── styles/              # Global CSS & Tailwind imports
```

### Component Design Principles

As the architect, you must forcefully adhere to these component standards:

- **Consistent Theming**: By default, design a cohesive Deep Dark Mode Theme. Avoid stark/pure whites unless mapping a specifically themed app.
- **Utility-First Styling**: Use exclusively Tailwind utility classes. Maintain structural constants like `rounded-xl` and `p-6` for unified card styling.
- **Zero Hardcoded Content**: Components MUST NOT contain any hardcoded data or business logic. They must be pure visual abstractions (e.g., `<QuoteCard data={props} />`) accepting strict TypeScript `interfaces`.
- **Decoupled Application Data**: All content lives strictly separated in `src/data/` (e.g., `src/data/topics/`). This guarantees that changing text or adding a new article NEVER requires touching component code.
- **Single-Purpose Modules**: Keep components strictly focused on visually rendering one specific type of data (e.g., exclusively drawing quotes, or exclusively drawing a workflow stepper). Avoid monolithic God-components.

### 🧩 Core Data Structures Structure

Always design content payloads conceptually like this decoupled tree:

```typescript
interface ContentNode {
  id: string;
  name: string;
  categoryId: string;
  tags?: string[]; // ALL topics must implement extensive searchable tags
  content: {
    sections: {
      type: "card" | "workflow" | "code" | "preview"; // Maps to pure UI component
      data: CardData | WorkflowData | CodeData | PreviewData;
    }[];
  };
}
```

### 📐 Universal UX & Visual Hierarchy Blueprint

You must ensure the UI feels modern, "wow-factor", and highly professional via these interaction laws:

- **Typography Laws**: Discard default browser fonts. Always import and use smooth, sophisticated, bolder geometric fonts (like Outfit, Plus Jakarta Sans, or Inter) to provide a lush UI. Make headers bold and distinctive.
- **Text Truncation Tooltips**: For any dynamic text (e.g., user-generated titles or topic names in sidebars), utilize `className="truncate"` defensively. ALWAYS accompany it with a raw `title={data.name}` HTML attribute to guarantee native hover accessibility.
- **Scrollbars**: Intercept and destroy chunky native browser scrollbars globally in `index.css`. Replace them with thin (e.g., `width: 6px`), elegant, theme-colored translucent scrollbars globally.
- **Micro-Interactions**: Utilize `transition-all duration-300` (not 200ms) to smoothly animate hover states on buttons, cards, and sidebar items for a premium "heavy" feel.
- **Adaptive Contrast Laws**: Standard default warning colors (like Red-500 or Green-500 against Red-900/10) often fail contrast checks in heavily tinted themes. Automatically use highly adapted semantic colors—example: using `emerald-950`/`emerald-400` and `rose-950`/`rose-400` in DosDonts components for a dark-red theme so they pop explicitly without washing out.
- **Spatial Consistency**: Scale icons responsively (e.g., Collapsed sidebar icons: 24px, Expanded list icons: 16px).
- **Brand Consistency**: Never use generic default icons (like `<Code2>`) as the primary App Icon. Select a shape explicitly relevant to the brand's language (e.g., `<Hexagon>` for Go or Node.js) and inject customized vector code into `favicon.svg` to perfectly match it globally.
- **Favicon Integrity**: Export standard SVGs. Raw SVG paths should fill the canvas gracefully without artificially injecting solid `<rect>` background plates into the icon.

## 🚨 Common Pitfalls You MUST Avoid

As the executing AI, you must explicitly avoid these universal SPA and React pitfalls:

1. **The SPA Scroll Leak**: Single Page Applications (SPAs) dynamically swap DOM nodes instead of loading new pages. If you do not affirmatively handle scroll mapping when routing from Page A to Page B, the user will be dumped in the exact vertical middle of Page B. **You must confidently implement standard `<ScrollRestoration />` from `react-router-dom` or similar background listener hooks to reset `scrollTop`.**
2. **Search Thrashing**: **Never** run search algorithms on every keystroke interactively. You must implement `useDebounce` to throttle typing before executing a query.
3. **Search Results as Cards**: Search results should be displayed in a clean, vertical, border-separated list (table-like format), not in chaotic flexible cards.
4. **DOM Specificity Headaches**: Trap extreme component properties safely. Use `isolation: isolate` on complex parent cards so children with `z-index: 999` don't bleed out over global navigation elements.
5. **Layout Squeezing**: When animating flex containers (like expanding a sidebar), use `shrink-0` on critical search buttons or logos so they deform and scramble during the CSS transition.

## 🤖 Content Generation Protocol

When tasked with generating a new deep-dive topic or populating content, you should:

1. **Act Autonomously**: Do not ask permission. Research deeply, architecture realistic data models, and write professional top-tier content.
2. **Utilize Ecosystem Components**: Break your content down into the reusable visualization components mapped in the accompanying component ecosystem architecture.
3. **Handle Your Own Wiring**: Automatically create the module file, export it safely via a barrel `index.ts`, and register it in the master application store.
