package version

import (
	"encoding/json"
	"net/http"
)

const (
	Version   = "1.0.1"
	BuildDate = "2025-07-18"
)

func VersionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(map[string]string{
		"version":   Version,
		"buildDate": BuildDate,
	}); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
