import type { ContentNode } from '../types';

export const interfacesEn: ContentNode = {
  id: 'interfaces',
  name: 'Interfaces & Polymorphism',
  categoryId: 'basics',
  tags: ['interfaces', 'polymorphism', 'duck typing', 'implicit', 'type assertion', 'type switch', 'io.Reader', 'io.Writer', 'intermediate'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Implicit Interfaces — Go\'s Superpower',
          paragraphs: [
            'In Go, interfaces are satisfied implicitly. A type implements an interface simply by having the required methods — no `implements` keyword needed. This is also called "duck typing": if it walks like a duck and quacks like a duck, it\'s a duck.',
            'This design enables incredible decoupling. You can write code against an interface without the concrete type ever knowing your interface exists. Standard library interfaces like `io.Reader` and `io.Writer` are the canonical example of this philosophy.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'interfaces.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "math"
)

// Define an interface
type Shape interface {
    Area() float64
    Perimeter() float64
}

type Circle struct { Radius float64 }
type Rectangle struct { Width, Height float64 }

// Circle satisfies Shape — no declaration needed
func (c Circle) Area() float64      { return math.Pi * c.Radius * c.Radius }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.Radius }

// Rectangle satisfies Shape — no declaration needed
func (r Rectangle) Area() float64      { return r.Width * r.Height }
func (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }

// This function works with ANY Shape
func printInfo(s Shape) {
    fmt.Printf("Area: %.2f, Perimeter: %.2f\\n", s.Area(), s.Perimeter())
}

func main() {
    shapes := []Shape{
        Circle{Radius: 5},
        Rectangle{Width: 3, Height: 4},
    }
    for _, s := range shapes {
        printInfo(s)
    }
}`,
        },
      },
      {
        type: 'code',
        data: {
          filename: 'type_switch.go',
          language: 'go',
          code: `// Type switches — inspect the concrete type at runtime
func classify(i interface{}) string {
    switch v := i.(type) {
    case int:
        return fmt.Sprintf("int: %d", v)
    case string:
        return fmt.Sprintf("string: %q", v)
    case bool:
        return fmt.Sprintf("bool: %t", v)
    default:
        return fmt.Sprintf("unknown: %T", v)
    }
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'The Empty Interface: any',
          message: '`interface{}` (or `any` in Go 1.18+) matches every type. It\'s useful for generic containers, but overuse removes type safety. Prefer concrete types or generics when possible.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Interface Design Guidelines',
          dos: [
            'Keep interfaces small — one or two methods at most (e.g., `io.Reader`, `io.Writer`).',
            'Accept interfaces in function parameters, return concrete types from constructors.',
            'Use type assertions defensively with the `ok` pattern: `v, ok := i.(T)`.',
          ],
          donts: [
            'Don\'t define interfaces prematurely — let them emerge from usage.',
            'Don\'t create "fat" interfaces with dozens of methods — they become hard to mock and test.',
            'Don\'t use `interface{}` as a crutch — Go 1.18+ generics solve most of those cases cleanly.',
          ],
        },
      },
    ],
  },
};

export const interfacesZh: ContentNode = {
  id: 'interfaces',
  name: '接口与多态',
  categoryId: 'basics',
  tags: ['接口', '多态', '鸭子类型', '隐式实现', '类型断言', '类型选择', 'io.Reader', 'io.Writer', '中级'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: '隐式接口——Go 的超级武器',
          paragraphs: [
            '在 Go 中，接口是隐式实现的。一个类型只要拥有接口所需的所有方法，就自动实现了该接口——不需要任何 `implements` 关键字。这也被称为"鸭子类型"：如果它走路像鸭子，叫声像鸭子，它就是鸭子。',
            '这种设计实现了极致的解耦。你可以针对接口编写代码，而具体的类型完全不需要知道你的接口存在。标准库中的 `io.Reader` 和 `io.Writer` 就是这种哲学的典范。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'interfaces.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "math"
)

// 定义接口
type Shape interface {
    Area() float64
    Perimeter() float64
}

type Circle struct { Radius float64 }
type Rectangle struct { Width, Height float64 }

// Circle 隐式实现 Shape — 无需声明
func (c Circle) Area() float64      { return math.Pi * c.Radius * c.Radius }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.Radius }

// Rectangle 隐式实现 Shape — 无需声明
func (r Rectangle) Area() float64      { return r.Width * r.Height }
func (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }

// 该函数可以接受任意 Shape
func printInfo(s Shape) {
    fmt.Printf("面积: %.2f, 周长: %.2f\\n", s.Area(), s.Perimeter())
}

func main() {
    shapes := []Shape{
        Circle{Radius: 5},
        Rectangle{Width: 3, Height: 4},
    }
    for _, s := range shapes {
        printInfo(s)
    }
}`,
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '接口设计规范',
          dos: [
            '保持接口小巧——最多一两个方法（如 `io.Reader`、`io.Writer`）。',
            '函数参数接受接口类型，构造函数返回具体类型。',
            '使用带 `ok` 模式的类型断言：`v, ok := i.(T)`，防止 panic。',
          ],
          donts: [
            '不要过早定义接口——让它们从实际使用中自然浮现。',
            '不要创建拥有几十个方法的"臃肿"接口——它们难以模拟（mock）和测试。',
            '不要用 `interface{}` 作为万能药——Go 1.18+ 的泛型能更优雅地解决大多数此类问题。',
          ],
        },
      },
    ],
  },
};
