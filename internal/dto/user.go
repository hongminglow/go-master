package dto

type RegisterUserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Nickname string `json:"nickname"`
	Email    string `json:"email"`
	Address  string `json:"address"`
}

type AuthenticateUserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
