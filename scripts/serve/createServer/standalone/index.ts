#!/usr/bin/env -S deno run --allow-all

import findIndex from "@sitebender/toolsmith/vanilla/array/findIndex/index.ts"

import createServer from "../index.ts"

/*++
 | Standalone server script for e2e testing
 | Uses our custom server logic to handle routes correctly
 */

//++ Parses port number from command line arguments
function parsePort(args: Array<string>): number {
	const portFlagIndex = findIndex((arg: string) => arg === "--port")(args)

	if (
		portFlagIndex !== undefined && portFlagIndex !== -1 &&
		portFlagIndex + 1 < args.length
	) {
		const parsedPort = parseInt(args[portFlagIndex + 1], 10)
		if (isNaN(parsedPort)) {
			console.error("Invalid port number")
			Deno.exit(1)
		}
		return parsedPort
	}

	return 5556 // default port for e2e testing
}

// Parse command line arguments
const args = Deno.args
const port = parsePort(args)

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
