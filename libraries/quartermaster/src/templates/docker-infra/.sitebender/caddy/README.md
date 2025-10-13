# Caddy HTTP/2 + WebSocket Fallback Server

HTTP/2 server with WebSocket support for browsers without HTTP/3 capability.

## Features

- ✅ **HTTP/2** - Standard HTTPS with h2 support
- ✅ **WebSocket** - Real-time hot reload via `/ws` endpoint
- ✅ **Static file serving** - Serves files from `/app/dist`
- ✅ **Hot reload** - File watcher triggers browser refresh via WebSocket
- ✅ **Auto fallback** - Client automatically falls back when HTTP/3 unavailable
- ✅ **mkcert integration** - Uses your existing TLS certificates
- ✅ **Universal browser support** - Works in ALL browsers including Safari

## Architecture

```
┌──────────────────────────────────────┐
│  Client (Any Browser)                │
│  - HTTPS/HTTP/2 requests             │
│  - WebSocket connection              │
└──────────────┬───────────────────────┘
               │ HTTPS/TCP
               ▼
┌──────────────────────────────────────┐
│  Caddy HTTP/2 Server                 │
│  - Static file serving               │
│  - Reverse proxy to WS handler       │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  WebSocket Handler (Go)              │
│  - File watcher (fsnotify)           │
│  - WebSocket hub                     │
│  - Reload broadcasts                 │
└──────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  /app/dist (volume mount)            │
│  - Your static HTML/CSS/JS files     │
└──────────────────────────────────────┘
```

## Quick Start

### 1. Build and run

```bash
cd infrastructure
docker-compose up caddy-fallback
```

First build takes 2-3 minutes (Go compilation). Subsequent builds are faster with Docker layer caching.

### 2. Access the server

**HTTPS endpoint:**
```
https://localhost:8443
```

**WebSocket endpoint (hot reload):**
```
wss://localhost:8443/ws
```

**Health check:**
```
https://localhost:8443/health
```

## Client Usage

### WebSocket Connection

```javascript
// In your client JavaScript
const ws = new WebSocket('wss://localhost:8443/ws')

ws.onopen = () => {
  console.log('WebSocket connected')
}

ws.onmessage = (event) => {
  const message = JSON.parse(event.data)
  if (message.type === 'reload') {
    console.log('Hot reload triggered')
    window.location.reload()
  }
}

ws.onerror = (error) => {
  console.error('WebSocket error:', error)
}

ws.onclose = () => {
  console.log('WebSocket disconnected')
  // Implement reconnection logic
}
```

### Message Format

The WebSocket server sends messages in JSON format:

```json
{
  "type": "reload",
  "data": {}
}
```

## Browser Compatibility

- ✅ **Chrome/Edge** - Full support (will prefer HTTP/3 if available)
- ✅ **Firefox** - Full support (will prefer HTTP/3 if available)
- ✅ **Safari** - Full support (primary path for Safari)
- ✅ **Internet Explorer 11** - WebSocket support (no HTTP/2)

## Configuration

### Change port

Edit `Caddyfile`:
```
:9443 {  # Change from 8443 to 9443
  # ... rest of config
}
```

Edit `docker-compose.yml`:
```yaml
ports:
  - "9443:9443"  # Match the Caddyfile port
```

### Change WebSocket port

Edit `Caddyfile`:
```
handle /ws {
  reverse_proxy localhost:9002  # Change from 9001 to 9002
}
```

Edit `websocket-handler/main.go`:
```go
const wsPort = ":9002"  // Change from 9001
```

### Custom certificates

Edit `docker-compose.yml`:
```yaml
volumes:
  - /path/to/cert.pem:/certs/app.localhost.pem:ro
  - /path/to/key.pem:/certs/app.localhost-key.pem:ro
```

## Development

### Local testing without Docker

#### Terminal 1: Run WebSocket handler
```bash
cd infrastructure/caddy/websocket-handler
go run main.go
```

