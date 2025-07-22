package middleware

import (
	"bytes"
	"context"
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"net/http"
	"strings"
	"time"

	"backend/internal/cache"
)

// ResponseWriter wrapper to capture response
type responseWriter struct {
	http.ResponseWriter
	statusCode int
	body       *bytes.Buffer
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

func (rw *responseWriter) Write(b []byte) (int, error) {
	rw.body.Write(b)
	return rw.ResponseWriter.Write(b)
}

// CacheMiddleware automatically caches GET responses with 200 status
func CacheMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.Background()

		// Only cache GET requests
		if r.Method != http.MethodGet {
			next.ServeHTTP(w, r)
			return
		}

		// Skip caching for certain endpoints
		if shouldSkipCache(r.URL.Path) {
			next.ServeHTTP(w, r)
			return
		}

		// Generate cache key based on URL and query params
		cacheKey := generateCacheKey(r)

		// Try to get cached response
		if cachedResponse, err := cache.Client.Get(ctx, cacheKey).Result(); err == nil {
			w.Header().Set("Content-Type", "application/json")
			w.Header().Set("X-Cache", "HIT")
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(cachedResponse))
			return
		}

		// Wrap the response writer to capture response
		wrapped := &responseWriter{
			ResponseWriter: w,
			statusCode:     http.StatusOK, // default
			body:           bytes.NewBuffer(nil),
		}

		// Call the next handler
		next.ServeHTTP(wrapped, r)

		// Cache the response if it's successful
		if shouldCacheResponse(wrapped.statusCode, wrapped.body.Bytes()) {
			cacheDuration := getCacheDuration(r.URL.Path)
			cache.Client.Set(ctx, cacheKey, wrapped.body.String(), cacheDuration)
			w.Header().Set("X-Cache", "MISS")
		}
	})
}

// generateCacheKey creates a unique cache key based on request
func generateCacheKey(r *http.Request) string {
	// Include path and query parameters in cache key
	fullURL := r.URL.Path
	if r.URL.RawQuery != "" {
		fullURL += "?" + r.URL.RawQuery
	}

	// Add user context if authenticated (optional)
	// You can extract user ID from JWT token if needed
	// userID := getUserIDFromRequest(r)
	// if userID != "" {
	//     fullURL += ":user:" + userID
	// }

	// Create MD5 hash of the full URL for shorter keys
	hash := md5.Sum([]byte(fullURL))
	return fmt.Sprintf("cache:%s", hex.EncodeToString(hash[:]))
}

// shouldSkipCache determines if an endpoint should skip caching
func shouldSkipCache(path string) bool {
	skipPaths := []string{
		"/api/health",   // Health checks shouldn't be cached
		"/ws/",          // WebSocket endpoints
		"/swagger/",     // Swagger documentation
		"/api/login",    // Authentication endpoints
		"/api/register", // Registration endpoints
	}

	for _, skipPath := range skipPaths {
		if strings.HasPrefix(path, skipPath) {
			return true
		}
	}
	return false
}

// shouldCacheResponse determines if a response should be cached
func shouldCacheResponse(statusCode int, body []byte) bool {
	// Only cache successful responses
	if statusCode != http.StatusOK {
		return false
	}

	// Don't cache empty responses
	if len(body) == 0 {
		return false
	}

	// Don't cache error responses (even if they return 200)
	bodyStr := string(body)
	if strings.Contains(bodyStr, `"success":false`) || strings.Contains(bodyStr, `"error"`) {
		return false
	}

	return true
}

// getCacheDuration returns cache duration based on endpoint
func getCacheDuration(path string) time.Duration {
	switch {
	case strings.HasPrefix(path, "/api/products"):
		return time.Minute * 10 // Product data can be cached longer
	case strings.HasPrefix(path, "/api/categories"):
		return time.Minute * 15 // Categories change less frequently
	case strings.HasPrefix(path, "/api/users"):
		return time.Minute * 5 // User data changes more frequently
	default:
		return time.Minute * 5 // Default cache duration
	}
}
