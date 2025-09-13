// deno-lint-ignore-file no-explicit-any
// Codemod: Replace imports from components barrel within libraries/components/types/**
// with concrete default imports from src/define/**.
//
// Strategy:
// - For each types file, build a map of symbol -> type path from existing `import type` lines.
// - For each line importing from any ../../…/components/index.tsx, for each specifier like
//   `{ X as XComponent }`, find the type path for X, convert …/types/schema.org/… to …/src/define/…,
//   and switch to: `import XComponent from "<computed path>/index.tsx"`.
// - If we can't find a type import for a symbol, try to discover the src/define path via filesystem
//   lookup. If still not found or ambiguous, leave the original line and report.

import {
	basename,
	dirname,
	fromFileUrl,
	join,
	relative,
	resolve,
} from "https://deno.land/std@0.224.0/path/mod.ts"

const workspaceRoot = fromFileUrl(new URL("../..", import.meta.url))
const TYPES_ROOT = resolve(
	workspaceRoot,
	"libraries/components/types/schema.org",
)
const SRC_DEFINE_ROOT = resolve(
	workspaceRoot,
	"libraries/components/src/define",
)

interface ImportSpec {
	original: string
	component: string // e.g., PersonComponent
	symbol: string // e.g., Person
}

function parseBarrelImport(line: string): ImportSpec[] | null {
	// Match import { A as AComponent, B as BComponent } from "../../../../components/index.tsx"
	const m = line.match(
		/^\s*import\s*\{([^}]*)\}\s*from\s*["'](.+components\/index\.tsx)["'];?\s*$/,
	)
	if (!m) return null
	const inside = m[1]
	const specs: ImportSpec[] = []
	for (const part of inside.split(",")) {
		const seg = part.trim()
		if (!seg) continue
		const mm = seg.match(/^(\w+)\s+as\s+(\w+)$/)
		if (!mm) continue
		specs.push({ original: seg, symbol: mm[1], component: mm[2] })
	}
	return specs.length ? specs : null
}

function buildTypeImportMap(
	content: string,
	fileDir: string,
): Map<string, string> {
	const map = new Map<string, string>()
	const reDefault = /import\s+type\s+(\w+)\s+from\s+["'](.+?index\.ts)["'];/g
	const reNamed =
		/import\s+type\s+\{\s*([^}]+)\s*\}\s+from\s+["'](.+?index\.ts)["'];/g

	for (const m of content.matchAll(reDefault)) {
		const [, name, rel] = m as any
		const abs = resolve(fileDir, rel)
		map.set(name, abs)
	}
	for (const m of content.matchAll(reNamed)) {
		const [, names, rel] = m as any
		const abs = resolve(fileDir, rel)
		for (const n of names.split(",")) {
			const name = n.trim().split(/\s+as\s+/)[0]
			if (name) map.set(name, abs)
		}
	}
	return map
}

function toSrcDefinePath(typeAbsPath: string): string {
	// Convert .../libraries/components/types/schema.org/<schema path>/index.ts
	// to .../libraries/components/src/define/<schema path>/index.tsx
	const idx = typeAbsPath.indexOf("/types/schema.org/")
	if (idx === -1) return ""
	const schemaPath = typeAbsPath.slice(idx + "/types/schema.org/".length)
	return resolve(
		typeAbsPath.slice(0, idx),
		"src/define",
		schemaPath.replace(/index\.ts$/, "index.tsx"),
	)
}

const defineLookupCache = new Map<string, { count: number; paths: string[] }>()
async function findDefineComponentByName(
	symbol: string,
): Promise<{ count: number; paths: string[] }> {
	const cached = defineLookupCache.get(symbol)
	if (cached) return cached

	// Search for .../src/define/**/<symbol>/index.tsx
	const allMatches: string[] = []
	const exactParentMatches: string[] = []
	const target = symbol
	async function* walkDir(dir: string): AsyncGenerator<string> {
		for await (const entry of Deno.readDir(dir)) {
			const p = join(dir, entry.name)
			if (entry.isDirectory) {
				yield* walkDir(p)
			} else if (entry.isFile) {
				if (basename(p) === "index.tsx" && p.includes(`/${target}/`)) {
					allMatches.push(p)
					if (basename(dirname(p)) === target) {
						exactParentMatches.push(p)
					}
				}
			}
		}
	}
	try {
		await (async () => {
			for await (const _ of walkDir(SRC_DEFINE_ROOT)) { /*noop*/ }
		})()
	} catch (_) {
		// ignore
	}

	let result: { count: number; paths: string[] }
	if (exactParentMatches.length === 1) {
		result = { count: 1, paths: exactParentMatches }
	} else if (exactParentMatches.length > 1) {
		result = { count: exactParentMatches.length, paths: exactParentMatches }
	} else {
		// No exact parent matches; try to pick the shortest path as heuristic if present
		if (allMatches.length === 1) {
			result = { count: 1, paths: allMatches }
		} else if (allMatches.length > 1) {
			const shortest = allMatches.reduce((a, b) => a.length <= b.length ? a : b)
			result = { count: 1, paths: [shortest] }
		} else {
			result = { count: 0, paths: [] }
		}
	}
	defineLookupCache.set(symbol, result)
	return result
}

async function processFile(
	filePath: string,
): Promise<{ changed: boolean; report: string[] }> {
	const report: string[] = []
	const raw = await Deno.readTextFile(filePath)
	const lines = raw.split("\n")
	const dir = dirname(filePath)
	const typeMap = buildTypeImportMap(raw, dir)

	// Build tasks for each line; resolve all at once to avoid await-in-loop
	const lineTasks: Array<Promise<{ lines: string[]; changed: boolean; report: string[] }>> = []

	for (const line of lines) {
		const specs = parseBarrelImport(line)
		if (!specs) {
			lineTasks.push(Promise.resolve({ lines: [line], changed: false, report: [] }))
			continue
		}

		lineTasks.push((async () => {
			const replacementLines: string[] = []
			let failed = false
			// Collect asynchronous discoveries per spec
			const pending: Array<Promise<{ s: ImportSpec; srcAbs: string; failed: boolean; report?: string }>> = []
			for (const s of specs) {
				// 1) Preferred: map via existing type imports
				let srcAbs = ""
				const typeAbs = typeMap.get(s.symbol)
				if (typeAbs) {
					srcAbs = toSrcDefinePath(typeAbs)
				}

				// 2) Fallback: discover via filesystem
				if (!srcAbs) {
					pending.push(
						findDefineComponentByName(s.symbol).then((discovered) => {
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
								report: `WARN ${filePath}: Multiple src/define matches for ${s.symbol}: ${discovered.paths.map((p) => relative(dir, p)).join(", ")}; keeping barrel import`,
							}
						}),
					)
				} else {
					pending.push(Promise.resolve({ s, srcAbs, failed: false as const }))
				}
			}

			const settled = await Promise.all(pending)
			const localReports: string[] = []
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
		})())
	}

	const results = await Promise.all(lineTasks)
	const newLines: string[] = []
	let changed = false
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

async function* walk(dir: string): AsyncGenerator<string> {
	for await (const entry of Deno.readDir(dir)) {
		const p = join(dir, entry.name)
		if (entry.isDirectory) {
			yield* walk(p)
		} else if (entry.isFile && p.endsWith(".ts")) {
			yield p
		}
	}
}

const reports: string[] = []
let total = 0, modified = 0
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
