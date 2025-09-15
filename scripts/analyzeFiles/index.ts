import type { AnalysisOptions, AnalysisResult, FileFunction, FolderAggregate, PerFileAnalysis } from "./types/index.ts"

import map from "@sitebender/toolkit/vanilla/array/map/index.ts"
import filter from "@sitebender/toolkit/vanilla/array/filter/index.ts"
import reduce from "@sitebender/toolkit/vanilla/array/reduce/index.ts"
import length from "@sitebender/toolkit/vanilla/array/length/index.ts"

import {
  DEFAULT_EXCLUDED_DIR_NAMES,
  DEFAULT_SCAN_DIRS,
  EXTENSIONS,
  MAX_FN_LINES_DEFAULT,
} from "./constants/index.ts"

import walkFolder from "./walkFolder/index.ts"
import analyzeFile from "./analyzeFile/index.ts"
import computeFileStats from "./statistics/computeFileStats/index.ts"
import computeFunctionStats from "./statistics/computeFunctionStats/index.ts"

//++ Analyzes source files in a directory for code metrics
export default async function analyzeFiles(
  options: AnalysisOptions
): Promise<AnalysisResult> {
  const root = options.root || Deno.cwd()
  const scanDirs = options.scanDirs || DEFAULT_SCAN_DIRS
  const excludeDirNames = options.excludeDirNames || DEFAULT_EXCLUDED_DIR_NAMES
  const maxFunctionLines = options.maxFunctionLines || MAX_FN_LINES_DEFAULT

  // Collect all files to analyze
  const filePaths: Array<string> = []
  const excludedDirNamesSet = new Set(excludeDirNames)

  for (const dir of scanDirs) {
    for await (const file of walkFolder({
      root,
      dir,
      extensions: EXTENSIONS,
      excludedDirNames: excludedDirNamesSet,
    })) {
      filePaths.push(file)
    }
  }

  // Analyze each file
  const analyzePromises = filePaths.map((filePath) =>
    analyzeFile({
      absPath: filePath,
      root,
      onlyDefault: options.defaultOnly,
    })
  )

  const analyses = await Promise.all(analyzePromises)

  // Compute statistics
  const fileStats = computeFileStats(analyses)
  const functionStats = computeFunctionStats(analyses)

  // Find long functions
  const longFunctions = reduce<PerFileAnalysis, Array<FileFunction & { file: string }>>(
    (acc, file) => {
      const long = filter((f: FileFunction) => f.loc > maxFunctionLines)(file.functions)
      const withFile = map((f: FileFunction) => ({ ...f, file: file.pathRel }))(long)

      return [...acc, ...withFile]
    }
  )([])(analyses)

  // Find non-default exports
  const nonDefault = reduce<PerFileAnalysis, Array<{ file: string; names: Array<string> }>>(
    (acc, file) => {
      if (file.nonDefaultExported && length(file.nonDefaultExported) > 0) {
        return [...acc, { file: file.pathRel, names: file.nonDefaultExported }]
      }

      return acc
    }
  )([])(analyses)

  // Build folder aggregates
  const folderMap = new Map<string, FolderAggregate>()

  analyses.forEach(function processFile(file) {
    const folder = file.pathRel.split("/").slice(0, -1).join("/") || "."

    if (!folderMap.has(folder)) {
      folderMap.set(folder, {
        folder,
        files: 0,
        lines: 0,
        functions: 0,
        longFunctions: 0,
        nonDefaultCount: 0,
      })
    }

    const agg = folderMap.get(folder)!
    agg.files++
    agg.lines += file.lines
    agg.functions += length(file.functions)
    agg.longFunctions += filter((f: FileFunction) => f.loc > maxFunctionLines)(file.functions).length
    agg.nonDefaultCount += file.nonDefaultExported ? length(file.nonDefaultExported) : 0
  })

  const folderAggregates = Array.from(folderMap.values())

  return {
    root,
    scannedFiles: length(analyses),
    fileStats,
    functionStats,
    longFunctions,
    threshold: maxFunctionLines,
    nonDefault: length(nonDefault) > 0 ? nonDefault : undefined,
    folderAggregates,
  }
}