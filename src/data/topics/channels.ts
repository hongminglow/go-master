import type { ContentNode } from '../types';

export const channelsEn: ContentNode = {
  id: 'channels-patterns',
  name: 'Channels & Patterns',
  categoryId: 'concurrency',
  tags: ['concurrency', 'channels', 'patterns', 'select', 'unbuffered', 'buffered', 'fan-out', 'fan-in'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Advanced Channel Patterns',
          paragraphs: [
            'Channels are the pipes that connect concurrent goroutines. You can send values into channels from one goroutine and receive those values into another goroutine.',
            'Mastering unbuffered vs. buffered channels, and patterns like Fan-out/Fan-in or the Select statement, is essential for writing robust and highly scalable Go applications.'
          ]
        }
      },
      {
        type: 'quote',
        data: {
          quote: "Don't communicate by sharing memory; share memory by communicating.",
          author: "Rob Pike",
          role: "Go Proverb"
        }
      },
      {
        type: 'code',
        data: {
          filename: 'select_pattern.go',
          language: 'go',
          code: `package main\n\nimport (\n\t"fmt"\n\t"time"\n)\n\nfunc main() {\n\tc1 := make(chan string)\n\tc2 := make(chan string)\n\n\tgo func() {\n\t\ttime.Sleep(1 * time.Second)\n\t\tc1 <- "one"\n\t}()\n\tgo func() {\n\t\ttime.Sleep(2 * time.Second)\n\t\tc2 <- "two"\n\t}()\n\n\tfor i := 0; i < 2; i++ {\n\t\tselect {\n\t\tcase msg1 := <-c1:\n\t\t\tfmt.Println("received", msg1)\n\t\tcase msg2 := <-c2:\n\t\t\tfmt.Println("received", msg2)\n\t\t}\n\t}\n}`
        }
      },
      {
        type: 'workflow',
        data: {
          title: 'The Fan-Out / Fan-In Pattern',
          steps: [
            { title: 'Source Channel', description: 'Create a main channel that generates a stream of data.' },
            { title: 'Fan-Out', description: 'Start multiple worker goroutines to constantly read from the source channel.' },
            { title: 'Fan-In', description: 'Multiplex the results from all workers into a single destination channel using a `select` loop or a coordinating goroutine with a WaitGroup.' }
          ]
        }
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Channel Pitfalls to Avoid',
          dos: [
            'Close channels from the sender side exclusively.',
            'Use `v, ok := <-ch` to gracefully check if a channel is closed.',
            'Always have a matching receiver when using unbuffered channels to prevent deadlocks.'
          ],
          donts: [
            'Never close a channel from the receiver side.',
            'Don\'t close a channel if there are multiple concurrent senders; use a synchronization mechanism instead.',
            'Never send on a closed channel—this will cause a fatal panic.'
          ]
        }
      }
    ]
  }
};

export const channelsZh: ContentNode = {
  id: 'channels-patterns',
  name: 'Channels 及其高级模式',
  categoryId: 'concurrency',
  tags: ['并发', '通道', '设计模式', 'select', '无缓冲', '有缓冲', 'fan-out', 'fan-in', '扇入', '扇出'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '深入探索 Channel (通道) 模式',
          paragraphs: [
            'Channel 是连接多个并发 goroutine 的管道。你可以从一个 goroutine 将值发送到 channel，并在另一个 goroutine 中接收这些值。',
            '熟练掌握无缓冲与有缓冲 channel，以及例如 Fan-out / Fan-in（扇出/扇入）或 select 多路复用等模式，是编写健壮且高可扩展 Go 应用的关键。'
          ]
        }
      },
      {
        type: 'quote',
        data: {
          quote: "不要通过共享内存来通信，而应该通过通信来共享内存。",
          author: "Rob Pike",
          role: "Go 语言核心谚语"
        }
      },
      {
        type: 'code',
        data: {
          filename: 'select_pattern.go',
          language: 'go',
          code: `package main\n\nimport (\n\t"fmt"\n\t"time"\n)\n\nfunc main() {\n\tc1 := make(chan string)\n\tc2 := make(chan string)\n\n\tgo func() {\n\t\ttime.Sleep(1 * time.Second)\n\t\tc1 <- "one"\n\t}()\n\tgo func() {\n\t\ttime.Sleep(2 * time.Second)\n\t\tc2 <- "two"\n\t}()\n\n\tfor i := 0; i < 2; i++ {\n\t\tselect {\n\t\tcase msg1 := <-c1:\n\t\t\tfmt.Println("已接收", msg1)\n\t\tcase msg2 := <-c2:\n\t\t\tfmt.Println("已接收", msg2)\n\t\t}\n\t}\n}`
        }
      },
      {
        type: 'workflow',
        data: {
          title: 'Fan-Out (扇出) / Fan-In (扇入) 模式',
          steps: [
            { title: '声明源通道', description: '创建一个主 channel 来持续生成或流转输入数据。' },
            { title: 'Fan-Out (扇出)', description: '启动多个工作 (worker) goroutine 来并发地从该源通道中读取并处理数据。' },
            { title: 'Fan-In (扇入)', description: '利用 select 循环或借助 WaitGroup，将所有 worker 处理后的结果多路复用到单一的目标 channel 中去。' }
          ]
        }
      },
      {
        type: 'dos-donts',
        data: {
          title: '使用 Channel 的雷区',
          dos: [
            '始终只在发送方 (Sender) 这一侧关闭 channel。',
            '使用类似 `v, ok := <-ch` 的 comma ok 惯用语法来优雅地检查 channel 是否已经关闭。',
            '使用无缓冲 channel 时，务必保证发送方和接收方同时就绪，否则会导致死锁。'
          ],
          donts: [
            '绝不要在接收方 (Receiver) 这一侧关闭 channel。',
            '如果有多个并发的发送方往同一个 channel 写数据，绝不要去关闭它；此时应该引入其他的同步机制退场。',
            '绝对不可以往一个已经关闭的 channel 里发送数据，这会导致致命的 Panic 崩溃。'
          ]
        }
      }
    ]
  }
};
