import type { ContentNode } from '../types';

export const performanceEn: ContentNode = {
  id: 'performance-tips',
  name: 'Performance & Memory Tips',
  categoryId: 'advanced',
  tags: ['performance', 'memory', 'profiling', 'pprof', 'escape analysis', 'heap', 'stack', 'gc', 'garbage collector', 'allocation', 'benchmark', 'advanced'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go Performance: Measure First, Optimise Second',
          paragraphs: [
            'Go is fast by default — a simple web server can handle tens of thousands of requests per second without a single line of tuning. But understanding how Go\'s memory model, garbage collector, and escape analysis work unlocks the next level of performance.',
            'The golden rule: profile before you optimise. Go has world-class profiling built in via `net/http/pprof` and the `go tool pprof` CLI. Optimising without data is just guesswork.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'escape_analysis.go',
          language: 'go',
          code: `package main

// STACK allocation — fast, no GC pressure
// The compiler keeps this on the stack because it doesn't escape
func stackAlloc() int {
    x := 42
    return x // value copied out — x stays on stack
}

// HEAP allocation — triggers GC
// The pointer escapes the function, so Go moves it to the heap
func heapAlloc() *int {
    x := 42
    return &x // x escapes to heap via pointer
}

// Check allocations with: go build -gcflags="-m" ./...
// Output will say: "x escapes to heap" or "does not escape"

// Pre-allocate slices to avoid repeated heap resizing
func buildSlice(n int) []int {
    s := make([]int, 0, n) // capacity pre-set — no realloc needed
    for i := range n {
        s = append(s, i)
    }
    return s
}

// Reuse buffers with sync.Pool to reduce allocator pressure
import "sync"

var pool = sync.Pool{
    New: func() any { return make([]byte, 0, 4096) },
}

func processRequest(data []byte) {
    buf := pool.Get().([]byte)
    defer pool.Put(buf[:0]) // reset and return to pool
    buf = append(buf, data...)
    // ... process
}`,
        },
      },
      {
        type: 'table',
        data: {
          title: 'String Concatenation Performance Comparison',
          headers: ['Method', 'Allocations', 'Use When'],
          rows: [
            ['`s += "x"` in loop', 'O(n) — each concat allocates', 'Never in loops'],
            ['`strings.Builder`', 'O(1) amortized', 'Building strings incrementally (recommended)'],
            ['`fmt.Sprintf`', '1+ alloc, slower', 'Formatting with mixed types, readability matters'],
            ['`strings.Join`', '1 alloc', 'Known slice of strings, cleanest option'],
            ['`bytes.Buffer`', '1+ alloc', 'Mixed byte/string writes, binary protocols'],
          ],
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'Profile with pprof',
          message: 'Add `import _ "net/http/pprof"` to your main package, then hit `http://localhost:6060/debug/pprof/` while your server runs. Use `go tool pprof http://localhost:6060/debug/pprof/heap` to see where memory is being allocated. This is the fastest way to find real bottlenecks.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Performance Optimisation Guidelines',
          dos: [
            'Use `strings.Builder` for string concatenation in any loop.',
            'Pre-allocate slices and maps with known sizes using `make([], n)` / `make(map, n)`.',
            'Use `sync.Pool` to reuse short-lived, frequently allocated objects.',
            'Run `go tool pprof` on CPU and heap profiles before any optimisation.',
          ],
          donts: [
            'Don\'t optimise code without profiling data — you will almost always optimise the wrong thing.',
            'Don\'t return pointers unnecessarily — stack allocations are free, heap allocations have GC cost.',
            'Don\'t use `interface{}` in hot paths — reflection and boxing have measurable overhead.',
          ],
        },
      },
    ],
  },
};

export const performanceZh: ContentNode = {
  id: 'performance-tips',
  name: '性能与内存优化技巧',
  categoryId: 'advanced',
  tags: ['性能', '内存', '性能分析', 'pprof', '逃逸分析', '堆', '栈', '垃圾收集', 'gc', '内存分配', '基准测试', '高级'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go 性能：先测量，再优化',
          paragraphs: [
            'Go 默认就很快——一个简单的 HTTP 服务器无需任何调优即可每秒处理数万个请求。但理解 Go 的内存模型、垃圾收集器和逃逸分析的工作方式，能让你开启下一层次的性能优化。',
            '黄金法则：先 profiling，再优化。Go 通过 `net/http/pprof` 和 `go tool pprof` CLI 内置了世界级的性能分析工具。没有数据支撑的优化不过是盲目猜测。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'escape_analysis.go',
          language: 'go',
          code: `package main

// 栈分配 — 快速，无 GC 压力
// 编译器判断 x 不逃逸，将其保留在栈上
func stackAlloc() int {
    x := 42
    return x // 值被拷贝出去 — x 留在栈上
}

// 堆分配 — 触发 GC
// 指针逃逸出函数，Go 将其移至堆
func heapAlloc() *int {
    x := 42
    return &x // x 通过指针逃逸到堆
}

// 用以下命令检查分配: go build -gcflags="-m" ./...
// 输出会显示: "x escapes to heap" 或 "does not escape"

// 预分配切片，避免反复堆扩容
func buildSlice(n int) []int {
    s := make([]int, 0, n) // 预设容量——无需重新分配
    for i := range n {
        s = append(s, i)
    }
    return s
}`,
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '性能优化规范',
          dos: [
            '在任何循环中使用 `strings.Builder` 进行字符串拼接。',
            '对已知大小的切片和 map 用 `make([], n)` / `make(map, n)` 预分配。',
            '用 `sync.Pool` 复用短生命周期、频繁分配的对象，减少分配器压力。',
            '在任何优化之前先运行 `go tool pprof` 分析 CPU 和堆内存。',
          ],
          donts: [
            '不要在没有性能分析数据的情况下优化——你几乎总会优化错地方。',
            '不要无谓地返回指针——栈分配是免费的，堆分配有 GC 成本。',
            '不要在热路径中使用 `interface{}`——反射和装箱（boxing）有可测量的性能开销。',
          ],
        },
      },
    ],
  },
};
