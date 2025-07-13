package models

type ProductCategory struct {
	ProductID  uint32 `json:"product_id" gorm:"primaryKey"`
	CategoryID uint32 `json:"category_id" gorm:"primaryKey"`
}
