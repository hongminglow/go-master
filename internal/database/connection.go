package database

import (
	"fmt"
	"log"
	"os"

	"backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	// Build connection string
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_SSLMODE"),
	)

	// Connect to database
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	fmt.Println("✅ Connected to PostgreSQL database!")

	// Auto-migrate your models (creates tables)
	err = DB.AutoMigrate(
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

	// Insert hardcoded users if table is empty
	var userCount, roleCount int64
	DB.Model(&models.User{}).Count(&userCount)
	DB.Model(&models.Role{}).Count(&roleCount)
	if roleCount == 0 {
		roles := []models.Role{
			{
				Name:        "Administrator",
				Description: "Has full access to all resources",
				Permission:  "all",
			},
		}
		if err := DB.Create(&roles).Error; err != nil {
			log.Fatal("Failed to insert initial roles:", err)
		}
		fmt.Println("✅ Inserted initial roles!")
	}

	if userCount == 0 {
		users := []models.User{
			{
				Username: "Administrator",
				Nickname: "Admin",
				BOD:      "2000-01-01",
				Email:    "administrator@email.com",
				Address:  "123 Admin St, Admin City",
				Password: "admin123",
				RoleID:   1,
			},
		}
		if err := DB.Create(&users).Error; err != nil {
			log.Fatal("Failed to insert initial users:", err)
		}
		fmt.Println("✅ Inserted initial users!")
	}
}
