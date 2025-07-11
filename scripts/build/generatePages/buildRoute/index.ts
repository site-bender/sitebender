import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

import type { Logger } from "~types/scripts/index.ts"

import analyzeFileAssets from "./analyzeFileAssets/index.ts"
import prettyPrintHtml from "./prettyPrintHtml/index.ts"
import renderPageWithApp from "./renderPageWithApp/index.ts"

export default async function buildRoute(
	routeFile: string,
	_routesDir: string,
	outputDir: string,
	logger: Logger,
): Promise<void> {
	// Calculate route path (e.g., "src/routes/about/index.tsx" -> "/about")
	// Remove the routesDir prefix and /index.tsx suffix
	let relativePath = routeFile
		.replace("src/routes/", "") // Remove "src/routes/"
		.replace(/index\.tsx$/, "") // Remove "index.tsx"

	// Remove trailing slash if present
	if (relativePath.endsWith("/")) {
		relativePath = relativePath.slice(0, -1)
	}

	const routePath = relativePath === "" ? "/" : `/${relativePath}`

	logger.log(`🔨 Building route: ${routePath}`)

	try {
		// Import the route component
		const absolutePath = new URL(`file://${Deno.cwd()}/${routeFile}`).href
		const routeModule = await import(absolutePath)
		const RouteComponent = routeModule.default
		const HeadComponent = routeModule.Head // Extract Head component if it exists

		if (typeof RouteComponent !== "function") {
			logger.warn(`⚠️  Skipping ${routePath}: no default export function`)
			return
		}

		// Analyze the route file to find component usage and generate all assets
		const allAssets = await analyzeFileAssets(routeFile)
		logger.log(`🎨 Found ${allAssets.length} asset(s) for ${routePath}`)

		// Render with App wrapper and all assets (CSS and JS)
		const html = await renderPageWithApp(
			RouteComponent,
			HeadComponent,
			allAssets,
		)

		// Pretty print the HTML for readable output
		const prettyHtml = prettyPrintHtml(html)

		// Create output directory - directly in dist, not dist/src/routes
		const outputPath = routePath === "/"
			? outputDir
			: join(outputDir, relativePath)
		await Deno.mkdir(outputPath, { recursive: true })

		// Write HTML file
		const htmlFile = join(outputPath, "index.html")
		await Deno.writeTextFile(htmlFile, prettyHtml)

		logger.log(`✅ Built: ${routePath} -> ${htmlFile}`)
	} catch (error) {
		logger.error(`❌ Failed to build ${routePath}:`, error)
	}
}
