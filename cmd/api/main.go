package main

import (
	"fmt"
	"log"
	"net/http"

	"backend/config"
	"backend/internal/database"
	"backend/internal/handlers"

	gorillahandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	// Load config
	cfg := config.Load()

	// Connect to database
	database.Connect()

	// Create router
	router := mux.NewRouter()

	// Routes
	router.HandleFunc("/", homeHandler).Methods("GET")
	router.HandleFunc("/api/health", healthHandler).Methods("GET")
	router.HandleFunc("/api/users", handlers.UserHandler).Methods("GET")

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
	log.Fatal(http.ListenAndServe(":"+port, corsHandler))
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
