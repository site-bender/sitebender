import type { ASTNode, ParseError, Result, Token } from "../../types/index.ts"

import parseConditionalExpression from "../parseConditionalExpression/index.ts"
import parseBinaryExpression from "../parseBinaryExpression/index.ts"

export type ParserContext = {
	tokens: Array<Token>
	position: number
	current: () => Token
	advance: () => Token
}

/**
 * Parses an expression starting from the current position.
 * Entry point for expression parsing with lowest precedence.
 *
 * @param ctx - Parser context with tokens and position
 * @returns Curried function that takes minimum precedence and returns parsed AST
 *
 * @example
 * ```typescript
 * // Example 1: Parse simple expression
 * const ctx = createParserContext(tokenize("a + b"))
 * const result = parseExpression(ctx)(0)
 * // Returns: { ok: true, value: { type: "BinaryOp", operator: "+", ... } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 2: Parse with minimum precedence
 * const ctx = createParserContext(tokenize("a + b * c"))
 * const result = parseExpression(ctx)(10) // Only parse >= precedence 10
 * // Returns partial AST based on precedence
 * ```
 *
 * @example
 * ```typescript
 * // Example 3: Parse parenthesized expression
 * const ctx = createParserContext(tokenize("(a + b)"))
 * const result = parseExpression(ctx)(0)
 * // Returns AST for inner expression
 * ```
 *
 * @example
 * ```typescript
 * // Example 4: Parse with unary operator
 * const ctx = createParserContext(tokenize("-a"))
 * const result = parseExpression(ctx)(0)
 * // Returns: { ok: true, value: { type: "UnaryOp", operator: "-", ... } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 5: Chain multiple operations
 * const ctx = createParserContext(tokenize("a + b - c"))
 * const result = parseExpression(ctx)(0)
 * // Returns left-associative AST: ((a + b) - c)
 * ```
 */
export default function parseExpression(
	ctx: ParserContext,
): (minPrecedence: number) => Result<ASTNode, ParseError> {
	return (minPrecedence: number) => {
		// For the top-level expression (minPrecedence = 0), parse conditional expressions
		// Otherwise, we're in a sub-expression and should not parse conditionals
		if (minPrecedence === 0) {
			return parseConditionalExpression(ctx)
		}
		// deno-coverage-ignore-next-line
		return parseBinaryExpression(ctx)(minPrecedence)
	}
}
