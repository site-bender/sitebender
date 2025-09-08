//++ Constants for detecting distributive operations in AST

// Distributive patterns typically involve multiplication/division over addition/subtraction
export const DISTRIBUTIVE_PATTERNS = [
	"*(", // multiplication distributing
	")/", // division patterns
	"&&", // logical AND distributes over OR
	"||", // logical OR distributes over AND in some contexts
]

export const DISTRIBUTIVE_FUNCTION_NAMES = [
	"distribute",
	"expand",
	"factor",
	"foil",
	"distributive",
	"expandExpression",
	"expandProduct",
	"distributeOver",
]

// SyntaxKind values for operators involved in distributive operations
export const MULTIPLICATION_KIND = 41 // AsteriskToken
export const ADDITION_KIND = 43 // PlusToken
export const SUBTRACTION_KIND = 44 // MinusToken
export const DIVISION_KIND = 45 // SlashToken
export const AND_KIND = 55 // AmpersandAmpersandToken
export const OR_KIND = 56 // BarBarToken
