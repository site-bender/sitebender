//++ Constants for detecting commutative mathematical properties

export const COMMUTATIVE_OPERATIONS = [
	/\+/, // Addition
	/\*/, // Multiplication
	/&&/, // Logical AND
	/\|\|/, // Logical OR
	/&/, // Bitwise AND
	/\|/, // Bitwise OR
	/\^/, // Bitwise XOR
	/===/, // Strict equality
	/==/, // Equality
	/!=/, // Not equal
	/!==/, // Strict not equal
] as const

export const COMMUTATIVE_FUNCTION_NAMES = [
	"max",
	"min",
	"concat",
	"union",
	"intersection",
	"symmetricdifference",
	"add",
	"plus",
	"sum",
	"multiply",
	"times",
	"product",
	"combine",
	"merge",
	"join",
	"equal",
	"equals",
	"same",
	"compare",
	"distance",
] as const

export const COMMUTATIVE_CODE_PATTERNS = [
	/Math\.max/,
	/Math\.min/,
	/\.concat\(/,
] as const

export const BINARY_FUNCTION_PATTERN = /function\s*\w*\s*\((\w+),\s*(\w+)\)/

export const FUNCTION_NAME_PATTERNS = [
	/function\s+(\w+)/,
	/const\s+(\w+)\s*=/,
	/export\s+default\s+function\s+(\w+)/,
] as const
