package models

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	ID        uint32         `json:"id" gorm:"primaryKey;autoIncrement"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	OrderID         uint32    `json:"-" gorm:"not null;index"`
	Order           Order     `json:"order" gorm:"foreignKey:OrderID;references:ID"`
	PaymentMethod   string    `json:"payment_method" gorm:"size:50;not null"`
	Amount          float64   `json:"amount" gorm:"type:numeric(10,2);not null"`
	TransactionDate time.Time `json:"transaction_date" gorm:"not null"`
	Reference       string    `json:"reference" gorm:"size:100"`
	Status          string    `json:"status" gorm:"size:50;not null"`
	RecipientID     uint32    `json:"-" gorm:"not null;index"`
	Recipient       User      `json:"-" gorm:"foreignKey:RecipientID;references:ID"`
}
