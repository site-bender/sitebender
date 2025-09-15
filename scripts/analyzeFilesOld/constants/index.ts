//++ [GROUP] Configuration constants for file analysis

//++ File extensions to analyze
export const EXTENSIONS = [".ts", ".tsx"] as const

//++ Default directories to scan for analysis
export const DEFAULT_SCAN_DIRS = [
	"libraries",
	"scripts",
	"docs",
	"playground",
] as const

//++ Directory names to exclude from analysis (named exports only)
export const DEFAULT_EXCLUDED_DIR_NAMES = [
	"node_modules",
	".git",
	"dist",
	"build",
	"coverage",
	"fixtures",
	"tests",
	"constants",
	"types",
] as const

//++ Default maximum lines threshold for function length
export const MAX_FN_LINES_DEFAULT = 60

//++ [END]
