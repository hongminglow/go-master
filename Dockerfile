# Dockerfile
FROM golang:1.24.4-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main cmd/api/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/main .
COPY --from=builder /app/.env* ./

CMD ["./main"]

# how that building the binary first will reduce the size of the final image
