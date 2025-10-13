# Pure-Deno Development Server

Lightweight development server with hot reload. No Docker required.

## Features

- ✅ **HTTP/2 Static File Serving** - Fast, modern HTTP server
- ✅ **WebSocket Hot Reload** - Automatic browser refresh on file changes
- ✅ **File Watching** - Monitors `./dist` for changes
- ✅ **SPA Routing** - Falls back to index.html for client-side routing
- ✅ **Zero Dependencies** - Pure Deno standard library
- ✅ **Works Everywhere** - Runs anywhere Deno is installed

## Quick Start

```bash
# Start dev server
deno task dev

# Or run directly
deno run --allow-net --allow-read --allow-env server/index.ts
```

Server runs at `http://localhost:8000`

## Endpoints

| Endpoint | Purpose |
|----------|---------|
| `http://localhost:8000/` | Static files from `./dist` |
| `ws://localhost:8000/ws` | WebSocket hot reload |
| `http://localhost:8000/health` | Health check endpoint |

## How It Works

1. **Static File Serving**: Serves files from `./dist` directory with proper MIME types
2. **File Watching**: Monitors `./dist` for changes (create/modify events)
3. **Hot Reload**: Broadcasts reload message to all connected WebSocket clients
4. **SPA Support**: Falls back to `index.html` for client-side routing

## Configuration

Edit `server/index.ts` to customize:

```typescript
const PORT = 8000          // Server port
const WATCH_DIR = "./dist" // Directory to serve and watch
```

## WebSocket Protocol

The server broadcasts JSON messages on file changes:

```json
{
  "type": "reload",
  "timestamp": 1234567890
}
```

Clients should reload the page when receiving this message.

## Performance

- **Startup time**: < 100ms
- **Hot reload latency**: < 50ms
- **Memory usage**: < 10MB
- **Max concurrent connections**: Limited only by system resources

## Comparison to Docker Setup

| Feature | Deno Server | Docker Setup |
|---------|-------------|--------------|
| Installation | Just Deno | Docker + Docker Compose |
| Startup time | < 100ms | 2-5 seconds |
| Memory usage | < 10MB | ~50MB |
| HTTP/3 support | ❌ | ✅ (Quinn server) |
| Complexity | Low | Medium |
| Best for | Simple apps, SSGs | Production-like dev env |

## When to Use

**Use Deno Server When:**
- Building simple applications
- You don't have Docker installed
- You want fast startup times
- You're developing static sites
- You want minimal overhead

**Use Docker Setup When:**
- Testing HTTP/3 support
- Need production-like environment
- Building complex distributed apps
- Using other infrastructure services

## Troubleshooting

### Port already in use

```bash
# Change PORT in server/constants/index.ts or kill existing process
lsof -ti:8000 | xargs kill
```

### File watching not working

Ensure Deno has permissions:
```bash
deno run --allow-read --allow-net --allow-env server/index.ts
```

### WebSocket connection fails

Check that the hot reload client is connecting to the correct endpoint:
```javascript
const ws = new WebSocket('ws://localhost:8000/ws')
```

## License

MIT
