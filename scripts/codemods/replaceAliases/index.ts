#!/usr/bin/env -S deno run --allow-read --allow-write
/*++
 | Replace package aliases in TypeScript files across the codebase
 | Note: Current replacements are no-ops (identical from/to) but structure is preserved for future use
 */

import { INCLUDE_DIRS, REPLACEMENTS, ROOT } from "./constants/index.ts"
import walk from "./walk/index.ts"

//++ Main function to replace aliases in all TypeScript files
export default async function replaceAliases(): Promise<void> {
	const changed = 0
	const walks = INCLUDE_DIRS.map(function createWalker(rel) {
		const walker = walk(`${ROOT}${rel}`)
		return walker([])
	})
	const fileLists = await Promise.all(walks)
	const allFiles: string[] = fileLists.flat()

	const ops: Promise<void>[] = []

	//-- [REFACTOR] For loop should be replaced with functional approach
	for (const path of allFiles) {
		ops.push(processFile(path, changed))
	}

	await Promise.all(ops)
	console.log(`done. files changed: ${changed}`)

	//++ Helper to process a single file
	async function processFile(path: string, changeCount: number): Promise<void> {
		const text = await Deno.readTextFile(path)
		let out = text

		//-- [REFACTOR] For loop should be replaced with functional approach
		for (const [from, to] of REPLACEMENTS) {
			out = out.split(from).join(to)
		}

		if (out !== text) {
			await Deno.writeTextFile(path, out)
			changeCount++
			console.log(`updated: ${path}`)
		}
	}
}

// Execute if run directly
if (import.meta.main) {
	await replaceAliases()
}

//?? [GOTCHA] Contains for loops that violate FP rules - marked as tech debt
