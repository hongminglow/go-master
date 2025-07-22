package models

import (
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Category struct {
	ID        uint32         `json:"id" gorm:"primaryKey;autoIncrement"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	Name        string         `json:"name" gorm:"size:100;not null;index"`
	Description string         `json:"description" gorm:"size:300;not null"`
	Tags        datatypes.JSON `json:"tags" gorm:"type:jsonb"`
}
