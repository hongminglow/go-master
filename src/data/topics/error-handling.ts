import type { ContentNode } from '../types';

export const errorHandlingEn: ContentNode = {
  id: 'error-handling',
  name: 'Error Handling Patterns',
  categoryId: 'basics',
  tags: ['errors', 'error handling', 'wrapped errors', 'errors.Is', 'errors.As', 'fmt.Errorf', 'panic', 'recover', 'sentinel errors', 'custom error', 'intermediate'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Errors are Values',
          paragraphs: [
            'Go takes a radically different approach to error handling compared to Java/Python exceptions. Errors are plain values returned from functions — you handle them explicitly at every call site. This makes error paths visible and intentional.',
            'Since Go 1.13, the standard library introduced error wrapping with `fmt.Errorf("context: %w", err)`, and `errors.Is` / `errors.As` for inspecting wrapped error chains.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'errors.go',
          language: 'go',
          code: `package main

import (
    "errors"
    "fmt"
)

// Sentinel error — a well-known error value to compare against
var ErrNotFound = errors.New("not found")

// Custom error type — carries extra context
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on '%s': %s", e.Field, e.Message)
}

func findUser(id int) error {
    if id <= 0 {
        return &ValidationError{Field: "id", Message: "must be positive"}
    }
    if id > 100 {
        return fmt.Errorf("findUser: %w", ErrNotFound)
    }
    return nil
}

func main() {
    err := findUser(999)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("Handle not-found case")
    }

    err2 := findUser(-1)
    var valErr *ValidationError
    if errors.As(err2, &valErr) {
        fmt.Printf("Bad field: %s\\n", valErr.Field)
    }
}`,
        },
      },
      {
        type: 'comparison',
        data: {
          title: 'Panic vs Error Return',
          before: {
            title: '🚫 Panic (rare, for bugs)',
            language: 'go',
            code: `func mustParse(s string) int {
    n, err := strconv.Atoi(s)
    if err != nil {
        panic(err) // Only for truly unrecoverable bugs
    }
    return n
}`,
          },
          after: {
            title: '✅ Error Return (normal)',
            language: 'go',
            code: `func parse(s string) (int, error) {
    n, err := strconv.Atoi(s)
    if err != nil {
        return 0, fmt.Errorf("parse %q: %w", s, err)
    }
    return n, nil
}`,
          },
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: 'Never Ignore Errors with _',
          message: 'Using `_ = someFunc()` silently swallows errors in production. Every error should be handled, logged, or explicitly documented as intentionally ignored with a comment explaining why.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Error Handling Best Practices',
          dos: [
            'Wrap errors with context using `fmt.Errorf("op: %w", err)` to build meaningful error chains.',
            'Use `errors.Is` for comparing sentinel errors and `errors.As` for type-specific handling.',
            'Use `panic` only for unrecoverable programming bugs, not business logic errors.',
            'Define sentinel errors with `var ErrXxx = errors.New(...)` for well-known failure modes.',
          ],
          donts: [
            'Don\'t bury errors with just `_` — handle them or explicitly document the ignore.',
            'Don\'t use panic/recover as a control flow mechanism — return errors instead.',
            'Don\'t include redundant phrasing like "error:" in error messages — callers add their own context.',
          ],
        },
      },
    ],
  },
};

export const errorHandlingZh: ContentNode = {
  id: 'error-handling',
  name: '错误处理模式',
  categoryId: 'basics',
  tags: ['错误', '错误处理', '错误包装', 'errors.Is', 'errors.As', 'fmt.Errorf', 'panic', 'recover', '哨兵错误', '自定义错误', '中级'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '错误即值',
          paragraphs: [
            '与 Java/Python 的异常机制相比，Go 对错误处理采取了截然不同的方式。错误就是普通的函数返回值——你需要在每个调用点显式处理它们。这让错误路径变得清晰且有意为之。',
            '从 Go 1.13 开始，标准库引入了错误包装机制 `fmt.Errorf("上下文: %w", err)`，以及用于检查错误链的 `errors.Is` 和 `errors.As`。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'errors.go',
          language: 'go',
          code: `package main

import (
    "errors"
    "fmt"
)

// 哨兵错误 — 用于比对的已知错误值
var ErrNotFound = errors.New("记录不存在")

// 自定义错误类型 — 携带额外上下文
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("字段 '%s' 验证失败: %s", e.Field, e.Message)
}

func findUser(id int) error {
    if id <= 0 {
        return &ValidationError{Field: "id", Message: "必须为正整数"}
    }
    if id > 100 {
        return fmt.Errorf("findUser: %w", ErrNotFound)
    }
    return nil
}

func main() {
    err := findUser(999)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("处理记录不存在的情况")
    }

    err2 := findUser(-1)
    var valErr *ValidationError
    if errors.As(err2, &valErr) {
        fmt.Printf("有问题的字段: %s\\n", valErr.Field)
    }
}`,
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '错误处理最佳实践',
          dos: [
            '用 `fmt.Errorf("操作: %w", err)` 包装错误，构建有意义的错误调用链。',
            '用 `errors.Is` 比对哨兵错误，用 `errors.As` 处理特定错误类型。',
            '`panic` 只用于无法恢复的编程 bug，而非业务逻辑错误。',
            '用 `var ErrXxx = errors.New(...)` 为已知失败场景定义哨兵错误。',
          ],
          donts: [
            '不要用 `_` 把错误直接丢弃——要处理它，或用注释明确记录为何忽略。',
            '不要把 panic/recover 当作控制流机制——请返回错误代替。',
            '不要在错误消息中包含冗余前缀如 "error:"——调用者会添加自己的上下文。',
          ],
        },
      },
    ],
  },
};
