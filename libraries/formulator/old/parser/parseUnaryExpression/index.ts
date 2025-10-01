import type { AstNode, ParseError, Result } from "../../types/index.ts"
import type { ParserContext } from "../types/index.ts"

import parsePrimaryExpression from "../parsePrimaryExpression/index.ts"
import getUnaryOperator from "./getUnaryOperator/index.ts"
import parseUnaryOperator from "./parseUnaryOperator/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function parseUnaryExpression(
	ctx: ParserContext,
): Result<AstNode, ParseError> {
	const token = ctx.current()
	const operator = getUnaryOperator(token)

	if (operator) {
		return parseUnaryOperator(ctx, operator, parseUnaryExpression)
	}

	return parsePrimaryExpression(ctx)
}
