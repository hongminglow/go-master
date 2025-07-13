package models

type ProductOrder struct {
	ProductVariantID uint32  `json:"product_variant_id" gorm:"primaryKey"`
	OrderID          uint32  `json:"order_id" gorm:"primaryKey"`
	Quantity         uint32  `json:"quantity" gorm:"not null"`
	UnitPrice        float64 `json:"unit_price" gorm:"type:numeric(10,2);not null"`
}
