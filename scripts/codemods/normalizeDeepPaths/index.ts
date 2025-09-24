#!/usr/bin/env -S deno run --allow-read --allow-write
/*++
 | Rewrite deep import specifiers like "libraries/toolsmith/src/..." to proper relative paths
 | within libraries/codewright/src subdirectories (.ts and .tsx files)
 */

import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts"

import { CODEWRIGHT_ROOT } from "./constants/index.ts"
import processFile from "./processFile/index.ts"

//++ Main function to normalize deep paths in all component files
export default async function normalizeDeepPaths(): Promise<void> {
	let touched = 0

	//-- [REFACTOR] For-await loop should be replaced with functional approach
	for await (
		const entry of walk(CODEWRIGHT_ROOT, {
			includeDirs: false,
			exts: [".ts", ".tsx"],
		})
	) {
		const filePath = entry.path
		const did = await processFile(filePath)
		if (did) touched++
	}

	console.log(`normalize-deep-paths: updated ${touched} files`)
}

// Execute if run directly
if (import.meta.main) {
	await normalizeDeepPaths()
}

//?? [GOTCHA] Contains for-await loop that violates FP rules - marked as tech debt
