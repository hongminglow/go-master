package models

import (
	"gorm.io/gorm"
	"time"
)

type Role struct {
	ID        uint32         `json:"id" gorm:"primaryKey;autoIncrement"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	Name        string `json:"name" gorm:"uniqueIndex;not null;size:100"`
	Description string `json:"description" gorm:"not null;size:200"`
	Permission  string `json:"permission" gorm:"not null;type:text"`
}
