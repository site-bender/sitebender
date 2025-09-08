//++ Constants for detecting associative operations in AST

// These SyntaxKind values would normally come from TypeScript
// but we're defining them here to avoid importing TypeScript
export const ASSOCIATIVE_OPERATOR_KINDS = [
	43, // PlusToken
	44, // MinusToken (for numbers, not always associative for other types)
	41, // AsteriskToken
	55, // AmpersandAmpersandToken
	56, // BarBarToken
] as const

export const ASSOCIATIVE_METHOD_NAMES = [
	"concat",
	"merge",
	"combine",
	"join",
	"union",
	"intersect",
	"min",
	"max",
	"and",
	"or",
	"xor",
	"gcd",
	"lcm",
] as const

export const ASSOCIATIVE_MATH_METHODS = [
	"Math.min",
	"Math.max",
	"Math.hypot",
] as const