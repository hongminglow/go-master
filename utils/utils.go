package utils

import "net/http"

func ErrorResponse(w http.ResponseWriter, code int, message string) {
	http.Error(w, message, code)
}
