package seed

import (
	"backend/internal/models"
	"gorm.io/gorm"
)

type RoleSeeder struct{}

func (r *RoleSeeder) Seed(db *gorm.DB) error {
	var count int64
	db.Model(&models.Role{}).Count(&count)

	if count > 0 {
		return nil // Skip if roles already exist
	}

	roles := []models.Role{
		{
			Name:        "Administrator",
			Description: "Has full access to all resources",
			Permission:  "all",
		},
		{
			Name:        "User",
			Description: "Regular user with limited access",
			Permission:  "read",
		},
	}

	return db.Create(&roles).Error
}
