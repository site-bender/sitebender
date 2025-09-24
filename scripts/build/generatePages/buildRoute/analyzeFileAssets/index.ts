import analyzeComponentUsage from "./analyzeComponentUsage/index.ts"
import discoverComponentAssets from "./discoverComponentAssets/index.ts"

export default async function analyzeFileAssets(
	filePath: string,
): Promise<string[]> {
	try {
		// First get the component paths using the existing analysis
		const componentsRoot = [Deno.cwd(), "src", "components"].join("/")
		const analyzeFileRecursively = (await import(
			"./analyzeComponentUsage/analyzeFileRecursively/index.ts"
		)).default
		const componentPaths = await analyzeFileRecursively(componentsRoot)(
			filePath,
		)

		// Then discover both CSS and JS assets for those components
		const allAssets = await discoverComponentAssets(componentPaths)

		// Also get the traditional CSS assets for backwards compatibility
		const cssAssets = await analyzeComponentUsage(filePath)

		// Combine and dedupe
		const combinedAssets = Array.from(new Set([...cssAssets, ...allAssets]))

		return combinedAssets.sort()
	} catch (error) {
		console.warn(`Failed to analyze ${filePath}:`, error)
		return []
	}
}
