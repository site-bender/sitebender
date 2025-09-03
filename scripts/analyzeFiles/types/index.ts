export type FileFunction = {
  name: string
  loc: number
  startLine: number
  endLine: number
}

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

export type FileStats = {
  longestFile: { path: string; lines: number }
  mean: number
  median: number
  stdDev: number
}

export type FunctionStats = {
  total: number
  mean: number
  median: number
  stdDev: number
}

export type BarrelInfo = {
  file: string // path relative to root
  exports: number // approximate count of exported symbols
}

export type FolderAggregate = {
  folder: string
  files: number
  lines: number
  functions: number
  longFunctions: number
  nonDefaultCount: number
}

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
