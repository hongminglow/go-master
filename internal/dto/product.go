package dto

type CreateProductRequest struct {
	Name        string   `json:"name"`
	Brand       string   `json:"brand"`
	Description string   `json:"description"`
	Price       float64  `json:"price"`
	Quantity    uint32   `json:"quantity"`
	CategoryIDs []uint32 `json:"category_ids"`
}

type ProductResponse struct {
	ID          uint32      `json:"id"`
	Name        string      `json:"name"`
	Brand       string      `json:"brand"`
	Description string      `json:"description"`
	Price       float64     `json:"price"`
	Quantity    uint32      `json:"quantity"`
	ImageType   string      `json:"image_type"`
	Categories  interface{} `json:"categories"`
}

type ProductsListResponse struct {
	Products   []ProductResponse `json:"products"`
	Pagination PaginationMeta    `json:"pagination"`
}
