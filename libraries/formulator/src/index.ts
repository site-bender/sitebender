/**
 * @module @sitebender/formulator
 *
 * Pure TypeScript formula parser for mathematical expressions.
 * Compiles formula strings to @sitebender/architect configuration objects.
 */

// Main function export
export { default as parseFormula } from "./parseFormula/index.ts"

// Type exports
export type {
	AstNode,
	AstNodeType,
	BinaryOpNode,
	NumberNode,
	ParseError,
	ParseFormulaResult,
	Result,
	Token,
	TokenType,
	UnaryOpNode,
	VariableMap,
	VariableNode,
} from "./types/index.ts"

// Constants exports
export {
	ASSOCIATIVITY,
	OPERATOR_INFO,
	PRECEDENCE,
	TOKEN_PATTERNS,
} from "./constants/index.ts"

// Individual module exports for advanced usage
export { default as tokenize } from "./tokenizer/index.ts"
export { default as parse } from "./parser/index.ts"
export { default as compile } from "./compiler/index.ts"
