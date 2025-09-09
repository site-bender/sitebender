//++ Constants for detecting curried functions in AST

// SyntaxKind values for function-like nodes
export const FUNCTION_DECLARATION_KIND = 256 // FunctionDeclaration
export const FUNCTION_EXPRESSION_KIND = 218 // FunctionExpression
export const ARROW_FUNCTION_KIND = 219 // ArrowFunction
export const METHOD_DECLARATION_KIND = 168 // MethodDeclaration

// SyntaxKind values for other relevant nodes
export const RETURN_STATEMENT_KIND = 250 // ReturnStatement
export const BLOCK_KIND = 235 // Block

// Patterns that suggest currying
export const CURRY_PATTERNS = [
	"return function",
	"=> function",
	"return (",
	"=> (",
]

// Common curry function names
export const CURRY_FUNCTION_NAMES = [
	"curry",
	"curried",
	"partial",
	"partialRight",
	"compose",
	"pipe",
]
