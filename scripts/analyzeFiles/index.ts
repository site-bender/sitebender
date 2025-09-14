import {
	bold,
	cyan,
	gray,
	green,
	magenta,
	red,
	white,
	yellow,
} from "jsr:@std/fmt@1.0.3/colors"

import filter from "@sitebender/toolkit/vanilla/array/filter/index.ts"
import includes from "@sitebender/toolkit/vanilla/array/includes/index.ts"
import join from "@sitebender/toolkit/vanilla/array/join/index.ts"
import map from "@sitebender/toolkit/vanilla/array/map/index.ts"
import range from "@sitebender/toolkit/vanilla/array/range/index.ts"
import reduce from "@sitebender/toolkit/vanilla/array/reduce/index.ts"
import slice from "@sitebender/toolkit/vanilla/array/slice/index.ts"
import sort from "@sitebender/toolkit/vanilla/array/sort/index.ts"
import replace from "@sitebender/toolkit/vanilla/string/replace/index.ts"
import split from "@sitebender/toolkit/vanilla/string/split/index.ts"
import trim from "@sitebender/toolkit/vanilla/string/trim/index.ts"
import pipe from "@sitebender/toolkit/pipe/index.ts"

import type {
	AnalysisOptions,
	AnalysisResult,
	BarrelInfo,
	FileFunction,
	PerFileAnalysis,
} from "./types/index.ts"

/**
 * Analyze repository source files for size and function complexity.
 * - One function per folder style: helpers live under ./utilities and ./statistics
 * - Types in ./types, constants in ./constants
 * - Default export is the analyzeFiles function; CLI available via import.meta.main
 */

import runCli, { type CliRunArgs } from "../utilities/cli/runCli/index.ts"
import analyzeFile from "./analyzeFile/index.ts"
import {
	DEFAULT_EXCLUDED_DIR_NAMES,
	DEFAULT_SCAN_DIRS,
	EXTENSIONS,
	MAX_FN_LINES_DEFAULT,
} from "./constants/index.ts"
import computeFileStats from "./statistics/computeFileStats/index.ts"
import computeFunctionStats from "./statistics/computeFunctionStats/index.ts"
import walkFolder from "./walkFolder/index.ts"

