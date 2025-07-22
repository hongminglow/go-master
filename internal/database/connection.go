package database

import (
	"backend/internal/database/seed"
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	// Wait a bit to ensure database is fully initialized
	fmt.Println("Waiting for database to be ready...")
	time.Sleep(5 * time.Second)

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

	// Connect to database with retry logic
	var err error
	maxRetries := 30
	for i := 0; i < maxRetries; i++ {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			fmt.Println("✅ Connected to PostgreSQL database!")
			break
		}

		fmt.Printf("Failed to connect to database (attempt %d/%d): %v\n", i+1, maxRetries, err)
		if i < maxRetries-1 {
			fmt.Println("Retrying in 2 seconds...")
			time.Sleep(2 * time.Second)
		}
	}

	if err != nil {
		log.Fatal("Failed to connect to database after all retries:", err)
	}

	// Run migrations
	Migrate()

	// Run seeders
	seed.RunAll(DB)
}
