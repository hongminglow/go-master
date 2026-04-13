import type { ContentNode } from '../types';

export const forRangeTrapEn: ContentNode = {
  id: 'for-range-trap',
  name: 'The for-range Loop Trap',
  categoryId: 'advanced',
  tags: ['for range', 'loop variable', 'closure', 'goroutine', 'variable capture', 'trap', 'bug', 'go 1.22', 'pointer', 'gotcha', 'advanced'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'The Most Common Go Concurrency Bug',
          paragraphs: [
            'Before Go 1.22, the `for range` loop reused the same loop variable per iteration. This caused a classic, extremely common bug when launching goroutines or storing pointers inside a loop — every goroutine would end up capturing the same variable, seeing only the last value.',
            'Go 1.22 (released February 2024) fixed this by making each iteration create a new independent variable. But understanding WHY this bug exists is essential — millions of lines of code before Go 1.22 are affected, and you\'ll still encounter it in tutorials, blog posts, and legacy codebases.',
          ],
        },
      },
      {
        type: 'comparison',
        data: {
          title: 'The Classic Goroutine Capture Bug',
          before: {
            title: '❌ Pre-Go 1.22 Bug',
            language: 'go',
            code: `// ALL goroutines print the SAME value (last i)
// because they share one 'i' variable on the stack
for i := 0; i < 5; i++ {
    go func() {
        fmt.Println(i) // captures &i, not the value
    }()
}
// Likely output: 5 5 5 5 5`,
          },
          after: {
            title: '✅ Fixed (works in all Go versions)',
            language: 'go',
            code: `// Pass the value as an argument — creates a copy per call
for i := 0; i < 5; i++ {
    go func(n int) {
        fmt.Println(n) // n is a new copy per goroutine
    }(i)
}
// Output: 0 1 2 3 4 (in some order)`,
          },
        },
      },
      {
        type: 'code',
        data: {
          filename: 'range_pointers.go',
          language: 'go',
          code: `// ❌ The pointer-in-loop trap (still relevant)
type User struct{ Name string }
users := []User{{"Alice"}, {"Bob"}, {"Charlie"}}

// Building a slice of pointers — all point to the SAME loop variable
ptrs := make([]*User, len(users))
for i, u := range users {
    ptrs[i] = &u // &u is always the same address — the loop variable!
}
fmt.Println(ptrs[0].Name) // "Charlie" — not "Alice"!

// ✅ Fix: take the address of the slice element directly
for i := range users {
    ptrs[i] = &users[i] // address of the actual slice element
}
fmt.Println(ptrs[0].Name) // "Alice" — correct!`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'Go 1.22 Fixed the Loop Variable Semantics',
          message: 'Since Go 1.22, each loop iteration creates a new, distinct variable. This means the goroutine capture bug above is automatically fixed for code compiled with Go 1.22+. However, the pointer-to-loop-variable pattern in the second example is STILL a trap in all Go versions when using the value copy `u`, not `&users[i]`.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'for-range Loop Best Practices',
          dos: [
            'Pass loop variables as function arguments when launching goroutines inside a loop.',
            'Take element addresses directly from the slice (`&slice[i]`), never from the loop value copy.',
            'Upgrade to Go 1.22+ to get automatic per-iteration variable semantics.',
            'Use `go vet` and `staticcheck` which flag this pattern even in pre-1.22 code.',
          ],
          donts: [
            'Don\'t capture a loop variable in a closure without passing it as an argument (pre-Go 1.22).',
            'Don\'t take the address of the loop value variable (`&v`) — take from the collection directly.',
            'Don\'t assume goroutines launched in a loop run before the loop ends — by then, the variable has changed.',
          ],
        },
      },
    ],
  },
};

export const forRangeTrapZh: ContentNode = {
  id: 'for-range-trap',
  name: 'for-range 循环变量陷阱',
  categoryId: 'advanced',
  tags: ['for range', '循环变量', '闭包', 'goroutine', '变量捕获', '陷阱', 'bug', 'go 1.22', '指针', '高级'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go 最常见的并发 Bug',
          paragraphs: [
            'Go 1.22 之前，`for range` 循环在每次迭代时复用同一个循环变量。这导致在循环内启动 goroutine 或存储指针时，会产生一个经典且极其常见的 bug——每个 goroutine 最终都会捕获同一个变量，只能看到最后一个值。',
            'Go 1.22（2024 年 2 月发布）修复了这个问题，让每次迭代创建独立的新变量。但理解这个 bug 的根源至关重要——Go 1.22 之前数百万行代码都受此影响，你在教程、博客和历史代码库中仍会遭遇它。',
          ],
        },
      },
      {
        type: 'comparison',
        data: {
          title: '经典的 Goroutine 变量捕获 Bug',
          before: {
            title: '❌ Go 1.22 之前的 Bug',
            language: 'go',
            code: `// 所有 goroutine 打印相同的值（最后一个 i）
// 因为它们共享了同一个栈上的 'i' 变量
for i := 0; i < 5; i++ {
    go func() {
        fmt.Println(i) // 捕获了 &i，而非值
    }()
}
// 可能输出: 5 5 5 5 5`,
          },
          after: {
            title: '✅ 修复方式（所有Go版本均有效）',
            language: 'go',
            code: `// 将值作为参数传入——每次调用创建一份副本
for i := 0; i < 5; i++ {
    go func(n int) {
        fmt.Println(n) // n 是每个 goroutine 的独立副本
    }(i)
}
// 输出: 0 1 2 3 4（顺序不定）`,
          },
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'for-range 循环最佳实践',
          dos: [
            '在循环内启动 goroutine 时，将循环变量作为函数参数传入。',
            '直接取切片元素的地址（`&slice[i]`），而非循环值变量的地址。',
            '升级到 Go 1.22+ 以自动获得每次迭代独立变量的语义。',
            '使用 `go vet` 和 `staticcheck`，它们会标记出此类模式（即使在 1.22 之前的代码中）。',
          ],
          donts: [
            '（Go 1.22 之前）不要在闭包中不传值地直接捕获循环变量。',
            '不要取循环值变量的地址（`&v`）——直接从原集合取地址。',
            '不要假设循环内启动的 goroutine 会在循环结束前运行——届时变量早已改变。',
          ],
        },
      },
    ],
  },
};
