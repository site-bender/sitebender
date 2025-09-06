This was the response of another AI (not you) when I asked about setting up a local server to allow us to use the database and visualization services mentioned in the VIZ.md folder (see the docker-compose.yml for the database info).

Here is what it responded. Note that this is not quite right. We have a very different folder structure. We already have the `docker-compose.yml` file set up for the database, so we just need to add a service for the visualization tools.

The AI's recommendations:

I'll help you set up a local development environment that mimics Deno Deploy's edge API while connecting to your local services. Here's a comprehensive solution:

## 1. Project Structure

```
src/
  components/     # Your JSX components
  lib/           # Custom reactive libraries
  api/           # Edge function handlers
  server/        # Main server and routing
  client/        # Client-side JS (minimal)
public/
  styles/        # Vanilla CSS
  assets/
deno.json
.env.local
docker-compose.yml
```

## 2. Environment Configuration

Create `.env.local`:

```bash
# Local development
DATABASE_URL=http://localhost:3030
PROMETHEUS_URL=http://localhost:9090
GRAFANA_URL=http://localhost:3000
MINIO_URL=http://localhost:9000

# Production (for Deno Deploy)
# Will be set in Deno Deploy dashboard
```

## 3. API Proxy Setup

Create `src/server/proxy.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Service mappings for local development
const SERVICE_PROXIES = {
	"/api/database": "http://localhost:3030",
	"/api/metrics": "http://localhost:9090",
	"/api/storage": "http://localhost:9000",
	"/api/visualization": "http://localhost:3000",
}

export async function handleApiRequest(req: Request): Promise<Response> {
	const url = new URL(req.url)

	// Find matching service
	for (const [prefix, target] of Object.entries(SERVICE_PROXIES)) {
		if (url.pathname.startsWith(prefix)) {
			return proxyRequest(req, target)
		}
	}

	return new Response("Not found", { status: 404 })
}

async function proxyRequest(req: Request, target: string): Promise<Response> {
	const targetUrl = new URL(req.url)
	targetUrl.host = new URL(target).host
	targetUrl.protocol = new URL(target).protocol

	const headers = new Headers(req.headers)
	headers.set("host", new URL(target).host)

	try {
		const response = await fetch(targetUrl.toString(), {
			method: req.method,
			headers,
			body: req.body,
		})

		return response
	} catch (error) {
		console.error("Proxy error:", error)
		return new Response("Service unavailable", { status: 503 })
	}
}
```

## 4. Main Server with Edge Function Simulation

Create `src/server/main.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { handleApiRequest } from "./proxy.ts"
import { renderToString } from "../lib/ssr.ts" // Your SSR function

async function handler(req: Request): Promise<Response> {
	const url = new URL(req.url)

	// API routes (simulate edge functions)
	if (url.pathname.startsWith("/api/")) {
		return handleApiRequest(req)
	}

	// Serve static assets
	if (url.pathname.startsWith("/public/")) {
		try {
			const file = await Deno.readFile(`.${url.pathname}`)
			return new Response(file, {
				headers: { "Content-Type": getContentType(url.pathname) },
			})
		} catch {
			return new Response("Not found", { status: 404 })
		}
	}

	// Server-side rendering
	if (url.pathname === "/") {
		const html = await renderToString() // Your JSX rendering
		return new Response(html, {
			headers: { "Content-Type": "text/html" },
		})
	}

	return new Response("Not found", { status: 404 })
}

function getContentType(path: string): string {
	if (path.endsWith(".css")) return "text/css"
	if (path.endsWith(".js")) return "application/javascript"
	if (path.endsWith(".png")) return "image/png"
	if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg"
	return "text/plain"
}

// Start server with environment-specific port
const port = parseInt(Deno.env.get("PORT") || "8000")
serve(handler, { port })
console.log(`Server running on http://localhost:${port}`)
```

## 5. Environment-Aware API Client

Create `src/lib/api.ts`:

```typescript
// Environment-aware API client
const IS_LOCAL = !Deno.env.get("DENO_DEPLOYMENT_ID")

export class ApiClient {
	private baseUrl: string

	constructor() {
		this.baseUrl = IS_LOCAL ? "http://localhost:8000" : "/"
	}

