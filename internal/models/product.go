package models

import (
	"time"

	"gorm.io/gorm"
)

type Product struct {
	ID        uint32         `json:"id" gorm:"primaryKey;autoIncrement"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	Name        string           `json:"name" gorm:"size:200;not null;unique"`
	Brand       string           `json:"brand" gorm:"size:100;not null"`
	Description string           `json:"description" gorm:"size:300;not null"`
	Price       float64          `json:"price" gorm:"type:numeric(10,2);not null"`
	Quantity    uint32           `json:"quantity" gorm:"not null"`
	Image       []byte           `json:"-" gorm:"type:bytea"`
	ImageType   string           `json:"image_type" gorm:"size:50"`
	Variants    []ProductVariant `json:"variants" gorm:"foreignKey:ProductID"`
	Categories  []Category       `json:"categories" gorm:"many2many:product_categories;joinForeignKey:ProductID;JoinReferences:CategoryID"`
}