export default async function analyzeFiles(
	opts?: AnalysisOptions,
): Promise<AnalysisResult> {
	const root = opts?.root ?? Deno.cwd()
	const dirs = opts?.scanDirs ?? DEFAULT_SCAN_DIRS
	const excludedDirNames = new Set([
		...(opts?.excludeDirNames ?? DEFAULT_EXCLUDED_DIR_NAMES),
	])
	const _maxFnLines = opts?.maxFunctionLines ?? MAX_FN_LINES_DEFAULT
	const concurrency = Math.max(1, Math.min(64, opts?.concurrency ?? 8))
	const excludeBarrels = opts?.excludeBarrels ?? true
	// We analyze all functions by default; we keep the option for backward-compat but default is false
	const defaultOnly = opts?.defaultOnly ?? false

	// Collect files from all directories using functional approach
	const fileCollectionPromises = map(dirs, async (d) => {
		const dirFiles: string[] = []
		for await (
			const f of walkFolder({
				root,
				dir: d,
				exts: EXTENSIONS,
				excludedDirNames,
			})
		) dirFiles.push(f)
		return dirFiles
	})
	const fileArrays = await Promise.all(fileCollectionPromises)
	const files = fileArrays.flat()

	// Exclude barrel files (re-export hubs), capture info for reporting
	let barrels: BarrelInfo[] = []
	const filteredFiles = excludeBarrels
		? filter(files, (p) => {
			// Do not consider TSX files as barrels; component files often have named exports alongside a default component
			if (p.endsWith(".tsx")) return true
			try {
				const txt = Deno.readTextFileSync(p)
				// Detect explicit re-exports only; a barrel file re-exports from other modules
				const reExportStarMatches =
					txt.match(/\bexport\s+\*\s+from\s+['"][^'"]+['"]/g) || []
				const namedReExportMatches = txt.match(
					/\bexport\s+\{([^}]*)\}\s+from\s+['"][^'"]+['"]/gs,
				) || []
				const reExportStatements = reExportStarMatches.length +
					namedReExportMatches.length
				if (reExportStatements === 0) return true
				// Count specifiers per named block by comma, ignoring whitespace and empty items
				const namedSpecifiers = reduce(
					namedReExportMatches,
					(acc, m) => {
						const inside = replace(m, /^.*?\{([\s\S]*?)\}.*$/, "$1")
						const count = pipe(
							inside,
							(str) => split(str, ","),
							(arr) => map(arr, (s) => trim(s)),
							(arr) => filter(arr, (s) => s.length > 0)
						).length
						return acc + count
					},
					0,
				)
				const totalReexported = reExportStarMatches.length +
					namedSpecifiers
				const isIndex = /\/index\.ts$/.test(p)
				const hasOwnDefault = /\bexport\s+default\b/.test(txt)
				// Alias: a single small re-export file (e.g., export { default } from './x') that is not index.ts
				const isAlias = reExportStatements === 1 &&
					totalReexported <= 1 &&
					!isIndex
				// Barrel: re-export hub. Thresholds loosened for index.ts
				const isBarrel = !hasOwnDefault && !isAlias && (
					(isIndex &&
						(reExportStatements >= 2 || totalReexported >= 10)) ||
					(!isIndex &&
						(reExportStatements >= 3 || totalReexported >= 10))
				)
				if (isBarrel) {
					barrels = [...barrels, {
						file: replace(p, root + "/", ""),
						exports: totalReexported,
					}]
					return false
				}
				return true
			} catch (_) {
				// ignore barrel detection read errors; file may disappear during scan
				return true
			}
		})
		: files

	// Bounded parallelism for file analysis using functional approach
	const analyzeFileWithIndex = (file: string, index: number) =>
		analyzeFile({ absPath: file, root, onlyDefault: defaultOnly })
			.then(result => ({ index, result }))

	// Process files in chunks to control concurrency using functional approach
	const createChunks = (files: string[], chunkSize: number): string[][] =>
		pipe(
			range(0)(Math.ceil(files.length / chunkSize)),
			(indices) => map(indices, (i) => files.slice(i * chunkSize, (i + 1) * chunkSize))
		)

	const processInChunks = async (files: string[], chunkSize: number) => {
		const chunks = createChunks(files, chunkSize)
		const results: PerFileAnalysis[] = new Array(files.length)

		// Process chunks sequentially using reduce to control concurrency
		await reduce(
			async (acc: Promise<void>, chunk: string[], chunkIndex: number) => {
				await acc // Wait for previous chunk to complete
				const startIndex = chunkIndex * chunkSize
				const chunkPromises = map(chunk, (file, localIndex) =>
					analyzeFileWithIndex(file, startIndex + localIndex)
				)
				const chunkResults = await Promise.all(chunkPromises)

				// Use reduce to accumulate results instead of for loop
				reduce(
					(acc: void, { index, result }: { index: number; result: PerFileAnalysis }) => {
						results[index] = result
						return acc
					},
					undefined,
				)(chunkResults)
			},
			Promise.resolve(),
		)(chunks)

		return results
	}

	const perFile = await processInChunks(filteredFiles, concurrency)
	const fileStats = computeFileStats(perFile)
	const functionStats = computeFunctionStats(
		perFile.flatMap((f: PerFileAnalysis) => f.functions),
	)
	const dynThreshold = Math.max(
		1,
		Math.round(functionStats.mean + 3 * functionStats.stdDev),
	)
	const thresholdToUse = opts?.maxFunctionLines ?? dynThreshold
	const longFunctions: Array<FileFunction & { file: string }> = pipe(
		perFile,
		(files) => files.flatMap((f: PerFileAnalysis) =>
			pipe(
				f.functions,
				(fns) => filter(fns, (fn: FileFunction) => fn.loc > thresholdToUse),
				(fns) => map(fns, (fn: FileFunction) => ({ ...fn, file: f.pathRel }))
			)
		),
		(fns) => sort(fns, (a, b) => b.loc - a.loc)
	)

	// Collect non-default exported functions/components using functional approach
	const nonDefault = pipe(
		perFile,
		(files) => filter(files, (f) => f.nonDefaultExported && f.nonDefaultExported.length > 0),
		(files) => map(files, (f) => ({ file: f.pathRel, names: f.nonDefaultExported! })),
		(items) => sort(items, (a, b) => a.file.localeCompare(b.file))
	)

	const duplicates = pipe(
		perFile,
		(files) => filter(files, (f) =>
			f.nonDefaultExported && f.defaultNames && f.defaultNames.length > 0
		),
		(files) => map(files, (f) => {
			const dup = filter(
				f.nonDefaultExported!,
				(n) => includes(f.defaultNames!)(n)
			)
			return dup.length > 0
				? { file: f.pathRel, names: sort(dup, (a, b) => a.localeCompare(b)) }
				: null
		}),
		(items) => filter(items, Boolean) as Array<{ file: string; names: string[] }>,
		(items) => sort(items, (a, b) => a.file.localeCompare(b.file))
	)

	// Per-folder aggregates using functional approach
	function folderOf(rel: string): string {
		const parts = split("/")(rel)
		// choose first 3 segments as a reasonable package/folder grouping (e.g., libraries/components/src)
		return join("/")(slice(0, Math.min(3, parts.length - 1))(parts)) || "."
	}

	const folderMap = reduce(
		(map: Map<string, {
			files: number
			lines: number
			functions: number
			longFunctions: number
			nonDefaultCount: number
		}>, f: PerFileAnalysis) => {
			const key = folderOf(f.pathRel)
			const existing = map.get(key) ?? {
				files: 0,
				lines: 0,
				functions: 0,
				longFunctions: 0,
				nonDefaultCount: 0,
			}
			const updated = {
				files: existing.files + 1,
				lines: existing.lines + f.lines,
				functions: existing.functions + f.functions.length,
				longFunctions: existing.longFunctions + filter(f.functions, (fn) => fn.loc > thresholdToUse).length,
				nonDefaultCount: existing.nonDefaultCount + (f.nonDefaultExported?.length ?? 0),
			}
			return new Map(map).set(key, updated)
		},
		new Map(),
	)(perFile)
	const folderAggregates = pipe(
		Array.from(folderMap.entries()),
		(entries) => map(entries, ([folder, v]) => ({ folder, ...v })),
		(aggregates) => sort(aggregates, (a, b) =>
			b.longFunctions - a.longFunctions || b.functions - a.functions
		)
	)

	const baseResult: AnalysisResult = {
		root,
		scannedFiles: filteredFiles.length,
		fileStats,
		functionStats,
		longFunctions,
		threshold: thresholdToUse,
		barrels: barrels.length
			? sort(barrels, (a, b) => b.exports - a.exports)
			: undefined,
		nonDefault: nonDefault.length ? nonDefault : undefined,
		folderAggregates,
		duplicates: duplicates.length ? duplicates : undefined,
	}

	// Optional compare mode
	if (opts?.compareWith) {
		try {
			const baselineText = await Deno.readTextFile(opts.compareWith)
			const baseline = JSON.parse(baselineText) as AnalysisResult
			baseResult.compare = {
				baseline: opts.compareWith,
				scannedFilesDelta: baseResult.scannedFiles -
					(baseline.scannedFiles ?? 0),
				functionsDelta: baseResult.functionStats.total -
					(baseline.functionStats?.total ?? 0),
				longFunctionsDelta: baseResult.longFunctions.length -
					(baseline.longFunctions?.length ?? 0),
				nonDefaultFilesDelta: (baseResult.nonDefault?.length ?? 0) -
					(baseline.nonDefault?.length ?? 0),
			}
		} catch (_) {
			// ignore compare errors silently; caller still gets base results
		}
	}

	return baseResult
}

