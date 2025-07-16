package database

import (
	"fmt"
	"log"

	"backend/internal/models"
)

func Migrate() {
	err := DB.AutoMigrate(
		&models.User{},
		&models.Role{},
		&models.Category{},
		&models.Product{},
		&models.ProductVariant{},
		&models.ProductCategory{},
		&models.Order{},
		&models.ProductOrder{},
		&models.Transaction{},
		&models.ProductReview{},
		&models.Cart{},
		&models.CartItem{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	fmt.Println("✅ Database migration completed!")
}
