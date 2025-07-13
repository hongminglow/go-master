package models

import (
	"time"

	"gorm.io/gorm"
)

type Cart struct {
	ID        uint32         `json:"id" gorm:"primaryKey;autoIncrement"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	UserID    uint32     `json:"user_id" gorm:"not null;index"`
	User      User       `json:"user" gorm:"foreignKey:UserID;references:ID"`
	CartItems []CartItem `json:"cart_items" gorm:"foreignKey:CartID"`
}
