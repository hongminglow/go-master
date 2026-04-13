export type TranslationMessages = {
  app: {
    name: string;
    defaultTitle: string;
    shortcutLabel: string;
  };
  sidebar: {
    homeLabel: string;
    search: string;
    shortcutHint: string;
    collapse: string;
    expand: string;
    currentLanguage: string;
    switchLanguage: string;
  };
  home: {
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    startLearning: string;
    searchTopics: string;
    whyGo: string;
    quickJump: string;
    advantages: {
      blazingFast: { title: string; desc: string };
      simpleClean: { title: string; desc: string };
      concurrency: { title: string; desc: string };
      typeSafe: { title: string; desc: string };
    };
    pageTitle: string;
  };
  search: {
    placeholder: string;
    noResults: string;
    close: string;
    pageTitle: string;
  };
  topic: {
    endOf: string;
    unknownCategory: string;
    pageTitle: (topicName: string) => string;
  };
  content: {
    copyCode: string;
    copied: string;
    before: string;
    after: string;
    dos: string;
    donts: string;
    unsupportedBlock: string;
  };
};

export const translations: Record<"en" | "zh", TranslationMessages> = {
  en: {
    app: {
      name: "GoMaster",
      defaultTitle: "GoMaster - The Golang Knowledge Platform",
      shortcutLabel: "Cmd/Ctrl+K",
    },
    sidebar: {
      homeLabel: "GoMaster home",
      search: "Search...",
      shortcutHint: "Cmd/Ctrl+K",
      collapse: "Collapse sidebar",
      expand: "Expand sidebar",
      currentLanguage: "English",
      switchLanguage: "Switch to Chinese",
    },
    home: {
      heroTitlePrefix: "Master",
      heroTitleHighlight: "Golang",
      heroSubtitle:
        "From absolute beginner to concurrency expert. Your comprehensive guide to learning the Go programming language.",
      startLearning: "Start Learning",
      searchTopics: "Search Topics",
      whyGo: "Why Choose Go?",
      quickJump: "Quick Jump",
      advantages: {
        blazingFast: {
          title: "Blazing Fast",
          desc: "Compiled directly to machine code, Go delivers performance that feels close to C while staying productive to use.",
        },
        simpleClean: {
          title: "Simple & Clean",
          desc: "Its minimal, readable syntax keeps cognitive load low, so you can spend more time building and less time untangling code.",
        },
        concurrency: {
          title: "Built-in Concurrency",
          desc: "Goroutines and channels make concurrent programming feel natural instead of painful.",
        },
        typeSafe: {
          title: "Type Safe",
          desc: "Strong static typing helps surface mistakes early, long before they reach production.",
        },
      },
      pageTitle: "GoMaster - Learn Go from Zero to Concurrency Mastery",
    },
    search: {
      placeholder: "Search topics, syntax, or tips...",
      noResults: "No results found for",
      close: "Close search",
      pageTitle: "Search",
    },
    topic: {
      endOf: "End of",
      unknownCategory: "Unknown Category",
      pageTitle: (topicName: string) => `${topicName} - GoMaster`,
    },
    content: {
      copyCode: "Copy code",
      copied: "Copied",
      before: "Before",
      after: "After",
      dos: "Do",
      donts: "Don't",
      unsupportedBlock: "Unsupported content block",
    },
  },
  zh: {
    app: {
      name: "GoMaster",
      defaultTitle: "GoMaster - Go 语言知识平台",
      shortcutLabel: "Cmd/Ctrl+K",
    },
    sidebar: {
      homeLabel: "返回 GoMaster 首页",
      search: "搜索内容...",
      shortcutHint: "Cmd/Ctrl+K",
      collapse: "收起侧边栏",
      expand: "展开侧边栏",
      currentLanguage: "中文",
      switchLanguage: "切换为 English",
    },
    home: {
      heroTitlePrefix: "学透",
      heroTitleHighlight: "Golang",
      heroSubtitle:
        "从零基础起步，一路进阶到高并发实战。这里会是你系统掌握 Go 语言的高质量学习基地。",
      startLearning: "开始学习",
      searchTopics: "搜索主题",
      whyGo: "为什么值得学 Go？",
      quickJump: "快速开始",
      advantages: {
        blazingFast: {
          title: "性能又稳又快",
          desc: "直接编译为机器码，既能跑出接近 C 的效率，又保留现代开发体验。",
        },
        simpleClean: {
          title: "语法克制清爽",
          desc: "语言设计足够简洁，读写都轻松，特别适合长期维护和多人协作。",
        },
        concurrency: {
          title: "并发能力是强项",
          desc: "有了 Goroutine 和 Channel，并发编程不再绕，也更容易写对。",
        },
        typeSafe: {
          title: "类型系统更可靠",
          desc: "静态类型会在编译阶段提前拦住不少错误，减少上线后的隐患。",
        },
      },
      pageTitle: "GoMaster - 从入门到高并发，系统学习 Go 语言",
    },
    search: {
      placeholder: "搜索主题、语法知识或实战技巧...",
      noResults: "没有找到相关结果：",
      close: "关闭搜索",
      pageTitle: "搜索",
    },
    topic: {
      endOf: "你已读完",
      unknownCategory: "未分类内容",
      pageTitle: (topicName: string) => `${topicName} - GoMaster`,
    },
    content: {
      copyCode: "复制代码",
      copied: "已复制",
      before: "优化前",
      after: "优化后",
      dos: "推荐做法",
      donts: "避免这样做",
      unsupportedBlock: "暂不支持这种内容模块",
    },
  },
};
