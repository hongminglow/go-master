// internal/validators/user.go
package validators

import (
	"errors"
	"regexp"
	"strings"
)

type CreateUserRequest struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

func (r *CreateUserRequest) Validate() error {
	if strings.TrimSpace(r.Username) == "" {
		return errors.New("username is required")
	}

	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	if !emailRegex.MatchString(r.Email) {
		return errors.New("invalid email format")
	}

	return nil
}
