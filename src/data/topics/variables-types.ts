import type { ContentNode } from '../types';

export const variablesTypesEn: ContentNode = {
  id: 'variables-types',
  name: 'Variables & Types',
  categoryId: 'basics',
  tags: ['variables', 'types', 'var', 'const', 'short declaration', 'zero value', 'type inference', 'int', 'string', 'bool', 'float', 'beginner'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Variables in Go',
          paragraphs: [
            'Go is a statically typed language — every variable has a type determined at compile time. The compiler infers types when possible, but you can always be explicit.',
            'Go variables are always initialized. If you declare without a value, the variable gets its "zero value" — `0` for numbers, `false` for booleans, `""` for strings, `nil` for pointers, slices, and maps.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'variables.go',
          language: 'go',
          code: `package main

import "fmt"

func main() {
    // Long-form declaration
    var name string = "Gopher"

    // Type inferred by compiler
    var age = 25

    // Short declaration — only inside functions
    city := "Kuala Lumpur"

    // Multiple assignment
    x, y := 10, 20

    // Constants — cannot be reassigned
    const Pi = 3.14159

    fmt.Println(name, age, city, x, y, Pi)

    // Zero values
    var score int       // 0
    var active bool     // false
    var label string    // ""
    fmt.Println(score, active, label)
}`,
        },
      },
      {
        type: 'table',
        data: {
          title: 'Go Numeric Types at a Glance',
          headers: ['Type', 'Size', 'Range / Note'],
          rows: [
            ['int8', '8-bit', '-128 to 127'],
            ['int16', '16-bit', '-32,768 to 32,767'],
            ['int32 / rune', '32-bit', '-2B to 2B; alias for Unicode code point'],
            ['int64', '64-bit', 'Very large integers'],
            ['int', 'Platform', '32-bit on 32-bit OS, 64-bit on 64-bit OS'],
            ['uint8 / byte', '8-bit', '0 to 255; alias for byte data'],
            ['float32', '32-bit', '~7 decimal digits of precision'],
            ['float64', '64-bit', '~15 decimal digits of precision (default)'],
          ],
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'Short Declaration (:=) — A Go Favourite',
          message: 'The `:=` syntax is Go\'s most common way to declare variables inside functions. It\'s clean, infers the type, and is idiomatic Go. However, it cannot be used at package-level scope — use `var` there instead.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Variables Best Practices',
          dos: [
            'Use `:=` for local variables inside functions for brevity.',
            'Use `var` at package level or when zero-value initialization is intentional.',
            'Use `const` for values that never change (API keys, configs, math constants).',
            'Group related `var` or `const` declarations in blocks for readability.',
          ],
          donts: [
            'Don\'t declare a variable and never use it — Go will refuse to compile.',
            'Don\'t use generic names like `data`, `val`, `temp` for important variables.',
            'Don\'t use `int64` everywhere; choose the smallest fitting type for memory efficiency.',
          ],
        },
      },
    ],
  },
};

export const variablesTypesZh: ContentNode = {
  id: 'variables-types',
  name: '变量与基础类型',
  categoryId: 'basics',
  tags: ['变量', '类型', 'var', 'const', '短变量声明', '零值', '类型推断', 'int', 'string', 'bool', '浮点数', '入门'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go 语言中的变量',
          paragraphs: [
            'Go 是静态类型语言——每个变量的类型在编译时就已确定。编译器会尽可能推断类型，但你也可以显式声明。',
            'Go 变量始终会被初始化。若声明时未赋值，变量将获得其"零值"——数字为 `0`，布尔值为 `false`，字符串为 `""`，指针、切片和映射为 `nil`。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'variables.go',
          language: 'go',
          code: `package main

import "fmt"

func main() {
    // 完整声明方式
    var name string = "Gopher"

    // 类型由编译器推断
    var age = 25

    // 短变量声明 — 只能在函数内用
    city := "吉隆坡"

    // 多变量赋值
    x, y := 10, 20

    // 常量 — 不可重新赋值
    const Pi = 3.14159

    fmt.Println(name, age, city, x, y, Pi)

    // 零值示例
    var score int       // 0
    var active bool     // false
    var label string    // ""
    fmt.Println(score, active, label)
}`,
        },
      },
      {
        type: 'table',
        data: {
          title: 'Go 数字类型速览',
          headers: ['类型', '大小', '范围 / 说明'],
          rows: [
            ['int8', '8位', '-128 到 127'],
            ['int16', '16位', '-32,768 到 32,767'],
            ['int32 / rune', '32位', 'Unicode 码点的别名'],
            ['int64', '64位', '超大整数'],
            ['int', '平台相关', '32位系统上为32位，64位系统上为64位'],
            ['uint8 / byte', '8位', '0 到 255；字节数据的别名'],
            ['float32', '32位', '约7位有效小数'],
            ['float64', '64位', '约15位有效小数（默认浮点类型）'],
          ],
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: '短变量声明 (:=) — Go 的最爱',
          message: '`:=` 是 Go 在函数内声明变量最常用的方式，简洁、自动推断类型且符合惯用风格。但注意：它不能用于包级别的作用域，在那里必须使用 `var`。',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '变量使用最佳实践',
          dos: [
            '在函数内部优先使用 `:=` 声明局部变量，简洁清晰。',
            '在包级别或需要明确零值初始化时，使用 `var`。',
            '对不会改变的值（API密钥、配置项、数学常量）使用 `const`。',
            '将相关的 `var` 或 `const` 声明分组，提高可读性。',
          ],
          donts: [
            '不要声明变量却不使用——Go 编译器会拒绝编译。',
            '不要给重要变量起 `data`、`val`、`temp` 这类模糊名称。',
            '不要到处用 `int64`；根据实际需要选择最小合适的类型以节省内存。',
          ],
        },
      },
    ],
  },
};
