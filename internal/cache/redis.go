// internal/cache/redis.go
package cache

import (
	"context"
	"encoding/json"
	"github.com/redis/go-redis/v9"
	"time"
)

type Cache struct {
	client *redis.Client
}

func (c *Cache) Set(key string, value interface{}, expiration time.Duration) error {
	data, err := json.Marshal(value)
	if err != nil {
		return err
	}

	return c.client.Set(context.Background(), key, data, expiration).Err()
}
