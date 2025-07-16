# Makefile
.PHONY: run build test clean dev install docker-build docker-run migrate seed

run:
    go run cmd/api/main.go

build:
    go build -o bin/backend cmd/api/main.go

test:
    go test ./... -v

test-coverage:
    go test ./... -coverprofile=coverage.out
    go tool cover -html=coverage.out

clean:
    rm -rf bin/
    rm -f coverage.out

dev:
    air

install:
    go mod tidy
    go mod download

docker-build:
    docker build -t backend .

docker-run:
    docker-compose up -d

docker-down:
    docker-compose down

migrate:
    go run cmd/migrate/main.go

seed:
    go run cmd/seed/main.go

lint:
    golangci-lint run

security-check:
    gosec ./...
