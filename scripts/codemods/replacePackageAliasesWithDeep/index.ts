#!/usr/bin/env -S deno run --allow-read --allow-write
/*++
 | Rewrite @sitebender/* imports to deep library paths in components
 */

import { INCLUDE, REPLACERS, ROOT } from "./constants/index.ts"
import walk from "./walk/index.ts"

//++ Main function to replace package aliases with deep paths
export default async function replacePackageAliasesWithDeep(): Promise<void> {
	let changed = 0

	//-- [REFACTOR] For loop should be replaced with functional approach
	for (const rel of INCLUDE) {
		const dir = `${ROOT}${rel}`
		try {
			//-- [REFACTOR] For-await loop should be replaced with functional approach
			for await (const file of walk(dir)) {
				const before = await Deno.readTextFile(file)
				let after = before

				//-- [REFACTOR] For loop should be replaced with functional approach
				for (const r of REPLACERS) {
					after = r(after)
				}

				if (after !== before) {
					await Deno.writeTextFile(file, after)
					console.log(`updated: ${file}`)
					changed++
				}
			}
		} catch (err) {
			if (!(err instanceof Deno.errors.NotFound)) throw err
		}
	}

	console.log(`done. files changed: ${changed}`)
}

// Execute if run directly
if (import.meta.main) {
	await replacePackageAliasesWithDeep()
}

//?? [GOTCHA] Contains for loops that violate FP rules - marked as tech debt
