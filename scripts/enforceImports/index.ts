import type { AliasViolation } from "../types/index.ts"

// Enforce repo alias policy for cross-package imports.
// Default scopes: libraries/components/src, docs/src, scripts

import {
	DEFAULT_ALIAS_SCOPES,
	ENGINE_SRC,
	ENGINE_TYPES,
	TOOLKIT_SRC,
} from "../constants/index.ts"
import flatMap from "@sitebender/toolkit/vanilla/array/flatMap/index.ts"
import split from "@sitebender/toolkit/vanilla/string/split/index.ts"

import walkTsFiles from "./walkTsFiles/index.ts"

function isInside(file: string, pkgDir: string): boolean {
	return file.includes(`/${pkgDir}/`)
}

function checkFileForAliasViolations(
	file: string,
	text: string,
): AliasViolation[] {
	const lines = split(/\r?\n/)(text)
	const importRe = /(import|export)\s+[^;]*?from\s+["']([^"']+)["']/g

	// Use flatMap to transform each line into its violations
	return flatMap<string, AliasViolation>((line, idx) => {
		const lineViolations: AliasViolation[] = []
		let m: RegExpExecArray | null

		// Reset regex for each line
		importRe.lastIndex = 0

		while ((m = importRe.exec(line))) {
			const spec = m[2]

			// Skip allowed aliases
			if (
				spec.startsWith("@sitebender/engine/") ||
				spec.startsWith("@sitebender/engine-types/") ||
				spec.startsWith("@sitebender/toolkit/")
			) {
				continue
			}

			// If this file is NOT inside engine/, disallow deep engine imports
			if (!isInside(file, "libraries/engine")) {
				if (spec.includes(ENGINE_SRC)) {
					lineViolations.push({
						file,
						line: idx + 1,
						spec,
						hint: "Use @sitebender/engine/… instead of libraries/engine/src/…",
					})
				}
				if (spec.includes(ENGINE_TYPES)) {
					lineViolations.push({
						file,
						line: idx + 1,
						spec,
						hint:
							"Use @sitebender/engine-types/… instead of libraries/engine/types/…",
					})
				}
			}

			// If this file is NOT inside toolkit/, disallow deep toolkit imports
			if (!isInside(file, "libraries/toolkit")) {
				if (spec.includes(TOOLKIT_SRC)) {
					lineViolations.push({
						file,
						line: idx + 1,
						spec,
						hint:
							"Use @sitebender/toolkit/… instead of libraries/toolkit/src/…",
					})
				}
			}
		}

		return lineViolations
	})(lines)
}

export default async function enforceImports(rootsArg: string[] = Deno.args) {
	const roots = rootsArg.length ? rootsArg : DEFAULT_ALIAS_SCOPES
	const violations: AliasViolation[] = []

	for (const root of roots) {
		try {
			for await (const file of walkTsFiles(root)) {
				const text = await Deno.readTextFile(file)
				violations.push(...checkFileForAliasViolations(file, text))
			}
		} catch (err) {
			if (!(err instanceof Deno.errors.NotFound)) throw err
		}
	}

	if (violations.length) {
		console.error("Alias policy violations:\n")
		for (const v of violations) {
			console.error(`${v.file}:${v.line} -> '${v.spec}'  (${v.hint})`)
		}
		console.error(`\nTotal: ${violations.length} violation(s).`)
		Deno.exit(1)
	}

	console.log("Alias policy: OK (no violations found).")
}

if (import.meta.main) {
	await enforceImports()
}
