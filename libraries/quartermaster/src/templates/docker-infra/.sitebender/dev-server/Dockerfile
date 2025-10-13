# Multi-stage build for Rust WebTransport server
FROM rust:1.83-alpine AS builder

# Install build dependencies
RUN apk add --no-cache musl-dev

WORKDIR /build

# Copy manifests
COPY Cargo.toml ./

# Create a dummy main.rs to cache dependencies
RUN mkdir src && \
    echo "fn main() {}" > src/main.rs && \
    cargo build --release && \
    rm -rf src

# Copy actual source code
COPY server.rs src/main.rs

# Build for release
RUN touch src/main.rs && \
    cargo build --release

# Runtime stage
FROM alpine:latest

# Install runtime dependencies
RUN apk add --no-cache ca-certificates

# Copy binary from builder
COPY --from=builder /build/target/release/webtransport-server /usr/local/bin/server

# Expose QUIC port (UDP)
EXPOSE 4433/udp

# Run server
CMD ["server"]
