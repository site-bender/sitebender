import flatten from "@sitebender/toolsmith/vanilla/array/flatten/index.ts"
import fromAsync from "@sitebender/toolsmith/vanilla/array/fromAsync/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"

import _processEntry from "./_processEntry/index.ts"

/**
 * Recursively walks directory and finds all index.ts files
 */
export default async function _findIndexFiles(dir: string): Promise<string[]> {
	try {
		const entries = await fromAsync(Deno.readDir(dir))
		const processEntry = _processEntry(dir)(_findIndexFiles)
		const promises = map(processEntry)(entries)
		const nestedArrays: string[][] = await Promise.all(promises)

		return flatten(1)(nestedArrays) as string[]
	} catch (error) {
		console.warn(
			`Could not read directory ${dir}:`,
			error instanceof Error ? error.message : String(error),
		)

		return []
	}
}
