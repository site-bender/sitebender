import type {
	InjectorConfig,
	OperatorConfig,
} from "../../../engine/types/index.ts"

// Token types for lexical analysis
export type TokenType =
	| "NUMBER"
	| "IDENTIFIER"
	| "PLUS"
	| "MINUS"
	| "MULTIPLY"
	| "DIVIDE"
	| "POWER"
	| "LEFT_PAREN"
	| "RIGHT_PAREN"
	| "EOF"

export type Token = {
	type: TokenType
	value: string
	position: number
}

// AST node types for parser
export type ASTNodeType =
	| "BinaryOp"
	| "UnaryOp"
	| "Number"
	| "Variable"

export type BinaryOpNode = {
	type: "BinaryOp"
	operator: "+" | "-" | "*" | "/" | "^"
	left: ASTNode
	right: ASTNode
}

export type UnaryOpNode = {
	type: "UnaryOp"
	operator: "+" | "-"
	operand: ASTNode
}

export type NumberNode = {
	type: "Number"
	value: number
}

export type VariableNode = {
	type: "Variable"
	name: string
}

export type ASTNode = BinaryOpNode | UnaryOpNode | NumberNode | VariableNode

// Variable mapping for formula compilation
export type VariableMap = {
	[name: string]: InjectorConfig
}

// Parser result types
export type ParseError = {
	message: string
	position?: number
	expected?: string
	found?: string
}

// Result type for error handling
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

// Main function signature
export type ParseFormulaResult = Result<
	OperatorConfig | InjectorConfig,
	ParseError
>
