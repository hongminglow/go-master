import type { ContentNode } from '../types';

export const deferDeepDiveEn: ContentNode = {
  id: 'defer-deep-dive',
  name: 'Defer: Traps & Superpowers',
  categoryId: 'advanced',
  tags: ['defer', 'panic', 'recover', 'named return', 'LIFO', 'cleanup', 'trap', 'advanced', 'gotcha', 'stack'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'defer is More Powerful (and Trickier) Than It Looks',
          paragraphs: [
            '`defer` schedules a function call to run just before the surrounding function returns. It is Go\'s primary mechanism for cleanup — closing files, releasing locks, recovering from panics. But it has several non-obvious behaviours that trip up developers.',
            'The three key rules: (1) deferred arguments are evaluated IMMEDIATELY at the defer statement, not when the function runs. (2) Deferred functions run in LIFO (stack) order. (3) Deferred functions CAN modify named return values, which is both a superpower and a footgun.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'defer_traps.go',
          language: 'go',
          code: `package main

import "fmt"

// --- Trap 1: Arguments evaluated IMMEDIATELY ---
func trap1() {
    x := 1
    defer fmt.Println("deferred x =", x) // x is captured as 1 RIGHT NOW
    x = 100
    fmt.Println("current x =", x)
}
// Output:
// current x = 100
// deferred x = 1   ← NOT 100!

// --- Trap 2: LIFO order ---
func trap2() {
    defer fmt.Println("first")
    defer fmt.Println("second")
    defer fmt.Println("third")
}
// Output: third, second, first  (reverse order)

// --- Superpower: defer modifies named return values ---
func divide(a, b float64) (result float64, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("recovered panic: %v", r)
            result = 0
        }
    }()
    if b == 0 {
        panic("division by zero")
    }
    return a / b, nil
}

// --- Trap 3: defer in a loop —- DON'T do this ---
func leakyLoop(files []string) {
    for _, f := range files {
        // defer runs when the FUNCTION returns, NOT when the loop iteration ends
        // All files stay open until the entire function exits!
        // defer os.Open(f).Close()  // ❌ Wrong

        // ✅ Fix: wrap in a closure or helper function
        func(name string) {
            // f, _ := os.Open(name)
            // defer f.Close()  // now scoped to this inner function
            fmt.Println("processing", name)
        }(f)
    }
}

func main() {
    trap1()
    trap2()
    result, err := divide(10, 0)
    fmt.Println(result, err)
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'The Canonical panic/recover Pattern',
          message: '`recover()` only works when called DIRECTLY inside a deferred function. `defer recover()` does NOT work — the recover must be inside `defer func() { recover() }()`. A recovered panic does not propagate, but the current goroutine\'s remaining deferred functions still run.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'defer Best Practices',
          dos: [
            'Use `defer f.Close()` immediately after opening a resource — never rely on manual close calls.',
            'Use `defer mu.Unlock()` immediately after `mu.Lock()` — prevents deadlocks on early returns.',
            'Use named return values + defer for consistent cleanup and panic recovery in public APIs.',
            'Wrap loop bodies in an inner function when you need defer-per-iteration scoping.',
          ],
          donts: [
            'Don\'t `defer` inside a tight loop expecting the defer to run at loop end — it runs at function end.',
            'Don\'t rely on captured loop variables in deferred calls without passing them as arguments.',
            'Don\'t use `defer recover()` bare — wrap it in `defer func() { recover() }()`.',
          ],
        },
      },
    ],
  },
};

export const deferDeepDiveZh: ContentNode = {
  id: 'defer-deep-dive',
  name: 'Defer：陷阱与超能力',
  categoryId: 'advanced',
  tags: ['defer', 'panic', 'recover', '命名返回值', 'LIFO', '清理', '陷阱', '高级', '易错点', '栈'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'defer 比你想象的更强大（也更危险）',
          paragraphs: [
            '`defer` 会将函数调用推迟到外层函数即将返回时执行。它是 Go 进行资源清理的主要机制——关闭文件、释放锁、从 panic 中恢复。但它有几个不易察觉的行为，常常让开发者踩坑。',
            '三条核心规则：(1) 被 defer 的函数参数在 defer 语句处立即求值，而非在执行时。(2) defer 按 LIFO（栈）顺序执行。(3) defer 函数可以修改命名返回值——既是超能力，也是陷阱。',
          ],
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: '循环中使用 defer 的陷阱',
          message: '在循环中写 `defer f.Close()` 时，defer 是在整个函数返回时才运行，而非每次循环迭代结束时。如果循环处理大量文件，所有文件会保持打开直到函数退出，可能导致文件描述符耗尽。解决方案：将循环体封装成一个独立函数或命名函数。',
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'panic/recover 的标准模式',
          message: '`recover()` 只有在直接被 defer 的函数内部调用时才有效。`defer recover()` 不起作用——必须写成 `defer func() { recover() }()`。panic 被 recover 后不会继续传播，但当前 goroutine 剩余的 defer 函数仍会正常执行。',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'defer 最佳实践',
          dos: [
            '打开资源后立即 `defer f.Close()`——永远别靠手动关闭调用兜底。',
            '`mu.Lock()` 之后立即 `defer mu.Unlock()`——防止提前返回时死锁。',
            '结合命名返回值与 defer，用于公开 API 中的一致清理和 panic 恢复。',
            '需要每次迭代都执行 defer 时，将循环体包装为内部函数。',
          ],
          donts: [
            '不要在紧密循环中用 defer 期望每次迭代结束时触发——它在函数退出时才运行。',
            '不要在 defer 调用中依赖已捕获的循环变量——请将其作为参数传入。',
            '不要裸写 `defer recover()`——应写成 `defer func() { recover() }()`。',
          ],
        },
      },
    ],
  },
};
