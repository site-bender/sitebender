#!/usr/bin/env -S deno run -A
/*++
 | Codemod: Replace imports from the architect components barrel within libraries/architect/types/**
 | with concrete default imports from libraries/pagewright/src/define/**.
 |
 | Strategy:
 | - For each architect types file, build a map of symbol -> type path from existing `import type` lines.
 | - For each line importing from any ../../…/pagewright/index.tsx, for each specifier like
 |   `{ X as XComponent }`, find the type path for X, convert …/libraries/architect/types/schema.org/… to
 |   …/libraries/pagewright/src/define/…, and switch to: `import XComponent from "<computed>/index.tsx"`.
 | - If we can't find a type import for a symbol, try to discover the src/define path via filesystem
 |   lookup under libraries/pagewright/src/define. If still not found or ambiguous, leave the original line and report.
 */

import { TYPES_ROOT } from "./constants/index.ts"
import processFile from "./processFile/index.ts"
import walk from "./walk/index.ts"

//++ Main function to process all TypeScript files in architect types directory
export default async function fixArchitectTypesImports(): Promise<void> {
	const reports: string[] = []
	let total = 0
	let modified = 0

	//-- [REFACTOR] For-await loop should be replaced with functional approach
	for await (const file of walk(TYPES_ROOT)) {
		total++
		const { changed, report } = await processFile(file)
		if (changed) modified++
		reports.push(...report)
	}

	console.log(`Processed ${total} files; modified ${modified}.`)
	if (reports.length) {
		console.log("Notes:\n" + reports.join("\n"))
	}
}

// Execute if run directly
if (import.meta.main) {
	await fixArchitectTypesImports()
}

//?? [GOTCHA] Contains for-await loop that violates FP rules - marked as tech debt
