//++ [GROUP] Type definitions for file analysis system

//++ Information about a function found in a source file
export type FileFunction = {
	name: string
	loc: number
	startLine: number
	endLine: number
}

//++ Analysis results for a single file
export type PerFileAnalysis = {
	pathAbs: string
	pathRel: string
	lines: number
	functions: FileFunction[]
	// Names of functions/components that are exported but not as default
	nonDefaultExported?: string[]
	// Local identifiers that are exported as default (e.g., `export default X` or `export { X as default }` or `export default function X()`)
	defaultNames?: string[]
}

//++ Statistical metrics for all analyzed files
export type FileStats = {
	longestFile: { path: string; lines: number }
	mean: number
	median: number
	stdDev: number
}

//++ Statistical metrics for all analyzed functions
export type FunctionStats = {
	total: number
	mean: number
	median: number
	stdDev: number
}

//++ Information about a barrel file (re-export hub)
export type BarrelInfo = {
	file: string // path relative to root
	exports: number // approximate count of exported symbols
}

//++ Aggregated metrics for a folder
export type FolderAggregate = {
	folder: string
	files: number
	lines: number
	functions: number
	longFunctions: number
	nonDefaultCount: number
}

//++ Configuration options for file analysis
export type AnalysisOptions = {
	root?: string
	scanDirs?: string[]
	excludeDirNames?: string[]
	maxFunctionLines?: number
	concurrency?: number
	excludeBarrels?: boolean
	defaultOnly?: boolean
	compareWith?: string
}

//++ Complete analysis results for all scanned files
export type AnalysisResult = {
	root: string
	scannedFiles: number
	fileStats: FileStats
	functionStats: FunctionStats
	longFunctions: Array<FileFunction & { file: string }>
	threshold: number
	barrels?: BarrelInfo[]
	nonDefault?: Array<{ file: string; names: string[] }>
	folderAggregates?: FolderAggregate[]
	compare?: {
		baseline: string
		scannedFilesDelta: number
		functionsDelta: number
		longFunctionsDelta: number
		nonDefaultFilesDelta: number
	}
	duplicates?: Array<{ file: string; names: string[] }>
}

//++ [END]
