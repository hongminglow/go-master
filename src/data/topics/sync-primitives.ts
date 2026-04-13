import type { ContentNode } from '../types';

export const syncPrimitivesEn: ContentNode = {
  id: 'sync-primitives',
  name: 'Sync Primitives & WaitGroups',
  categoryId: 'concurrency',
  tags: ['sync', 'mutex', 'rwmutex', 'waitgroup', 'once', 'atomic', 'race condition', 'concurrency', 'intermediate', 'advanced'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'When Channels Aren\'t Enough',
          paragraphs: [
            'Channels are Go\'s preferred concurrency primitive for communication. But sometimes you need raw synchronization — protecting a shared data structure, waiting for a group of goroutines, or initializing something exactly once. The `sync` package provides these low-level tools.',
            'Overuse of mutexes leads to deadlocks and contention. Rule of thumb: use channels when coordinating goroutines, use mutexes when protecting shared state.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'sync_demo.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "sync"
)

// --- sync.WaitGroup ---
// Wait for a group of goroutines to finish
func downloadAll(urls []string) {
    var wg sync.WaitGroup
    for _, url := range urls {
        wg.Add(1)
        go func(u string) {
            defer wg.Done()
            fmt.Println("Downloading:", u)
        }(url)
    }
    wg.Wait() // blocks until all Done() calls match Add() calls
    fmt.Println("All downloads complete")
}

// --- sync.Mutex ---
// Protect a shared counter from race conditions
type SafeCounter struct {
    mu sync.Mutex
    v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.v[key]++
}

// --- sync.Once ---
// Ensure initialization happens exactly once, even across goroutines
var (
    instance *SafeCounter
    once     sync.Once
)

func GetCounter() *SafeCounter {
    once.Do(func() {
        instance = &SafeCounter{v: make(map[string]int)}
    })
    return instance
}

func main() {
    downloadAll([]string{"url1", "url2", "url3"})
    c := GetCounter()
    c.Inc("page_view")
    c.Inc("page_view")
    fmt.Println(c.v["page_view"]) // 2
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'sync.RWMutex for Read-Heavy Workloads',
          message: 'If you have many readers and few writers, use `sync.RWMutex`. Multiple goroutines can hold the read lock simultaneously with `RLock()`/`RUnlock()`, but writes still require an exclusive `Lock()`. This can significantly improve throughput on read-heavy data structures.',
        },
      },
      {
        type: 'table',
        data: {
          title: 'sync Package Primitives at a Glance',
          headers: ['Type', 'Use Case', 'Key Methods'],
          rows: [
            ['sync.Mutex', 'Exclusive write access to shared state', 'Lock(), Unlock()'],
            ['sync.RWMutex', 'Read-heavy shared state', 'Lock(), RLock(), RUnlock()'],
            ['sync.WaitGroup', 'Wait for N goroutines to complete', 'Add(n), Done(), Wait()'],
            ['sync.Once', 'Lazy singleton initialization', 'Do(func())'],
            ['sync.Map', 'Concurrent-safe map (read-heavy)', 'Load(), Store(), Delete(), Range()'],
            ['atomic.Int64', 'Low-level lock-free counter/flag', 'Add(), Load(), Store(), CompareAndSwap()'],
          ],
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Synchronization Guidelines',
          dos: [
            'Always use `defer mu.Unlock()` immediately after `mu.Lock()` to prevent forgotten unlocks.',
            'Use `sync.Once` for expensive singleton initialization — it\'s safe, idiomatic, and lazy.',
            'Use `go run -race` to catch race conditions before they bite you in production.',
          ],
          donts: [
            'Don\'t copy a `sync.Mutex` — always pass it by pointer or embed it in a struct.',
            'Don\'t hold a lock while doing I/O or network requests — this kills concurrency.',
            'Don\'t use `sync.Map` for write-heavy workloads — a `Mutex`-protected `map` is faster.',
          ],
        },
      },
    ],
  },
};

export const syncPrimitivesZh: ContentNode = {
  id: 'sync-primitives',
  name: 'Sync 原语与 WaitGroup',
  categoryId: 'concurrency',
  tags: ['同步', '互斥锁', '读写锁', 'waitgroup', 'once', 'atomic', '数据竞争', '并发', '中级', '高级'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '当 Channel 不够用时',
          paragraphs: [
            'Channel 是 Go 最推荐的并发通信原语。但有时你需要原始的同步机制——保护共享数据结构、等待一批 goroutine 完成，或确保某件事恰好只发生一次。`sync` 包提供了这些底层工具。',
            '滥用互斥锁会导致死锁和资源竞争。经验法则：用 channel 来协调 goroutine，用 mutex 来保护共享状态。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'sync_demo.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "sync"
)

// --- sync.WaitGroup ---
// 等待一组 goroutine 全部完成
func downloadAll(urls []string) {
    var wg sync.WaitGroup
    for _, url := range urls {
        wg.Add(1)
        go func(u string) {
            defer wg.Done()
            fmt.Println("正在下载:", u)
        }(url)
    }
    wg.Wait() // 阻塞直到所有 Done() 调用与 Add() 匹配
    fmt.Println("全部下载完成")
}

// --- sync.Mutex ---
// 保护共享计数器免受竞争条件影响
type SafeCounter struct {
    mu sync.Mutex
    v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.v[key]++
}

// --- sync.Once ---
// 确保初始化即使在多个 goroutine 中也只发生一次
var (
    instance *SafeCounter
    once     sync.Once
)

func GetCounter() *SafeCounter {
    once.Do(func() {
        instance = &SafeCounter{v: make(map[string]int)}
    })
    return instance
}

func main() {
    downloadAll([]string{"url1", "url2", "url3"})
    c := GetCounter()
    c.Inc("page_view")
    c.Inc("page_view")
    fmt.Println(c.v["page_view"]) // 2
}`,
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '同步使用规范',
          dos: [
            '在 `mu.Lock()` 后立即用 `defer mu.Unlock()` 防止忘记解锁。',
            '用 `sync.Once` 做昂贵的单例初始化——安全、惯用且懒加载。',
            '用 `go run -race` 在上线前捕获数据竞争问题。',
          ],
          donts: [
            '不要复制 `sync.Mutex`——始终通过指针传递或将其嵌入结构体。',
            '不要在持有锁的情况下执行 I/O 或网络请求——这会扼杀并发性能。',
            '写密集型场景不要用 `sync.Map`——带 Mutex 的普通 map 更快。',
          ],
        },
      },
    ],
  },
};