#### Terminal 2: Run Caddy
```bash
cd infrastructure/caddy
caddy run --config Caddyfile --adapter caddyfile
```

### Testing WebSocket endpoint

```bash
# Using websocat (install: cargo install websocat)
websocat wss://localhost:8443/ws --insecure

# Or using wscat (install: npm install -g wscat)
wscat -c wss://localhost:8443/ws --no-check
```

### Rebuilding after code changes

```bash
cd infrastructure
docker-compose build caddy-fallback
docker-compose up caddy-fallback
```

### Viewing logs

```bash
# Combined logs
docker-compose logs -f caddy-fallback

# WebSocket handler logs only
docker-compose logs -f caddy-fallback | grep ws-handler

# Caddy logs only
docker-compose logs -f caddy-fallback | grep caddy
```

## Troubleshooting

### Build fails with Go errors

- Ensure Go 1.21+ is available in the builder image
- Check `go.mod` and `go.sum` are correct
- Clear Docker build cache: `docker-compose build --no-cache caddy-fallback`

### "Connection refused" error

- Check that TCP port 8443 is not blocked by firewall
- Verify certificates exist and are readable
- Check Docker logs: `docker-compose logs caddy-fallback`

### WebSocket not connecting

- Check browser console for errors
- Verify certificate is trusted by browser (visit `https://localhost:8443` first)
- Test with CLI tool: `websocat wss://localhost:8443/ws --insecure`

### Hot reload not triggering

- Check that files are being mounted correctly: `docker exec caddy-fallback ls /app/dist`
- Verify file watcher is running (check logs for "Watching /app/dist")
- Ensure WebSocket connection is established (check browser console)
- Test WebSocket endpoint manually

### WebSocket reconnection issues

- Implement exponential backoff in client code
- Check server logs for connection errors
- Verify firewall isn't blocking WebSocket connections
- Ensure `Connection: upgrade` header is passed correctly

### Caddy not starting

- Check Caddyfile syntax: `docker-compose run caddy-fallback caddy validate --config /etc/caddy/Caddyfile`
- Verify port 8443 is not in use: `lsof -i :8443`
- Check certificates are readable: `docker-compose run caddy-fallback ls -la /certs`

## Performance

- **Startup time:** ~3 seconds (Caddy + WebSocket handler)
- **HTTP/2 request latency:** <10ms on localhost
- **WebSocket event delivery:** <15ms on localhost
- **Memory usage:** ~30MB (Caddy) + ~10MB (WebSocket handler)
- **File change detection:** <100ms

## Integration with Dev Server

This server runs alongside the Quinn HTTP/3 dev server:

- **Primary path:** Quinn HTTP/3 + SSE (ports 4433/udp)
- **Fallback path:** Caddy HTTP/2 + WebSocket (port 8443/tcp)

The client automatically detects which path to use.

## WebSocket Protocol

### Connection

1. Client initiates WebSocket handshake to `wss://localhost:8443/ws`
2. Server upgrades connection
3. Server sends periodic ping frames to keep connection alive
4. Client responds with pong frames

### Messages

Server -> Client:
```json
{"type":"reload","data":{}}
```

Client -> Server:
- Pong frames only (automatic browser handling)

### Disconnection

1. Client detects disconnection via `onclose` event
2. Client implements exponential backoff reconnection
3. Server cleans up client resources

## File Watcher

The WebSocket handler watches `/app/dist` for file changes:

- **Events monitored:** Create, Write
- **Debounce period:** 100ms
- **Broadcast:** All connected clients receive reload message
- **Recursive:** Watches all subdirectories

## Security

- TLS 1.2+ required for all connections
- Self-signed certificates accepted in development
- WebSocket origin validation disabled (development only)
- Security headers applied to all responses
- No authentication (development only)

## License

MIT

## See Also

- [Quinn HTTP/3 Dev Server](../dev-server/README.md)
- [Caddy Documentation](https://caddyserver.com/docs/)
- [WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455)
- [Gorilla WebSocket](https://github.com/gorilla/websocket)
