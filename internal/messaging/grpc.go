package messaging

import (
	"backend/proto"
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var grpcClient proto.MailServiceClient
var grpcConn *grpc.ClientConn

// ConnectGRPC initializes gRPC client connection for mail service
func ConnectGRPC() {
	grpcAddress := os.Getenv("GRPC_MAIL_ADDRESS")
	if grpcAddress == "" {
		grpcAddress = "host.docker.internal:50051" // Default fallback for Docker to host
	}

	log.Printf("🔄 Connecting to gRPC Mail Service: %s", grpcAddress)

	// Create connection with insecure credentials (for development)
	var err error
	grpcConn, err = grpc.NewClient(grpcAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Printf("❌ Failed to connect to gRPC server: %v", err)
		return
	}

	// Create client
	grpcClient = proto.NewMailServiceClient(grpcConn)

	log.Println("✅ Connected to gRPC Mail Service successfully")
}

// SendEmailGRPC sends email notification via gRPC
func SendEmailGRPC(payload string) error {
	log.Printf("🚀 Attempting to send email via gRPC")

	if grpcClient == nil {
		log.Println("❌ gRPC client is nil - connection not initialized")
		return fmt.Errorf("gRPC client is not initialized")
	}

	// Parse the payload: "recipient|subject|body"
	parts := strings.Split(payload, "|")
	if len(parts) != 3 {
		return fmt.Errorf("invalid payload format, expected 'recipient|subject|body'")
	}

	recipient := parts[0]
	subject := parts[1]
	body := parts[2]

	log.Printf("📧 Email details - To: %s, Subject: %s", recipient, subject)

	// Create gRPC request
	request := &proto.MailRequest{
		Recipient: recipient,
		Subject:   subject,
		Body:      body,
	}

	// Send request with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	response, err := grpcClient.SendMail(ctx, request)
	if err != nil {
		log.Printf("❌ Failed to send email via gRPC: %v", err)
		log.Printf("🔍 Error type: %T", err)

		// Let's also try to understand what might be available
		log.Printf("💡 Suggestion: Check if the external gRPC service uses a different:")
		log.Printf("   - Service name (currently using 'mail.MailService')")
		log.Printf("   - Method name (currently using 'SendMail')")
		log.Printf("   - Message format (currently using MailRequest/MailResponse)")
		log.Printf("   - Field names (currently using 'recipient', 'subject', 'body')")

		return err
	}

	if response.Success {
		log.Printf("✅ Email sent successfully via gRPC: %s", response.Message)
	} else {
		log.Printf("⚠️  Email sending failed via gRPC: %s", response.Message)
		return fmt.Errorf("email sending failed: %s", response.Message)
	}

	return nil
}

// DisconnectGRPC closes the gRPC connection
func DisconnectGRPC() {
	if grpcConn != nil {
		if err := grpcConn.Close(); err != nil {
			log.Printf("Error closing gRPC connection: %v", err)
		}
		log.Println("gRPC connection closed")
	}
}
