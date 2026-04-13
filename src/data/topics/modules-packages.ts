import type { ContentNode } from '../types';

export const modulesPackagesEn: ContentNode = {
  id: 'modules-packages',
  name: 'Modules & Packages',
  categoryId: 'intro',
  tags: ['modules', 'packages', 'go mod', 'go.sum', 'imports', 'visibility', 'exported', 'unexported', 'module path', 'dependency management', 'beginner'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go Modules: Reproducible Builds by Default',
          paragraphs: [
            'Go modules, introduced in Go 1.11, are the official dependency management system. A module is a collection of packages with a `go.mod` file at its root that declares the module path and Go version. The `go.sum` file locks dependency checksums for reproducible builds.',
            'Packages are Go\'s unit of code organization. Every `.go` file belongs to a package (declared with `package name` at the top). Code is only visible between packages if it starts with an uppercase letter — Go\'s simple, elegant visibility rule.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'go.mod',
          language: 'go',
          code: `module github.com/yourname/myapp

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    golang.org/x/exp v0.0.0-20231006
)`,
        },
      },
      {
        type: 'code',
        data: {
          filename: 'visibility.go',
          language: 'go',
          code: `package store

// Exported — visible to other packages (uppercase first letter)
type User struct {
    ID    int
    Name  string
    email string  // unexported — only accessible within 'store' package
}

// Exported function
func NewUser(id int, name, email string) *User {
    return &User{ID: id, Name: name, email: email}
}

// Unexported helper — internal use only
func validateEmail(email string) bool {
    return len(email) > 3 && len(email) < 255
}`,
        },
      },
      {
        type: 'workflow',
        data: {
          title: 'Essential go mod Commands',
          steps: [
            { title: 'go mod init', description: '`go mod init github.com/you/project` — initialize a new module.' },
            { title: 'go get', description: '`go get github.com/pkg@v1.2.3` — add or upgrade a dependency.' },
            { title: 'go mod tidy', description: 'Remove unused dependencies, add missing ones. Run before committing.' },
            { title: 'go mod vendor', description: 'Copy all dependencies into a `vendor/` directory for hermetic builds.' },
            { title: 'go list -m all', description: 'List all modules in the dependency graph.' },
          ],
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'Module & Package Best Practices',
          dos: [
            'Run `go mod tidy` before every commit.',
            'Use meaningful module paths that match your repository URL.',
            'Keep packages small and focused on a single concern.',
            'Use `internal/` directories to restrict package visibility to the parent module only.',
          ],
          donts: [
            'Don\'t vendor dependencies unless you have a specific hermetic build requirement.',
            'Don\'t use `_` import (`import _ "pkg"`) unless you understand its init-only side effect.',
            'Don\'t create circular imports — restructure packages if needed.',
          ],
        },
      },
    ],
  },
};

export const modulesPackagesZh: ContentNode = {
  id: 'modules-packages',
  name: '模块与包管理',
  categoryId: 'intro',
  tags: ['模块', '包', 'go mod', 'go.sum', '导入', '可见性', '导出', '未导出', '模块路径', '依赖管理', '入门'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go 模块：默认即可复现构建',
          paragraphs: [
            'Go 模块于 Go 1.11 引入，是官方的依赖管理系统。一个模块是一组包的集合，根目录有一个 `go.mod` 文件，声明模块路径和 Go 版本。`go.sum` 文件锁定依赖的校验和，确保构建可以复现。',
            '包（package）是 Go 的代码组织单元。每个 `.go` 文件都属于一个包（用顶部的 `package name` 声明）。只有以大写字母开头的代码在包之间才是可见的——这是 Go 简单而优雅的可见性规则。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'go.mod',
          language: 'go',
          code: `module github.com/yourname/myapp

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    golang.org/x/exp v0.0.0-20231006
)`,
        },
      },
      {
        type: 'code',
        data: {
          filename: 'visibility.go',
          language: 'go',
          code: `package store

// 导出 — 对其他包可见（首字母大写）
type User struct {
    ID    int
    Name  string
    email string  // 未导出 — 只在 'store' 包内可访问
}

// 导出函数
func NewUser(id int, name, email string) *User {
    return &User{ID: id, Name: name, email: email}
}

// 未导出的辅助函数 — 仅供内部使用
func validateEmail(email string) bool {
    return len(email) > 3 && len(email) < 255
}`,
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: '模块与包管理最佳实践',
          dos: [
            '每次提交前运行 `go mod tidy`。',
            '使用与仓库 URL 匹配的有意义的模块路径。',
            '保持包小巧，专注于单一职责。',
            '使用 `internal/` 目录将包的可见性限制在父模块内部。',
          ],
          donts: [
            '除非有特定的封闭构建需求，否则不要将依赖 vendor 化。',
            '除非了解其 init-only 副作用，否则不要使用 `_` 导入。',
            '不要创建循环导入——如有需要则重构包结构。',
          ],
        },
      },
    ],
  },
};
