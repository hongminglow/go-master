import type { ContentNode } from '../types';

export const goroutinesEn: ContentNode = {
  id: 'goroutines',
  name: 'Goroutines & Channels',
  categoryId: 'concurrency',
  tags: ['concurrency', 'threads', 'race condition', 'goroutine', 'performance'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Understanding Goroutines',
          paragraphs: [
            'A goroutine is a lightweight thread managed by the Go runtime. They are extremely cheap, requiring only a few kilobytes of stack memory.',
            'Goroutines allow functions to run concurrently with other functions. When a function is called with the `go` keyword, it executes concurrently in a new goroutine.'
          ]
        }
      },
      {
        type: 'comparison',
        data: {
          title: 'Thread vs Goroutine',
          before: {
            title: 'Java Thread',
            language: 'java',
            code: 'Thread t = new Thread(new Runnable() {\n    public void run() {\n        System.out.println("Hello");\n    }\n});\nt.start();'
          },
          after: {
            title: 'Goroutine',
            language: 'go',
            code: 'go func() {\n    fmt.Println("Hello")\n}()'
          }
        }
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: 'Beware of Race Conditions',
          message: 'When multiple goroutines access the same variable concurrently and at least one of the accesses is a write, a data race occurs. Always use channels or sync primitives.'
        }
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Concurrency Best Practices',
          dos: [
            'Communicate by sharing memory; share memory by communicating.',
            'Use channels to synchronize goroutines.',
            'Use the race detector (`go run -race`).'
          ],
          donts: [
            'Avoid global variables across goroutines.',
            'Don\'t assume the execution order of goroutines.',
            'Don\'t leak goroutines (ensure they terminate).'
          ]
        }
      }
    ]
  }
};

export const goroutinesZh: ContentNode = {
  id: 'goroutines',
  name: 'Goroutines 与 通道 (Channels)',
  categoryId: 'concurrency',
  tags: ['并发', '线程', '数据竞争', '多线程', '性能', '协程'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '深入理解 Goroutine',
          paragraphs: [
            'Goroutine 是由 Go 运行时管理的轻量级线程。它们极其轻量，每个只需要几 KB 的栈内存。',
            'Goroutine 允许函数与其他函数并发执行。当使用 `go` 关键字调用函数时，它就会在一个全新的 goroutine 中并发运行。'
          ]
        }
      },
      {
        type: 'comparison',
        data: {
          title: '传统线程 vs Goroutine',
          before: {
            title: 'Java 线程',
            language: 'java',
            code: 'Thread t = new Thread(new Runnable() {\n    public void run() {\n        System.out.println("Hello");\n    }\n});\nt.start();'
          },
          after: {
            title: 'Goroutine',
            language: 'go',
            code: 'go func() {\n    fmt.Println("Hello")\n}()'
          }
        }
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: '警惕数据竞争 (Race Conditions)',
          message: '当多个 goroutine 并发访问同一个变量，并且至少有一个是写操作时，就会发生数据竞争。请务必使用 channel 或 sync 同步原语。'
        }
      },
      {
        type: 'dos-donts',
        data: {
          title: '并发编程最佳实践',
          dos: [
            '不要通过共享内存来通信，而应该通过通信来共享内存。',
            '使用 channel 来同步 goroutine。',
            '善用数据竞争检测器 (`go run -race`)。'
          ],
          donts: [
            '避免在多个 goroutine 之间随意使用全局变量。',
            '绝对不要对 goroutine 的执行顺序做任何假设。',
            '不要泄露 goroutine（确保它们都有退出的途径）。'
          ]
        }
      }
    ]
  }
};
