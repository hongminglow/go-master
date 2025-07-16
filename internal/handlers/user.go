package handlers

import (
	"backend/api"
	"backend/internal/database"
	"backend/internal/models"
	"encoding/json"
	"net/http"
	"time"
)

// Add swagger comments to handlers
// @Summary Get all users
// @Description Get all users with their roles
// @Tags users
// @Accept json
// @Produce json
// @Success 200 {object} api.APIResponse
// @Router /api/users [get]
func UserHandler(w http.ResponseWriter, r *http.Request) {
	var users []models.User
	if err := database.DB.Preload("Role").Find(&users).Error; err != nil {
		resp := api.APIResponse{
			Data:      nil,
			Message:   "Failed to fetch users",
			Success:   false,
			Timestamp: time.Now().Format(time.RFC3339),
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			http.Error(w, "Failed to encode error response", http.StatusInternalServerError)
			return
		}
		return
	}
	resp := api.APIResponse{
		Success:   true,
		Data:      users,
		Message:   "",
		Timestamp: time.Now().Format(time.RFC3339),
	}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, "Failed to encode error response", http.StatusInternalServerError)
		return
	}
}
