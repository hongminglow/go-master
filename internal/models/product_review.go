package models

import (
	"time"
)

type ProductReview struct {
	ID        uint32    `json:"id" gorm:"primaryKey;autoIncrement"`
	UserID    uint32    `json:"user_id" gorm:"not null;index"`
	ProductID uint32    `json:"product_id" gorm:"not null;index"`
	Review    string    `json:"review" gorm:"size:300;not null"`
	CreatedAt time.Time `json:"created_at" gorm:"not null"`
	User      User      `json:"-" gorm:"foreignKey:UserID;references:ID"`
	Product   Product   `json:"-" gorm:"foreignKey:ProductID;references:ID"`
}
