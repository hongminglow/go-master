import type { ContentNode } from '../types';

export const genericsEn: ContentNode = {
  id: 'generics',
  name: 'Generics (Go 1.18+)',
  categoryId: 'advanced',
  tags: ['generics', 'type parameters', 'constraints', 'comparable', 'any', 'type inference', 'go 1.18', 'advanced', 'generic functions', 'generic types'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Generics: Write Code Once, Use for Any Type',
          paragraphs: [
            'Go 1.18 introduced generics — the most significant language change since Go 1.0. Generics allow you to write functions and data structures that work with any type without sacrificing type safety or resorting to `interface{}`.',
            'Generics are defined using type parameters in square brackets `[T any]`. A constraint defines what operations are allowed on a type parameter — `any` means no restrictions, `comparable` means the type supports `==`.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'generics.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "golang.org/x/exp/constraints"
)

// Generic function — works with any ordered type
func Min[T constraints.Ordered](a, b T) T {
    if a < b {
        return a
    }
    return b
}

// Generic data structure — a type-safe stack
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    var zero T
    if len(s.items) == 0 {
        return zero, false
    }
    last := len(s.items) - 1
    item := s.items[last]
    s.items = s.items[:last]
    return item, true
}

// Generic Map function — transform a slice
func Map[T, R any](slice []T, fn func(T) R) []R {
    result := make([]R, len(slice))
    for i, v := range slice {
        result[i] = fn(v)
    }
    return result
}

func main() {
    fmt.Println(Min(3, 7))       // 3
    fmt.Println(Min("abc", "xyz")) // abc

    var s Stack[int]
    s.Push(1)
    s.Push(2)
    fmt.Println(s.Pop()) // 2 true

    doubled := Map([]int{1, 2, 3}, func(n int) int { return n * 2 })
    fmt.Println(doubled) // [2 4 6]
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'When to Add Generics',
          message: 'Add generics when you find yourself writing the same logic for different types (e.g., a filter function for `[]int` and `[]string`). Don\'t add generics prematurely — Go encourages you to start concrete and generalize when the need arises.',
        },
      },
      {
        type: 'table',
        data: {
          title: 'Common Built-in Constraints',
          headers: ['Constraint', 'Package', 'Allows'],
          rows: [
            ['any', 'builtin', 'All types — no restrictions'],
            ['comparable', 'builtin', 'Types that support == and != (maps, sets)'],
            ['constraints.Ordered', 'golang.org/x/exp', 'Types that support <, >, <=, >= (numbers, strings)'],
            ['constraints.Integer', 'golang.org/x/exp', 'All integer types'],
            ['constraints.Float', 'golang.org/x/exp', 'All floating-point types'],
          ],
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Generics Guidelines',
          dos: [
            'Use generics for utility functions like `Map`, `Filter`, `Reduce` over collections.',
            'Define custom constraints by combining types with `|`: `type Number interface { int | float64 }`.',
            'Let Go infer type parameters when possible — you don\'t always need `Min[int](3, 7)`.',
          ],
          donts: [
            'Don\'t reach for generics first — prefer concrete types until the need for reuse is clear.',
            'Don\'t create overly complex constraint combinations — they hurt readability.',
            'Don\'t use generics for the single-type case; use a plain function instead.',
          ],
        },
      },
    ],
  },
};

export const genericsZh: ContentNode = {
  id: 'generics',
  name: '泛型 (Go 1.18+)',
  categoryId: 'advanced',
  tags: ['泛型', '类型参数', '约束', 'comparable', 'any', '类型推断', 'go 1.18', '高级', '泛型函数', '泛型类型'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '泛型：一次编写，多类型复用',
          paragraphs: [
            'Go 1.18 引入了泛型——这是自 Go 1.0 以来最重大的语言变更。泛型允许你编写适用于任何类型的函数和数据结构，而无需牺牲类型安全或借助 `interface{}`。',
            '泛型通过方括号中的类型参数 `[T any]` 来定义。约束（constraint）规定了类型参数可以进行哪些操作——`any` 表示无限制，`comparable` 表示该类型支持 `==` 操作。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'generics.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "golang.org/x/exp/constraints"
)

// 泛型函数 — 适用于任何有序类型
func Min[T constraints.Ordered](a, b T) T {
    if a < b {
        return a
    }
    return b
}

// 泛型数据结构 — 类型安全的栈
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    var zero T
    if len(s.items) == 0 {
        return zero, false
    }
    last := len(s.items) - 1
    item := s.items[last]
    s.items = s.items[:last]
    return item, true
}

// 泛型 Map 函数 — 转换切片
func Map[T, R any](slice []T, fn func(T) R) []R {
    result := make([]R, len(slice))
    for i, v := range slice {
        result[i] = fn(v)
    }
    return result
}

func main() {
    fmt.Println(Min(3, 7))         // 3
    fmt.Println(Min("abc", "xyz")) // abc

    var s Stack[int]
    s.Push(1)
    s.Push(2)
    fmt.Println(s.Pop()) // 2 true

    doubled := Map([]int{1, 2, 3}, func(n int) int { return n * 2 })
    fmt.Println(doubled) // [2 4 6]
}`,
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '泛型使用规范',
          dos: [
            '对集合的工具函数（如 `Map`、`Filter`、`Reduce`）使用泛型。',
            '使用 `|` 组合类型定义自定义约束：`type Number interface { int | float64 }`。',
            '尽量让 Go 推断类型参数——通常不需要显式写 `Min[int](3, 7)`。',
          ],
          donts: [
            '不要首先想到泛型——先用具体类型，等真正需要复用时再泛型化。',
            '不要创建过于复杂的约束组合——这会严重损害可读性。',
            '不要为单类型场景使用泛型；用普通函数即可。',
          ],
        },
      },
    ],
  },
};