	async queryDatabase(sparql: string): Promise<any> {
		const response = await fetch(`${this.baseUrl}/api/database/query`, {
			method: "POST",
			headers: { "Content-Type": "application/sparql-query" },
			body: sparql,
		})

		return response.json()
	}

	async getMetrics(query: string): Promise<any> {
		const response = await fetch(
			`${this.baseUrl}/api/metrics/query?query=${
				encodeURIComponent(query)
			}`,
		)
		return response.json()
	}

	// Add other API methods as needed
}

export const api = new ApiClient()
```

## 6. Docker Compose for Local Services

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
    fuseki:
        image: stain/jena-fuseki:latest
        ports:
            - "3030:3030"
        volumes:
            - ./data/fuseki:/fuseki
        environment:
            - ADMIN_PASSWORD=admin
        command: --mem /ds

    prometheus:
        image: prom/prometheus:latest
        ports:
            - "9090:9090"
        volumes:
            - ./config/prometheus.yml:/etc/prometheus/prometheus.yml
            - prometheus_data:/prometheus

    grafana:
        image: grafana/grafana:latest
        ports:
            - "3000:3000"
        environment:
            - GF_SECURITY_ADMIN_PASSWORD=admin
        volumes:
            - grafana_data:/var/lib/grafana

    minio:
        image: minio/minio:latest
        ports:
            - "9000:9000"
            - "9001:9001"
        environment:
            - MINIO_ROOT_USER=minioadmin
            - MINIO_ROOT_PASSWORD=minioadmin
        volumes:
            - minio_data:/data
        command: server /data --console-address ":9001"

volumes:
    prometheus_data:
    grafana_data:
    minio_data:
```

## 7. Development Scripts

Update `deno.json`:

```json
{
	"tasks": {
		"dev": "deno run --watch --allow-net --allow-env --allow-read src/server/main.ts",
		"build": "deno compile --allow-net --allow-env --allow-read src/server/main.ts",
		"start": "deno run --allow-net --allow-env --allow-read src/server/main.ts",
		"services:up": "docker-compose up -d",
		"services:down": "docker-compose down"
	},
	"compilerOptions": {
		"jsx": "react-jsx",
		"jsxImportSource": "./src/lib" // Your custom JSX runtime
	}
}
```

## 8. Usage in Components

In your JSX components:

```typescript
import { api } from "../lib/api.ts"

async function DataComponent() {
	const data = await api.queryDatabase(`
    SELECT ?s ?p ?o WHERE {
      ?s ?p ?o
    } LIMIT 10
  `)

	return (
		<div>
			<h1>Data from Fuseki</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
```

## 9. Running the Setup

1. **Start local services**:
   ```bash
   deno task services:up
   ```

2. **Start development server**:
   ```bash
   deno task dev
   ```

3. **Access your app**: http://localhost:8000

## 10. Production Deployment

For Deno Deploy, your `main.ts` will work as-is since:

- API routes will be handled by actual edge functions
- The proxy will be disabled automatically (no local services)
- Environment variables will be set in Deno Deploy dashboard

This setup gives you:

- ✅ Local development that mimics production
- ✅ No client-side dependencies
- ✅ Seamless connection to local services
- ✅ Easy migration to Deno Deploy
- ✅ TypeScript throughout
- ✅ Vanilla CSS and JSX

The API proxy automatically routes requests to your local services during development, while in production, these will be handled by actual edge functions on Deno Deploy.

**The above was in response to this prompt:**

I'm building a web application using Deno with TypeScript and JSX, but no react or other front-end libraries. Instead, I use the TS compiler and my own custom createElement and Fragment functions to generate vanilla HTML. I use TypeScript, but it compiles to JS. I use vanilla CSS. I have my own reactive Deno libraries from which I want to load functions and JSX components to use on my site.

The site will be using Apache Jena Fuseki as its database (it is a data-centric architecture and data-driven). I am running a local copy with Homebrew. I also have a Docker container running Prometheus, Thanos Sidecar, Thanos Querier, Grafana, and MinIO (later, Storacha when it goes online) for visualization.

When the site is live, it will be deployed to Deno Deploy and will use their edge functions as its API, nothing on the front end will connect to anything but the primary Deno server and the edge-function API. So it is the edge functions that will handle authentication, authorization, database access, visualization, etc.

How can I set this up in my Deno application, preferably without using any client-side dependencies, so that I can mimic the Deno Deploy Edge API while connecting to the services _on my local machine_?
