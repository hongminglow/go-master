import type { ContentNode } from '../types';

export const slicesMapsEn: ContentNode = {
  id: 'slices-maps',
  name: 'Slices & Maps Deep Dive',
  categoryId: 'basics',
  tags: ['slices', 'maps', 'append', 'make', 'copy', 'range', 'delete', 'underlying array', 'capacity', 'length', 'intermediate'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Slices: Dynamic Windows on Arrays',
          paragraphs: [
            'A slice is a three-field descriptor: a pointer to an underlying array, a length, and a capacity. Slices are not arrays — they are lightweight views. Multiple slices can share the same underlying array, which leads to tricky aliasing bugs if you\'re not careful.',
            'Maps are Go\'s built-in key-value hash table. They are reference types — passing a map to a function shares the same underlying hash table.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'slices.go',
          language: 'go',
          code: `package main

import "fmt"

func main() {
    // --- SLICES ---
    // make([]T, len, cap) — allocate with known capacity
    s := make([]int, 0, 5)
    s = append(s, 1, 2, 3)
    fmt.Println(len(s), cap(s)) // 3 5

    // Slicing a slice shares the underlying array!
    a := []int{1, 2, 3, 4, 5}
    b := a[1:3] // [2, 3] — shares memory with a
    b[0] = 99
    fmt.Println(a) // [1 99 3 4 5] — a is modified!

    // Use copy() to make a true independent copy
    c := make([]int, len(b))
    copy(c, b)
    c[0] = 0
    fmt.Println(a) // [1 99 3 4 5] — a is untouched

    // --- MAPS ---
    m := map[string]int{
        "Alice": 90,
        "Bob":   85,
    }

    // Comma-ok idiom to check existence
    score, ok := m["Charlie"]
    fmt.Println(score, ok) // 0 false

    // Iterate map (order is random!)
    for name, s := range m {
        fmt.Printf("%s: %d\\n", name, s)
    }

    // Delete a key
    delete(m, "Bob")
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: 'Concurrent Map Access = Panic',
          message: 'Maps are NOT safe for concurrent read/write. Accessing a map from multiple goroutines without synchronization causes a fatal panic. Use `sync.RWMutex` or `sync.Map` for concurrent use cases.',
        },
      },
      {
        type: 'table',
        data: {
          title: 'Slice vs Array vs Map — Quick Reference',
          headers: ['Feature', 'Array', 'Slice', 'Map'],
          rows: [
            ['Fixed size', '✅ Yes', '❌ Dynamic', '❌ Dynamic'],
            ['Zero value', 'Zeroed array', '`nil`', '`nil`'],
            ['Reference type', '❌ Value copied', '✅ Shares array', '✅ Shared hash table'],
            ['Ordered', '✅ By index', '✅ By index', '❌ Random'],
            ['Key type', 'int (index)', 'int (index)', 'Any comparable'],
          ],
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Slices & Maps Best Practices',
          dos: [
            'Pre-allocate slices with `make([]T, 0, n)` when you know the size to avoid repeated reallocations.',
            'Use `copy()` to create independent slice copies to prevent aliasing bugs.',
            'Always check map key existence with the comma-ok idiom.',
            'Use `sync.Map` or a mutex when sharing maps across goroutines.',
          ],
          donts: [
            'Don\'t assume sub-slices are independent — they share the underlying array.',
            'Don\'t range over a map expecting consistent ordering — it\'s randomized intentionally.',
            'Don\'t use a map as a set without the comma-ok check — missing keys return zero values, not errors.',
          ],
        },
      },
    ],
  },
};

export const slicesMapsZh: ContentNode = {
  id: 'slices-maps',
  name: 'Slices 与 Maps 深度剖析',
  categoryId: 'basics',
  tags: ['切片', '映射', 'append', 'make', 'copy', 'range', 'delete', '底层数组', '容量', '长度', '中级'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Slice：数组上的动态视口',
          paragraphs: [
            'Slice（切片）是一个三字段描述符：底层数组的指针、长度（length）和容量（capacity）。Slice 不是数组——它们是轻量级视图。多个切片可以共享同一个底层数组，稍有不慎就会产生棘手的别名 bug。',
            'Map 是 Go 内置的键值哈希表。它是引用类型——将 map 传递给函数时，共享的是同一个底层哈希表。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'slices.go',
          language: 'go',
          code: `package main

import "fmt"

func main() {
    // --- 切片 (SLICES) ---
    // make([]T, 长度, 容量) — 预分配已知容量
    s := make([]int, 0, 5)
    s = append(s, 1, 2, 3)
    fmt.Println(len(s), cap(s)) // 3 5

    // 对切片进行切片，会共享底层数组！
    a := []int{1, 2, 3, 4, 5}
    b := a[1:3] // [2, 3] — 与 a 共享内存
    b[0] = 99
    fmt.Println(a) // [1 99 3 4 5] — a 被修改了！

    // 使用 copy() 创建真正独立的副本
    c := make([]int, len(b))
    copy(c, b)
    c[0] = 0
    fmt.Println(a) // [1 99 3 4 5] — a 未受影响

    // --- 映射 (MAPS) ---
    m := map[string]int{
        "小明": 90,
        "小红": 85,
    }

    // comma-ok 惯用法检查键是否存在
    score, ok := m["小刚"]
    fmt.Println(score, ok) // 0 false

    // 遍历 map（顺序是随机的！）
    for name, s := range m {
        fmt.Printf("%s: %d\\n", name, s)
    }

    // 删除键
    delete(m, "小红")
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: '并发访问 Map = Panic（崩溃）',
          message: 'Map 对并发读写不安全。不加同步地从多个 goroutine 访问同一个 map，会导致致命 panic。并发场景请使用 `sync.RWMutex` 或 `sync.Map`。',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '切片与映射最佳实践',
          dos: [
            '已知大小时，用 `make([]T, 0, n)` 预分配切片，避免反复扩容。',
            '用 `copy()` 创建独立副本，防止切片别名 bug。',
            '始终用 comma-ok 惯用法检查 map 中键是否存在。',
            '跨 goroutine 共享 map 时，使用 `sync.Map` 或互斥锁。',
          ],
          donts: [
            '不要以为子切片是独立的——它们共享底层数组。',
            '不要期望遍历 map 时顺序一致——顺序是刻意随机化的。',
            '不要不做 comma-ok 检查就把 map 当集合用——缺失键会返回零值而非错误。',
          ],
        },
      },
    ],
  },
};
