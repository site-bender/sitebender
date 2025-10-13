import filter from "@sitebender/toolsmith/array/filter/index.ts"
import isNotEmpty from "@sitebender/toolsmith/array/isNotEmpty/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import values from "@sitebender/toolsmith/map/values/index.ts"

import type {
	AnalysisOptions,
	AnalysisResult,
	FileFunction,
	FolderAggregate,
	PerFileAnalysis,
} from "./types/index.ts"

import analyzeFile from "./analyzeFile/index.ts"
import applyProcessFile from "./applyProcessFile/index.ts"
import collectAllFiles from "./collectAllFiles/index.ts"
import collectLongFunctions from "./collectLongFunctions/index.ts"
import collectNonDefaultExports from "./collectNonDefaultExports/index.ts"
import {
	DEFAULT_EXCLUDED_DIR_NAMES,
	DEFAULT_SCAN_DIRS,
	EXTENSIONS,
	MAX_FN_LINES_DEFAULT,
} from "./constants/index.ts"
import createAnalyzePromise from "./createAnalyzePromise/index.ts"
import processFile from "./processFile/index.ts"
import computeFileStats from "./statistics/computeFileStats/index.ts"
import computeFunctionStats from "./statistics/computeFunctionStats/index.ts"
import walkFolder from "./walkFolder/index.ts"

//++ Analyzes source files in a directory for code metrics
export default async function analyzeFiles(
	options: AnalysisOptions,
): Promise<AnalysisResult> {
	const root = options.root || Deno.cwd()
	const scanDirs = options.scanDirs || DEFAULT_SCAN_DIRS
	const excludeDirNames = options.excludeDirNames || DEFAULT_EXCLUDED_DIR_NAMES
	const maxFunctionLines = options.maxFunctionLines || MAX_FN_LINES_DEFAULT

	// Collect all files to analyze
	const excludedDirNamesSet = new Set(excludeDirNames)

	const filePaths = await collectAllFiles({
		root,
		scanDirs,
		excludedDirNames: excludedDirNamesSet,
	})

	// Analyze each file
	const analyzePromises = map(
		createAnalyzePromise({ onlyDefault: options.defaultOnly })(root),
	)(filePaths)

	const analyses = await Promise.all(analyzePromises)

	// Compute statistics
	const fileStats = computeFileStats(analyses)
	const functionStats = computeFunctionStats(analyses)

	// Find long functions
	const longFunctions = reduce<
		PerFileAnalysis,
		Array<FileFunction & { file: string }>
	>(
		collectLongFunctions(maxFunctionLines),
	)([])(analyses)

	// Find non-default exports
	const nonDefault = reduce<
		PerFileAnalysis,
		Array<{ file: string; names: Array<string> }>
	>(
		collectNonDefaultExports,
	)([])(analyses)

	// Build folder aggregates
	const folderMap = new Map<string, FolderAggregate>()
	const processFn = processFile(maxFunctionLines)(folderMap)

	// Use reduce for side effects since forEach doesn't exist
	reduce(applyProcessFile(processFn))(null)(analyses)

	const folderAggregates = values(folderMap)

	return {
		root,
		scannedFiles: length(analyses),
		fileStats,
		functionStats,
		longFunctions,
		threshold: maxFunctionLines,
		nonDefault: isNotEmpty(nonDefault) ? nonDefault : undefined,
		folderAggregates,
	}
}
