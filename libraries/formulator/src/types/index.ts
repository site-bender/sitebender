import type {
	ComparatorConfig,
	InjectorConfig,
	OperatorConfig,
} from "../../../architect/types/index.ts"
// Result type for error handling - using toolsmith Result
import type { Result } from "../../../toolsmith/src/types/fp/result/index.ts"

export type { Result }

// Main function signature
export type ParseFormulaResult = Result<
	OperatorConfig | InjectorConfig | ComparatorConfig,
	ParseError
>

// ==========================================
// Tokenization Types
// ==========================================

export type TokenType =
	| "NUMBER"
	| "IDENTIFIER"
	| "UNKNOWN"
	| "EOF"
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

export interface Token {
	type: TokenType
	value: string
	position: number
}

// ==========================================
// AST Types
// ==========================================

export interface NumberNode {
	type: "Number"
	value: number
}

export interface VariableNode {
	type: "Variable"
	name: string
}

export interface UnaryOpNode {
	type: "UnaryOp"
	operator: "-" | "+"
	operand: AstNode
}

export interface BinaryOpNode {
	type: "BinaryOp"
	operator: "+" | "-" | "*" | "/" | "^"
	left: AstNode
	right: AstNode
}

export interface ComparisonNode {
	type: "Comparison"
	operator: "<" | ">" | "==" | "!=" | "<=" | ">="
	left: AstNode
	right: AstNode
}

export interface ConditionalNode {
	type: "Conditional"
	condition: AstNode
	ifTrue: AstNode
	ifFalse: AstNode
}

export type AstNode =
	| NumberNode
	| VariableNode
	| UnaryOpNode
	| BinaryOpNode
	| ComparisonNode
	| ConditionalNode

// ==========================================
// Parse Errors and Variables
// ==========================================

export interface ParseError {
	message: string
	position?: number
	expected?: string
	found?: string | TokenType
}

export type VariableMap = Record<string, InjectorConfig>
