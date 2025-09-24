import { join } from "jsr:@std/path"

import toKebabCase from "../../../../../utilities/toKebabCase/index.ts"
import analyzeFileRecursively from "./analyzeFileRecursively/index.ts"

/**
 * Pure function to check if a file exists
 */
const fileExists = async (filePath: string): Promise<boolean> => {
	try {
		await Deno.stat(filePath)
		return true
	} catch {
		return false
	}
}

/**
 * Pure function to convert asset path to dist path
 */
const assetPathToDistPath = (assetPath: string): string =>
	join(Deno.cwd(), "dist", assetPath.slice(1))

/**
 * Pure function to filter existing assets
 */
const filterExistingAssets = async (
	assetPaths: string[],
): Promise<string[]> => {
	const existenceChecks = await Promise.all(
		assetPaths.map(async (assetPath) => ({
			path: assetPath,
			exists: await fileExists(assetPathToDistPath(assetPath)),
		})),
	)

	return existenceChecks
		.filter(({ exists }) => exists)
		.map(({ path }) => path)
}

/**
 * Generates CSS asset paths for a component path
 * e.g., "src/components/buttons/Button" -> [
 *   "/styles/components/index.css",
 *   "/styles/components/buttons/index.css",
 *   "/styles/components/button/index.css"
 * ]
 */
const generateCssAssetPaths = async (
	componentPath: string,
): Promise<string[]> => {
	const rootCssPath = "/styles/components/index.css"

	// Extract the path relative to src/components/
	const relativePath = componentPath.replace(/^.*\/src\/components\//, "")

	// Skip helpers directories - they don't have CSS files
	if (relativePath.includes("helpers")) {
		const rootExists = await fileExists(assetPathToDistPath(rootCssPath))
		return rootExists ? [rootCssPath] : []
	}

	// Build hierarchy of potential CSS paths
	const pathParts = relativePath.split("/")
	const hierarchyPaths = pathParts.reduce(
		(acc, part, index) => {
			const kebabPart = toKebabCase(part)
			const currentPath = acc.paths[index]
				? `${acc.paths[index]}/${kebabPart}`
				: kebabPart
			return {
				paths: [...acc.paths, currentPath],
			}
		},
		{ paths: [""] },
	).paths.slice(1) // Remove empty first element

	const allPotentialPaths = [
		rootCssPath,
		...hierarchyPaths.map((path) => `/styles/components/${path}/index.css`),
	]

	return filterExistingAssets(allPotentialPaths)
}

export default async function analyzeComponentUsage(
	pagePath: string,
): Promise<Array<string>> {
	// Use a simple join implementation to avoid Deno import issues
	const componentsRoot = [Deno.cwd(), "src", "components"].join("/")
	const componentPaths = await analyzeFileRecursively(componentsRoot)(pagePath)

	// Generate CSS asset paths for all components
	const allCssPathArrays = await Promise.all(
		componentPaths.map(generateCssAssetPaths),
	)

	// Flatten and dedupe using functional approach
	const allCssPaths = allCssPathArrays.flat()
	const uniqueCssPaths = Array.from(new Set(allCssPaths))

	return uniqueCssPaths.sort()
}
