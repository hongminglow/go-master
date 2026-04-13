import type { ContentNode } from '../types';

export const testingEn: ContentNode = {
  id: 'testing',
  name: 'Testing in Go',
  categoryId: 'advanced',
  tags: ['testing', 'unit test', 'table-driven', 'benchmarks', 'testify', 'test coverage', 'mock', 'subtests', 't.Run', 'go test', 'intermediate', 'advanced'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Testing is Built Into Go',
          paragraphs: [
            'Go has first-class testing support baked into the standard library — no external framework required. Test files end in `_test.go`, functions start with `Test`, and you run everything with `go test ./...`.',
            'The idiomatic Go testing style is table-driven tests — defining all test cases as a slice of structs and looping over them. This pattern scales beautifully from 2 to 200 test cases without code duplication.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'math_test.go',
          language: 'go',
          code: `package math

import "testing"

func Add(a, b int) int { return a + b }

// Table-driven test — the idiomatic Go approach
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive numbers", 1, 2, 3},
        {"negative numbers", -1, -2, -3},
        {"zeros", 0, 0, 0},
        {"mixed", 5, -3, 2},
    }

    for _, tc := range tests {
        t.Run(tc.name, func(t *testing.T) {
            got := Add(tc.a, tc.b)
            if got != tc.expected {
                t.Errorf("Add(%d, %d) = %d; want %d",
                    tc.a, tc.b, got, tc.expected)
            }
        })
    }
}

// Benchmark — measure performance precisely
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(100, 200)
    }
}`,
        },
      },
      {
        type: 'workflow',
        data: {
          title: 'Go Test Command Cheat Sheet',
          steps: [
            { title: 'go test ./...', description: 'Run all tests in the module recursively.' },
            { title: 'go test -v', description: 'Verbose output — shows each test name and PASS/FAIL.' },
            { title: 'go test -run TestAdd', description: 'Run only tests matching a regex pattern.' },
            { title: 'go test -bench=. -benchmem', description: 'Run all benchmarks and show memory allocations.' },
            { title: 'go test -cover -coverprofile=c.out', description: 'Generate coverage report. View with `go tool cover -html=c.out`.' },
            { title: 'go test -race', description: 'Enable the data race detector during tests.' },
          ],
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'Test Against Interfaces, Not Concrete Types',
          message: 'Design your code to accept interfaces, then inject test doubles (fakes/stubs) in tests. This makes your code testable without HTTP calls, database queries, or file I/O. The `io.Reader` and `io.Writer` interfaces let you test file processing logic with in-memory `bytes.Buffer`.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Testing Best Practices',
          dos: [
            'Use table-driven tests — they scale and self-document beautifully.',
            'Use `t.Run` subtests for clear, organised output and parallel execution.',
            'Aim for >80% code coverage, but prioritise testing behaviour, not lines.',
            'Use `testify/assert` for more expressive assertions without the boilerplate.',
          ],
          donts: [
            'Don\'t write tests that test the mock, not the real behaviour.',
            'Don\'t share global state between tests — use `t.Cleanup` to reset.',
            'Don\'t benchmark in unit tests — use `b.N` in dedicated `Benchmark` functions.',
          ],
        },
      },
    ],
  },
};

export const testingZh: ContentNode = {
  id: 'testing',
  name: 'Go 测试体系',
  categoryId: 'advanced',
  tags: ['测试', '单元测试', '表格驱动测试', '基准测试', 'testify', '测试覆盖率', 'mock', '子测试', 't.Run', 'go test', '中级', '高级'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '测试是 Go 的内置能力',
          paragraphs: [
            'Go 在标准库中内置了一流的测试支持——无需外部框架。测试文件以 `_test.go` 结尾，测试函数以 `Test` 开头，用 `go test ./...` 运行所有测试。',
            'Go 最惯用的测试风格是表格驱动测试（table-driven tests）——将所有测试用例定义为结构体切片并循环遍历。这种模式从 2 个到 200 个测试用例都能优雅扩展，没有代码重复。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'math_test.go',
          language: 'go',
          code: `package math

import "testing"

func Add(a, b int) int { return a + b }

// 表格驱动测试 — Go 惯用测试方式
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"正数相加", 1, 2, 3},
        {"负数相加", -1, -2, -3},
        {"全零", 0, 0, 0},
        {"混合", 5, -3, 2},
    }

    for _, tc := range tests {
        t.Run(tc.name, func(t *testing.T) {
            got := Add(tc.a, tc.b)
            if got != tc.expected {
                t.Errorf("Add(%d, %d) = %d; 期望 %d",
                    tc.a, tc.b, got, tc.expected)
            }
        })
    }
}

// 基准测试 — 精确测量性能
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(100, 200)
    }
}`,
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '测试最佳实践',
          dos: [
            '使用表格驱动测试——它们优雅扩展且自文档化。',
            '使用 `t.Run` 子测试，让输出清晰有条理，还支持并行执行。',
            '追求 >80% 的代码覆盖率，但测试的重点应是行为，而非代码行数。',
            '使用 `testify/assert` 获得更具表达力的断言，减少样板代码。',
          ],
          donts: [
            '不要写只测试 mock 而不测试真实行为的测试。',
            '不要在测试间共享全局状态——用 `t.Cleanup` 进行重置。',
            '不要在单元测试中做性能基准——请用专门的 `Benchmark` 函数配合 `b.N`。',
          ],
        },
      },
    ],
  },
};
