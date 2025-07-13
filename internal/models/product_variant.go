package models

type ProductVariant struct {
	ID        uint32  `json:"id" gorm:"primaryKey;autoIncrement"`
	ProductID uint32  `json:"product_id" gorm:"not null;index"`
	Product   Product `json:"product" gorm:"foreignKey:ProductID;references:ID"`
	Size      string  `json:"size" gorm:"size:20;not null"`
	Color     string  `json:"color" gorm:"size:20;not null"`
	Sku       string  `json:"sku" gorm:"size:50;not null;index"`
	Quantity  uint32  `json:"quantity" gorm:"not null"`
	Price     float64 `json:"price" gorm:"type:numeric(10,2);not null"`
}
