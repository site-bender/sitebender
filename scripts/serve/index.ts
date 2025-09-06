import { dirname, fromFileUrl, join } from "jsr:@std/path"

import createServer from "./createServer/index.ts"
import getFreePort from "./getFreePort/index.ts"
import watchForChanges from "./watchForChanges/index.ts"

export default async function startDevServer(): Promise<void> {
	const logger: Logger = {
		log: console.log,
		info: console.info,
		warn: console.warn,
		error: console.error,
	}

	// Ensure we operate within the docs application so outputs go to applications/docs/dist
	const originalCwd = Deno.cwd()
	const repoRoot = dirname(dirname(fromFileUrl(import.meta.url)))
	const docsDir = join(repoRoot, "applications", "docs")
	Deno.chdir(docsDir)

	console.log("🏗️ Running initial build (docs app)...")
	try {
		const process = new Deno.Command("deno", {
			args: ["task", "build"],
		})
		await process.output()
		console.log("✅ Initial build completed")
	} catch (error) {
		console.error("❌ Initial build failed:", error)
	}

	const port = getFreePort(5555)
	createServer(logger, { port })
	console.log(`🚀 Dev server running at http://localhost:${port}`)
	console.log("Press Ctrl+C to stop")

	await watchForChanges(".sitebender/scripts/build/index.ts")

	// Restore original CWD on exit
	Deno.chdir(originalCwd)
}

if (import.meta.main) {
	await startDevServer()
}
