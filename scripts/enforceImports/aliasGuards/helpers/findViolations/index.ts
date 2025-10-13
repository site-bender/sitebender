import flatMap from "@sitebender/toolsmith/array/flatMap/index.ts"

import type { Violation } from "../../types/index.ts"

// Match only real import/export-from statements at the start of a line (ignoring leading whitespace).
// This avoids false positives for strings that merely CONTAIN such text inside tests or other code.
const importOrExportFromPattern =
	/^(?:\s*)(?:import|export)\s+[^;]*?\bfrom\s+["']([^"']+)["']/

// Top-level re-export forms to forbid (barrels, alias-y exports):
const reExportPatterns: RegExp[] = [
	/^\s*export\s+\*\s+from\s+['"][^'\"]+['"]/,
	/^\s*export\s+\{[\s\S]*?\}\s+from\s+['"][^'\"]+['"]/,
	/^\s*export\s+\*\s+as\s+\w+\s+from\s+['"][^'\"]+['"]/,
	/^\s*export\s+\{?\s*default(?:\s+as\s+\w+)?\s*\}?\s+from\s+['"][^'\"]+['"]/,
]

async function* globWalk(root: string): AsyncGenerator<string> {
	for await (const entry of Deno.readDir(root)) {
		const full = `${root}/${entry.name}`
		if (entry.isDirectory) {
			yield* globWalk(full)
		} else if (entry.isFile && /\.(ts|tsx)$/.test(entry.name)) {
			yield full
		}
	}
}

export default async function findViolations(
	roots: string[],
): Promise<Violation[]> {
	const violations: Violation[] = []
	for (const root of roots) {
		try {
			for await (const file of globWalk(root)) {
				const text = await Deno.readTextFile(file)
				const lines = text.split(/\r?\n/)

				// Use flatMap to transform each line into its violations
				const fileViolations = flatMap<string, Violation>((line, idx) => {
					const lineViolations: Violation[] = []

					// 1) Forbid any top-level re-export statements
					for (const pat of reExportPatterns) {
						if (pat.test(line)) {
							lineViolations.push({
								file,
								line: idx + 1,
								spec: line.trim(),
								hint:
									"No re-exports/barrels. Export concrete symbols from their own files, or create a wrapper function; do not use `export … from …`.",
							})
							return lineViolations // Early return for this line
						}
					}

					// 2) Forbid alias/package imports (require deep links)
					const m = importOrExportFromPattern.exec(line)
					if (m) {
						const spec = m[1]
						if (spec.startsWith("@sitebender/")) {
							lineViolations.push({
								file,
								line: idx + 1,
								spec,
								hint:
									"Do not use @sitebender/* aliases. Deep import the precise path (e.g., libraries/.../src/…) and avoid barrels.",
							})
						}
					}

					return lineViolations
				})(lines)

				violations.push(...fileViolations)
			}
		} catch (err) {
			// Non-fatal: missing scope directory
			if (!(err instanceof Deno.errors.NotFound)) throw err
		}
	}
	return violations
}
