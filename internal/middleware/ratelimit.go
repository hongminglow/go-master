// internal/middleware/ratelimit.go
package middleware

import (
	"net/http"

	"golang.org/x/time/rate"
)

func RateLimitMiddleware(rps rate.Limit, burst int) func(http.Handler) http.Handler {
	limiter := rate.NewLimiter(rps, burst)

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if !limiter.Allow() {
				http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
