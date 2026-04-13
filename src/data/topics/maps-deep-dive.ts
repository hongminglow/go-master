import type { ContentNode } from '../types';

export const mapsDeepDiveEn: ContentNode = {
  id: 'maps-deep-dive',
  name: 'Maps: Gotchas & Internals',
  categoryId: 'advanced',
  tags: ['map', 'concurrent map', 'sync.Map', 'race condition', 'zero value', 'struct value trap', 'hash map', 'delete', 'nil map', 'runtime panic', 'intermediate', 'advanced', 'gotcha'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Maps Look Simple — They Are Not',
          paragraphs: [
            'Go\'s built-in `map` is a hash map backed by a sophisticated runtime implementation. While easy to use in the happy path, maps have several well-known traps: concurrent write panics, nil map panics, the struct-value mutation trap, and the non-deterministic iteration order that catches many developers off guard.',
            'Understanding these gotchas is essential for writing correct, production-ready Go. One of Go\'s most infamous runtime panics — "concurrent map read and map write" — is caused almost entirely by not protecting map access with a mutex or using `sync.Map`.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'maps_gotchas.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "sync"
)

func main() {
    // --- Gotcha 1: nil map reads OK, writes PANIC ---
    var m map[string]int     // nil map
    fmt.Println(m["key"])   // ✅ returns zero value: 0
    // m["key"] = 1          // ❌ panic: assignment to entry in nil map

    // --- Gotcha 2: zero value idiom (safe pattern) ---
    counts := make(map[string]int)
    counts["go"]++          // ✅ no need to check if key exists first!
    counts["go"]++
    fmt.Println(counts["go"]) // 2

    // --- Gotcha 3: struct VALUE trap ---
    type Point struct{ X, Y int }
    points := map[string]Point{"origin": {X: 0, Y: 0}}
    // points["origin"].X = 10  // ❌ cannot assign to struct field in map

    // ✅ Fix 1: read, modify, write back
    p := points["origin"]
    p.X = 10
    points["origin"] = p

    // ✅ Fix 2: store pointers instead of values
    pointersMap := map[string]*Point{"origin": {X: 0, Y: 0}}
    pointersMap["origin"].X = 10 // ✅ works!

    // --- Gotcha 4: map iteration is NOT deterministic ---
    scores := map[string]int{"Alice": 90, "Bob": 85, "Charlie": 95}
    for name, score := range scores {
        fmt.Printf("%s: %d\\n", name, score) // different order each run!
    }

    // --- Gotcha 5: concurrent map access = RACE CONDITION ---
    // ❌ NEVER do this from multiple goroutines without protection:
    // go func() { m["key"] = 1 }()
    // go func() { _ = m["key"] }()

    // ✅ Fix: use sync.RWMutex or sync.Map for concurrent access
    var mu sync.RWMutex
    safeMap := make(map[string]int)

    // Write
    mu.Lock()
    safeMap["key"] = 42
    mu.Unlock()

    // Read
    mu.RLock()
    val := safeMap["key"]
    mu.RUnlock()
    fmt.Println(val)
}`,
        },
      },
      {
        type: 'table',
        data: {
          title: 'map vs sync.Map: When to Use Which',
          headers: ['Scenario', 'Use This', 'Why'],
          rows: [
            ['Single-goroutine access', '`map`', 'Zero overhead, direct hash map access.'],
            ['Concurrent reads only', '`map` + `sync.RWMutex`', 'Multiple readers can hold RLock simultaneously.'],
            ['Few writes, many reads', '`sync.Map`', 'Optimised for stable key sets, excellent read performance.'],
            ['Frequent writes from many goroutines', '`map` + `sync.Mutex`', '`sync.Map` has overhead for write-heavy workloads.'],
            ['Keys change rarely after initial load', '`sync.Map`', 'Internally caches a read-only copy — reads are lock-free.'],
          ],
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: 'The Race Detector Will Catch Concurrent Map Access',
          message: 'Run your tests with `go test -race ./...` — Go\'s built-in race detector will report "concurrent map read and map write" immediately. The Go runtime also detects this at runtime and panics with a clear message, but only in Go 1.6+. Always run `-race` in CI.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Map Best Practices',
          dos: [
            'Always use `make(map[K]V)` or a map literal before writing — never write to a nil map.',
            'Use the two-value receive `v, ok := m[key]` to distinguish zero values from missing keys.',
            'Store pointers (`map[string]*MyStruct`) if you need to mutate struct fields in place.',
            'Protect all map access across goroutines with `sync.RWMutex` or switch to `sync.Map`.',
            'Always run tests with `go test -race` to detect concurrent map bugs.',
          ],
          donts: [
            'Don\'t assume map iteration order — it is intentionally randomised on each run.',
            'Don\'t directly modify struct fields in a map value — copy out, modify, copy back.',
            'Don\'t share a plain `map` between goroutines without synchronisation — it will panic under load.',
          ],
        },
      },
    ],
  },
};

export const mapsDeepDiveZh: ContentNode = {
  id: 'maps-deep-dive',
  name: 'Map：深坑与内部原理',
  categoryId: 'advanced',
  tags: ['map', '并发map', 'sync.Map', '竞态条件', '零值', '结构体值陷阱', '哈希表', 'delete', 'nil map', 'runtime panic', '中级', '高级', '易错点'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Map 看起来简单，实则暗藏玄机',
          paragraphs: [
            'Go 内置的 `map` 是一个由复杂运行时实现支撑的哈希表。虽然在正常路径下使用起来十分简单，但 map 有几个广为人知的陷阱：并发写入 panic、nil map panic、结构体值修改陷阱，以及让许多开发者措手不及的非确定性迭代顺序。',
            '理解这些易错点对编写正确的生产级 Go 代码至关重要。Go 最臭名昭著的运行时 panic 之一——"concurrent map read and map write"——几乎完全是由于没有用互斥锁保护 map 访问，或者没有改用 `sync.Map` 造成的。',
          ],
        },
      },
      {
        type: 'table',
        data: {
          title: 'map vs sync.Map：何时用哪个',
          headers: ['场景', '选择', '原因'],
          rows: [
            ['单 goroutine 访问', '`map`', '零开销，直接哈希表访问。'],
            ['仅并发读', '`map` + `sync.RWMutex`', '多个读者可同时持有 RLock。'],
            ['少写多读', '`sync.Map`', '为稳定键集优化，读性能出色。'],
            ['多 goroutine 频繁写', '`map` + `sync.Mutex`', '写密集场景下 `sync.Map` 有额外开销。'],
            ['初始加载后键很少变动', '`sync.Map`', '内部缓存只读副本，读取无锁。'],
          ],
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: '竞态检测器会揭露并发 Map 访问问题',
          message: '用 `go test -race ./...` 运行测试——Go 内置的竞态检测器会立即报告"concurrent map read and map write"。Go 1.6+ 的运行时也会在检测到此类行为时 panic 并给出明确信息。务必在 CI 中开启 `-race`。',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Map 最佳实践',
          dos: [
            '写入前始终用 `make(map[K]V)` 或 map 字面量初始化——永不向 nil map 写入。',
            '用双值接收 `v, ok := m[key]` 来区分零值与键不存在的情况。',
            '若需就地修改结构体字段，改用指针存储（`map[string]*MyStruct`）。',
            '跨 goroutine 访问 map 时，始终用 `sync.RWMutex` 保护，或改用 `sync.Map`。',
            '始终用 `go test -race` 运行测试，以检测并发 map 的 bug。',
          ],
          donts: [
            '不要假定 map 的迭代顺序——Go 每次运行都会故意将其随机化。',
            '不要直接修改 map 中结构体值的字段——取出、修改、存回。',
            '不要在多个 goroutine 之间共享未加保护的普通 `map`——高并发下必然 panic。',
          ],
        },
      },
    ],
  },
};
