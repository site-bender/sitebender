import { assert, assertEquals } from "https://deno.land/std@0.220.1/assert/mod.ts"
import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

const TEST_OUTPUT_DIR = "./dist"
const TEST_PORT = 3001 // Use a different port to avoid conflicts

async function cleanTestOutput(): Promise<void> {
	try {
		await Deno.remove(TEST_OUTPUT_DIR, { recursive: true })
	} catch {
		// Directory doesn't exist, which is fine
	}
}

async function waitForServer(port: number, maxAttempts: number = 10): Promise<boolean> {
	for (let i = 0; i < maxAttempts; i++) {
		try {
			const response = await fetch(`http://localhost:${port}`)
			if (response.ok || response.status === 404) {
				// Consume the response body to prevent leaks
				await response.text()
				return true
			}
			// Consume the response body even if not ok
			await response.text()
		} catch {
			// Server not ready yet
		}
		await new Promise(resolve => setTimeout(resolve, 500))
	}
	return false
}

async function runBuild(): Promise<void> {
	const logger = {
		log: () => {},
		info: () => {},
		warn: () => {},
		error: () => {},
	}

	const buildComplete = (await import("~scripts/build/index.ts")).default

	await buildComplete()
}

Deno.test("dev server starts and serves files", async (t) => {
	await cleanTestOutput()

	await t.step("should start dev server and serve files", async () => {
		// First ensure we have built files to serve
		await runBuild()

		// Import and start the dev server directly
		const createServer = (await import("~scripts/serve/createServer/index.ts")).default

		const logger = {
			log: () => {},
			info: () => {},
			warn: () => {},
			error: () => {},
		}

		const server = createServer(logger, { port: TEST_PORT })

		try {
			// Wait for server to start
			const serverStarted = await waitForServer(TEST_PORT)
			assert(serverStarted, "Dev server should start within timeout period")

			// Test that the server serves the index page
			const response = await fetch(`http://localhost:${TEST_PORT}/`)
			assert(response.ok, "Server should serve the index page successfully")

			const htmlContent = await response.text()
			assert(htmlContent.includes("<html"), "Response should contain valid HTML")

		} finally {
			server.stop()
		}
	})

	await t.step("should serve static assets", async () => {
		// First ensure we have built files to serve
		await runBuild()

		const createServer = (await import("~scripts/serve/createServer/index.ts")).default

		const logger = {
			log: () => {},
			info: () => {},
			warn: () => {},
			error: () => {},
		}

		const server = createServer(logger, { port: TEST_PORT })

		try {
			// Wait for server to start
			const serverStarted = await waitForServer(TEST_PORT)
			assert(serverStarted, "Dev server should start within timeout period")

			// Test that static files are served
			const faviconResponse = await fetch(`http://localhost:${TEST_PORT}/favicon.ico`)
			assertEquals(faviconResponse.status, 200, "Should serve favicon.ico")
			// Consume the response body to prevent leaks
			await faviconResponse.blob()

		} finally {
			server.stop()
		}
	})

	await t.step("should return 404 for non-existent files", async () => {
		// First ensure we have built files to serve
		await runBuild()

		const createServer = (await import("~scripts/serve/createServer/index.ts")).default

		const logger = {
			log: () => {},
			info: () => {},
			warn: () => {},
			error: () => {},
		}

		const server = createServer(logger, { port: TEST_PORT })

		try {
			// Wait for server to start
			const serverStarted = await waitForServer(TEST_PORT)
			assert(serverStarted, "Dev server should start within timeout period")

			// Test 404 response for non-existent file
			const response = await fetch(`http://localhost:${TEST_PORT}/non-existent-file.html`)
			assertEquals(response.status, 404, "Should return 404 for non-existent files")
			// Consume the response body to prevent leaks
			await response.text()

		} finally {
			server.stop()
		}
	})

	// Cleanup after all tests
	await cleanTestOutput()
})
