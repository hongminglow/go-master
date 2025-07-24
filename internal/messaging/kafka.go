package messaging

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/segmentio/kafka-go"
)

var Writer *kafka.Writer

// Connect initializes Kafka producer connection
func Connect() {
	brokers := os.Getenv("KAFKA_BROKERS")
	if brokers == "" {
		brokers = "localhost:9092" // Default fallback
	}

	log.Printf("🔄 Connecting to Kafka brokers: %s", brokers)

	// Split comma-separated brokers
	brokerList := strings.Split(brokers, ",")

	// Create Kafka writer (producer)
	Writer = &kafka.Writer{
		Addr:     kafka.TCP(brokerList...),
		Balancer: &kafka.LeastBytes{},
	}

	// Test connection by trying to get metadata
	conn, err := kafka.Dial("tcp", brokerList[0])
	if err != nil {
		log.Printf("❌ Failed to connect to Kafka: %v", err)
		return
	}
	defer conn.Close()

	log.Println("✅ Connected to Kafka broker successfully")
}

// PublishEvent publishes an event to a specific topic
func PublishEvent(topic string, payload interface{}) error {
	log.Printf("🚀 Attempting to publish to Kafka - Topic: %s", topic)

	if Writer == nil {
		log.Println("❌ Kafka writer is nil - connection not initialized")
		return fmt.Errorf("Kafka writer is not initialized")
	}

	// Convert payload to string if it's not already
	var message string
	switch v := payload.(type) {
	case string:
		message = v
	case []byte:
		message = string(v)
	default:
		message = fmt.Sprintf("%v", v)
	}

	log.Printf("📝 Message content: %s", message)

	// Create Kafka message
	kafkaMessage := kafka.Message{
		Topic: topic,
		Value: []byte(message),
	}

	// Write message to Kafka with context timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := Writer.WriteMessages(ctx, kafkaMessage)
	if err != nil {
		log.Printf("❌ Failed to write message to Kafka: %v", err)
		return err
	}

	log.Printf("✅ Message sent to Kafka topic %s successfully: %s", topic, message)
	return nil
}

// Disconnect closes the Kafka connection
func Disconnect() {
	if Writer != nil {
		if err := Writer.Close(); err != nil {
			log.Printf("Error closing Kafka writer: %v", err)
		}
		log.Println("Kafka writer closed")
	}
}
