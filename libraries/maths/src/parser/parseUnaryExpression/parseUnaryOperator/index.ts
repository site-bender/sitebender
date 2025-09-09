import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { ParserContext } from "../../types/index.ts"

import createUnaryNode from "../createUnaryNode/index.ts"

/**
 * Parses a unary operator and its operand
 * @param ctx - Parser context
 * @param operator - The unary operator ("+" or "-")
 * @param parseUnaryExpression - Reference to main parser for recursion
 * @returns Result with unary AST node or error
 */
export default function parseUnaryOperator(
	ctx: ParserContext,
	operator: "+" | "-",
	parseUnaryExpression: (ctx: ParserContext) => Result<AstNode, ParseError>,
): Result<AstNode, ParseError> {
	ctx.advance()
	const operandResult = parseUnaryExpression(ctx) // Recursive for multiple unary ops
	if (!operandResult.ok) return operandResult

	return {
		ok: true,
		value: createUnaryNode(operator, operandResult.value),
	}
}
