
#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env

import {
	CONTENT_TYPE_CSS,
	CONTENT_TYPE_EOT,
	CONTENT_TYPE_GIF,
	CONTENT_TYPE_HTML,
	CONTENT_TYPE_ICO,
	CONTENT_TYPE_JPEG,
	CONTENT_TYPE_JS,
	CONTENT_TYPE_JSON,
	CONTENT_TYPE_OCTET_STREAM,
	CONTENT_TYPE_PLAIN_TEXT,
	CONTENT_TYPE_PNG,
	CONTENT_TYPE_SVG,
	CONTENT_TYPE_TTF,
	CONTENT_TYPE_WOFF,
	CONTENT_TYPE_WOFF2,
	DEFAULT_SERVER_PORT,
	ERROR_MESSAGE_INTERNAL_ERROR,
	ERROR_MESSAGE_NOT_FOUND,
	HEALTH_CHECK_RESPONSE,
	HTTP_STATUS_INTERNAL_ERROR,
	HTTP_STATUS_NOT_FOUND,
	HTTP_STATUS_OK,
} from "./server/constants/index.ts"

const PORT = DEFAULT_SERVER_PORT
const WS_CLIENTS = new Set<WebSocket>()
const WATCH_DIR = "./dist"

//++ Broadcasts reload message to all connected WebSocket clients
function broadcastReload(): void {
	const message = JSON.stringify({ type: "reload", timestamp: Date.now() })
	const disconnected: WebSocket[] = []

	for (const client of WS_CLIENTS) {
		try {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message)
			} else {
				disconnected.push(client)
			}
		} catch (error) {
			console.error("[Dev Server] Failed to send reload message:", error)
			disconnected.push(client)
		}
	}

	// Clean up disconnected clients
	for (const client of disconnected) {
		WS_CLIENTS.delete(client)
	}

	console.log(`[Dev Server] Broadcasted reload to ${WS_CLIENTS.size} clients`)
}

//++ Watches directory for changes and triggers reload
async function watchFiles(): Promise<void> {
	console.log(`[Dev Server] Watching ${WATCH_DIR} for changes...`)

	try {
		const watcher = Deno.watchFs(WATCH_DIR)
		for await (const event of watcher) {
			if (event.kind === "modify" || event.kind === "create") {
				console.log(
					`[Dev Server] File changed: ${event.paths.join(", ")}`,
				)
				broadcastReload()
			}
		}
	} catch (error) {
		console.error("[Dev Server] File watching error:", error)
	}
}

//++ Serves static files from dist directory
async function serveStaticFile(pathname: string): Promise<Response> {
	// Remove leading slash and resolve to dist directory
	let filePath = pathname === "/" ? "/index.html" : pathname
	filePath = `${WATCH_DIR}${filePath}`

	try {
		const file = await Deno.readFile(filePath)
		const ext = filePath.split(".").pop() || ""

		// Determine content type
		const contentTypes: Record<string, string> = {
			html: CONTENT_TYPE_HTML,
			css: CONTENT_TYPE_CSS,
			js: CONTENT_TYPE_JS,
			json: CONTENT_TYPE_JSON,
			png: CONTENT_TYPE_PNG,
			jpg: CONTENT_TYPE_JPEG,
			jpeg: CONTENT_TYPE_JPEG,
			gif: CONTENT_TYPE_GIF,
			svg: CONTENT_TYPE_SVG,
			ico: CONTENT_TYPE_ICO,
			woff: CONTENT_TYPE_WOFF,
			woff2: CONTENT_TYPE_WOFF2,
			ttf: CONTENT_TYPE_TTF,
			eot: CONTENT_TYPE_EOT,
		}

		const contentType = contentTypes[ext] || CONTENT_TYPE_OCTET_STREAM

		return new Response(file, {
			status: HTTP_STATUS_OK,
			headers: {
				"Content-Type": contentType,
				"Cache-Control": "no-cache, no-store, must-revalidate",
				"X-Content-Type-Options": "nosniff",
			},
		})
	} catch (error) {
		// File not found - try index.html for SPA routing
		if (error instanceof Deno.errors.NotFound) {
			try {
				const indexFile = await Deno.readFile(`${WATCH_DIR}/index.html`)
				return new Response(indexFile, {
					status: HTTP_STATUS_OK,
					headers: {
						"Content-Type": CONTENT_TYPE_HTML,
						"Cache-Control": "no-cache, no-store, must-revalidate",
					},
				})
			} catch {
				return new Response(ERROR_MESSAGE_NOT_FOUND, {
					status: HTTP_STATUS_NOT_FOUND,
					headers: { "Content-Type": CONTENT_TYPE_PLAIN_TEXT },
				})
			}
		}

		return new Response(ERROR_MESSAGE_INTERNAL_ERROR, {
			status: HTTP_STATUS_INTERNAL_ERROR,
			headers: { "Content-Type": CONTENT_TYPE_PLAIN_TEXT },
		})
	}
}

//++ Handles WebSocket upgrade for hot reload
function handleWebSocket(request: Request): Response {
	const { socket, response } = Deno.upgradeWebSocket(request)

	socket.addEventListener("open", () => {
		WS_CLIENTS.add(socket)
		console.log(
			`[Dev Server] WebSocket client connected. Total clients: ${WS_CLIENTS.size}`,
		)
	})

	socket.addEventListener("close", () => {
		WS_CLIENTS.delete(socket)
		console.log(
			`[Dev Server] WebSocket client disconnected. Total clients: ${WS_CLIENTS.size}`,
		)
	})

	socket.addEventListener("error", (event) => {
		console.error("[Dev Server] WebSocket error:", event)
		WS_CLIENTS.delete(socket)
	})

	return response
}

//++ Main request handler
function handler(request: Request): Response | Promise<Response> {
	const url = new URL(request.url)

	// Handle WebSocket upgrade for hot reload
	if (url.pathname === "/ws" && request.headers.get("upgrade") === "websocket") {
		return handleWebSocket(request)
	}

	// Handle health check
	if (url.pathname === "/health") {
		return new Response(HEALTH_CHECK_RESPONSE, {
			status: HTTP_STATUS_OK,
			headers: { "Content-Type": CONTENT_TYPE_PLAIN_TEXT },
		})
	}

	// Serve static files
	return serveStaticFile(url.pathname)
}

//++ Entry point
async function main(): Promise<void> {
	console.log(`[Dev Server] Starting on http://localhost:${PORT}`)
	console.log(`[Dev Server] Serving files from ${WATCH_DIR}`)
	console.log(`[Dev Server] WebSocket endpoint: ws://localhost:${PORT}/ws`)
	console.log(`[Dev Server] Health check: http://localhost:${PORT}/health`)

	// Start file watcher in background
	watchFiles()

	// Start HTTP server
	await Deno.serve({ port: PORT }, handler)
}

if (import.meta.main) {
	main()
}
