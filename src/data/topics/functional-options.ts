import type { ContentNode } from '../types';

export const functionalOptionsEn: ContentNode = {
  id: 'functional-options',
  name: 'Functional Options Pattern',
  categoryId: 'advanced',
  tags: ['functional options', 'design pattern', 'option', 'variadic', 'constructor', 'API design', 'configuration', 'idiomatic', 'advanced', 'library design', 'Dave Cheney'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'The Idiom Used by Every Major Go Library',
          paragraphs: [
            'The Functional Options pattern is one of Go\'s most celebrated design patterns — popularised by Dave Cheney\'s famous 2014 blog post. It solves a fundamental API design problem: how do you create a configurable struct without either a massive constructor signature or a messy config struct full of zero-value ambiguity?',
            'The idea: define a type `Option` that is a function modifying the config. Users pass any number of these option functions into the constructor. You\'ll see this exact pattern in gRPC, zap (Uber\'s logger), Prometheus, and virtually every well-designed Go library.',
          ],
        },
      },
      {
        type: 'comparison',
        data: {
          title: 'Config Struct vs Functional Options',
          before: {
            title: '😓 Config Struct (ambiguous zero values)',
            language: 'go',
            code: `// Is Timeout=0 "no timeout" or "use default"?
// Is MaxRetries=0 intentional or forgotten?
type Config struct {
    Timeout    time.Duration
    MaxRetries int
    TLS        bool
}
client := NewClient(Config{
    Timeout:    5 * time.Second,
    MaxRetries: 3,
    // TLS: false — intentional? or forgot?
})`,
          },
          after: {
            title: '✅ Functional Options (self-documenting)',
            language: 'go',
            code: `client := NewClient(
    WithTimeout(5 * time.Second),
    WithMaxRetries(3),
    WithTLS(), // presence is explicit intent
)`,
          },
        },
      },
      {
        type: 'code',
        data: {
          filename: 'functional_options.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "time"
)

// 1. Define the internal config struct with safe defaults
type clientConfig struct {
    timeout    time.Duration
    maxRetries int
    tls        bool
}

// 2. Define the Option type — a function that mutates the config
type Option func(*clientConfig)

// 3. Define the option constructors
func WithTimeout(d time.Duration) Option {
    return func(c *clientConfig) { c.timeout = d }
}

func WithMaxRetries(n int) Option {
    return func(c *clientConfig) { c.maxRetries = n }
}

func WithTLS() Option {
    return func(c *clientConfig) { c.tls = true }
}

// 4. The constructor applies options over a defaults struct
type Client struct{ config clientConfig }

func NewClient(opts ...Option) *Client {
    cfg := clientConfig{
        timeout:    30 * time.Second, // safe defaults
        maxRetries: 3,
    }
    for _, opt := range opts {
        opt(&cfg) // apply each user-supplied option
    }
    return &Client{config: cfg}
}

func main() {
    // Use only what you need — defaults handle the rest
    c := NewClient(
        WithTimeout(5*time.Second),
        WithTLS(),
    )
    fmt.Printf("%+v\\n", c.config)
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'Why This Pattern Beats Config Structs',
          message: 'Config structs suffer from "zero value ambiguity" — you can\'t tell if `Timeout: 0` means "zero timeout", "no timeout", or "I forgot to set this". Functional options are always additive and self-documenting: if an option isn\'t passed, the default is clearly defined inside `NewClient` and visible in one place.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'When to Use Functional Options',
          dos: [
            'Use functional options when your struct has more than 2-3 optional configuration fields.',
            'Document each `WithXxx` function clearly — they are part of your public API.',
            'Always start with safe, production-appropriate defaults so callers get good behaviour with zero effort.',
            'Return `Option` from private option factories to allow grouping of related options.',
          ],
          donts: [
            'Don\'t use functional options for required fields — required data belongs in the constructor signature itself.',
            'Don\'t expose the internal config struct — the option abstraction is the public interface.',
            'Don\'t make option functions do complex validation — keep them simple mutations; validate in the constructor.',
          ],
        },
      },
    ],
  },
};

export const functionalOptionsZh: ContentNode = {
  id: 'functional-options',
  name: '函数式选项模式',
  categoryId: 'advanced',
  tags: ['函数式选项', '设计模式', 'option', '可变参数', '构造函数', 'API设计', '配置', '惯用法', '高级', '库设计'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '几乎所有主流 Go 库都在用的惯用法',
          paragraphs: [
            '函数式选项模式是 Go 最受推崇的设计模式之一——由 Dave Cheney 在 2014 年的著名博文中推广。它解决了一个根本性的 API 设计难题：如何打造一个可配置的结构体，同时避免臃肿的构造函数签名，以及充斥着零值歧义的配置结构体？',
            '核心思路：定义一个 `Option` 类型，它是一个修改内部配置的函数。用户向构造函数传入任意数量的选项函数。gRPC、zap（Uber 的日志库）、Prometheus 以及几乎所有设计良好的 Go 库，都采用了这一模式。',
          ],
        },
      },
      {
        type: 'comparison',
        data: {
          title: '配置结构体 vs 函数式选项',
          before: {
            title: '😓 配置结构体（零值含义模糊）',
            language: 'go',
            code: `// Timeout=0 是"零超时"还是"使用默认值"？
// MaxRetries=0 是有意为之还是忘记设置了？
type Config struct {
    Timeout    time.Duration
    MaxRetries int
    TLS        bool
}
client := NewClient(Config{
    Timeout:    5 * time.Second,
    MaxRetries: 3,
    // TLS: false —— 是故意的？还是漏了？
})`,
          },
          after: {
            title: '✅ 函数式选项（意图自文档化）',
            language: 'go',
            code: `client := NewClient(
    WithTimeout(5 * time.Second),
    WithMaxRetries(3),
    WithTLS(), // 存在即表明明确意图
)`,
          },
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: '为什么它优于配置结构体',
          message: '配置结构体饱受"零值歧义"困扰——你无法区分 `Timeout: 0` 是"零超时"、"无超时"还是"忘记设置了"。函数式选项始终是加法式、自文档化的：如果某个选项未被传入，默认值清晰地定义在 `NewClient` 内部，一目了然。',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '何时使用函数式选项',
          dos: [
            '当你的结构体有超过 2-3 个可选配置字段时，使用函数式选项。',
            '为每个 `WithXxx` 函数提供清晰的文档说明——它们是你公开 API 的一部分。',
            '始终设置安全的生产级默认值，让调用方零配置即可获得合理行为。',
            '考虑通过私有选项工厂将相关选项分组返回。',
          ],
          donts: [
            '不要对必选字段使用函数式选项——必填数据应直接放在构造函数签名中。',
            '不要暴露内部配置结构体——选项抽象本身就是公开接口。',
            '不要让选项函数做复杂验证——保持它们为简单的赋值操作，在构造函数中统一校验。',
          ],
        },
      },
    ],
  },
};
