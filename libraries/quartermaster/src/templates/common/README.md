# {{APP_NAME}}

{{APP_DESCRIPTION}}

Generated with [Quartermaster](https://github.com/sitebender/quartermaster).

## Quick Start

```bash
# Install Deno (if not already installed)
curl -fsSL https://deno.land/install.sh | sh

# Start development server
deno task dev

# Or with Docker (if you have it installed)
deno task dev:docker
```

Open http://localhost:8000 in your browser.

## Development

### Hot Reload

The development server includes automatic hot reload. Any changes to files in `./dist` will automatically refresh your browser.

### Available Tasks

```bash
deno task dev          # Start Deno dev server (recommended)
deno task dev:docker   # Start Docker dev servers (HTTP/3 + HTTP/2)
deno task build        # Build application (TODO: not yet implemented)
deno task test         # Run tests
deno task fmt          # Format code
deno task lint         # Lint code
```

## Project Structure

```
{{APP_NAME}}/
├── server/                # Deno development server
│   ├── index.ts           # Main server file
│   └── constants/         # Server constants
│       └── index.ts
├── .sitebender/           # Docker infrastructure (optional)
│   ├── dev-server/        # Quinn HTTP/3 + SSE server
│   ├── caddy/             # Caddy HTTP/2 + WebSocket server
│   └── docker-compose.yml
├── src/                   # Source code
├── dist/                  # Build output
├── hot-reload-client/     # Hot reload WebSocket client
├── deno.json              # Deno configuration
└── README.md              # This file
```

## Included Libraries

{{LIBRARIES_LIST}}

## Import Maps

⚠️ **TODO: Import maps not yet fully implemented.**

The `deno.json` file contains a stub import map. You'll need to add imports for Sitebender libraries manually:

```json
{
  "imports": {
    "@sitebender/pagewright": "https://deno.land/x/pagewright@x.x.x/mod.ts",
    "@sitebender/toolsmith": "https://deno.land/x/toolsmith@x.x.x/mod.ts"
  }
}
```

See [Deno Import Maps Documentation](https://deno.land/manual/basics/import_maps) for details.

## Development Server Options

### Deno Server (Recommended for Most Cases)

- ✅ Fast startup (< 100ms)
- ✅ Low memory (< 10MB)
- ✅ No Docker required
- ✅ WebSocket hot reload
- ❌ HTTP/2 only (no HTTP/3)

```bash
deno task dev
```

### Docker Servers (Production-Like Environment)

- ✅ HTTP/3 support (Quinn server)
- ✅ HTTP/2 fallback (Caddy server)
- ✅ Production-like environment
- ❌ Requires Docker installation
- ❌ Slower startup (2-5 seconds)

```bash
deno task dev:docker
```

## Browser Support

- **Deno Server**: Works in all modern browsers (HTTP/2 + WebSocket)
- **Docker Setup**: Universal support with HTTP/3 primary + HTTP/2 fallback

## Troubleshooting

### Port already in use

```bash
# Kill process using port 8000
lsof -ti:8000 | xargs kill
```

### Hot reload not working

1. Check that the dev server is running
2. Open browser console and look for WebSocket connection messages
3. Ensure `hot-reload-client/index.ts` is imported in your HTML

### Docker services won't start

```bash
# Check Docker is running
docker ps

# View logs
cd .sitebender && docker-compose logs

# Restart services
cd .sitebender && docker-compose restart
```

## Learn More

- [Sitebender Documentation](https://sitebender.io/docs)
- [Pagewright Guide](https://sitebender.io/docs/pagewright)
- [Deno Documentation](https://deno.land/manual)

## License

MIT
