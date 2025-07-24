package handlers

import (
	"backend/config"
	"backend/internal/database"
	"backend/internal/dto"
	"backend/internal/messaging"
	"backend/internal/middleware"
	"backend/internal/models"
	"backend/utils"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthHandler struct {
	db *gorm.DB
}

func NewAuthHandler(db *gorm.DB) *AuthHandler {
	return &AuthHandler{db: db}
}

func (auth *AuthHandler) AuthenticateUser(username, password string) bool {
	var user models.User

	if err := auth.db.Where("username = ?", username).First(&user).Error; err != nil {
		return false
	}
	// Compare the hashed password using bcrypt
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return err == nil
}

// @Summary Authenticate user
// @Description Authenticates user and returns JWT token
// @Tags auth
// @Accept json
// @Produce json
// @Param credentials body dto.AuthenticateUserRequest true "User credentials"
// @Success 200 {object} map[string]string
// @Failure 400,401 {string} string
// @Router /api/login [post]
func (auth *AuthHandler) LoginHandler(w http.ResponseWriter, r *http.Request) {
	var creds dto.AuthenticateUserRequest
	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		utils.ErrorResponse(w, http.StatusBadRequest, "Invalid request")
		return
	}

	if !auth.AuthenticateUser(creds.Username, creds.Password) {
		utils.ErrorResponse(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	// // Create JWT token
	// token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
	// 	"username": creds.Username,
	// 	"exp":      time.Now().Add(time.Hour * 24).Unix(),
	// })
	if err := auth.db.Where("username = ?", creds.Username).First(&user).Error; err != nil {
		utils.ErrorResponse(w, http.StatusBadRequest, "User not found")
		return
	}

	tokenString, err := middleware.GenerateToken(user.ID, user.Username, user.Email, config.GlobalConfig.JWT.ExpiresInHour)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Could not create token")
		return
	}

	// Publish login event via configured messaging system (Kafka/MQTT/gRPC)
	log.Println("🔄 Starting messaging event publishing process...")

	subject := "Login Notification"
	body := "You have successfully logged in at " + time.Now().Format(time.RFC3339)
	eventPayload := "hongminglow1212@gmail.com" + "|" + subject + "|" + body

	// For Kafka/MQTT, we use topic. For gRPC, topic is ignored but kept for consistency
	topic := os.Getenv("KAFKA_TOPIC") // fallback topic for Kafka/MQTT
	if topic == "" {
		topic = "mail-notify"
	}

	log.Printf("� Event payload: %s", eventPayload)
	log.Printf("🚀 Publishing event via messaging system to topic %s", topic)

	go func() {
		err = messaging.SendMessage(topic, eventPayload)
		if err != nil {
			log.Printf("❌ Failed to send message via messaging system: %v", err)
		} else {
			log.Println("✅ Message sent successfully via messaging system!")
		}
	}()

	resp := map[string]string{"token": tokenString}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to encode response")
		return
	}
}

// @Summary Register User
// @Description Register a new user with default role
// @Tags auth
// @Accept json
// @Product json
// @Param user body dto.RegisterUserRequest true "User details"
// @Success 200 {object} map[string]string
// @Failure 400,500 {string} string
// @Router /api/register [post]
func (auth *AuthHandler) RegisterUserHandler(w http.ResponseWriter, r *http.Request) {
	var req dto.RegisterUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.ErrorResponse(w, http.StatusBadRequest, "Invalid request")
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to hash password")
		return
	}

	// Check if the default role exists
	var role models.Role
	if err := auth.db.Where("name = ?", "Administrator").First(&role).Error; err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Default role is not found")
		return
	}

	// Save user to DB
	user := models.User{
		Username:  req.Username,
		Password:  string(hashedPassword),
		Nickname:  req.Nickname,
		Email:     req.Email,
		Address:   req.Address,
		RoleID:    role.ID,
		CreatedAt: time.Now(),
	}
	if err := auth.db.Create(&user).Error; err != nil {
		utils.ErrorResponse(w, http.StatusInternalServerError, "Failed to create user")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully"}); err != nil {
		utils.ErrorResponse(w, http.StatusBadRequest, "Failed to encode response")
		return
	}
}

func RegisterAuthRoutes(router *mux.Router) {
	db := database.DB
	authHandler := NewAuthHandler(db)
	router.HandleFunc("/api/login", authHandler.LoginHandler).Methods("POST")
	router.HandleFunc("/api/register", authHandler.RegisterUserHandler).Methods("POST")
}
