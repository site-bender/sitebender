import type { ASTNode, ParseError, Result } from "../../types/index.ts"
import type { ParserContext } from "../types/index.ts"

import parsePrimaryExpression from "../parsePrimaryExpression/index.ts"
import getUnaryOperator from "./getUnaryOperator/index.ts"
import parseUnaryOperator from "./parseUnaryOperator/index.ts"

/**
 * Parses unary expressions (prefix operators like +, -).
 * Handles recursive unary operations like --x or +-x.
 *
 * @param ctx - Parser context with tokens and position
 * @returns Result containing parsed AST node or error
 *
 * @example
 * ```typescript
 * // Example 1: Parse negative number
 * const ctx = createParserContext(tokenize("-5"))
 * const result = parseUnaryExpression(ctx)
 * // Returns: { ok: true, value: { type: "UnaryOp", operator: "-", operand: { type: "Number", value: 5 } } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 2: Parse positive variable (no-op)
 * const ctx = createParserContext(tokenize("+x"))
 * const result = parseUnaryExpression(ctx)
 * // Returns: { ok: true, value: { type: "UnaryOp", operator: "+", operand: { type: "Variable", name: "x" } } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 3: Parse double negative
 * const ctx = createParserContext(tokenize("--x"))
 * const result = parseUnaryExpression(ctx)
 * // Returns nested unary: UnaryOp("-", UnaryOp("-", Variable("x")))
 * ```
 *
 * @example
 * ```typescript
 * // Example 4: No unary operator - pass through to primary
 * const ctx = createParserContext(tokenize("42"))
 * const result = parseUnaryExpression(ctx)
 * // Returns: { ok: true, value: { type: "Number", value: 42 } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 5: Unary on parenthesized expression
 * const ctx = createParserContext(tokenize("-(a + b)"))
 * const result = parseUnaryExpression(ctx)
 * // Returns: UnaryOp("-", BinaryOp("+", Variable("a"), Variable("b")))
 * ```
 */
export default function parseUnaryExpression(
	ctx: ParserContext,
): Result<ASTNode, ParseError> {
	const token = ctx.current()
	const operator = getUnaryOperator(token)

	if (operator) {
		return parseUnaryOperator(ctx, operator, parseUnaryExpression)
	}

	return parsePrimaryExpression(ctx)
}
