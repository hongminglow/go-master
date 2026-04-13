import type { ContentNode } from '../types';

export const httpServerEn: ContentNode = {
  id: 'http-server',
  name: 'Building HTTP Servers',
  categoryId: 'advanced',
  tags: ['http', 'web server', 'net/http', 'handler', 'middleware', 'routing', 'REST', 'gin', 'mux', 'ServeMux', 'JSON', 'API', 'intermediate', 'advanced'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go\'s Standard HTTP Package is Production-Ready',
          paragraphs: [
            'Go\'s `net/http` package is remarkably powerful out of the box — companies run production API servers with nothing but the standard library. You get connection pooling, HTTP/2, TLS, graceful shutdown, and excellent concurrency primitives for free.',
            'For more complex routing (path parameters, grouped routes), popular routers like `gorilla/mux`, `chi`, or `gin` add minimal overhead while keeping the familiar `http.Handler` interface.',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'server.go',
          language: 'go',
          code: `package main

import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

type User struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

// Handler function — plain Go function matching http.HandlerFunc
func usersHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
        return
    }

    users := []User{{1, "Alice"}, {2, "Bob"}}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

// Middleware — wraps any http.Handler
func logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/users", usersHandler)

    srv := &http.Server{
        Addr:         ":8080",
        Handler:      logger(mux),
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  120 * time.Second,
    }

    // Graceful shutdown on SIGTERM / SIGINT
    go func() {
        quit := make(chan os.Signal, 1)
        signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
        <-quit
        ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
        defer cancel()
        srv.Shutdown(ctx)
    }()

    log.Println("Server starting on :8080")
    if err := srv.ListenAndServe(); err != http.ErrServerClosed {
        log.Fatal(err)
    }
}`,
        },
      },
      {
        type: 'tip',
        data: {
          variant: 'info',
          title: 'Always Set Timeouts',
          message: 'A default `http.Server` (or `http.ListenAndServe`) has NO timeouts. A slow or malicious client can hold connections open indefinitely, exhausting file descriptors. Always set `ReadTimeout`, `WriteTimeout`, and `IdleTimeout` explicitly.',
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'HTTP Server Best Practices',
          dos: [
            'Set explicit timeouts on your `http.Server` for every production service.',
            'Implement graceful shutdown with `srv.Shutdown(ctx)` to drain in-flight requests.',
            'Use middleware for cross-cutting concerns: logging, auth, rate limiting, CORS.',
            'Return proper HTTP status codes — 404 for not found, 422 for validation errors, 500 for unexpected errors.',
          ],
          donts: [
            'Don\'t use `http.ListenAndServe` in production — you lose timeout and graceful shutdown control.',
            'Don\'t read `r.Body` multiple times — it\'s a stream that can only be read once.',
            'Don\'t write to `http.ResponseWriter` after returning from the handler — it causes a panic or silent corruption.',
          ],
        },
      },
    ],
  },
};

export const httpServerZh: ContentNode = {
  id: 'http-server',
  name: '构建 HTTP 服务器',
  categoryId: 'advanced',
  tags: ['HTTP', 'Web 服务器', 'net/http', '处理器', '中间件', '路由', 'REST', 'gin', 'mux', 'ServeMux', 'JSON', 'API', '中级', '高级'],
  content: {
    sections: [
      {
        type: 'content',
        data: {
          title: 'Go 的标准 HTTP 包已是生产级',
          paragraphs: [
            'Go 的 `net/http` 包开箱即用，功能极其强大——许多公司只用标准库就运行着生产级 API 服务器。你可以免费获得连接池、HTTP/2、TLS、优雅关机和出色的并发原语。',
            '对于更复杂的路由需求（路径参数、分组路由），流行的路由库如 `gorilla/mux`、`chi` 或 `gin` 只增加极少开销，同时保持熟悉的 `http.Handler` 接口。',
          ],
        },
      },
      {
        type: 'code',
        data: {
          filename: 'server.go',
          language: 'go',
          code: `package main

import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

type User struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

// 处理器函数 — 符合 http.HandlerFunc 签名的普通函数
func usersHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        http.Error(w, "方法不允许", http.StatusMethodNotAllowed)
        return
    }

    users := []User{{1, "小明"}, {2, "小红"}}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

// 中间件 — 包装任意 http.Handler
func logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/users", usersHandler)

    srv := &http.Server{
        Addr:         ":8080",
        Handler:      logger(mux),
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  120 * time.Second,
    }

    // 收到 SIGTERM / SIGINT 时优雅关机
    go func() {
        quit := make(chan os.Signal, 1)
        signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
        <-quit
        ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
        defer cancel()
        srv.Shutdown(ctx)
    }()

    log.Println("服务器启动，监听 :8080")
    if err := srv.ListenAndServe(); err != http.ErrServerClosed {
        log.Fatal(err)
    }
}`,
        },
      },
      {
        type: 'dos-donts',
        data: {
          title: 'HTTP 服务器最佳实践',
          dos: [
            '对每个生产服务的 `http.Server` 设置明确的超时时间。',
            '用 `srv.Shutdown(ctx)` 实现优雅关机，让进行中的请求完成处理。',
            '用中间件处理横切关注点：日志、认证、限流、CORS。',
            '返回正确的 HTTP 状态码——404 表示未找到，422 表示验证错误，500 表示意外错误。',
          ],
          donts: [
            '不要在生产环境使用 `http.ListenAndServe`——你会失去超时和优雅关机的控制权。',
            '不要多次读取 `r.Body`——它是一个只能读一次的流。',
            '不要在处理器返回后再写入 `http.ResponseWriter`——会导致 panic 或静默数据损坏。',
          ],
        },
      },
    ],
  },
};
