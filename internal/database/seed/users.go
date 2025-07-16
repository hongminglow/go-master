package seed

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

type UserSeeder struct{}

func (u *UserSeeder) Seed(db *gorm.DB) error {
	var count int64
	db.Model(&models.User{}).Count(&count)

	if count > 0 {
		return nil // Skip if users already exist
	}

	// Get admin role ID
	var adminRole models.Role
	if err := db.Where("name = ?", "Administrator").First(&adminRole).Error; err != nil {
		return err
	}

	users := []models.User{
		{
			Username: "Administrator",
			Nickname: "Admin",
			BOD:      "2000-01-01",
			Email:    "administrator@email.com",
			Address:  "123 Admin St, Admin City",
			Password: "admin123",
			RoleID:   adminRole.ID,
		}, {
			Username: "SuperAdmin",
			Nickname: "Super Admin",
			BOD:      "2000-01-01",
			Email:    "superadmin@email.com",
			Address:  "123 User St, User City",
			Password: "admin123",
			RoleID:   adminRole.ID,
		},
	}

	return db.Create(&users).Error
}
