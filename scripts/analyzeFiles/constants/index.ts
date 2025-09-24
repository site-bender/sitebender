//++ [GROUP] Configuration constants for file analysis

//++ File extensions to analyze
export const EXTENSIONS = [".ts", ".tsx"] as const

//++ Default directories to scan for analysis
export const DEFAULT_SCAN_DIRS = [
	"libraries",
	"scripts",
	"applications",
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
	simple: /(export\s+default\s+)?(async\s+)?function\s+([A-Za-z0-9_$]+)?\s*\(/g,
	declaration:
		/(export\s+default\s+)?(async\s+)?function(\s*\*)?\s*([A-Za-z0-9_$]+)?\s*\(/g,
	namedExpression:
		/(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(async\s+)?function(\s*\*)?\s*\(/g,
	arrowBlock:
		/(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*\{/g,
	arrowConcise:
		/(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*(?!\{)/g,
	exportDefaultArrow:
		/export\s+default\s+(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*(\{)?/g,
	exportDefaultName:
		/\bexport\s+default\s+([A-Za-z0-9_$]+)\b(?!\s*\()/g,
	localExportAsDefault: /\bexport\s*\{([\s\S]*?)\}/g,
	exportNamedExpressionFunction:
		/\bexport\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?function/g,
	exportNamedExpressionArrow:
		/\bexport\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>/g,
	exportFunctionDeclaration:
		/\bexport\s+(?:async\s+)?function\s+([A-Za-z0-9_$]+)/g,
	localNamedExportList: /\bexport\s*\{([\s\S]*?)\}\s*(?!from\b)/g,
} as const

//++ [END]
