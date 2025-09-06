#!/usr/bin/env -S deno run --allow-write

export default async function clean(): Promise<void> {
	try {
		await Deno.remove("dist", { recursive: true })
		console.log("✅ Cleaned dist directory")
	} catch (error) {
		if (error instanceof Deno.errors.NotFound) {
			console.log("ℹ️  No dist directory to clean")
		} else {
			console.error("❌ Error cleaning dist directory:", error)
			Deno.exit(1)
		}
	}
}

// Execute if run directly
if (import.meta.main) {
	await clean()
}
