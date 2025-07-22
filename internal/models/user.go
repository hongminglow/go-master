package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint32         `json:"id" gorm:"primaryKey;autoIncrement"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	Username string `json:"username" gorm:"size:50;not null;index"`
	Nickname string `json:"nickname" gorm:"size:50;not null"`
	BOD      string `json:"bod" gorm:"size:50;not null"`
	Email    string `json:"email" gorm:"size:50;not null"`
	Address  string `json:"address" gorm:"size:200"`
	Password string `json:"-" gorm:"size:100;not null"`
	RoleID   uint32 `json:"role_id"`
	Role     Role   `json:"role" gorm:"foreignKey:RoleID;references:ID"`
}
