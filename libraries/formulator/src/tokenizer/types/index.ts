//++ Token types for semantic analysis
export type TokenType =
	| "number"
	| "identifier"
	| "plus"
	| "minus"
	| "multiply"
	| "divide"
	| "power"
	| "leftParen"
	| "rightParen"
	| "comma"
	| "lessThan"
	| "greaterThan"
	| "lessThanOrEqual"
	| "greaterThanOrEqual"
	| "equalTo"
	| "notEqual"
	| "and"
	| "or"
	| "xor"
	| "implies"
	| "exclamation"

//++ Semantic token with type, value, and position
export type Token = {
	readonly type: TokenType
	readonly value: string
	readonly position: number
}
