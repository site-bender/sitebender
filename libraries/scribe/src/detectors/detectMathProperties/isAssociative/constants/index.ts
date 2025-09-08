//++ Constants for detecting associative mathematical properties

export const ASSOCIATIVE_OPERATIONS = [
	/\+/,    // Addition
	/\*/,    // Multiplication
	/&&/,    // Logical AND
	/\|\|/,  // Logical OR
	/&/,     // Bitwise AND
	/\|/,    // Bitwise OR
	/\^/,    // Bitwise XOR
] as const

export const ASSOCIATIVE_FUNCTION_NAMES = [
	"max",
	"min",
	"concat",
	"join",
	"union",
	"intersection",
	"compose",
	"pipe",
	"add",
	"plus",
	"sum",
	"multiply",
	"times",
	"product",
	"combine",
	"merge",
	"and",
	"or",
	"xor",
	"all",
	"any",
] as const

export const ASSOCIATIVE_CODE_PATTERNS = [
	/Math\.max/,
	/Math\.min/,
	/\.concat\(/,
	/\.join\(/,
] as const

export const REDUCE_PATTERNS = [
	/\.reduce\(/,
	/\.fold/,
	/accumulator/i,
	/acc\b/,
] as const

export const COLLECTION_ASSOCIATIVE_PATTERNS = [
	/\.concat\(/,
	/\.flatMap\(/,
	/\.flat\(/,
	/\.replace\(/,
	/\.split\([^)]*\)\.join\(/,
	/pipe\(/,
	/compose\(/,
	/chain\(/,
	/Math\.max\.apply/,
	/Math\.min\.apply/,
	/new Set\(\[\.\.\..*,\s*\.\.\..*\]\)/,
] as const

export const STRUCTURAL_PATTERNS = [
	/identity/i,
	/neutral/i,
	/empty/i,
	/inverse/i,
	/append/i,
	/concat/i,
] as const

export const BINARY_FUNCTION_PATTERN = /function\s*\w*\s*\((\w+),\s*(\w+)\)/

export const FUNCTION_NAME_PATTERNS = [
	/function\s+(\w+)/,
	/const\s+(\w+)\s*=/,
	/export\s+default\s+function\s+(\w+)/,
] as const