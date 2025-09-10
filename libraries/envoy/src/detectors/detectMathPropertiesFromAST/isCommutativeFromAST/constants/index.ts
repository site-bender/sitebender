//++ Constants for detecting commutative operations in AST

// These SyntaxKind values would normally come from TypeScript
// but we're defining them here to avoid importing TypeScript
export const COMMUTATIVE_OPERATOR_KINDS = [
	43, // PlusToken
	41, // AsteriskToken
	55, // AmpersandAmpersandToken
	56, // BarBarToken
	50, // AmpersandToken (bitwise AND)
	51, // BarToken (bitwise OR)
	52, // CaretToken (bitwise XOR)
]

export const COMMUTATIVE_METHOD_NAMES = [
	"min",
	"max",
	"gcd",
	"lcm",
	"and",
	"or",
	"xor",
	"equals",
	"intersect",
	"union",
]

export const COMMUTATIVE_MATH_METHODS = [
	"Math.min",
	"Math.max",
	"Math.hypot",
	"Math.imul",
]

export const COMMUTATIVE_FUNCTION_NAMES = [
	"add",
	"sum",
	"plus",
	"multiply",
	"product",
	"times",
	"min",
	"max",
	"and",
	"or",
	"xor",
	"equals",
	"gcd",
	"lcm",
	"union",
	"intersect",
]
