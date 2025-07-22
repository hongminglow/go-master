package handlers

import (
	"backend/internal/database"
	"backend/internal/dto"
	"backend/internal/models"
	"backend/utils"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type CategoryHandler struct {
	db *gorm.DB
}

func NewCategoryHandler(db *gorm.DB) *CategoryHandler {
	return &CategoryHandler{db: db}
}

func (cat *CategoryHandler) CreateCategory(w http.ResponseWriter, r *http.Request) {
	var req dto.CreateCategoryRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.ErrorResponse(w, http.StatusBadRequest, "Invalid request")
		return
	}

	tagsJSON, err := json.Marshal(req.Tags)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to encode tags")
		return
	}

	category := models.Category{
		Name:        req.Name,
		Description: req.Description,
		Tags:        datatypes.JSON(tagsJSON),
	}

	if err := cat.db.Create(&category).Error; err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to create category")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(map[string]string{"message": "Category created successfully"}); err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to encode response")
		return
	}
}

func (cat *CategoryHandler) GetCategories(w http.ResponseWriter, r *http.Request) {
	var categories []models.Category

	if err := cat.db.Find(&categories).Error; err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to fetch categories")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(categories); err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to encode response")
		return
	}
}

func RegisterCategoryRoutes(router *mux.Router) {
	db := database.DB
	categoryHandler := NewCategoryHandler(db)
	router.HandleFunc("/api/categories", categoryHandler.CreateCategory).Methods("POST")
	router.HandleFunc("/api/categories", categoryHandler.GetCategories).Methods("GET")
}
