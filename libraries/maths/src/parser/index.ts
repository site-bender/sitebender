import type {
	ASTNode,
	ParseError,
	Result,
	Token,
} from "../types/index.ts"

import parse from "./parse/index.ts"

/**
 * Parses tokens into an Abstract Syntax Tree.
 * Main entry point for the parser module.
 * 
 * @param tokens - Array of tokens from the tokenizer
 * @returns Result containing either the AST or a parse error
 * 
 * @example
 * ```typescript
 * // Example 1: Parse simple addition
 * import tokenize from "../tokenizer/index.ts"
 * const tokens = tokenize("a + b")
 * if (tokens.ok) {
 *   const ast = parser(tokens.value)
 *   // Returns: { ok: true, value: { type: "BinaryOp", operator: "+", ... } }
 * }
 * ```
 * 
 * @example
 * ```typescript
 * // Example 2: Parse with operator precedence
 * const tokens = tokenize("a + b * c")
 * const ast = parser(tokens.value)
 * // Returns AST where multiplication has higher precedence
 * ```
 * 
 * @example
 * ```typescript
 * // Example 3: Parse parenthesized expression
 * const tokens = tokenize("(a + b) * c")
 * const ast = parser(tokens.value)
 * // Returns AST where parentheses override precedence
 * ```
 * 
 * @example
 * ```typescript
 * // Example 4: Handle parse errors
 * const tokens = tokenize("+ +")
 * const ast = parser(tokens.value)
 * if (!ast.ok) {
 *   console.error(ast.error.message)
 *   // Outputs: "Unexpected token '+' at position 0"
 * }
 * ```
 * 
 * @example
 * ```typescript
 * // Example 5: Parse complex nested expression
 * const tokens = tokenize("(a / b) + (c / d)")
 * const ast = parser(tokens.value)
 * // Returns deeply nested AST structure
 * ```
 */
export default function parser(
	tokens: Array<Token>,
): Result<ASTNode, ParseError> {
	return parse(tokens)
}