#!/usr/bin/env -S deno run --allow-all
/**
 * Standalone server script for e2e testing
 * Uses our custom server logic to handle routes correctly
 */

import createServer from "../index.ts"

// Parse command line arguments
const args = Deno.args
let port = 5556 // default port for e2e testing

for (let i = 0; i < args.length; i++) {
	if (args[i] === "--port" && i + 1 < args.length) {
		port = parseInt(args[i + 1], 10)
		if (isNaN(port)) {
			console.error("Invalid port number")
			Deno.exit(1)
		}
	}
}

// Create a simple logger
const logger = {
	log: console.log,
	info: console.info,
	warn: console.warn,
	error: console.error,
}

// Start the server
const server = createServer(logger, { port })

console.log(`🚀 E2E test server running on http://localhost:${port}`)
console.log("Press Ctrl+C to stop")

// Handle graceful shutdown
Deno.addSignalListener("SIGINT", () => {
	console.log("\n🛑 Shutting down server...")
	server.stop()
	Deno.exit(0)
})

// Keep the process alive
setInterval(() => {}, 1000)
