# Generic Component Ecosystem Template

**Purpose**: A universal architectural mapping of visualization components. Instruct the AI to recreate this structured library tailored to the project's specific color/theming choices. 

---

## 🧩 Component Hierarchy Objective

You should construct a standard library of **12 Visualization Components** categorized by their communicative purpose. They must accept strong TypeScript `interfaces` mapping directly to their respective data modules.

```
Content Visualization Components
│
├── 1. Informational Components
│   ├── ContentCard          → General explanations, robust paragraphs
│   ├── QuoteCard            → Highlighted quotes, core principles, authority figures
│   └── TipCard              → Critical notes, warnings (Variants: Info, Danger, Success)
│
├── 2. Instructional Components
│   ├── WorkflowCard         → Numbered step-by-step guides and implementation trackers
│   ├── TimelineCard         → Chronological progressions or historical evolution
│   └── ListCard             → Structured bulleted or numbered arrays
│
├── 3. Code & Demo Components
│   ├── CodeSnippet          → Syntax-highlighted code blocks with copy features
│   ├── PreviewCard          → Live visual demonstrations rendering raw HTML/CSS
│   ├── ComparisonCard       → Syntax diffs (Before vs After)
│   └── LiveComparisonCard   → The ultimate split-pane view: Side-by-side isolated live frames
│
└── 4. Structural Data Components
    ├── TableCard            → Responsive grid/row structured data
    └── DosDontsCard         → Binary best practices vs anti-patterns grids
```

## 📐 Universal Design Patterns

When building these components, **you must** adhere to these visual scaling frameworks, adapting the explicit hex colors to whatever the current application theme requires:

### Semantic Styling Map
- **Standard Surfaces**: Map to the project's primary "Card Background" color. Must contrast with the main app background.
- **Code Surfaces**: Map to a darker, distinct contrast color (e.g. pure dark-mode tones) to separate purely syntactical sections from surrounding content.
- **Accents**: 
  - Primary Element Clicks: Map to Brand Action Color
  - Success/Valid States (Do's, Checkmarks): Map to Green Tone
  - Danger/Error States (Don'ts, Bugs): Map to Red Tone

### Spatial Architecture
- **Spacings**: Maintain strict internal harmony. 
  - Outer Card Padding: High padding (e.g., `p-6` or 24px)
  - Nested Content Padding: Medium padding (e.g., `p-4` or 16px)
  - Component Gaps: Consistent breathing room between sections (e.g., `gap-6` or 24px).
- **Rounding**: Maintain identical `border-radius` variables across all 12 components (e.g., `rounded-xl`). DO NOT mix sharp corners with rounded corners.

## 🏗️ Typical Composition Structures

When instructed to build out topics or content layouts, you should sequence these components logically. Example compositions:

**The Educational Tutorial Walkthrough**
1. `ContentCard` → Introduction of concept
2. `TipCard` → Warning or heads-up assumption
3. `WorkflowCard` → Step 1, Step 2, Step 3 implementation guide
4. `CodeSnippet` → Finished source code

**The Bug vs Fix (Deep Dive)**
1. `QuoteCard` → The developer frustration 
2. `TimelineCard` → How it historically broke
3. `LiveComparisonCard` → Direct split-pane showing the buggy layout side-by-side with the completely functional layout
4. `DosDontsCard` → Final rules of thumb

--- 

*By combining these 12 pure-UI components dynamically using decoupled JSON/TypeScript data, you can infinitely scale the application without bloating the DOM or building bespoke layouts for every new page.*
