// internal/cache/redis.go
package cache

import (
	"context"
	"encoding/json"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)

var Client *redis.Client

type Cache struct {
	client *redis.Client
}

// Initialize Redis client
func InitRedis() {
	Client = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_HOST") + ":" + os.Getenv("REDIS_PORT"), // Redis server address
		Password: os.Getenv("REDIS_PASSWORD"),                             // Redis password
		DB:       0,                                                       // Default DB
	})

	// Test connection
	ctx := context.Background()
	_, err := Client.Ping(ctx).Result()
	if err != nil {
		panic("Failed to connect to Redis: " + err.Error())
	}
}

func (c *Cache) Set(key string, value interface{}, expiration time.Duration) error {
	data, err := json.Marshal(value)
	if err != nil {
		return err
	}

	return c.client.Set(context.Background(), key, data, expiration).Err()
}

func (c *Cache) Get(key string) (string, error) {
	return c.client.Get(context.Background(), key).Result()
}

func (c *Cache) Delete(key string) error {
	return c.client.Del(context.Background(), key).Err()
}
