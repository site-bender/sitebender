//++ Constants for detecting idempotent mathematical properties

export const IDEMPOTENT_CODE_PATTERNS = [
	"Math.abs",
	"Math.floor",
	"Math.ceil",
	"Math.round",
	"Math.trunc",
	"Math.sign",
	".trim(",
	".toLowerCase(",
	".toUpperCase(",
	"Array.from(",
	"Set(",
	"[...new Set(",
	"Object.freeze(",
	"Boolean(",
	"!!",
	"String(",
	"Number(",
] as const

export const IDEMPOTENT_FUNCTION_NAMES = [
	"normalize",
	"sanitize",
	"clean",
	"validate",
	"format",
	"stringify",
	"serialize",
	"flatten",
	"unique",
	"dedupe",
	"sort",
	"freeze",
	"seal",
	"clone",
	"copy",
] as const

export const IDEMPOTENT_OPERATION_PATTERNS = [
	/new Set\([^)]*\)/,
	/\.has\(/,
	/\.includes\(/,
	/Math\.abs\(/,
	/x < 0 \? -x : x/,
	/Math\.(min|max)\(/,
	/\.max\(/,
	/\.min\(/,
	/!![^;]*/,
	/Boolean\(/,
] as const

export const FUNCTION_NAME_PATTERNS = [
	/function\s+(\w+)/,
	/const\s+(\w+)\s*=/,
	/export\s+default\s+function\s+(\w+)/,
] as const