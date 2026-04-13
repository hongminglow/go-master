import type { ContentNode } from '../types';

export const structsMethodsEn: ContentNode = {
  id: 'structs-methods',
  name: 'Structs & Methods',
  categoryId: 'basics',
  tags: ['structs', 'methods', 'receiver', 'pointer receiver', 'value receiver', 'embedding', 'OOP', 'composition', 'beginner', 'intermediate'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go\'s Take on Object-Oriented Programming',
          paragraphs: [
            'Go does not have classes. Instead, it uses structs — plain data containers — combined with methods. A method is just a function with a special "receiver" argument that associates it with a specific type.',
            'Go favours composition over inheritance. You can embed one struct inside another to "inherit" its fields and methods without a traditional class hierarchy.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'structs.go',
          language: 'go',
          code: `package main

import "fmt"

type Animal struct {
    Name string
    Age  int
}

// Value receiver — works on a copy, does NOT modify the original
func (a Animal) Describe() string {
    return fmt.Sprintf("%s is %d years old", a.Name, a.Age)
}

type Dog struct {
    Animal        // Embedding — Dog inherits Animal's fields & methods
    Breed  string
}

// Pointer receiver — modifies the actual struct
func (d *Dog) Birthday() {
    d.Age++ // modifies the original Dog
}

func main() {
    rex := Dog{
        Animal: Animal{Name: "Rex", Age: 3},
        Breed:  "Labrador",
    }

    fmt.Println(rex.Describe()) // Rex is 3 years old
    rex.Birthday()
    fmt.Println(rex.Describe()) // Rex is 4 years old
    fmt.Println("Breed:", rex.Breed)
}`,
        },
      },
      {
        type: 'comparison',
        data: {
          title: 'Value Receiver vs Pointer Receiver',
          before: {
            title: 'Value Receiver (copy)',
            language: 'go',
            code: `// Gets a COPY — changes don't persist
func (u User) SetName(name string) {
    u.Name = name // only changes the local copy!
}`,
          },
          after: {
            title: 'Pointer Receiver (reference)',
            language: 'go',
            code: `// Gets the ORIGINAL — changes persist
func (u *User) SetName(name string) {
    u.Name = name // modifies the actual User
}`,
          },
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'When to Use Pointer vs Value Receivers',
          message: 'Use a pointer receiver when the method must mutate the struct, or when the struct is large (avoids copying). Use value receivers for immutable, small structs. Be consistent within a type — don\'t mix both.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Struct & Method Best Practices',
          dos: [
            'Use struct tags for JSON serialization: `json:"field_name"`.',
            'Embed types for composition over inheritance.',
            'Keep structs in the same file as their primary methods.',
            'Export struct fields starting with uppercase for public access.',
          ],
          donts: [
            'Don\'t mix pointer and value receivers on the same type.',
            'Don\'t create deep struct hierarchies — Go prefers flat composition.',
            'Don\'t export every field; use unexported fields for internal state management.',
          ],
        },
      },
    ],
  },
};

export const structsMethodsZh: ContentNode = {
  id: 'structs-methods',
  name: '结构体与方法',
  categoryId: 'basics',
  tags: ['结构体', '方法', '接收器', '指针接收器', '值接收器', '嵌入', '面向对象', '组合', '入门', '中级'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go 对面向对象的独到诠释',
          paragraphs: [
            'Go 没有类（class）。它用结构体（struct）——纯粹的数据容器——配合方法（method）来实现类似的能力。方法不过是带有特殊"接收器"参数的函数，将其与特定类型绑定。',
            'Go 推崇组合优于继承。通过将一个结构体嵌入另一个结构体，可以"继承"其字段和方法，而无需传统的类继承层次。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'structs.go',
          language: 'go',
          code: `package main

import "fmt"

type Animal struct {
    Name string
    Age  int
}

// 值接收器 — 操作副本，不修改原始值
func (a Animal) Describe() string {
    return fmt.Sprintf("%s 今年 %d 岁", a.Name, a.Age)
}

type Dog struct {
    Animal        // 嵌入 — Dog 继承 Animal 的字段和方法
    Breed  string
}

// 指针接收器 — 修改实际的结构体
func (d *Dog) Birthday() {
    d.Age++ // 修改原始 Dog
}

func main() {
    rex := Dog{
        Animal: Animal{Name: "旺财", Age: 3},
        Breed:  "拉布拉多",
    }

    fmt.Println(rex.Describe()) // 旺财 今年 3 岁
    rex.Birthday()
    fmt.Println(rex.Describe()) // 旺财 今年 4 岁
    fmt.Println("品种:", rex.Breed)
}`,
        },
      },
      {
        type: 'comparison',
        data: {
          title: '值接收器 vs 指针接收器',
          before: {
            title: '值接收器（副本）',
            language: 'go',
            code: `// 获得副本 — 修改不会持久化
func (u User) SetName(name string) {
    u.Name = name // 只改了本地副本！
}`,
          },
          after: {
            title: '指针接收器（引用）',
            language: 'go',
            code: `// 获得原始值 — 修改会持久化
func (u *User) SetName(name string) {
    u.Name = name // 真正修改了 User
}`,
          },
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '结构体与方法最佳实践',
          dos: [
            '使用结构体标签（tag）进行 JSON 序列化：`json:"field_name"`。',
            '通过嵌入（embedding）实现组合而非继承。',
            '将主要方法的定义放在其结构体所在的文件中。',
            '导出（大写开头）对外暴露的字段，用小写保持内部状态私有。',
          ],
          donts: [
            '不要在同一类型上混用指针和值接收器。',
            '不要创建深层的结构体层次——Go 更推崇扁平的组合。',
            '不要导出所有字段；用非导出字段来管理内部状态。',
          ],
        },
      },
    ],
  },
};
