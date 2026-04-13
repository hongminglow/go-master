import type { ContentNode } from '../types';

export const goroutineLeaksEn: ContentNode = {
  id: 'goroutine-leaks',
  name: 'Goroutine Leaks: The Silent Killer',
  categoryId: 'concurrency',
  tags: ['goroutine leak', 'leak', 'memory leak', 'channel', 'context', 'cancel', 'done', 'select', 'WaitGroup', 'advanced', 'trap'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'What is a Goroutine Leak?',
          paragraphs: [
            'A goroutine leak happens when a goroutine is started but never terminates. Unlike OS threads, goroutines are cheap — but they are NOT free. Each leaked goroutine holds its stack memory (starting at ~2KB, growing as needed), keeps any referenced objects alive on the heap, and may hold locks or connections that are never released.',
            'Goroutine leaks are insidious: your app appears healthy at first, but memory and goroutine count creep up over hours or days until the service dies. They almost never show up in unit tests — only under real production load.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'leak_example.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "runtime"
    "time"
)

// ❌ LEAK: nobody ever reads from 'ch', so this goroutine blocks forever
func leaky() {
    ch := make(chan int)
    go func() {
        val := <-ch // blocks forever — goroutine is leaked!
        fmt.Println(val)
    }()
    // function returns, but the goroutine is still blocked waiting
}

// ✅ FIX: use context cancellation to signal the goroutine to stop
func safe(done <-chan struct{}) {
    ch := make(chan int)
    go func() {
        select {
        case val := <-ch:
            fmt.Println(val)
        case <-done: // owner can cancel via context
            return
        }
    }()
}

func main() {
    for i := 0; i < 10; i++ {
        leaky()
    }
    time.Sleep(100 * time.Millisecond)
    // 10 goroutines are now leaked — they appear in the count
    fmt.Println("Goroutines:", runtime.NumGoroutine())
}`,
        },
      },
      {
        type: 'quote',
        data: {
          quote: 'Never start a goroutine without knowing how it will stop.',
          author: 'Dave Cheney',
          role: 'Go Core Contributor',
        },
      },
      {
        type: 'workflow',
        data: {
          title: 'Three Common Goroutine Leak Patterns & Fixes',
          steps: [
            {
              title: 'Blocked on a channel with no sender/receiver',
              description: 'Use a `done` channel or `context.Context` cancellation so the goroutine has an exit path besides the channel operation.',
            },
            {
              title: 'Infinite loop with no exit condition',
              description: 'Always pair infinite `for` loops inside goroutines with a `select` case on `ctx.Done()` or a `done<-chan` signal.',
            },
            {
              title: 'Goroutine waiting on a response that never arrives',
              description: 'Add a `time.After` or `context.WithTimeout` deadline to every goroutine waiting on I/O or external responses.',
            },
          ],
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'Detect Leaks with goleak',
          message: '`github.com/uber-go/goleak` is a fantastic test utility that asserts no unexpected goroutines survive after each test. Add `defer goleak.VerifyNone(t)` at the top of every concurrent test to catch leaks automatically.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Goroutine Lifecycle Rules',
          dos: [
            'Every goroutine must have a clear, reachable termination path.',
            'Pass `context.Context` into long-running goroutines and honor `ctx.Done()`.',
            'Use `runtime.NumGoroutine()` in benchmarks and tests to verify expected counts.',
            'Use `goleak.VerifyNone(t)` in test suites to auto-detect leaks.',
          ],
          donts: [
            'Don\'t fire-and-forget goroutines without a shutdown mechanism.',
            'Don\'t rely on garbage collection to clean up goroutines — the GC cannot collect a blocked goroutine.',
            'Don\'t pass an unbuffered channel to a goroutine without ensuring a matching sender/receiver.',
          ],
        },
      },
    ],
  },
};

export const goroutineLeaksZh: ContentNode = {
  id: 'goroutine-leaks',
  name: 'Goroutine 泄漏：沉默的性能杀手',
  categoryId: 'concurrency',
  tags: ['goroutine泄漏', '内存泄漏', 'channel', 'context', '取消', 'done', 'select', 'WaitGroup', '高级', '陷阱'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '什么是 Goroutine 泄漏？',
          paragraphs: [
            'Goroutine 泄漏是指一个 goroutine 被启动后却永远无法终止。尽管 goroutine 很轻量，但并非完全免费。每个泄漏的 goroutine 都会占用其栈内存（从 ~2KB 开始动态增长），保持堆上被引用对象的存活，并可能持有永远不会释放的锁或连接。',
            'Goroutine 泄漏极为隐蔽：服务一开始看似健康，但内存和 goroutine 数量会在数小时或数天内悄然攀升，直至服务崩溃。在单元测试中几乎不会出现，只有在真实的生产负载下才会暴露。',
          ],
        },
      },
      {
        type: 'quote',
        data: {
          quote: '永远不要在不知道 goroutine 如何停止的情况下启动它。',
          author: 'Dave Cheney',
          role: 'Go 核心贡献者',
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: '用 goleak 检测泄漏',
          message: '`github.com/uber-go/goleak` 是一个出色的测试工具，它会断言每个测试结束后没有意外存活的 goroutine。在每个并发测试顶部加上 `defer goleak.VerifyNone(t)` 即可自动捕获泄漏。',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Goroutine 生命周期规则',
          dos: [
            '每个 goroutine 必须有清晰且可达的终止路径。',
            '向长期运行的 goroutine 传入 `context.Context`，并响应 `ctx.Done()`。',
            '在基准测试和测试中用 `runtime.NumGoroutine()` 验证预期的 goroutine 数量。',
            '在测试套件中使用 `goleak.VerifyNone(t)` 自动检测泄漏。',
          ],
          donts: [
            '不要在没有关闭机制的情况下启动"fire-and-forget"型 goroutine。',
            '不要指望垃圾收集器清理 goroutine——GC 无法回收一个被阻塞的 goroutine。',
            '不要在没有匹配的发送方/接收方的情况下，向 goroutine 传递无缓冲 channel。',
          ],
        },
      },
    ],
  },
};
