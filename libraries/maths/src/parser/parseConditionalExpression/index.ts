import type { ASTNode, ParseError, Result } from "../../types/index.ts"
import type { ParserContext } from "../parseExpression/index.ts"

import parseBinaryExpression from "../parseBinaryExpression/index.ts"

/**
 * Parses a conditional (ternary) expression: condition ? ifTrue : ifFalse
 * Handles the lowest precedence operator in the expression hierarchy.
 *
 * @param ctx - Parser context with tokens and position
 * @returns Result containing conditional AST node or parse error
 *
 * @example
 * ```typescript
 * // Example 1: Simple conditional
 * const ctx = createParserContext(tokenize("a > 5 ? x : y"))
 * const result = parseConditionalExpression(ctx)
 * // Returns: { ok: true, value: { type: "Conditional", condition: ..., ifTrue: ..., ifFalse: ... } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 2: Nested conditionals
 * const ctx = createParserContext(tokenize("a > 0 ? x : b > 0 ? y : z"))
 * const result = parseConditionalExpression(ctx)
 * // Returns nested conditional AST (right-associative)
 * ```
 *
 * @example
 * ```typescript
 * // Example 3: Complex conditions
 * const ctx = createParserContext(tokenize("(a + b) > (c + d) ? x * 2 : y / 2"))
 * const result = parseConditionalExpression(ctx)
 * // Returns conditional with complex expressions in all branches
 * ```
 *
 * @example
 * ```typescript
 * // Example 4: Without conditional (falls through to binary expression)
 * const ctx = createParserContext(tokenize("a + b"))
 * const result = parseConditionalExpression(ctx)
 * // Returns: { ok: true, value: { type: "BinaryOp", operator: "+", ... } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 5: Missing colon error
 * const ctx = createParserContext(tokenize("a > 5 ? x"))
 * const result = parseConditionalExpression(ctx)
 * // Returns: { ok: false, error: { message: "Expected ':' in conditional expression", ... } }
 * ```
 */
export default function parseConditionalExpression(
	ctx: ParserContext,
): Result<ASTNode, ParseError> {
	// Parse the condition (which could be any expression)
	const conditionResult = parseBinaryExpression(ctx)(0)
	if (!conditionResult.ok) {
		return conditionResult
	}

	// Check if we have a ternary operator
	const current = ctx.current()
	if (current.type !== "QUESTION") {
		// No ternary operator, return the expression as-is
		return conditionResult
	}

	// Consume the '?' token
	ctx.advance()

	// Parse the 'if true' expression
	const ifTrueResult = parseConditionalExpression(ctx)
	if (!ifTrueResult.ok) {
		return ifTrueResult
	}

	// Expect ':'
	const colonToken = ctx.current()
	if (colonToken.type !== "COLON") {
		return {
			ok: false,
			error: {
				message:
					`Expected ':' in conditional expression, found '${colonToken.value}'`,
				position: colonToken.position,
				expected: ":",
				found: colonToken.value,
			},
		}
	}

	// Consume the ':' token
	ctx.advance()

	// Parse the 'if false' expression (right-associative)
	const ifFalseResult = parseConditionalExpression(ctx)
	// deno-coverage-ignore - error propagation, tested through other paths
	if (!ifFalseResult.ok) {
		return ifFalseResult
	}

	// Return the conditional AST node
	return {
		ok: true,
		value: {
			type: "Conditional",
			condition: conditionResult.value,
			ifTrue: ifTrueResult.value,
			ifFalse: ifFalseResult.value,
		},
	}
}
