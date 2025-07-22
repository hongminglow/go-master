// internal/middleware/auth.go
package middleware

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// JWT Claims structure
type Claims struct {
	UserID   uint32 `json:"user_id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	jwt.RegisteredClaims
}

type contextKey string

const userContextKey contextKey = "user"

// Global variable to store JWT secret (should be set from config)
var jwtSecret []byte

// SetJWTSecret sets the JWT secret key
func SetJWTSecret(secret string) {
	jwtSecret = []byte(secret)
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Skip authentication for public routes
		if r.URL.Path == "/api/login" || r.URL.Path == "/api/register" {
			next.ServeHTTP(w, r)
			return
		}

		token := extractToken(r)
		if token == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Validate JWT token
		claims, err := validateToken(token)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// Add user to context
		ctx := context.WithValue(r.Context(), userContextKey, claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// extractToken extracts JWT token from Authorization header
func extractToken(r *http.Request) string {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return ""
	}

	// Check if it starts with "Bearer "
	if !strings.HasPrefix(authHeader, "Bearer ") {
		return ""
	}

	// Extract token after "Bearer "
	return strings.TrimPrefix(authHeader, "Bearer ")
}

// validateToken validates JWT token and returns claims
func validateToken(tokenString string) (*Claims, error) {
	if len(jwtSecret) == 0 {
		return nil, errors.New("JWT secret not set")
	}

	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// Make sure token's signing method is HMAC
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, errors.New("invalid token")
}

// GenerateToken generates a new JWT token for user
func GenerateToken(userID uint32, username, email string, expiresInHours int) (string, error) {
	if len(jwtSecret) == 0 {
		return "", errors.New("JWT secret not set")
	}

	claims := Claims{
		UserID:   userID,
		Username: username,
		Email:    email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(expiresInHours) * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

// GetUserFromContext extracts user claims from request context
func GetUserFromContext(ctx context.Context) (*Claims, bool) {
	user, ok := ctx.Value(userContextKey).(*Claims)
	return user, ok
}
