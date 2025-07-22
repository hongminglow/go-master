package handlers

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
	"gorm.io/gorm"

	"backend/internal/database"
	productDto "backend/internal/dto"
	"backend/internal/models"
	"backend/utils"
)

type ProductHandler struct {
	db *gorm.DB
}

func NewProductHandler(db *gorm.DB) *ProductHandler {
	return &ProductHandler{db: db}
}

// CreateProduct creates a new product with image upload and category associations
func (prod *ProductHandler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	// Parse multipart form (32 MB max)
	err := r.ParseMultipartForm(32 << 20)
	if err != nil {
		utils.ErrorResponse(w, http.StatusBadRequest, "Failed to parse multipart form")
		return
	}

	// Extract form fields
	name := r.FormValue("name")
	brand := r.FormValue("brand")
	description := r.FormValue("description")
	priceStr := r.FormValue("price")
	quantityStr := r.FormValue("quantity")
	categoryIDsStr := r.FormValue("category_ids") // comma-separated IDs

	// Validate required fields
	if name == "" || brand == "" || priceStr == "" || quantityStr == "" {
		utils.ErrorResponse(w, http.StatusBadRequest, "Missing required fields")
		return
	}

	// Parse numeric fields
	price, err := strconv.ParseFloat(priceStr, 64)
	if err != nil {
		utils.ErrorResponse(w, http.StatusBadRequest, "Invalid price format")
		return
	}

	quantity, err := strconv.ParseUint(quantityStr, 10, 32)
	if err != nil {
		utils.ErrorResponse(w, http.StatusBadRequest, "Invalid quantity format")
		return
	}

	// Parse category IDs
	var categoryIDs []uint32
	if categoryIDsStr != "" {
		idStrings := strings.Split(categoryIDsStr, ",")
		for _, idStr := range idStrings {
			idStr = strings.TrimSpace(idStr)
			if idStr != "" {
				id, err := strconv.ParseUint(idStr, 10, 32)
				if err != nil {
					utils.ErrorResponse(w, http.StatusBadRequest, "Invalid category ID format")
					return
				}
				categoryIDs = append(categoryIDs, uint32(id))
			}
		}
	}

	// Handle image upload
	var imageData []byte
	var imageType string
	file, header, err := r.FormFile("image")
	if err != nil && err != http.ErrMissingFile {
		utils.ErrorResponse(w, http.StatusBadRequest, "Failed to get image file")
		return
	}

	if file != nil {
		defer file.Close()

		// Get image type from header
		if header != nil {
			imageType = header.Header.Get("Content-Type")
		}

		// Read image data
		imageData, err = io.ReadAll(file)
		if err != nil {
			utils.ErrorResponse(w, http.StatusBadRequest, "Failed to read image file")
			return
		}

		// Validate image size (max 5MB)
		if len(imageData) > 5*1024*1024 {
			utils.ErrorResponse(w, http.StatusBadRequest, "Image file too large (max 5MB)")
			return
		}
	}

	// Start database transaction
	tx := prod.db.Begin()
	if tx.Error != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to start transaction")
		return
	}
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Validate categories exist
	if len(categoryIDs) > 0 {
		var count int64
		if err := tx.Model(&models.Category{}).Where("id IN ?", categoryIDs).Count(&count).Error; err != nil {
			tx.Rollback()
			utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to validate categories")
			return
		}
		if count != int64(len(categoryIDs)) {
			tx.Rollback()
			utils.ErrorResponse(w, http.StatusBadRequest, "One or more category IDs are invalid")
			return
		}
	}

	// Create product
	product := models.Product{
		Name:        name,
		Brand:       brand,
		Description: description,
		Price:       price,
		Quantity:    uint32(quantity),
		Image:       imageData,
		ImageType:   imageType,
	}

	if err := tx.Create(&product).Error; err != nil {
		tx.Rollback()
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to create product")
		return
	}

	// Create product-category associations
	for _, categoryID := range categoryIDs {
		association := models.ProductCategory{
			ProductID:  product.ID,
			CategoryID: categoryID,
		}
		if err := tx.Create(&association).Error; err != nil {
			tx.Rollback()
			utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to associate product with categories")
			return
		}
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to commit transaction")
		return
	}

	// Return success response
	response := map[string]any{
		"message":    "Product created successfully",
		"product_id": product.ID,
		"name":       product.Name,
		"brand":      product.Brand,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to encode response")
	}
}

