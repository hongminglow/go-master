package health

import (
	"testing"
	"time"
)

func TestSetAndGetStartTime(t *testing.T) {
	now := time.Now()
	SetStartTime(now)
	got := GetStartTime()
	if !got.Equal(now) {
		t.Errorf("expected %v, got %v", now, got)
	}
}

func TestCheckHealthWithoutConnections(t *testing.T) {
	// Initialize with nil connections
	Initialize(nil, nil)
	health := CheckHealth()

	if health.Database {
		t.Error("expected Database to be false when db is nil")
	}
	if health.Redis {
		t.Error("expected Redis to be false when redisClient is nil")
	}
	if health.Version != "1.0.0" {
		t.Errorf("expected Version to be '1.0.0', got %s", health.Version)
	}
	if health.Uptime == "" {
		t.Error("expected Uptime to be set")
	}
}
