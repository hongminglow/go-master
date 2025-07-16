// internal/health/health.go
package health

import (
	"context"
	"time"

	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
)

type HealthCheck struct {
	Database bool   `json:"database"`
	Redis    bool   `json:"redis"`
	Version  string `json:"version"`
	Uptime   string `json:"uptime"`
}

// Global variables (should be set during app initialization)
var (
	startTime   time.Time
	db          *gorm.DB
	redisClient *redis.Client
)

// Initialize sets up the health check dependencies
func Initialize(database *gorm.DB, redis *redis.Client) {
	startTime = time.Now()
	db = database
	redisClient = redis
}

func CheckHealth() HealthCheck {
	return HealthCheck{
		Database: checkDatabase(),
		Redis:    checkRedis(),
		Version:  "1.0.0",
		Uptime:   time.Since(startTime).String(),
	}
}

// checkDatabase checks if database connection is healthy
func checkDatabase() bool {
	if db == nil {
		return false
	}

	sqlDB, err := db.DB()
	if err != nil {
		return false
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = sqlDB.PingContext(ctx)
	return err == nil
}

// checkRedis checks if Redis connection is healthy
func checkRedis() bool {
	if redisClient == nil {
		return false
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := redisClient.Ping(ctx).Result()
	return err == nil
}

// GetStartTime returns when the application started
func GetStartTime() time.Time {
	return startTime
}

// SetStartTime sets the application start time (useful for testing)
func SetStartTime(t time.Time) {
	startTime = t
}
