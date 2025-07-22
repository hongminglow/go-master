// config/config.go
package config

import (
	"os"
	"strconv"
	"strings"
)

type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
	JWT      JWTConfig
	Redis    RedisConfig
}

type ServerConfig struct {
	Port           string
	Environment    string
	AllowedOrigins []string
}

type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
}

type JWTConfig struct {
	SecretKey     string
	ExpiresInHour int
}

type RedisConfig struct {
	Host     string
	Port     string
	Password string
	DB       int
}

var GlobalConfig *Config

func Load() *Config {
	GlobalConfig = &Config{
		Server: ServerConfig{
			Port:           getEnvWithDefault("PORT", "8080"),
			Environment:    getEnvWithDefault("ENVIRONMENT", "development"),
			AllowedOrigins: getEnvAsSlice("ALLOWED_ORIGINS", []string{"http://localhost:3000", "http://localhost:5173"}),
		},
		Database: DatabaseConfig{
			Host:     getEnvWithDefault("DB_HOST", "localhost"),
			Port:     getEnvWithDefault("DB_PORT", "5432"),
			User:     getEnvWithDefault("DB_USER", "postgres"),
			Password: os.Getenv("DB_PASSWORD"),
			Name:     getEnvWithDefault("DB_NAME", "myapp"),
		},
		JWT: JWTConfig{
			SecretKey:     os.Getenv("JWT_SECRET_KEY"),
			ExpiresInHour: getEnvAsInt("JWT_EXPIRES_IN_HOUR", 24),
		},
		Redis: RedisConfig{
			Host:     getEnvWithDefault("REDIS_HOST", "localhost"),
			Port:     getEnvWithDefault("REDIS_PORT", "6379"),
			Password: os.Getenv("REDIS_PASSWORD"),
			DB:       getEnvAsInt("REDIS_DB", 0),
		},
	}
	return GlobalConfig
}

// Helper function to get int from environment variable
func getEnvAsInt(key string, defaultVal int) int {
	valStr := os.Getenv(key)
	if valStr == "" {
		return defaultVal
	}
	val, err := strconv.Atoi(valStr)
	if err != nil {
		return defaultVal
	}
	return val
}

// Helper function to get string with default value
func getEnvWithDefault(key, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}

// Helper function to get slice from comma-separated environment variable
func getEnvAsSlice(key string, defaultVal []string) []string {
	val := os.Getenv(key)
	if val == "" {
		return defaultVal
	}
	return strings.Split(val, ",")
}