if (import.meta.main) {
	await runCli({
		name: "analyze-files",
		version: "1.0.0",
		usage:
			"analyze-files [--root <path>] [--folders a,b] [--exclude x,y] [--max-fn-lines N] [--concurrency N] [--no-barrels] [--compare file.json] [--json]\n\nExamples:\n  analyze-files --root . --folders libraries/engine/src,libraries/toolkit/src --json\n  analyze-files --max-fn-lines 80 --concurrency 16\n  analyze-files --no-barrels\n  analyze-files --compare prev.json --json",
		booleans: ["json", "no-barrels"],
		aliases: {
			j: "json",
			d: "dirs",
			f: "folders",
			r: "root",
			e: "exclude",
			m: "max-fn-lines",
			c: "concurrency",
		},
		onRun: async ({ flags, options, stdout }: CliRunArgs) => {
			const root = typeof options["root"] === "string"
				? String(options["root"])
				: undefined
			const foldersOpt = options["folders"] ?? options["dirs"]
			const scanDirs = typeof foldersOpt === "string"
				? pipe(
					String(foldersOpt),
					(str) => split(str, ","),
					(arr) => map(arr, (s) => trim(s)),
					(arr) => filter(arr, Boolean)
				)
				: undefined
			const excludeDirNames = typeof options["exclude"] === "string"
				? pipe(
					String(options["exclude"]),
					(str) => split(str, ","),
					(arr) => map(arr, (s) => trim(s)),
					(arr) => filter(arr, Boolean)
				)
				: undefined
			const maxFunctionLines = typeof options["max-fn-lines"] === "string"
				? Number(options["max-fn-lines"])
				: undefined
			const concurrency = typeof options["concurrency"] === "string"
				? Number(options["concurrency"])
				: undefined
			const excludeBarrels = flags["no-barrels"] ? true : undefined
			const compareWith = typeof options["compare"] === "string"
				? String(options["compare"])
				: undefined
			const result = await analyzeFiles({
				root,
				scanDirs,
				excludeDirNames,
				maxFunctionLines,
				concurrency,
				excludeBarrels,
				compareWith,
			})
			if (flags.json) {
				stdout(JSON.stringify(result, null, 2))
				return 0
			}
			// Human summary
			const r = result
			stdout(
				bold(green(`Analyzed ${r.scannedFiles} files`)) + ` under ` +
					bold(cyan(r.root)),
			)
			stdout(bold(`\nFiles:`))
			stdout(
				`  longest: ${yellow(String(r.fileStats.longestFile.lines))} lines (${
					white(r.fileStats.longestFile.path)
				})`,
			)
			stdout(
				`  mean: ${cyan(r.fileStats.mean.toFixed(2))}  median: ${
					cyan(r.fileStats.median.toFixed(2))
				}  stdev: ${cyan(r.fileStats.stdDev.toFixed(2))}`,
			)
			stdout(bold(`\nFunctions:`))
			stdout(
				`  total: ${magenta(String(r.functionStats.total))}  mean: ${
					magenta(r.functionStats.mean.toFixed(2))
				}  median: ${magenta(r.functionStats.median.toFixed(2))}  stdev: ${
					magenta(r.functionStats.stdDev.toFixed(2))
				}`,
			)
			if (r.longFunctions.length) {
				stdout(
					bold(
						`\nLong functions (${yellow(`>${r.threshold}`)} lines): ${
							red(String(r.longFunctions.length))
						}`,
					),
				)
				reduce(
					(acc: void, fn) => {
						stdout(
							`  - ${bold(fn.name)} ${yellow(String(fn.loc))}L @ ${
								white(fn.file)
							}:${gray(String(fn.startLine))}-${gray(String(fn.endLine))}`,
						)
						return acc
					},
					undefined,
				)(slice(0, 20)(r.longFunctions))
				if (r.longFunctions.length > 20) {
					stdout(gray(`  ...and ${r.longFunctions.length - 20} more`))
				}
			} else {
				stdout(green(`\nNo functions exceeded ${r.threshold} lines.`))
			}
			if (r.barrels && r.barrels.length) {
				stdout(
					bold(
						`\nExcluded barrels: ${yellow(String(r.barrels.length))}`,
					),
				)
				reduce(
					(acc: void, b) => {
						stdout(
							`  - ${white(b.file)} (exports: ${cyan(String(b.exports))})`,
						)
						return acc
					},
					undefined,
				)(slice(0, 20)(r.barrels))
				if (r.barrels.length > 20) {
					stdout(gray(`  ...and ${r.barrels.length - 20} more`))
				}
			}
			if (r.nonDefault && r.nonDefault.length) {
				stdout(
					bold(
						`\nNon-default exported functions/components: ${
							yellow(String(r.nonDefault.length))
						}`,
					),
				)
				reduce(
					(acc: void, f) => {
						const names = red(join(", ")(f.names))
						stdout(`  - ${white(f.file)}: ${names}`)
						return acc
					},
					undefined,
				)(slice(0, 20)(r.nonDefault))
				if (r.nonDefault.length > 20) {
					stdout(
						gray(
							`  ...and ${
								r.nonDefault.length - 20
							} more files with named exports`,
						),
					)
				}
			}
			if (r.duplicates && r.duplicates.length) {
				stdout(
					bold(
						`\nDuplicate exports (same name as named and default): ${
							yellow(String(r.duplicates.length))
						}`,
					),
				)
				reduce(
					(acc: void, f) => {
						const dupNames = red(join(", ")(f.names))
						stdout(`  - ${white(f.file)}: ${dupNames}`)
						return acc
					},
					undefined,
				)(slice(0, 20)(r.duplicates))
				if (r.duplicates.length > 20) {
					stdout(
						gray(
							`  ...and ${r.duplicates.length - 20} more files with duplicates`,
						),
					)
				}
			}
			if (r.folderAggregates && r.folderAggregates.length) {
				const top = slice(r.folderAggregates, 0, 10)
				stdout(bold(`\nTop folders by long functions:`))
				reduce(
					(acc: void, a) => {
						stdout(
							`  - ${white(a.folder)}: files=${cyan(String(a.files))} functions=${
								cyan(String(a.functions))
							} long=${red(String(a.longFunctions))} non-default=${
								yellow(String(a.nonDefaultCount))
							}`,
						)
						return acc
					},
					undefined,
				)(top)
			}
			if (r.compare) {
				stdout(bold(`\nCompare to ${white(r.compare.baseline)}:`))
				const sign = (
					n: number,
				) => (n >= 0 ? green("+" + n) : red(String(n)))
				stdout(`  files: ${sign(r.compare.scannedFilesDelta)}`)
				stdout(`  fns: ${sign(r.compare.functionsDelta)}`)
				stdout(`  long: ${sign(r.compare.longFunctionsDelta)}`)
				stdout(
					`  non-default files: ${sign(r.compare.nonDefaultFilesDelta)}`,
				)
			}
			return 0
		},
	})
}
