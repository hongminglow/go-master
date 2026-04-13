import type { ContentNode } from '../types';

export const goSchedulerEn: ContentNode = {
  id: 'go-scheduler',
  name: 'How Go\'s Scheduler Works (GMP)',
  categoryId: 'advanced',
  tags: ['scheduler', 'GMP', 'goroutine', 'GOMAXPROCS', 'runtime', 'preemption', 'M:N threading', 'work stealing', 'cooperative', 'OS thread', 'advanced', 'internals'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'The GMP Model: Go\'s Secret Sauce',
          paragraphs: [
            'Go\'s incredible concurrency performance doesn\'t come from magic — it comes from a custom, highly optimised userspace scheduler built into the runtime. Understanding this GMP model explains why you can run a million goroutines without crashing, and why `GOMAXPROCS` matters.',
            'GMP stands for: G (Goroutines), M (Machine threads — actual OS threads), and P (Processors — logical execution context). The scheduler multiplexes millions of Gs onto a small fixed number of Ms, coordinated via Ps.',
          ],
        },
      },
      {
        type: 'table',
        data: {
          title: 'The Three Components of the GMP Model',
          headers: ['Component', 'What it is', 'Count'],
          rows: [
            ['G (Goroutine)', 'Lightweight, Go-managed execution unit. ~2KB initial stack, grows dynamically.', 'Millions possible'],
            ['M (Machine)', 'Actual OS thread. Created and managed by the Go runtime. Runs one P at a time.', 'Usually equal to Ps + extras for blocking syscalls'],
            ['P (Processor)', 'Logical CPU scheduler slot. Each P has its own local queue of runnable Gs.', 'Set by GOMAXPROCS (default: number of CPU cores)'],
          ],
        },
      },
      {
        type: 'workflow',
        data: {
          title: 'How the Scheduler Works',
          steps: [
            {
              title: 'G is created',
              description: 'When you call `go func()`, a G is created and added to the current P\'s local run queue (or the global queue if full).',
            },
            {
              title: 'M picks up P and runs G',
              description: 'An M acquires a P and pops a G from its local run queue to execute. An M without a P cannot run goroutines.',
            },
            {
              title: 'G blocks on I/O or syscall',
              description: 'The M detaches from P, hands P to another M, and blocks on the syscall. When I/O completes, the G is put back in a run queue and the original M becomes idle.',
            },
            {
              title: 'Work stealing',
              description: 'If a P\'s queue is empty, it steals half the goroutines from another P\'s queue. This keeps all CPUs busy without central coordination, enabling massive parallelism.',
            },
            {
              title: 'Preemption',
              description: 'Since Go 1.14, goroutines are asynchronously preemptible via signals — a goroutine in a tight CPU loop no longer starves other goroutines.',
            },
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'gomaxprocs.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "runtime"
)

func main() {
    // Default: number of CPU cores available
    fmt.Println("CPUs:", runtime.NumCPU())
    fmt.Println("GOMAXPROCS:", runtime.GOMAXPROCS(0)) // 0 = query without changing

    // Limit parallelism to 1 — all goroutines run on one OS thread
    // Useful for testing cooperative scheduling behaviour
    runtime.GOMAXPROCS(1)

    // Force the scheduler to yield the current goroutine
    // (rarely needed — prefer channels and sync primitives)
    runtime.Gosched()
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'GOMAXPROCS = CPU cores is almost always optimal',
          message: 'The default `GOMAXPROCS` (set to number of CPU cores) is optimal for most Go programs. Increasing it beyond CPU core count does NOT improve performance and may hurt it due to context switching overhead. Setting it to 1 is useful only for debugging scheduler-related bugs.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Scheduler-Aware Programming Tips',
          dos: [
            'Trust the default `GOMAXPROCS` — only change it in benchmarks or tests.',
            'Use `runtime.NumGoroutine()` to monitor goroutine count in profiling.',
            'Rely on channels and context cancellation for coordination, not `runtime.Gosched()`.',
            'Understand that I/O-bound apps may benefit from more goroutines than CPU cores.',
          ],
          donts: [
            'Don\'t write tight CPU loops that never yield without channel ops or function calls — pre-1.14 code could starve other goroutines.',
            'Don\'t assume goroutines run in any particular order — the scheduler decides.',
            'Don\'t manually set `GOMAXPROCS` in production without careful profiling evidence.',
          ],
        },
      },
    ],
  },
};

