# Docker Development Infrastructure

Production-like development environment with HTTP/3 and HTTP/2 servers.

## Quick Start

```bash
# From project root
deno task dev:docker

# Or from this directory
docker-compose up
```

## Services

### Quinn HTTP/3 + SSE (Primary)
- **URL**: `https://localhost:4433`
- **Protocol**: HTTP/3 over QUIC (UDP)
- **Hot Reload**: Server-Sent Events at `/events`
- **Best for**: Modern browsers (Chrome, Firefox, Edge)

### Caddy HTTP/2 + WebSocket (Fallback)
- **URL**: `https://localhost:8443`
- **Protocol**: HTTP/2 over TLS (TCP)
- **Hot Reload**: WebSocket at `/ws`
- **Best for**: Safari, older browsers, networks blocking UDP

## Client Behavior

The hot-reload client automatically:
1. Tries HTTP/3 + SSE first (3-second timeout)
2. Falls back to HTTP/2 + WebSocket if needed
3. Reconnects automatically if disconnected

This provides 99.9% browser compatibility with optimal performance.

## Setup

### 1. Generate TLS Certificates

```bash
# Install mkcert (if not already installed)
# macOS:
brew install mkcert nss

# Linux:
apt install mkcert nss-tools

# Windows (with Chocolatey):
choco install mkcert

# Generate certificates
cd ops
mkcert -install
mkcert -cert-file certs/app.localhost.pem -key-file certs/app.localhost-key.pem app.localhost localhost 127.0.0.1 ::1
```

### 2. Start Services

```bash
docker-compose up
```

First build takes 2-3 minutes (Rust compilation for Quinn). Subsequent starts are faster.

## Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs
docker-compose logs -f dev-server
docker-compose logs -f caddy-fallback

# Stop services
docker-compose down

# Rebuild after changes
docker-compose build
docker-compose up --build
```

## Troubleshooting

### Port conflicts

If ports 4433 or 8443 are in use:

```bash
# Find process using port
lsof -i :4433
lsof -i :8443

# Kill process
kill -9 <PID>
```

### Certificate errors

```bash
# Regenerate certificates
cd ops
rm certs/*.pem
mkcert -cert-file certs/app.localhost.pem -key-file certs/app.localhost-key.pem app.localhost localhost 127.0.0.1 ::1

# Ensure mkcert root CA is trusted
mkcert -install
```

### Services won't start

```bash
# Check Docker is running
docker ps

# View detailed logs
docker-compose logs

# Reset everything
docker-compose down -v
docker-compose up --build
```

## File Structure

```
.sitebender/
├── dev-server/          # Quinn HTTP/3 server (Rust)
│   ├── server.rs
│   ├── Cargo.toml
│   ├── Dockerfile
│   └── README.md
├── caddy/               # Caddy HTTP/2 server (Go)
│   ├── Caddyfile
│   ├── websocket-handler/
│   │   └── main.go
│   ├── Dockerfile
│   └── README.md
├── ops/
│   └── certs/           # TLS certificates (mkcert)
│       ├── app.localhost.pem
│       └── app.localhost-key.pem
├── docker-compose.yml
└── README.md            # This file
```

## Performance

| Metric | Quinn (HTTP/3) | Caddy (HTTP/2) |
|--------|----------------|----------------|
| Startup time | ~2s | ~1s |
| Memory usage | ~20MB | ~30MB |
| Hot reload latency | <10ms | <20ms |
| Browser support | ~80% | 99.9% |

## Learn More

- [Quinn Dev Server Documentation](./dev-server/README.md)
- [Caddy Fallback Server Documentation](./caddy/README.md)
- [Hot Reload Client Documentation](../hot-reload-client/README.md)
