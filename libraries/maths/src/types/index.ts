import type {
	ComparatorConfig,
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
	| "QUESTION"
	| "COLON"
	| "LESS_THAN"
	| "GREATER_THAN"
	| "EQUAL"
	| "NOT_EQUAL"
	| "LESS_EQUAL"
	| "GREATER_EQUAL"
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
	| "Conditional"
	| "Comparison"

export type BinaryOpNode = {
	type: "BinaryOp"
	operator: "+" | "-" | "*" | "/" | "^"
	left: ASTNode
	right: ASTNode
}

export type ComparisonNode = {
	type: "Comparison"
	operator: "<" | ">" | "==" | "!=" | "<=" | ">="
	left: ASTNode
	right: ASTNode
}

export type ConditionalNode = {
	type: "Conditional"
	condition: ASTNode
	ifTrue: ASTNode
	ifFalse: ASTNode
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

export type ASTNode = BinaryOpNode | UnaryOpNode | NumberNode | VariableNode | ConditionalNode | ComparisonNode

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
	OperatorConfig | InjectorConfig | ComparatorConfig,
	ParseError
>
