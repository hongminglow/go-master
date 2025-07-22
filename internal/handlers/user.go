package handlers

import (
	"backend/api"
	"backend/internal/database"
	"backend/internal/models"
	"backend/utils"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

// @Summary Get all users
// @Description Get all users with their roles
// @Tags users
// @Accept json
// @Produce json
// @Success 200 {object} api.APIResponse
// @Router /api/users [get]
type UserHandler struct {
	db *gorm.DB
}

func NewUserHandler(db *gorm.DB) *UserHandler {
	return &UserHandler{db: db}
}

func (user *UserHandler) GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []models.User
	if err := user.db.Preload("Role").Find(&users).Error; err != nil {
		resp := api.APIResponse{
			Data:      nil,
			Message:   "Failed to fetch users",
			Success:   false,
			Timestamp: time.Now().Format(time.RFC3339),
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to encode error response")
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
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to encode error response")
		return
	}
}

func RegisterUserRoutes(router *mux.Router) {
	db := database.DB
	userHandler := NewUserHandler(db)
	router.HandleFunc("/api/users", userHandler.GetUsers).Methods("GET")
}
