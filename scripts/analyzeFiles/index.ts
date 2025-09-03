#!/usr/bin/env -S deno run --allow-read
/**
 * Analyze repository source files for size and function complexity.
 * - One function per folder style: helpers live under ./utilities and ./statistics
 * - Types in ./types, constants in ./constants
 * - Default export is the analyzeFiles function; CLI available via import.meta.main
 */

import runCli from "../utilities/cli/runCli/index.ts"
import type { AnalysisOptions, AnalysisResult, PerFileAnalysis, FileFunction, BarrelInfo } from "./types/index.ts"
import { DEFAULT_EXCLUDED_DIR_NAMES, DEFAULT_SCAN_DIRS, EXTENSIONS, MAX_FN_LINES_DEFAULT } from "./constants/index.ts"
import walkFolder from "./walkFolder/index.ts"
import analyzeFile from "./analyzeFile/index.ts"
import computeFileStats from "./statistics/computeFileStats/index.ts"
import computeFunctionStats from "./statistics/computeFunctionStats/index.ts"

export default async function analyzeFiles(opts?: AnalysisOptions): Promise<AnalysisResult> {
  const root = opts?.root ?? Deno.cwd()
  const dirs = opts?.scanDirs ?? DEFAULT_SCAN_DIRS
  const excludedDirNames = new Set([...(opts?.excludeDirNames ?? DEFAULT_EXCLUDED_DIR_NAMES)])
  const _maxFnLines = opts?.maxFunctionLines ?? MAX_FN_LINES_DEFAULT
  const concurrency = Math.max(1, Math.min(64, opts?.concurrency ?? 8))
  const excludeBarrels = opts?.excludeBarrels ?? true
  // We analyze all functions by default; we keep the option for backward-compat but default is false
  const defaultOnly = opts?.defaultOnly ?? false

  const files: string[] = []
  for (const d of dirs) {
    for await (const f of walkFolder({ root, dir: d, exts: EXTENSIONS, excludedDirNames })) files.push(f)
  }

  // Exclude barrel files (re-export hubs), capture info for reporting
  const barrels: BarrelInfo[] = []
  const filteredFiles = excludeBarrels ? files.filter((p) => {
    // Do not consider TSX files as barrels; component files often have named exports alongside a default component
    if (p.endsWith(".tsx")) return true
    try {
      const txt = Deno.readTextFileSync(p)
      // Detect explicit re-exports only; a barrel file re-exports from other modules
      const reExportStarMatches = txt.match(/\bexport\s+\*\s+from\s+['"][^'"]+['"]/g) || []
      const namedReExportMatches = txt.match(/\bexport\s+\{([^}]*)\}\s+from\s+['"][^'"]+['"]/gs) || []
      const reExportStatements = reExportStarMatches.length + namedReExportMatches.length
      if (reExportStatements === 0) return true
      // Count specifiers per named block by comma, ignoring whitespace and empty items
      const namedSpecifiers = namedReExportMatches.reduce((acc, m) => {
        const inside = m.replace(/^.*?\{([\s\S]*?)\}.*$/, "$1")
        const count = inside
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
          .length
        return acc + count
      }, 0)
      const totalReexported = reExportStarMatches.length + namedSpecifiers
      const isIndex = /\/index\.ts$/.test(p)
      const hasOwnDefault = /\bexport\s+default\b/.test(txt)
      // Alias: a single small re-export file (e.g., export { default } from './x') that is not index.ts
      const isAlias = reExportStatements === 1 && totalReexported <= 1 && !isIndex
      // Barrel: re-export hub. Thresholds loosened for index.ts
      const isBarrel = !hasOwnDefault && !isAlias && (
        (isIndex && (reExportStatements >= 2 || totalReexported >= 10)) ||
        (!isIndex && (reExportStatements >= 3 || totalReexported >= 10))
      )
      if (isBarrel) {
        barrels.push({ file: p.replace(root + "/", ""), exports: totalReexported })
        return false
      }
      return true
    } catch (_) {
      // ignore barrel detection read errors; file may disappear during scan
      return true
    }
  }) : files

  // Bounded parallelism for file analysis
  const perFile: PerFileAnalysis[] = []
  let i = 0
  async function worker() {
    const promises: Promise<void>[] = []
    while (true) {
      const idx = i++
      if (idx >= filteredFiles.length) break
      const f = filteredFiles[idx]
      promises.push(
        analyzeFile({ absPath: f, root, onlyDefault: defaultOnly }).then((res) => { perFile[idx] = res })
      )
    }
    await Promise.all(promises)
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, filteredFiles.length) }, () => worker()),
  )
  const fileStats = computeFileStats(perFile)
  const functionStats = computeFunctionStats(perFile.flatMap((f: PerFileAnalysis) => f.functions))
  const dynThreshold = Math.max(1, Math.round(functionStats.mean + 3 * functionStats.stdDev))
  const thresholdToUse = opts?.maxFunctionLines ?? dynThreshold
  const longFunctions: Array<FileFunction & { file: string }> = perFile
    .flatMap((f: PerFileAnalysis) => f.functions
      .filter((fn: FileFunction) => fn.loc > thresholdToUse)
      .map((fn: FileFunction) => ({ ...fn, file: f.pathRel })))
    .sort((a, b) => b.loc - a.loc)

  // Collect non-default exported functions/components
  const nonDefault: Array<{ file: string; names: string[] }> = []
  const duplicates: Array<{ file: string; names: string[] }> = []
  for (const f of perFile) {
    if (f.nonDefaultExported && f.nonDefaultExported.length) {
      nonDefault.push({ file: f.pathRel, names: f.nonDefaultExported })
    }
    if (f.nonDefaultExported && f.defaultNames && f.defaultNames.length) {
      const dup = f.nonDefaultExported.filter((n) => f.defaultNames!.includes(n))
      if (dup.length) duplicates.push({ file: f.pathRel, names: dup.sort() })
    }
  }
  nonDefault.sort((a, b) => a.file.localeCompare(b.file))
  duplicates.sort((a, b) => a.file.localeCompare(b.file))

  // Per-folder aggregates
  const folderMap = new Map<string, { files: number; lines: number; functions: number; longFunctions: number; nonDefaultCount: number }>()
  function folderOf(rel: string): string {
    const parts = rel.split("/")
    // choose first 3 segments as a reasonable package/folder grouping (e.g., libraries/components/src)
    return parts.slice(0, Math.min(3, parts.length - 1)).join("/") || "."
  }
  for (const f of perFile) {
    const key = folderOf(f.pathRel)
    const agg = folderMap.get(key) ?? { files: 0, lines: 0, functions: 0, longFunctions: 0, nonDefaultCount: 0 }
    agg.files += 1
    agg.lines += f.lines
    agg.functions += f.functions.length
    agg.longFunctions += f.functions.filter((fn) => fn.loc > thresholdToUse).length
    agg.nonDefaultCount += f.nonDefaultExported?.length ?? 0
    folderMap.set(key, agg)
  }
  const folderAggregates = Array.from(folderMap.entries()).map(([folder, v]) => ({ folder, ...v }))
    .sort((a, b) => b.longFunctions - a.longFunctions || b.functions - a.functions)

  const baseResult: AnalysisResult = {
    root,
  scannedFiles: filteredFiles.length,
    fileStats,
    functionStats,
    longFunctions,
    threshold: thresholdToUse,
    barrels: barrels.length ? barrels.sort((a, b) => b.exports - a.exports) : undefined,
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
        scannedFilesDelta: baseResult.scannedFiles - (baseline.scannedFiles ?? 0),
        functionsDelta: baseResult.functionStats.total - (baseline.functionStats?.total ?? 0),
        longFunctionsDelta: baseResult.longFunctions.length - (baseline.longFunctions?.length ?? 0),
        nonDefaultFilesDelta: (baseResult.nonDefault?.length ?? 0) - (baseline.nonDefault?.length ?? 0),
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
  usage: "analyze-files [--root <path>] [--folders a,b] [--exclude x,y] [--max-fn-lines N] [--concurrency N] [--no-barrels] [--compare file.json] [--json]\n\nExamples:\n  analyze-files --root . --folders libraries/engine/src,libraries/toolkit/src --json\n  analyze-files --max-fn-lines 80 --concurrency 16\n  analyze-files --no-barrels\n  analyze-files --compare prev.json --json",
  booleans: ["json", "no-barrels"],
  aliases: { j: "json", d: "dirs", f: "folders", r: "root", e: "exclude", m: "max-fn-lines", c: "concurrency" },
  onRun: async ({ flags, options, stdout }) => {
      const root = typeof options["root"] === "string" ? String(options["root"]) : undefined
      const foldersOpt = options["folders"] ?? options["dirs"]
      const scanDirs = typeof foldersOpt === "string" ? String(foldersOpt).split(",").map((s) => s.trim()).filter(Boolean) : undefined
      const excludeDirNames = typeof options["exclude"] === "string" ? String(options["exclude"]).split(",").map((s) => s.trim()).filter(Boolean) : undefined
      const maxFunctionLines = typeof options["max-fn-lines"] === "string" ? Number(options["max-fn-lines"]) : undefined
      const concurrency = typeof options["concurrency"] === "string" ? Number(options["concurrency"]) : undefined
  const excludeBarrels = flags["no-barrels"] ? true : undefined
  const compareWith = typeof options["compare"] === "string" ? String(options["compare"]) : undefined
  const result = await analyzeFiles({ root, scanDirs, excludeDirNames, maxFunctionLines, concurrency, excludeBarrels, compareWith })
      if (flags.json) {
        stdout(JSON.stringify(result, null, 2))
        return 0
      }
      // Human summary
      const r = result
  stdout(`Analyzed ${r.scannedFiles} files under ${r.root}`)
      stdout(`\nFiles:`)
      stdout(`  longest: ${r.fileStats.longestFile.lines} lines (${r.fileStats.longestFile.path})`)
      stdout(`  mean: ${r.fileStats.mean.toFixed(2)}  median: ${r.fileStats.median.toFixed(2)}  stdev: ${r.fileStats.stdDev.toFixed(2)}`)
      stdout(`\nFunctions:`)
      stdout(`  total: ${r.functionStats.total}  mean: ${r.functionStats.mean.toFixed(2)}  median: ${r.functionStats.median.toFixed(2)}  stdev: ${r.functionStats.stdDev.toFixed(2)}`)
  if (r.longFunctions.length) {
        stdout(`\nLong functions (>${r.threshold} lines): ${r.longFunctions.length}`)
        for (const fn of r.longFunctions.slice(0, 20)) {
          stdout(`  - ${fn.name} ${fn.loc}L @ ${fn.file}:${fn.startLine}-${fn.endLine}`)
        }
        if (r.longFunctions.length > 20) stdout(`  ...and ${r.longFunctions.length - 20} more`)
      } else {
        stdout(`\nNo functions exceeded ${r.threshold} lines.`)
      }
      if (r.barrels && r.barrels.length) {
        stdout(`\nExcluded barrels: ${r.barrels.length}`)
        for (const b of r.barrels.slice(0, 20)) {
          stdout(`  - ${b.file} (exports: ${b.exports})`)
        }
        if (r.barrels.length > 20) stdout(`  ...and ${r.barrels.length - 20} more`)
      }
      if (r.nonDefault && r.nonDefault.length) {
        stdout(`\nNon-default exported functions/components: ${r.nonDefault.length}`)
        for (const f of r.nonDefault.slice(0, 20)) {
          stdout(`  - ${f.file}: ${f.names.join(", ")}`)
        }
        if (r.nonDefault.length > 20) stdout(`  ...and ${r.nonDefault.length - 20} more files with named exports`)
      }
      if (r.duplicates && r.duplicates.length) {
        stdout(`\nDuplicate exports (same name as named and default): ${r.duplicates.length}`)
        for (const f of r.duplicates.slice(0, 20)) {
          stdout(`  - ${f.file}: ${f.names.join(", ")}`)
        }
        if (r.duplicates.length > 20) stdout(`  ...and ${r.duplicates.length - 20} more files with duplicates`)
      }
      if (r.folderAggregates && r.folderAggregates.length) {
        const top = r.folderAggregates.slice(0, 10)
        stdout(`\nTop folders by long functions:`)
        for (const a of top) {
          stdout(`  - ${a.folder}: files=${a.files} functions=${a.functions} long=${a.longFunctions} non-default=${a.nonDefaultCount}`)
        }
      }
      if (r.compare) {
        stdout(`\nCompare to ${r.compare.baseline}:`)
        stdout(`  files: ${r.compare.scannedFilesDelta >= 0 ? "+" : ""}${r.compare.scannedFilesDelta}`)
        stdout(`  fns: ${r.compare.functionsDelta >= 0 ? "+" : ""}${r.compare.functionsDelta}`)
        stdout(`  long: ${r.compare.longFunctionsDelta >= 0 ? "+" : ""}${r.compare.longFunctionsDelta}`)
        stdout(`  non-default files: ${r.compare.nonDefaultFilesDelta >= 0 ? "+" : ""}${r.compare.nonDefaultFilesDelta}`)
      }
      return 0
    },
  })
}

