import type { ContentNode } from '../types';

export const nilInterfaceTrapEn: ContentNode = {
  id: 'nil-interface-trap',
  name: 'The nil Interface Trap',
  categoryId: 'advanced',
  tags: ['nil', 'interface', 'nil interface', 'trap', 'bug', 'typed nil', 'gotcha', 'pointer', 'advanced', 'confusing'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go\'s Most Surprising Bug: The Non-nil nil',
          paragraphs: [
            'This is arguably Go\'s most confusing gotcha — even experienced Go developers get burned by it. An interface value is only `nil` when BOTH its type AND its value are nil. A pointer to a concrete type stored in an interface is NEVER nil, even if the pointer itself is nil.',
            'In other words: a nil `*MyError` stored in an `error` interface is NOT the same as a nil `error`. The interface has type information (`*MyError`), so it is not nil — even though dereferencing it would panic.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'nil_interface_trap.go',
          language: 'go',
          code: `package main

import "fmt"

type MyError struct{ msg string }
func (e *MyError) Error() string { return e.msg }

// ❌ TRAP: returns a typed nil — caller's nil check fails!
func getError(fail bool) error {
    var err *MyError // nil pointer to MyError
    if fail {
        err = &MyError{"something went wrong"}
    }
    return err // wraps nil *MyError inside an error interface
    // interface = { type: *MyError, value: nil } — NOT nil!
}

// ✅ FIX: return untyped nil directly
func getErrorFixed(fail bool) error {
    if fail {
        return &MyError{"something went wrong"}
    }
    return nil // untyped nil — interface = { type: nil, value: nil } = truly nil
}

func main() {
    err := getError(false)
    if err != nil {
        // This branch IS reached — even though we expected no error!
        fmt.Println("BUG: unexpected error:", err) // prints: BUG: unexpected error: <nil>
    }

    err2 := getErrorFixed(false)
    if err2 != nil {
        fmt.Println("This branch is NOT reached — correct!")
    }
    fmt.Println("All good!")
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: 'An Interface has Two Fields Internally',
          message: 'Internally, an interface value is a pair: `(type, value)`. It is only nil when BOTH are nil. A typed nil like `(*MyError)(nil)` stored in the `error` interface has a non-nil type field — so `err != nil` returns true, leading to completely unexpected behaviour.',
        },
      },
      {
        type: 'comparison',
        data: {
          title: 'Typed nil vs Untyped nil in an Interface',
          before: {
            title: '❌ Typed nil (interface is NOT nil)',
            language: 'go',
            code: `var p *MyError = nil
var err error = p
fmt.Println(err == nil) // false — TRAP!
// interface holds { type: *MyError, value: nil }`,
          },
          after: {
            title: '✅ Untyped nil (interface IS nil)',
            language: 'go',
            code: `var err error = nil
fmt.Println(err == nil) // true — correct!
// interface holds { type: nil, value: nil }`,
          },
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'nil Interface Guidelines',
          dos: [
            'Return untyped `nil` directly from functions with an `error` return type.',
            'If you must use a concrete error type, check the concrete value for nil BEFORE wrapping it in an interface.',
            'Use `errors.As(err, &target)` rather than direct type assertions when inspecting errors.',
          ],
          donts: [
            'Don\'t return a typed nil pointer as an interface value — it will NEVER satisfy `== nil`.',
            'Don\'t store a concrete nil pointer in an interface then check `if iface == nil` — it won\'t work.',
          ],
        },
      },
    ],
  },
};

export const nilInterfaceTrapZh: ContentNode = {
  id: 'nil-interface-trap',
  name: 'nil 接口陷阱',
  categoryId: 'advanced',
  tags: ['nil', '接口', 'nil接口', '陷阱', 'bug', '有类型nil', '指针', '高级', '令人困惑'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go 最令人惊讶的 Bug：非 nil 的 nil',
          paragraphs: [
            '这可能是 Go 最令人困惑的陷阱——即使是经验丰富的 Go 开发者也会中招。接口值只有在其类型和值同时为 nil 时，才是 nil。将一个具体类型的指针存入接口，即使指针本身为 nil，接口也绝不是 nil。',
            '换句话说：一个存入 `error` 接口的 nil `*MyError` 指针，并不等同于 nil `error`。接口持有类型信息（`*MyError`），所以它不是 nil——尽管解引用它会导致 panic。',
          ],
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: '接口内部有两个字段',
          message: '接口值内部是一个二元组：`(类型, 值)`。只有两者都为 nil 时，接口才是 nil。将 `(*MyError)(nil)` 存入 `error` 接口会导致其类型字段非 nil，使 `err != nil` 返回 true，产生完全预料之外的行为。',
        },
      },
      {
        type: 'comparison',
        data: {
          title: '有类型 nil vs 无类型 nil',
          before: {
            title: '❌ 有类型 nil（接口不是 nil）',
            language: 'go',
            code: `var p *MyError = nil
var err error = p
fmt.Println(err == nil) // false — 陷阱！
// 接口持有 { type: *MyError, value: nil }`,
          },
          after: {
            title: '✅ 无类型 nil（接口是 nil）',
            language: 'go',
            code: `var err error = nil
fmt.Println(err == nil) // true — 正确！
// 接口持有 { type: nil, value: nil }`,
          },
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'nil 接口使用规范',
          dos: [
            '从返回 `error` 类型的函数中直接返回无类型的 `nil`。',
            '如果必须使用具体错误类型，在将其包装进接口前先检查具体值是否为 nil。',
            '检查错误时使用 `errors.As(err, &target)` 而非直接的类型断言。',
          ],
          donts: [
            '不要将有类型的 nil 指针作为接口值返回——它永远无法满足 `== nil`。',
            '不要将具体的 nil 指针存入接口后，再用 `if iface == nil` 判断——这不会按预期工作。',
          ],
        },
      },
    ],
  },
};
