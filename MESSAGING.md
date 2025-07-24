# Messaging System Configuration

This project supports multiple messaging systems for sending email notifications after user login. You can easily switch between different messaging systems by changing the `MESSAGE_TYPE` environment variable.

## Supported Message Types

### 1. **gRPC** (Default)

- **Environment Variable**: `MESSAGE_TYPE=grpc`
- **Configuration**: `GRPC_MAIL_ADDRESS=localhost:50051`
- **Use Case**: Direct communication with mail service running on your local machine
- **Consumer**: Your mail service should implement the gRPC server using `proto/mail.proto`

### 2. **Kafka**

- **Environment Variable**: `MESSAGE_TYPE=kafka`
- **Configuration**:
  - `KAFKA_BROKERS=kafka:9092` (for Docker) or `localhost:9092` (for local)
  - `KAFKA_TOPIC=mail-notify`
- **Use Case**: High-throughput message queue with persistence
- **Consumer**: Subscribe to the Kafka topic to receive messages

### 3. **MQTT** (Placeholder)

- **Environment Variable**: `MESSAGE_TYPE=mqtt`
- **Configuration**: `MQTT_BROKER=tcp://localhost:1883`
- **Status**: Code structure is ready, implementation can be activated when needed

## How to Switch Message Types

1. **Update `.env` file**:

   ```properties
   # To use gRPC (recommended for local development)
   MESSAGE_TYPE=grpc
   GRPC_MAIL_ADDRESS=localhost:50051

   # To use Kafka
   MESSAGE_TYPE=kafka
   KAFKA_BROKERS=localhost:9092
   KAFKA_TOPIC=mail-notify

   # To use MQTT (when implemented)
   MESSAGE_TYPE=mqtt
   MQTT_BROKER=tcp://localhost:1883
   ```

2. **Restart your application**:
   ```bash
   docker-compose down
   docker-compose up --build
   ```

## Message Format

All messaging systems use the same message format:

```
recipient@example.com|Subject text|Body text
```

Example:

```
hongminglow1212@gmail.com|Login Notification|You have successfully logged in at 2025-07-24T01:30:00Z
```

## File Structure

- `internal/messaging/grpc.go` - gRPC client implementation
- `internal/messaging/kafka.go` - Kafka client implementation (commented/preserved)
- `internal/messaging/mqtt.go` - MQTT client implementation (when needed)
- `internal/messaging/unified.go` - Unified interface for all messaging systems
- `proto/mail.proto` - Protocol Buffer definition for gRPC
- `proto/mail.pb.go` - Generated gRPC code
- `proto/mail_grpc.pb.go` - Generated gRPC service code

## Current Status

- ✅ **gRPC**: Fully implemented and tested
- ✅ **Kafka**: Implemented and preserved for future use
- 🔄 **MQTT**: Code structure ready, can be activated when needed

## Consumer Implementation

### For gRPC Consumer (External Service)

Your mail service should implement a gRPC server listening on port 50051:

```go
// Implement the MailServiceServer interface from proto/mail_grpc.pb.go
func (s *server) SendEmail(ctx context.Context, req *proto.EmailRequest) (*proto.EmailResponse, error) {
    // Send email using req.Recipient, req.Subject, req.Body
    return &proto.EmailResponse{
        Success: true,
        Message: "Email sent successfully",
    }, nil
}
```

### For Kafka Consumer

Subscribe to the `mail-notify` topic on `localhost:9092` (or `kafka:9092` if running in Docker).
