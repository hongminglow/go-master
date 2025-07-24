package logger

import (
	"io"
	"log"
	"log/slog"
	"os"
	"path/filepath"
	"sync"
	"time"
)

var Logger *slog.Logger
var logFile *os.File
var logMutex sync.Mutex

func InitFileLogger() {
	logMutex.Lock()
	defer logMutex.Unlock()

	logDir := "logs"
	if _, err := os.Stat(logDir); os.IsNotExist(err) {
		_ = os.Mkdir(logDir, 0755)
	}

	logFileName := filepath.Join(logDir, "server-"+time.Now().Format("2006-01-02")+".log")
	var err error
	logFile, err = os.OpenFile(logFileName, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("Failed to open log file: %v", err)
	}

	// Use MultiWriter to write to both file and stdout for debugging
	multiWriter := io.MultiWriter(logFile, os.Stdout)
	log.SetOutput(multiWriter)

	log.Printf("📝 Logging initialized - writing to %s", logFileName)
}

// CloseLogFile closes the log file if it's open
func CloseLogFile() {
	logMutex.Lock()
	defer logMutex.Unlock()

	if logFile != nil {
		logFile.Close()
		logFile = nil
	}
}
