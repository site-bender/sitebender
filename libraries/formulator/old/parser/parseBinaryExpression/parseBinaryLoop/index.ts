import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { ParserContext } from "../../types/index.ts"
import type { TrampolineResult } from "../trampoline/index.ts"

import { OPERATOR_INFO } from "../../../constants/index.ts"
import checkOperatorAmbiguity from "../checkOperatorAmbiguity/index.ts"
import createBinaryNode from "../createBinaryNode/index.ts"
import getOperatorFromToken from "../getOperatorFromToken/index.ts"
import isValidBinaryOperator from "../isValidBinaryOperator/index.ts"

/**
 * Parses binary operators using trampoline for true tail recursion
 * @param ctx - Parser context
 * @param currentLeft - Current left operand
 * @param minPrecedence - Minimum precedence to parse
 * @param parseBinaryExpression - Reference to main parser for recursion
 * @returns Trampoline computation for final AST node or error
 */
export default function parseBinaryLoop(
	ctx: ParserContext,
	currentLeft: AstNode,
	minPrecedence: number,
	parseBinaryExpression: (
		ctx: ParserContext,
	) => (minPrecedence: number) => Result<AstNode, ParseError>,
): TrampolineResult<Result<AstNode, ParseError>> {
	const token = ctx.current()

	// Check if this is a binary operator
	if (!isValidBinaryOperator(token)) {
		return { done: true, value: { ok: true, value: currentLeft } }
	}

	// Get operator info
	const operator = getOperatorFromToken(token)
	// deno-coverage-ignore
	if (!operator) {
		return { done: true, value: { ok: true, value: currentLeft } }
	}

	const info = OPERATOR_INFO[operator]
	if (info.precedence < minPrecedence) {
		return { done: true, value: { ok: true, value: currentLeft } }
	}

	// Consume operator
	ctx.advance()

	// Check for ambiguous operator sequences
	const nextToken = ctx.current()
	const ambiguityResult = checkOperatorAmbiguity(token, nextToken)
	if (!ambiguityResult.ok) {
		return { done: true, value: ambiguityResult }
	}

	// Calculate next minimum precedence for right side
	const nextMinPrecedence = info.associativity === "LEFT"
		? info.precedence + 1
		: info.precedence

	// Parse right side recursively
	const rightResult = parseBinaryExpression(ctx)(nextMinPrecedence)
	// deno-coverage-ignore
	if (!rightResult.ok) {
		return { done: true, value: rightResult }
	}

	// Create binary node
	const newLeft = createBinaryNode(operator, currentLeft, rightResult.value)

	// Continue parsing more operators (tail recursive via trampoline)
	return {
		done: false,
		next: () =>
			parseBinaryLoop(ctx, newLeft, minPrecedence, parseBinaryExpression),
	}
}
