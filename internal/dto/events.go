package dto

import "time"

// LoginEvent represents a user login event for MQTT publishing
type LoginEvent struct {
	UserID    uint      `json:"user_id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	LoginTime time.Time `json:"login_time"`
	IPAddress string    `json:"ip_address,omitempty"`
}
