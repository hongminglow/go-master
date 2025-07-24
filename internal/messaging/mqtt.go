package messaging

// import (
// 	"fmt"
// 	"log"
// 	"os"

// 	mqtt "github.com/eclipse/paho.mqtt.golang"
// )

// var Client mqtt.Client

// // Connect initializes MQTT client connection
// func Connect() {
// 	broker := os.Getenv("MQTT_BROKER")
// 	if broker == "" {
// 		broker = "tcp://localhost:1883" // Default fallback
// 	}

// 	opts := mqtt.NewClientOptions()
// 	opts.AddBroker(broker)
// 	opts.SetClientID("go-backend-service")
// 	opts.SetUsername(os.Getenv("MQTT_USERNAME"))
// 	opts.SetPassword(os.Getenv("MQTT_PASSWORD"))

// 	// Set connection lost handler
// 	opts.SetConnectionLostHandler(func(client mqtt.Client, err error) {
// 		log.Printf("MQTT Connection lost: %v", err)
// 	})

// 	// Set connect handler
// 	opts.SetOnConnectHandler(func(client mqtt.Client) {
// 		log.Println("✅ Connected to MQTT broker")
// 	})

// 	Client = mqtt.NewClient(opts)
// 	if token := Client.Connect(); token.Wait() && token.Error() != nil {
// 		log.Printf("Failed to connect to MQTT broker: %v", token.Error())
// 	}
// }

// // PublishEvent publishes an event to a specific topic
// func PublishEvent(topic string, payload interface{}) error {
// 	if Client == nil || !Client.IsConnected() {
// 		return fmt.Errorf("MQTT client is not connected")
// 	}

// 	token := Client.Publish(topic, 0, false, payload)
// 	token.Wait()
// 	return token.Error()
// }

// // Disconnect closes the MQTT connection
// func Disconnect() {
// 	if Client != nil && Client.IsConnected() {
// 		Client.Disconnect(250)
// 		log.Println("MQTT client disconnected")
// 	}
// }
