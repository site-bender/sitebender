import { dirname, relative } from "https://deno.land/std@0.224.0/path/mod.ts"

import type { ImportSpec } from "../types/index.ts"
import buildTypeImportMap from "../buildTypeImportMap/index.ts"
import findDefineComponentByName from "../findDefineComponentByName/index.ts"
import parseBarrelImport from "../parseBarrelImport/index.ts"
import toSrcDefinePathFromArchitectType from "../toSrcDefinePathFromArchitectType/index.ts"

//++ Processes a single file to replace barrel imports with concrete imports
export default async function processFile(
	filePath: string,
): Promise<{ changed: boolean; report: string[] }> {
	const report: string[] = []
	const raw = await Deno.readTextFile(filePath)
	const lines = raw.split("\n")
	const dir = dirname(filePath)
	const typeMap = buildTypeImportMap(raw)(dir)

	// Build tasks for each line; resolve all at once to avoid await-in-loop
	const lineTasks: Array<Promise<{ lines: string[]; changed: boolean; report: string[] }>> = []

	//-- [REFACTOR] For loop should be replaced with functional approach
	for (const line of lines) {
		const specs = parseBarrelImport(line)
		if (!specs) {
			lineTasks.push(Promise.resolve({ lines: [line], changed: false, report: [] }))
			continue
		}

		lineTasks.push(processLineWithSpecs(filePath, dir, typeMap, specs, line))
	}

	const results = await Promise.all(lineTasks)
	const newLines: string[] = []
	let changed = false

	//-- [REFACTOR] For loop should be replaced with functional approach
	for (const r of results) {
		if (r.report.length) report.push(...r.report)
		if (r.changed) changed = true
		newLines.push(...r.lines)
	}

	if (changed) {
		await Deno.writeTextFile(filePath, newLines.join("\n"))
	}

	return { changed, report }
}

//++ Helper function to process a line with import specifications
async function processLineWithSpecs(
	filePath: string,
	dir: string,
	typeMap: Map<string, string>,
	specs: ImportSpec[],
	line: string,
): Promise<{ lines: string[]; changed: boolean; report: string[] }> {
	const replacementLines: string[] = []
	let failed = false
	// Collect asynchronous discoveries per spec
	const pending: Array<Promise<{ s: ImportSpec; srcAbs: string; failed: boolean; report?: string }>> = []

	//-- [REFACTOR] For loop should be replaced with functional approach
	for (const s of specs) {
		// 1) Preferred: map via existing type imports
		let srcAbs = ""
		const typeAbs = typeMap.get(s.symbol)
		if (typeAbs) {
			srcAbs = toSrcDefinePathFromArchitectType(typeAbs)
		}

		// 2) Fallback: discover via filesystem
		if (!srcAbs) {
			pending.push(
				findDefineComponentByName(s.symbol).then(function handleDiscovered(discovered) {
					if (discovered.count === 1) {
						return { s, srcAbs: discovered.paths[0], failed: false as const }
					}
					if (discovered.count === 0) {
						return {
							s,
							srcAbs: "",
							failed: true as const,
							report: `WARN ${filePath}: No type import and no src/define match for ${s.symbol}; keeping barrel import`,
						}
					}
					return {
						s,
						srcAbs: "",
						failed: true as const,
						report: `WARN ${filePath}: Multiple src/define matches for ${s.symbol}: ${discovered.paths.map((p: string) => relative(dir, p)).join(", ")}; keeping barrel import`,
					}
				}),
			)
		} else {
			pending.push(Promise.resolve({ s, srcAbs, failed: false as const }))
		}
	}

	const settled = await Promise.all(pending)
	const localReports: string[] = []

	//-- [REFACTOR] For loop should be replaced with functional approach
	for (const res of settled) {
		if (res.report) localReports.push(res.report)
		if (res.failed) {
			failed = true
			break
		}
		const srcRel = relative(dir, res.srcAbs).replaceAll("\\", "/")
		replacementLines.push(
			`import ${res.s.component} from "${
				srcRel.startsWith(".") ? srcRel : "./" + srcRel
			}"`,
		)
	}

	if (failed) {
		return { lines: [line], changed: false, report: localReports }
	}

	return { lines: replacementLines, changed: true, report: localReports }
}

//?? [GOTCHA] Contains for loops that violate FP rules - marked as tech debt
