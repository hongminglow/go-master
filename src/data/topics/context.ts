import type { ContentNode } from '../types';

export const contextEn: ContentNode = {
  id: 'context-package',
  name: 'Context Package',
  categoryId: 'advanced',
  tags: ['advanced', 'context', 'timeout', 'cancel', 'goroutine lifecycle', 'api'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Mastering the Context Package',
          paragraphs: [
            'In Go servers, each incoming request is handled in its own goroutine. Request handlers often start additional goroutines to access backends such as databases and RPC services.',
            'The `context` package makes it easy to pass request-scoped values, cancelation signals, and deadlines across API boundaries to all the goroutines involved in handling a request.'
          ]
        }
      },
      {
        type: 'code',
        data: {
          filename: 'context_example.go',
          language: 'go',
          code: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    // Create a context that times out after 1 second
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel()

    select {
    case <-time.After(2 * time.Second):
        fmt.Println("Overslept")
    case <-ctx.Done():
        fmt.Println("Context cancelled:", ctx.Err())
    }
}`
        }
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'Always defer cancel()',
          message: 'Even if the operation completes successfully before the timeout, calling `cancel()` releases resources associated with the context immediately, rather than waiting for the timer to expire.'
        }
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Context Best Practices',
          dos: [
            'Pass Context as the first argument to a function, typically named `ctx`.',
            'Use context.Background() in `main`, `init`, or the top-level request handler.',
            'Always call the cancel function returned by WithCancel, WithTimeout, or WithDeadline.'
          ],
          donts: [
            'Do not store Contexts inside a struct type; pass them explicitly to each function.',
            'Do not pass a nil Context, even if a function permits it. Pass context.TODO() if unsure.',
            'Do not use Context values for passing optional parameters; use them only for request-scoped data.'
          ]
        }
      }
    ]
  }
};

export const contextZh: ContentNode = {
  id: 'context-package',
  name: 'Context 包深度解析',
  categoryId: 'advanced',
  tags: ['高级', 'context', '超时', '取消机制', '协程生命周期', 'api', '上下文'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '掌握 Context (上下文) 包',
          paragraphs: [
            '在 Go 服务器中，每个传入的请求都在其自己的 goroutine 中处理。请求处理程序通常会启动额外的 goroutine 来访问数据库和 RPC 服务等后端。',
            '使用 `context` 包可以极其方便地将请求范围的值、取消信号和截止日期跨 API 边界传递给处理请求的所有 goroutine。'
          ]
        }
      },
      {
        type: 'code',
        data: {
          filename: 'context_example.go',
          language: 'go',
          code: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    // 创建一个1秒后超时的 context
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel()

    select {
    case <-time.After(2 * time.Second):
        fmt.Println("睡过头了")
    case <-ctx.Done():
        fmt.Println("Context 被取消:", ctx.Err())
    }
}`
        }
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: '务必使用 defer cancel()',
          message: '即使操作在超时前成功完成，调用 `cancel()` 也能立即释放与 context 关联的资源，而无需等待计时器过期。'
        }
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Context 最佳实践',
          dos: [
            '始终将 Context 作为函数的第一个参数传递，并且通常命名为 `ctx`。',
            '在 `main`、`init` 或顶级请求处理程序中使用 context.Background()。',
            '务必尽早调用由 WithCancel、WithTimeout 或 WithDeadline 返回的 cancel 函数。'
          ],
          donts: [
            '绝对不要将 Context 存储在结构体（struct）内部；而是明确地传递给每个需要它的函数。',
            '永远不要传递 nil 的 Context。如果不确定该用哪个，请传递 context.TODO()。',
            '永远不要使用 Context 值来传递可选的函数参数；它应该只用于传递请求范围（request-scoped）的数据。'
          ]
        }
      }
    ]
  }
};
