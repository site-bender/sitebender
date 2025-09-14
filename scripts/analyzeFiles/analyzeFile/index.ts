import { relative } from "jsr:@std/path"

import type { PerFileAnalysis } from "../types/index.ts"

import filter from "@sitebender/toolkit/vanilla/array/filter/index.ts"
import map from "@sitebender/toolkit/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolkit/vanilla/array/reduce/index.ts"
import sliceArray from "@sitebender/toolkit/vanilla/array/slice/index.ts"
import sort from "@sitebender/toolkit/vanilla/array/sort/index.ts"
import slice from "@sitebender/toolkit/vanilla/string/slice/index.ts"
import split from "@sitebender/toolkit/vanilla/string/split/index.ts"
import startsWith from "@sitebender/toolkit/vanilla/string/startsWith/index.ts"
import trim from "@sitebender/toolkit/vanilla/string/trim/index.ts"
import until from "@sitebender/toolkit/vanilla/combinator/until/index.ts"

import stripCommentsAndStrings from "../../enforcement/fp/stripCommentsAndStrings/index.ts"

export default async function analyzeFile(
	opts: { absPath: string; root: string; onlyDefault?: boolean },
): Promise<PerFileAnalysis> {
	const text = await Deno.readTextFile(opts.absPath)
	const lines = split(text, "\n")
	// Strip comments/strings to avoid false positives
	const clean = stripCommentsAndStrings(text)

	type Hit = { index: number; name: string; kind: "block" | "concise" }
	const nonDefaultExported: Set<string> = new Set()
	const defaultNames: Set<string> = new Set()

	// 1) Function declarations (supports async/generator and optional name)
	const reDecl =
		/(export\s+default\s+)?(async\s+)?function(\s*\*)?\s*([A-Za-z0-9_$]+)?\s*\(/g
	// 2) Named function expressions: const x = function() {}/async/generator
	const reNamedExpr =
		/(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(async\s+)?function(\s*\*)?\s*\(/g
	// 3) Arrow with block body: const x = (...) => { ... }
	const reArrowBlock =
		/(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*\{/g
	// 4) Arrow with concise body: const x = (...) => expr
	const reArrowConcise =
		/(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*(?!\{)/g
	// 5) export default arrow/function without name
	const reExportDefaultArrow =
		/export\s+default\s+(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*(\{)?/g
	// capture `export default Name` (identifier or function name); not arrow/function keyword ahead
	const reExportDefaultName =
		/\bexport\s+default\s+([A-Za-z0-9_$]+)\b(?!\s*\()/g
	// `export { X as default }`
	const reLocalExportAsDefault = /\bexport\s*\{([\s\S]*?)\}/g
	// 6) Exported named const function/arrow: export const X = function|=>
	const reExportNamedExprFunc =
		/\bexport\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?function/g
	const reExportNamedExprArrow =
		/\bexport\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>/g
	// 7) Exported function declaration (named, non-default)
	const reExportFunctionDecl =
		/\bexport\s+(?:async\s+)?function\s+([A-Za-z0-9_$]+)/g
	// 8) Local named export list (no 'from'): export { A, B as C }
	const reLocalNamedExportList = /\bexport\s*\{([\s\S]*?)\}\s*(?!from\b)/g

	// Helper function to extract regex matches functionally
	const extractMatches = (regex: RegExp, text: string): RegExpExecArray[] => {
		regex.lastIndex = 0 // Reset regex state

		return until(
			(state: { done: boolean; matches: RegExpExecArray[] }) => state.done,
			(state: { done: boolean; matches: RegExpExecArray[] }) => {
				const match = regex.exec(text)
				return match === null
					? { done: true, matches: state.matches }
					: { done: false, matches: [...state.matches, match] }
			},
			{ done: false, matches: [] as RegExpExecArray[] }
		).matches
	}

	// Process function declarations
	const declMatches = extractMatches(reDecl, clean)
	const declHits = reduce(
		(acc: Hit[], m: RegExpExecArray) => {
			const idx = m.index
			const isDefault = !!m[1]
			const name = m[4] && trim(m[4]).length
				? m[4]
				: (isDefault ? "<default>" : "<anonymous>")
			// if onlyDefault is set, skip non-default declarations
			if (!opts.onlyDefault || isDefault) {
				acc = [...acc, { index: idx, name, kind: "block" as const }]
			}
			// Track non-default exported function declarations separately
			if (!isDefault && startsWith(m[0], "export")) {
				if (name && name !== "<anonymous>") nonDefaultExported.add(name)
			}
			// Track default name if present on default function decl: export default function Name() {}
			if (
				isDefault && name && name !== "<default>" && name !== "<anonymous>"
			) {
				defaultNames.add(name)
			}
			return acc
		},
		[] as Hit[],
	)(declMatches)

	// Process named function expressions
	const namedExprMatches = extractMatches(reNamedExpr, clean)
	const namedExprHits = opts.onlyDefault ? [] : map(
		namedExprMatches,
		(m) => ({ index: m.index, name: m[1], kind: "block" as const })
	)

	// Process arrow with block
	const arrowBlockMatches = extractMatches(reArrowBlock, clean)
	const arrowBlockHits = opts.onlyDefault ? [] : map(
		arrowBlockMatches,
		(m) => ({ index: m.index, name: m[1], kind: "block" as const })
	)

	// Process arrow concise
	const arrowConciseMatches = extractMatches(reArrowConcise, clean)
	const arrowConciseHits = opts.onlyDefault ? [] : map(
		arrowConciseMatches,
		(m) => ({ index: m.index, name: m[1], kind: "concise" as const })
	)

	// Process export default arrow
	const exportDefaultArrowMatches = extractMatches(reExportDefaultArrow, clean)
	const exportDefaultArrowHits = map(
		exportDefaultArrowMatches,
		(m) => {
			const kind: Hit["kind"] = m[1] ? "block" : "concise"
			return { index: m.index, name: "<default>", kind }
		}
	)

	// Process export default Name
	const exportDefaultNameMatches = extractMatches(reExportDefaultName, clean)
	reduce(
		(acc: void, m: RegExpExecArray) => {
			defaultNames.add(m[1])
			return acc
		},
		undefined,
	)(exportDefaultNameMatches)

	// Process export { X as default }
	const localExportAsDefaultMatches = extractMatches(reLocalExportAsDefault, clean)
	reduce(
		(acc: void, m: RegExpExecArray) => {
			const inside = m[1]
			const entries = filter(map(split(inside, ","), (s) => trim(s)), Boolean)
			reduce(
				(acc2: void, entry: string) => {
					const parts = filter(
						map(split(entry, /\s+as\s+/i), (s) => trim(s)),
						Boolean,
					)
					if (
						parts.length === 2 && /^(default)$/i.test(parts[1]) && parts[0]
					) {
						defaultNames.add(parts[0])
					}
					return acc2
				},
				undefined,
			)(entries)
			return acc
		},
		undefined,
	)(localExportAsDefaultMatches)

	// Process exported named const function
	const exportNamedExprFuncMatches = extractMatches(reExportNamedExprFunc, clean)
	reduce(
		(acc: void, m: RegExpExecArray) => {
			nonDefaultExported.add(m[1])
			return acc
		},
		undefined,
	)(exportNamedExprFuncMatches)

	// Process exported named const arrow
	const exportNamedExprArrowMatches = extractMatches(reExportNamedExprArrow, clean)
	reduce(
		(acc: void, m: RegExpExecArray) => {
			nonDefaultExported.add(m[1])
			return acc
		},
		undefined,
	)(exportNamedExprArrowMatches)

	// Process exported function declaration (non-default)
	const exportFunctionDeclMatches = extractMatches(reExportFunctionDecl, clean)
	reduce(
		(acc: void, m: RegExpExecArray) => {
			nonDefaultExported.add(m[1])
			return acc
		},
		undefined,
	)(exportFunctionDeclMatches)

	// Collect all hits
	const allHits = [
		...declHits,
		...namedExprHits,
		...arrowBlockHits,
		...arrowConciseHits,
		...exportDefaultArrowHits,
	]

	// Extract function names for local export processing
	const functionNames = new Set(filter(map(allHits, (h) => h.name), (name) => name && !startsWith(name, "<")))

	// Process local export list without 'from'
	const localNamedExportListMatches = extractMatches(reLocalNamedExportList, clean)
	reduce(
		(acc: void, listMatch: RegExpExecArray) => {
			const inside = listMatch[1]
			const names = filter(map(split(inside, ","), (s) => trim(s)), Boolean)
			reduce(
				(acc2: void, entry: string) => {
					// support "Name as Alias" — take the exported alias name (after 'as')
					const parts = filter(
						map(split(entry, /\s+as\s+/i), (s) => trim(s)),
						Boolean,
					)
					const exportedName = parts[parts.length - 1]
					// Only flag if this corresponds to a function we detected in this file
					if (functionNames.has(exportedName)) {
						nonDefaultExported.add(exportedName)
					}
					return acc2
				},
				undefined,
			)(names)
			return acc
		},
		undefined,
	)(localNamedExportListMatches)

	// Sort hits by index to produce stable ordering, then compute line/loc
	const sortedHits = sort(allHits, (a, b) => a.index - b.index)

	const fns = map(sortedHits, (h) => {
		const before = slice(clean, 0, h.index)
		const startLine = split(before, "\n").length
		const loc = h.kind === "block"
			? estimateFunctionLoc(text, startLine)
			: 1
		const endLine = startLine + Math.max(0, loc - 1)
		return { name: h.name, loc, startLine, endLine }
	})

	return {
		pathAbs: opts.absPath,
		pathRel: relative(opts.root, opts.absPath),
		lines: lines.length,
		functions: fns,
		nonDefaultExported: nonDefaultExported.size
			? sort(Array.from(nonDefaultExported), (a, b) => a.localeCompare(b))
			: undefined,
		defaultNames: defaultNames.size
			? sort(Array.from(defaultNames), (a, b) => a.localeCompare(b))
			: undefined,
	}
}

function estimateFunctionLoc(source: string, startLine: number): number {
	// very rough: from startLine, search forward for balanced braces; fallback to 1 line
	const lines = split(source, "\n")

	// Helper to count braces in a line
	const countBraces = (line: string) => reduce(
		(acc: { open: number; close: number }, ch: string) => ({
			open: acc.open + (ch === "{" ? 1 : 0),
			close: acc.close + (ch === "}" ? 1 : 0),
		}),
		{ open: 0, close: 0 },
	)(split(line, ""))

	// Process lines starting from startLine
	const relevantLines = sliceArray(startLine - 1)(lines)

	// Find the end using reduce to track state
	const result = reduce(
		(acc: { depth: number; started: boolean; lineCount: number; found: boolean }, line: string, index: number) => {
			if (acc.found) return acc

			const braces = countBraces(line)
			const newDepth = acc.depth + braces.open - braces.close
			const newStarted = acc.started || braces.open > 0

			if (newStarted && newDepth <= 0) {
				return { ...acc, lineCount: index + 1, found: true }
			}

			return { depth: newDepth, started: newStarted, lineCount: index + 1, found: false }
		},
		{ depth: 0, started: false, lineCount: 0, found: false },
	)(relevantLines)

	return result.found ? result.lineCount : 1
}
