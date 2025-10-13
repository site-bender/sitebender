# Multi-stage build for Caddy + WebSocket handler

# Stage 1: Build WebSocket handler
FROM golang:1.21-alpine AS ws-builder

WORKDIR /build

# Copy go mod files
COPY websocket-handler/go.mod websocket-handler/go.sum* ./
RUN go mod download

# Copy source code
COPY websocket-handler/main.go ./

# Build the WebSocket handler
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o ws-handler .

# Stage 2: Final image with Caddy
FROM caddy:2.7-alpine

# Copy WebSocket handler from builder
COPY --from=ws-builder /build/ws-handler /usr/local/bin/ws-handler

# Copy Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# Create startup script to run both Caddy and WebSocket handler
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'ws-handler &' >> /start.sh && \
    echo 'caddy run --config /etc/caddy/Caddyfile --adapter caddyfile' >> /start.sh && \
    chmod +x /start.sh

# Expose HTTPS port
EXPOSE 8443

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --spider --no-check-certificate https://localhost:8443/health || exit 1

# Run startup script
CMD ["/start.sh"]
