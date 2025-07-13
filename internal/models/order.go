package models

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	ID        uint32         `json:"id" gorm:"primaryKey;autoIncrement"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	UserID      uint32    `json:"-" gorm:"not null;index"`
	User        User      `json:"-" gorm:"foreignKey:UserID;references:ID"`
	TotalAmount float64   `json:"total_amount" gorm:"type:numeric(10,2);not null"`
	OrderStatus string    `json:"order_status" gorm:"size:50;not null"`
	OrderDate   time.Time `json:"order_date" gorm:"not null"`
}
