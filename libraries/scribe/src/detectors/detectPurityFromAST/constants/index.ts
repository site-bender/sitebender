//++ Constants for detecting impure operations in AST

// SyntaxKind values for assignment operators
export const ASSIGNMENT_OPERATOR_KINDS = [
	63, // EqualsToken
	64, // PlusEqualsToken
	65, // MinusEqualsToken
	66, // AsteriskEqualsToken
	67, // SlashEqualsToken
	68, // PercentEqualsToken
	69, // AmpersandEqualsToken
	70, // BarEqualsToken
	71, // CaretEqualsToken
]

// SyntaxKind values for increment/decrement
export const INCREMENT_DECREMENT_KINDS = [
	45, // PlusPlusToken
	46, // MinusMinusToken
]

// Global objects that indicate side effects
export const GLOBAL_OBJECTS = [
	"console",
	"document",
	"window",
	"localStorage",
	"sessionStorage",
	"process",
	"crypto",
	"fetch",
	"XMLHttpRequest",
	"alert",
	"prompt",
	"confirm",
]

// Methods that mutate arrays
export const MUTATING_ARRAY_METHODS = [
	"push",
	"pop",
	"shift",
	"unshift",
	"splice",
	"sort",
	"reverse",
	"fill",
	"copyWithin",
]

// Methods that indicate I/O or side effects
export const SIDE_EFFECT_METHODS = [
	"log",
	"error",
	"warn",
	"info",
	"debug",
	"write",
	"writeln",
	"appendChild",
	"removeChild",
	"insertBefore",
	"replaceChild",
	"setAttribute",
	"removeAttribute",
	"setItem",
	"removeItem",
	"clear",
]

// Patterns that indicate non-deterministic behavior
export const NON_DETERMINISTIC_PATTERNS = [
	"Math.random",
	"Date.now",
	"new Date",
	"performance.now",
	"crypto.getRandomValues",
]

// SyntaxKind values for different node types
export const THROW_STATEMENT_KIND = 235 // ThrowStatement
export const TRY_STATEMENT_KIND = 236 // TryStatement
export const AWAIT_EXPRESSION_KIND = 218 // AwaitExpression
export const NEW_EXPRESSION_KIND = 204 // NewExpression
export const CALL_EXPRESSION_KIND = 206 // CallExpression
