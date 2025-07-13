# Makefile (like npm scripts)
.PHONY: run build test clean dev install

run:
	go run cmd/api/main.go

build:
	go build -o bin/backend cmd/api/main.go

test:
	go test ./...

clean:
	rm -rf bin/

dev:
	air

install:
	go mod tidy
	go mod download
