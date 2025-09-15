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

//++ Directory names to exclude from analysis
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

//++ [GROUP] Regular expression patterns for function detection

//++ Regex patterns for detecting different function types
export const FUNCTION_PATTERNS = {
	SIMPLE: /(export\s+default\s+)?(async\s+)?function\s+([A-Za-z0-9_$]+)?\s*\(/g,
	DECLARATION:
		/(export\s+default\s+)?(async\s+)?function(\s*\*)?\s*([A-Za-z0-9_$]+)?\s*\(/g,
	NAMED_EXPRESSION:
		/(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(async\s+)?function(\s*\*)?\s*\(/g,
	ARROW_BLOCK:
		/(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*\{/g,
	ARROW_CONCISE:
		/(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*(?!\{)/g,
	EXPORT_DEFAULT_ARROW:
		/export\s+default\s+(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*(\{)?/g,
	EXPORT_DEFAULT_NAME:
		/\bexport\s+default\s+([A-Za-z0-9_$]+)\b(?!\s*\()/g,
	LOCAL_EXPORT_AS_DEFAULT: /\bexport\s*\{([\s\S]*?)\}/g,
	EXPORT_NAMED_EXPR_FUNC:
		/\bexport\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?function/g,
	EXPORT_NAMED_EXPR_ARROW:
		/\bexport\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>/g,
	EXPORT_FUNCTION_DECL:
		/\bexport\s+(?:async\s+)?function\s+([A-Za-z0-9_$]+)/g,
	LOCAL_NAMED_EXPORT_LIST: /\bexport\s*\{([\s\S]*?)\}\s*(?!from\b)/g,
} as const

//++ [END]