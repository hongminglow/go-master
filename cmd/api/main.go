package main

import (
	"backend/internal/logger"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"backend/config"
	_ "backend/docs"
	"backend/internal/cache"
	"backend/internal/database"
	"backend/internal/handlers"
	"backend/internal/messaging"
	"backend/internal/middleware"
	"backend/internal/websocket"

	gorillahandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	httpSwagger "github.com/swaggo/http-swagger"
)

func main() {
	logger.InitFileLogger()
	log.Println("✅ Logger initialized - logging to daily file")

	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	// Load config
	cfg := config.Load()

	// Connect to database
	database.Connect()

	// Initialize Redis
	cache.InitRedis()

	// Initialize Messaging (Kafka/MQTT/gRPC based on config)
	messaging.InitializeMessaging()

	// Create router
	router := mux.NewRouter()

	// Set JWT secret for middleware
	middleware.SetJWTSecret(cfg.JWT.SecretKey)

	//Setup scheduler
	// scheduler.Start()

	// Setup WebSocket handler
	go websocket.HandleMessages()

	// Start WebSocket pinger
	websocket.StartPinger()

	// Routes
	router.HandleFunc("/", homeHandler).Methods("GET")
	router.HandleFunc("/api/health", healthHandler).Methods("GET")
	// Socket route
	router.HandleFunc("/ws/testing", websocket.HandleWebSocket)
	// Swagger route
	router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)
	router.Use(middleware.AuthMiddleware)
	router.Use(middleware.LoggingMiddleware)
	router.Use(middleware.CacheMiddleware)

	// Register auth routes
	handlers.RegisterAuthRoutes(router)

	// Register user routes
	handlers.RegisterUserRoutes(router)

	//Register category routes
	handlers.RegisterCategoryRoutes(router)

	// Register product routes
	handlers.RegisterProductRoutes(router)

	// CORS setup
	corsHandler := gorillahandlers.CORS(
		gorillahandlers.AllowedOrigins(cfg.Server.AllowedOrigins),
		gorillahandlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		gorillahandlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
		gorillahandlers.AllowCredentials(),
	)(router)

	// Start server
	port := cfg.Server.Port
	if port == "" {
		port = "3001"
	}

	fmt.Printf("🚀 Server running on http://localhost:%s\n", port)

	// Create HTTP server
	server := &http.Server{
		Addr:    ":" + port,
		Handler: corsHandler,
	}

	// Channel to listen for interrupt signal
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	// Start server in a goroutine
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()

	// Wait for interrupt signal
	<-stop
	log.Println("Shutting down server...")

	// Graceful shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Disconnect messaging client
	messaging.DisconnectMessaging()

	// Close log file
	logger.CloseLogFile()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited")
}

// Route handlers
func homeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if _, err := w.Write([]byte(`{"message": "Go Backend is running!"}`)); err != nil {
		log.Printf("failed to write response: %v", err)
	}
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if _, err := w.Write([]byte(`{"status": "healthy", "database": "connected"}`)); err != nil {
		log.Printf("failed to write response: %v", err)
	}
}
