import type { ContentNode } from "../types";

export const introToGoEn: ContentNode = {
  id: "what-is-go",
  name: "What is Go?",
  categoryId: "intro",
  tags: ["basics", "introduction", "history", "getting started"],
  content: {
    sections: [
      {
        type: "content",
        data: {
          title: "Introduction to Go (Golang)",
          paragraphs: [
            "Go, often referred to as Golang, is an open-source programming language developed by Google in 2007. It was designed to improve programming productivity in an era of multicore, networked machines and large codebases.",
            "It combines the performance and security of a compiled language like C++ with the speed of a dynamically typed language like Python.",
          ],
        },
      },
      {
        type: "quote",
        data: {
          quote:
            "Go is an attempt to combine the ease of programming of an interpreted, dynamically typed language with the efficiency and safety of a statically typed, compiled language.",
          author: "Rob Pike",
          role: "Co-creator of Go",
        },
      },
      {
        type: "tip",
        data: {
          variant: "info",
          title: "Did you know?",
          message:
            'The official name of the language is Go. The moniker "Golang" arose because the domain go.org was not available, so golang.org was used instead.',
        },
      },
      {
        type: "workflow",
        data: {
          title: "Getting Started with Go",
          steps: [
            {
              title: "Install Go",
              description:
                "Download and install Go from the official website (golang.org).",
            },
            {
              title: "Setup Workspace",
              description:
                "Configure your GOPATH and necessary environment variables.",
            },
            {
              title: "Write Hello World",
              description:
                "Create a main.go file and write your first Go program.",
            },
          ],
        },
      },
      {
        type: "code",
        data: {
          filename: "main.go",
          language: "go",
          code: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go Master!")\n}`,
        },
      },
    ],
  },
};

export const introToGoZh: ContentNode = {
  id: "what-is-go",
  name: "Go 语言究竟是什么？",
  categoryId: "intro",
  tags: ["入门", "介绍", "历史", "基础", "golang"],
  content: {
    sections: [
      {
        type: "content",
        data: {
          title: "初识 Go (Golang)",
          paragraphs: [
            "Go（通常被称为 Golang）是 Google 在 2007 年开发的一款开源编程语言。它的诞生是为了在多核、网络化机器和庞大代码库的时代，大幅提升程序员的生产力。",
            "它完美融合了 C++ 等编译型语言的强悍性能与安全，以及 Python 等动态类型语言的开发效率。",
          ],
        },
      },
      {
        type: "quote",
        data: {
          quote:
            "Go 试图将解释型、动态类型语言的编程便利性与静态类型、编译型语言的执行效率和安全性完美结合。",
          author: "Rob Pike",
          role: "Go 语言联合创始人",
        },
      },
      {
        type: "tip",
        data: {
          variant: "info",
          title: "你知道吗？",
          message:
            '这门语言的官方名称就是 Go。之所以经常被叫做 "Golang"，是因为当年 go.org 这个域名已经被注册了，所以官方只能退而求其次使用了 golang.org。',
        },
      },
      {
        type: "workflow",
        data: {
          title: "Go 语言入门指南",
          steps: [
            {
              title: "安装 Go",
              description: "前往官方网站 (golang.org) 下载并安装 Go 语言环境。",
            },
            {
              title: "配置工作区",
              description: "设置你的 GOPATH 以及其他必要的环境变量。",
            },
            {
              title: "编写 Hello World",
              description: "创建一个 main.go 文件，并写下你的第一行 Go 代码。",
            },
          ],
        },
      },
      {
        type: "code",
        data: {
          filename: "main.go",
          language: "go",
          code: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go Master!")\n}`,
        },
      },
    ],
  },
};
