import type { ContentNode } from '../types';

export const stringsBytesRunesEn: ContentNode = {
  id: 'strings-bytes-runes',
  name: 'Strings, Bytes & Runes',
  categoryId: 'basics',
  tags: ['string', 'byte', 'rune', 'unicode', 'utf-8', 'encoding', 'len', 'range', 'string conversion', 'emoji', 'multibyte', 'beginner', 'intermediate', 'internationalization'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Strings in Go are Not What You Think',
          paragraphs: [
            'In Go, a `string` is an immutable sequence of bytes — NOT characters. This is a crucial distinction when working with non-ASCII text (Chinese, Arabic, emoji, etc.). Go uses UTF-8 encoding, where a single "character" (rune) can be 1 to 4 bytes wide.',
            'The built-in `len()` function returns the number of BYTES, not visible characters. Indexing a string with `s[i]` gives you a BYTE. To work with Unicode characters, you must use `rune` (an alias for `int32`) and iterate with `range` or convert to `[]rune`.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'strings_runes.go',
          language: 'go',
          code: `package main

import "fmt"

func main() {
    s := "Hello, 世界🌏"

    // len() counts BYTES, not characters
    fmt.Println(len(s)) // 17 — not 10!

    // Indexing gives a byte, not a character
    fmt.Printf("%T %v\\n", s[7], s[7]) // uint8 228

    // range over a string iterates RUNES (code points), not bytes
    for i, r := range s {
        fmt.Printf("index=%d rune=%c (U+%04X)\\n", i, r, r)
    }
    // index=0  rune=H  (U+0048)
    // index=7  rune=世 (U+4E16) — index jumps 3 (3 bytes wide)
    // index=10 rune=界 (U+754C) — index jumps 3
    // index=13 rune=🌏 (U+1F30F) — index jumps 4 (4 bytes wide)

    // Convert to []rune to get true character count and index by char
    runes := []rune(s)
    fmt.Println(len(runes)) // 10 — correct character count
    fmt.Println(string(runes[7])) // 世

    // strings.Builder — the correct way to build strings efficiently
    // (do NOT use += in loops)
    var b strings.Builder
    for i := 0; i < 5; i++ {
        fmt.Fprintf(&b, "%d ", i)
    }
    fmt.Println(b.String()) // "0 1 2 3 4 "
}`,
        },
      },
      {
        type: 'table',
        data: {
          title: 'string vs []byte vs []rune',
          headers: ['Type', 'Unit', 'Mutable?', 'Best For'],
          rows: [
            ['`string`', 'bytes (immutable view)', '❌ No', 'Text storage, map keys, function parameters'],
            ['`[]byte`', 'bytes (mutable)', '✅ Yes', 'I/O operations, parsing, network protocols, crypto'],
            ['`[]rune`', 'Unicode code points', '✅ Yes', 'Unicode-aware string manipulation (count, slice, reverse)'],
          ],
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'danger',
          title: 'Never Use += for String Concatenation in Loops',
          message: 'Strings are immutable in Go. Every `s += "x"` creates a whole new string, allocating O(n) memory per iteration. For building strings dynamically, always use `strings.Builder` which amortizes allocations to near-O(1).',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'String Handling Best Practices',
          dos: [
            'Use `[]rune(s)` when you need to count or index into a string by visible character.',
            'Use `range s` to iterate over Unicode code points safely.',
            'Use `strings.Builder` for string concatenation in any loop.',
            'Use `strings.Contains`, `strings.HasPrefix`, etc. from the `strings` package over manual byte comparison.',
          ],
          donts: [
            'Don\'t use `len(s)` to count visible characters in a UTF-8 string — it counts bytes.',
            'Don\'t index a string with `s[i]` expecting a character — it returns a byte.',
            'Don\'t concatenate strings with `+=` in a loop — it creates quadratic allocations.',
          ],
        },
      },
    ],
  },
};

export const stringsBytesRunesZh: ContentNode = {
  id: 'strings-bytes-runes',
  name: '字符串、字节与字符',
  categoryId: 'basics',
  tags: ['字符串', '字节', 'rune', 'unicode', 'utf-8', '编码', 'len', 'range', '字符串转换', 'emoji', '多字节', '入门', '中级', '国际化'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go 中的字符串并非你想象的那样',
          paragraphs: [
            '在 Go 中，`string` 是一段不可变的字节序列——而非字符序列。处理非 ASCII 文本（中文、阿拉伯文、emoji 等）时，这一区别至关重要。Go 使用 UTF-8 编码，单个"字符"（rune）的宽度为 1 到 4 个字节不等。',
            '内置的 `len()` 函数返回的是字节数，而非可见字符数。用 `s[i]` 索引字符串得到的是一个字节。要处理 Unicode 字符，必须使用 `rune`（`int32` 的别名）并通过 `range` 迭代，或将其转换为 `[]rune`。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'strings_runes.go',
          language: 'go',
          code: `package main

import "fmt"

func main() {
    s := "你好, 世界🌏"

    // len() 计算字节数，而非字符数
    fmt.Println(len(s)) // 远不止 7！

    // 用 range 迭代字符串，得到的是 rune（Unicode 码点），而非字节
    for i, r := range s {
        fmt.Printf("index=%d rune=%c (U+%04X)\\n", i, r, r)
    }
    // 汉字每个占 3 字节，emoji 占 4 字节，索引会相应跳跃

    // 转换为 []rune 以获取真实字符数并按字符索引
    runes := []rune(s)
    fmt.Println(len(runes)) // 正确的字符数
    fmt.Println(string(runes[0])) // 你

    // 字符串 to []byte 转换（用于 I/O、网络等）
    b := []byte(s)
    fmt.Println(len(b)) // 字节数
}`,
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '字符串处理最佳实践',
          dos: [
            '需要按可见字符计数或索引时，使用 `[]rune(s)` 转换。',
            '用 `range s` 安全地迭代 Unicode 码点。',
            '在任何循环中使用 `strings.Builder` 进行字符串拼接。',
            '使用 `strings` 包中的 `Contains`、`HasPrefix` 等函数，而非手动字节比较。',
          ],
          donts: [
            '不要用 `len(s)` 统计 UTF-8 字符串的可见字符数——它统计的是字节数。',
            '不要用 `s[i]` 索引字符串期望得到字符——它返回的是字节。',
            '不要在循环中用 `+=` 拼接字符串——会产生二次方级别的内存分配。',
          ],
        },
      },
    ],
  },
};
