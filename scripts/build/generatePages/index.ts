import { walk } from "https://deno.land/std@0.220.1/fs/walk.ts"

import buildRoute from "./buildRoute/index.ts"

const defaultLogger: Logger = {
	log: (...args: unknown[]) => console.log(...args),
	info: (...args: unknown[]) => console.info(...args),
	warn: (...args: unknown[]) => console.warn(...args),
	error: (...args: unknown[]) => console.error(...args),
}

export default async function generatePages(
	logger: Logger = defaultLogger,
	distDir?: string,
): Promise<void> {
	const routesDir = "./pages"
	const outputDir = distDir || "./dist"

	logger.log(`🔨 Building pages from ${routesDir}...`)

	// Find all route files (excluding _app.tsx and _404.tsx)
	const routeFiles: string[] = []

	for await (
		const entry of walk(routesDir, {
			exts: [".tsx"],
			includeDirs: false,
		})
	) {
		const filename = entry.name
		// Skip special files
		if (filename.startsWith("_")) continue

		routeFiles.push(entry.path)
	}

	logger.log(`📄 Found ${routeFiles.length} route file(s)`)

	// Build all routes in parallel
	const buildPromises = routeFiles.map((routeFile) =>
		buildRoute(routeFile, routesDir, outputDir, logger)
	)
	await Promise.all(buildPromises)

	logger.log(`🎉 Successfully built ${routeFiles.length} page(s)`)
}

// Main execution
if (import.meta.main) {
	await generatePages()
}
