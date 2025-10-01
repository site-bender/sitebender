import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { ParserContext } from "../../types/index.ts"

import createUnaryNode from "../createUnaryNode/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