export const goSchedulerZh: ContentNode = {
  id: 'go-scheduler',
  name: 'Go 调度器原理 (GMP 模型)',
  categoryId: 'advanced',
  tags: ['调度器', 'GMP', 'goroutine', 'GOMAXPROCS', 'runtime', '抢占', 'M:N线程', '工作窃取', '协作调度', 'OS线程', '高级', '内部原理'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'GMP 模型：Go 的秘密武器',
          paragraphs: [
            'Go 惊人的并发性能并非来自魔法，而是运行时内置的一个自定义、高度优化的用户态调度器。理解 GMP 模型，能解释为何你可以运行百万个 goroutine 而不会崩溃，以及为何 `GOMAXPROCS` 至关重要。',
            'GMP 代表：G（Goroutine）、M（Machine，即真实的 OS 线程）和 P（Processor，即逻辑执行上下文）。调度器通过 P 将数百万个 G 多路复用到少量固定的 M 上。',
          ],
        },
      },
      {
        type: 'table',
        data: {
          title: 'GMP 模型三大组件',
          headers: ['组件', '含义', '数量'],
          rows: [
            ['G (Goroutine)', '轻量级的 Go 管理执行单元。初始栈约 2KB，动态增长。', '可达百万级'],
            ['M (Machine)', '真实的 OS 线程，由 Go 运行时创建和管理。同一时间只能持有一个 P 运行。', '通常等于 P 数 + 处理阻塞系统调用的额外线程'],
            ['P (Processor)', '逻辑 CPU 调度槽位。每个 P 有自己的本地可运行 G 队列。', '由 GOMAXPROCS 设定（默认等于 CPU 核心数）'],
          ],
        },
      },
      {
        type: 'workflow',
        data: {
          title: '调度器的工作流程',
          steps: [
            { title: 'G 被创建', description: '调用 `go func()` 时，G 被创建并加入当前 P 的本地运行队列（满了则进入全局队列）。' },
            { title: 'M 获取 P 并运行 G', description: 'M 获取一个 P，从其本地运行队列中取出一个 G 执行。没有 P 的 M 无法运行 goroutine。' },
            { title: 'G 因 I/O 或系统调用阻塞', description: 'M 与 P 解绑，将 P 交给另一个 M，自身阻塞在系统调用上。I/O 完成后，G 被放回运行队列，原 M 变为空闲。' },
            { title: '工作窃取', description: '某个 P 的队列为空时，它会从其他 P 的队列中窃取一半 goroutine。无需中央协调，所有 CPU 始终保持繁忙。' },
            { title: '抢占式调度', description: 'Go 1.14 起，goroutine 可通过信号实现异步抢占——紧密 CPU 循环中的 goroutine 不再会饿死其他 goroutine。' },
          ],
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '调度器感知的编程技巧',
          dos: [
            '信任默认的 `GOMAXPROCS`——只在基准测试或调试时修改。',
            '用 `runtime.NumGoroutine()` 在 profiling 中监控 goroutine 数量。',
            '依赖 channel 和 context 取消来协调，而非 `runtime.Gosched()`。',
            '理解 I/O 密集型应用可能受益于比 CPU 核心数更多的 goroutine。',
          ],
          donts: [
            '（尤其在 1.14 之前）不要写没有 channel 操作或函数调用的紧密 CPU 循环——可能饿死其他 goroutine。',
            '不要假定 goroutine 按特定顺序运行——由调度器决定。',
            '不要在没有充分 profiling 证据的情况下，在生产环境手动设置 `GOMAXPROCS`。',
          ],
        },
      },
    ],
  },
};
