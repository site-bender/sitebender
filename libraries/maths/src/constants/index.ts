// Operator precedence levels (higher number = higher precedence)
export const PRECEDENCE = {
	TERNARY: 5,      // Lowest precedence for conditional operator
	COMPARISON: 8,   // Comparison operators
	ADDITION: 10,
	SUBTRACTION: 10,
	MULTIPLICATION: 20,
	DIVISION: 20,
	POWER: 30,
} as const

// Operator associativity
export const ASSOCIATIVITY = {
	LEFT: "LEFT",
	RIGHT: "RIGHT",
} as const

export type Associativity = typeof ASSOCIATIVITY[keyof typeof ASSOCIATIVITY]

// Operator properties
export const OPERATOR_INFO = {
	"+": { precedence: PRECEDENCE.ADDITION, associativity: ASSOCIATIVITY.LEFT },
	"-": {
		precedence: PRECEDENCE.SUBTRACTION,
		associativity: ASSOCIATIVITY.LEFT,
	},
	"*": {
		precedence: PRECEDENCE.MULTIPLICATION,
		associativity: ASSOCIATIVITY.LEFT,
	},
	"/": { precedence: PRECEDENCE.DIVISION, associativity: ASSOCIATIVITY.LEFT },
	"^": { precedence: PRECEDENCE.POWER, associativity: ASSOCIATIVITY.RIGHT },
	"<": { precedence: PRECEDENCE.COMPARISON, associativity: ASSOCIATIVITY.LEFT },
	">": { precedence: PRECEDENCE.COMPARISON, associativity: ASSOCIATIVITY.LEFT },
	"==": { precedence: PRECEDENCE.COMPARISON, associativity: ASSOCIATIVITY.LEFT },
	"!=": { precedence: PRECEDENCE.COMPARISON, associativity: ASSOCIATIVITY.LEFT },
	"<=": { precedence: PRECEDENCE.COMPARISON, associativity: ASSOCIATIVITY.LEFT },
	">=": { precedence: PRECEDENCE.COMPARISON, associativity: ASSOCIATIVITY.LEFT },
} as const

// Regular expressions for tokenization
export const TOKEN_PATTERNS = {
	NUMBER: /^\d+(\.\d+)?/,
	IDENTIFIER: /^[a-z][a-z0-9_]*/i,
	WHITESPACE: /^\s+/,
} as const
