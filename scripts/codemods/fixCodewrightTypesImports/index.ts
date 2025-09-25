#!/usr/bin/env -S deno run -A
/*++
 | Codemod: Replace imports from components barrel within libraries/pagewright/types/**
 | with concrete default imports from src/define/**.
 |
 | Strategy:
 | - For each types file, build a map of symbol -> type path from existing `import type` lines.
 | - For each line importing from any ../../…/pagewright/index.tsx, for each specifier like
 |   `{ X as XComponent }`, find the type path for X, convert …/types/schema.org/… to …/src/define/…,
 |   and switch to: `import XComponent from "<computed path>/index.tsx"`.
 | - If we can't find a type import for a symbol, try to discover the src/define path via filesystem
 |   lookup. If still not found or ambiguous, leave the original line and report.
 */

import { TYPES_ROOT } from "./constants/index.ts"
import processFile from "./processFile/index.ts"
import walk from "./walk/index.ts"

//++ Main function to process all TypeScript files in types directory
export default async function fixPagewrightTypesImports(): Promise<void> {
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
	await fixPagewrightTypesImports()
}

//?? [GOTCHA] Contains for-await loop that violates FP rules - marked as tech debt
