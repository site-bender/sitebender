import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import flatMap from "@sitebender/toolsmith/vanilla/array/flatMap/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"

import entryToFullPath from "./entryToFullPath/index.ts"
import identity from "./identity/index.ts"
import isDirectory from "./isDirectory/index.ts"
import isTypeScriptFile from "./isTypeScriptFile/index.ts"

//++ Recursively collects all TypeScript files from a directory
export default async function collectTsFiles(
	root: string,
): Promise<Array<string>> {
	try {
		const entries = Array.from(Deno.readDirSync(root))

		// Get TypeScript files in current directory
		const tsFiles = filter(isTypeScriptFile)(entries)
		const tsPaths = map(entryToFullPath(root))(tsFiles)

		// Get subdirectories
		const dirs = filter(isDirectory)(entries)
		const dirPaths = map(entryToFullPath(root))(dirs)

		// Recursively collect from subdirectories
		const subdirPromises = map(collectTsFiles)(dirPaths)
		const subdirResults = await Promise.all(subdirPromises)
		const allSubdirFiles = flatMap(identity)(subdirResults)

		return [...tsPaths, ...allSubdirFiles]
	} catch (_) {
		// Return empty array for missing/unreadable directories
		return []
	}
}
