// internal/database/migrations/migrations.go
package migrations

import (
	"backend/internal/models"
	"fmt"

	"gorm.io/gorm"
)

type Migration struct {
	Version string
	Up      func(*gorm.DB) error
	Down    func(*gorm.DB) error
}

func RunMigrations(db *gorm.DB) error {
	migrations := []Migration{
		{
			Version: "001_create_users_table",
			Up:      createUsersTable,
			Down:    dropUsersTable,
		},
	}

	for _, migration := range migrations {
		if err := migration.Up(db); err != nil {
			return fmt.Errorf("migration %s failed: %w", migration.Version, err)
		}
	}

	return nil
}

// Migration functions
func createUsersTable(db *gorm.DB) error {
	return db.AutoMigrate(&models.User{})
}

func dropUsersTable(db *gorm.DB) error {
	return db.Migrator().DropTable(&models.User{})
}
