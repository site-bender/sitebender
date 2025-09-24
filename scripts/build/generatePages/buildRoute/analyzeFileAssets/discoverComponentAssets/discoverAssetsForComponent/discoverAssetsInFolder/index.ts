import { join, relative, SEPARATOR } from "jsr:@std/path"

import toKebabCase from "../../../../../../../utilities/toKebabCase/index.ts"

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
 * Pure function to generate asset path from file and kebab path
 */
const generateAssetPath = (file: string, kebabPath: string): string | null => {
	if (file === "index.css") {
		return `/styles/components/${kebabPath}/index.css`
	} else if (file === "index.ts") {
		return `/scripts/components/${kebabPath}/index.js`
	}
	return null
}

/**
 * Pure function to check if file should be included
 */
const shouldIncludeFile = (
	file: string,
	isHelpersDirectory: boolean,
): boolean => {
	if (isHelpersDirectory) return false

	return file === "index.css" ||
		(file === "index.ts" && !file.includes(".test.") &&
			!file.includes(".spec."))
}

export default async function discoverAssetsInFolder(
	directoryPath: string,
	componentsRoot: string,
): Promise<Array<string>> {
	try {
		const files: string[] = []
		for await (const entry of Deno.readDir(directoryPath)) {
			if (entry.isFile) {
				files.push(entry.name)
			}
		}

		// Convert PascalCase path to kebab-case like copyComponentStyles does
		const relativePath = relative(componentsRoot, directoryPath)
		const pathParts = relativePath.split(SEPARATOR)
		const kebabParts = pathParts.map((part: string) => toKebabCase(part))
		const kebabPath = kebabParts.join("/")

		// Check if this is a helpers directory - skip ALL files for helpers since they're server-side only
		const isHelpersDirectory = relativePath.includes("helpers")

		// Generate potential asset paths using functional approach
		const potentialAssets = files
			.filter((file) => shouldIncludeFile(file, isHelpersDirectory))
			.map((file) => generateAssetPath(file, kebabPath))
			.filter(Boolean) as string[]

		// Only return assets that actually exist
		return filterExistingAssets(potentialAssets)
	} catch {
		return []
	}
}
