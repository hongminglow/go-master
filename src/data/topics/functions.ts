import type { ContentNode } from '../types';

export const functionsEn: ContentNode = {
  id: 'functions',
  name: 'Functions in Go',
  categoryId: 'basics',
  tags: ['functions', 'multiple return', 'named return', 'variadic', 'defer', 'closures', 'first-class functions', 'beginner', 'intermediate'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Functions are First-Class Citizens',
          paragraphs: [
            'In Go, functions are first-class values. You can assign them to variables, pass them as arguments, and return them from other functions. This unlocks powerful patterns like closures and higher-order functions.',
            'One of Go\'s most distinctive features is multiple return values — a clean, idiomatic alternative to exceptions or out-parameters.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'functions.go',
          language: 'go',
          code: `package main

import (
    "errors"
    "fmt"
)

// Multiple return values — idiomatic Go for error handling
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// Named return values — useful for documenting what is returned
func minMax(nums []int) (min, max int) {
    min, max = nums[0], nums[0]
    for _, n := range nums {
        if n < min { min = n }
        if n > max { max = n }
    }
    return // "naked return" uses named vars
}

// Variadic function — accepts any number of ints
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

// Closure — captures its surrounding scope
func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("%.4f\\n", result)
    }

    fmt.Println(minMax([]int{3, 1, 7, 2, 9})) // 1 9

    fmt.Println(sum(1, 2, 3, 4, 5)) // 15

    next := counter()
    fmt.Println(next(), next(), next()) // 1 2 3
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'defer — Schedule Cleanup Code',
          message: '`defer` pushes a function call onto a stack that executes when the surrounding function returns. It\'s perfect for cleanup: closing files, releasing locks, or logging. Multiple defers execute in LIFO (last-in, first-out) order.',
        },
      },
      {
        type: 'code',
        data: {
          filename: 'defer_example.go',
          language: 'go',
          code: `func processFile(path string) error {
    f, err := os.Open(path)
    if err != nil {
        return err
    }
    defer f.Close() // Called when processFile returns — no matter what

    // ... do work with f
    return nil
}`,
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Function Design Guidelines',
          dos: [
            'Return errors as the last return value by convention.',
            'Name your boolean parameters — wrap them in a descriptive struct or use named args for clarity.',
            'Use `defer` for any resource that needs guaranteed cleanup.',
            'Keep functions short and single-purpose (ideally < 40 lines).',
          ],
          donts: [
            'Don\'t use naked returns in long functions — it hurts readability.',
            'Don\'t ignore returned errors with just `_` in production code.',
            'Don\'t use variadic `...interface{}` for performance-sensitive paths — it boxes values onto the heap.',
          ],
        },
      },
    ],
  },
};

export const functionsZh: ContentNode = {
  id: 'functions',
  name: 'Go 函数详解',
  categoryId: 'basics',
  tags: ['函数', '多返回值', '命名返回', '可变参数', 'defer', '闭包', '一等公民', '入门', '中级'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '函数是一等公民',
          paragraphs: [
            '在 Go 中，函数是一等公民（first-class value）。你可以将函数赋给变量、作为参数传递，或从其他函数返回。这种特性解锁了闭包、高阶函数等强大的编程范式。',
            'Go 最具特色的设计之一是多返回值——这是代替异常或输出参数的、简洁而惯用的错误处理方式。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'functions.go',
          language: 'go',
          code: `package main

import (
    "errors"
    "fmt"
)

// 多返回值 — Go 惯用的错误处理方式
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("除数不能为零")
    }
    return a / b, nil
}

// 命名返回值 — 有助于文档化返回内容
func minMax(nums []int) (min, max int) {
    min, max = nums[0], nums[0]
    for _, n := range nums {
        if n < min { min = n }
        if n > max { max = n }
    }
    return // 裸返回，使用命名变量
}

// 可变参数函数 — 接收任意数量的 int
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

// 闭包 — 捕获外部作用域的变量
func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("错误:", err)
    } else {
        fmt.Printf("%.4f\\n", result)
    }

    fmt.Println(minMax([]int{3, 1, 7, 2, 9})) // 1 9
    fmt.Println(sum(1, 2, 3, 4, 5))           // 15

    next := counter()
    fmt.Println(next(), next(), next()) // 1 2 3
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'defer — 预约清理代码',
          message: '`defer` 将一个函数调用压入栈中，当外层函数返回时执行。非常适合清理工作：关闭文件、释放锁或日志记录。多个 defer 按照 LIFO（后进先出）的顺序执行。',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '函数设计规范',
          dos: [
            '按惯例将 error 作为最后一个返回值。',
            '为布尔参数命名，或用结构体包装，提高可读性。',
            '对任何需要释放的资源使用 `defer` 保证清理。',
            '保持函数简短且单一职责（理想情况下 < 40 行）。',
          ],
          donts: [
            '不要在长函数中使用裸返回——这会严重损害可读性。',
            '不要在生产代码中用 `_` 忽略返回的错误。',
            '在性能敏感的路径上，不要用 `...interface{}` 可变参——它会将值装箱到堆上。',
          ],
        },
      },
    ],
  },
};
