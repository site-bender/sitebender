import type { Logger } from "~types/scripts/index.ts"

import createServer from "./createServer/index.ts"
import watchForChanges from "./watchForChanges/index.ts"

const logger: Logger = {
	log: console.log,
	info: console.info,
	warn: console.warn,
	error: console.error,
}

console.log("🏗️ Running initial build...")
try {
	const process = new Deno.Command("deno", {
		args: ["run", "-A", "--no-check", "scripts/build/index.ts"],
	})
	await process.output()
	console.log("✅ Initial build completed")
} catch (error) {
	console.error("❌ Initial build failed:", error)
}

createServer(logger, { port: 5555 })
console.log(`🚀 Dev server running at http://localhost:5555`)
console.log("Press Ctrl+C to stop")

await watchForChanges("scripts/build/index.ts")
