package messaging

import (
	"fmt"
	"log"
	"os"
	"strings"
)

// MessageType represents the type of messaging system to use
type MessageType string

const (
	TypeKafka MessageType = "kafka"
	TypeMQTT  MessageType = "mqtt"
	TypeGRPC  MessageType = "grpc"
)

// GetMessageType returns the configured message type from environment
func GetMessageType() MessageType {
	msgType := strings.ToLower(os.Getenv("MESSAGE_TYPE"))
	log.Printf("🔍 Raw MESSAGE_TYPE from env: '%s'", msgType)
	log.Printf("🔍 All relevant env vars - MESSAGE_TYPE: '%s', GRPC_MAIL_ADDRESS: '%s', GRPC_ENABLED: '%s'",
		os.Getenv("MESSAGE_TYPE"), os.Getenv("GRPC_MAIL_ADDRESS"), os.Getenv("GRPC_ENABLED"))

	switch msgType {
	case "kafka":
		log.Printf("🔍 Detected MESSAGE_TYPE: kafka")
		return TypeKafka
	case "mqtt":
		log.Printf("🔍 Detected MESSAGE_TYPE: mqtt")
		return TypeMQTT
	case "grpc":
		log.Printf("🔍 Detected MESSAGE_TYPE: grpc")
		return TypeGRPC
	default:
		log.Printf("🔍 MESSAGE_TYPE '%s' not recognized, defaulting to gRPC", msgType)
		return TypeGRPC // Default to gRPC
	}
}

// InitializeMessaging initializes the appropriate messaging system
func InitializeMessaging() {
	msgType := GetMessageType()
	log.Printf("🔧 Initializing messaging system: %s", msgType)

	switch msgType {
	case TypeKafka:
		Connect() // Kafka connection
	case TypeMQTT:
		// ConnectMQTT() // Would call MQTT connection if implemented
		log.Println("MQTT messaging not currently active")
	case TypeGRPC:
		ConnectGRPC() // gRPC connection
	default:
		log.Printf("⚠️  Unknown message type: %s, defaulting to gRPC", msgType)
		ConnectGRPC()
	}
}

// SendMessage sends a message using the configured messaging system
func SendMessage(topic string, payload interface{}) error {
	log.Printf("🚀 SendMessage called with topic: '%s', payload: %+v (type: %T)", topic, payload, payload)

	msgType := GetMessageType()
	log.Printf("🔄 Resolved messaging system type: %v", msgType)

	// Convert payload to string
	var message string
	switch v := payload.(type) {
	case string:
		message = v
		log.Printf("🔄 Payload converted from string: '%s'", message)
	case []byte:
		message = string(v)
		log.Printf("🔄 Payload converted from []byte: '%s'", message)
	default:
		message = fmt.Sprintf("%v", v)
		log.Printf("🔄 Payload converted from %T: '%s'", v, message)
	}

	log.Printf("📨 Sending message via %v: %s", msgType, message)

	switch msgType {
	case TypeKafka:
		log.Printf("📨 Routing to Kafka messaging")
		return PublishEvent(topic, message)
	case TypeMQTT:
		log.Printf("📨 Routing to MQTT messaging (not implemented)")
		// return PublishEventMQTT(topic, message) // Would call MQTT publish if implemented
		return fmt.Errorf("MQTT messaging not currently implemented")
	case TypeGRPC:
		log.Printf("📨 Routing to gRPC messaging")
		return SendEmailGRPC(message)
	default:
		err := fmt.Errorf("unsupported message type: %v", msgType)
		log.Printf("❌ %s", err.Error())
		return err
	}
}

// DisconnectMessaging closes the appropriate messaging connection
func DisconnectMessaging() {
	msgType := GetMessageType()
	log.Printf("🔌 Disconnecting messaging system: %s", msgType)

	switch msgType {
	case TypeKafka:
		Disconnect() // Kafka disconnect
	case TypeMQTT:
		// DisconnectMQTT() // Would call MQTT disconnect if implemented
		log.Println("MQTT disconnect not needed")
	case TypeGRPC:
		DisconnectGRPC() // gRPC disconnect
	}
}
