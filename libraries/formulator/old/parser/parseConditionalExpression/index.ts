import type { AstNode, ParseError, Result } from "../../types/index.ts"
import type { ParserContext } from "../parseExpression/index.ts"

import parseBinaryExpression from "../parseBinaryExpression/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function parseConditionalExpression(
	ctx: ParserContext,
): Result<AstNode, ParseError> {
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
