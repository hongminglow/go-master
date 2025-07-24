package seed

import (
	"fmt"
	"log"

	"gorm.io/gorm"
)

type Seeder interface {
	Seed(db *gorm.DB) error
}

func RunAll(db *gorm.DB) {
	seeders := []Seeder{
		&RoleSeeder{},
		// &UserSeeder{},
	}

	for _, seeder := range seeders {
		if err := seeder.Seed(db); err != nil {
			log.Fatal("Failed to run seeder:", err)
		}
	}

	fmt.Println("✅ All seeders completed!")
}