// GetProduct retrieves a product by ID with categories
func (prod *ProductHandler) GetProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]

	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		utils.ErrorResponse(w, http.StatusBadRequest, "Invalid product ID")
		return
	}

	var product models.Product
	if err := prod.db.Preload("Categories").First(&product, uint32(id)).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			utils.ErrorResponse(w, http.StatusNotFound, "Product not found")
		} else {
			utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to get product")
		}
		return
	}

	// Return product data (excluding image data in response)
	response := productDto.ProductResponse{
		ID:          product.ID,
		Name:        product.Name,
		Brand:       product.Brand,
		Description: product.Description,
		Price:       product.Price,
		Quantity:    product.Quantity,
		ImageType:   product.ImageType,
		Categories:  product.Categories,
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to encode response")
	}
}

// GetProductImage serves the product image
func (prod *ProductHandler) GetProductImage(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]

	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		utils.ErrorResponse(w, http.StatusBadRequest, "Invalid product ID")
		return
	}

	var product models.Product
	if err := prod.db.Select("image, image_type").First(&product, uint32(id)).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			utils.ErrorResponse(w, http.StatusNotFound, "Product not found")
		} else {
			utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to get product image")
		}
		return
	}

	if len(product.Image) == 0 {
		utils.ErrorResponse(w, http.StatusNotFound, "No image found for this product")
		return
	}

	// Use stored content type or detect it
	contentType := product.ImageType
	if contentType == "" {
		contentType = http.DetectContentType(product.Image)
	}

	w.Header().Set("Content-Type", contentType)
	w.Header().Set("Content-Length", strconv.Itoa(len(product.Image)))
	w.WriteHeader(http.StatusOK)
	if _, err := w.Write(product.Image); err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to write image")
	}
}

// GetProducts retrieves all products with pagination
func (prod *ProductHandler) GetProducts(w http.ResponseWriter, r *http.Request) {
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}

	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit < 1 || limit > 100 {
		limit = 10
	}

	offset := (page - 1) * limit

	var products []models.Product
	var total int64

	// Count total products
	if err := prod.db.Model(&models.Product{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to count products")
		return
	}

	// Get products with categories
	if err := prod.db.Preload("Categories").Limit(limit).Offset(offset).Find(&products).Error; err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to get products")
		return
	}

	// Format response (exclude image data)
	var productList []productDto.ProductResponse
	for _, product := range products {
		productList = append(productList, productDto.ProductResponse{
			ID:          product.ID,
			Name:        product.Name,
			Brand:       product.Brand,
			Description: product.Description,
			Price:       product.Price,
			Quantity:    product.Quantity,
			ImageType:   product.ImageType,
			Categories:  product.Categories,
		})
	}

	response := productDto.ProductsListResponse{
		Products: productList,
		Pagination: productDto.PaginationMeta{
			Page:       page,
			Limit:      limit,
			Total:      total,
			TotalPages: (total + int64(limit) - 1) / int64(limit),
		},
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to encode response")
	}
}

// RegisterProductRoutes registers all product-related routes
func RegisterProductRoutes(router *mux.Router) {
	// Get database instance
	db := database.DB
	productHandler := NewProductHandler(db)

	// Product routes
	router.HandleFunc("/api/products", productHandler.CreateProduct).Methods("POST")
	router.HandleFunc("/api/products", productHandler.GetProducts).Methods("GET")
	router.HandleFunc("/api/products/{id}", productHandler.GetProduct).Methods("GET")
	router.HandleFunc("/api/products/{id}/image", productHandler.GetProductImage).Methods("GET")
}
