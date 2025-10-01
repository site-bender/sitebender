import type { AstNode, ParseError, Result } from "../../types/index.ts"
import type { ParserContext } from "../types/index.ts"

import parseUnaryExpression from "../parseUnaryExpression/index.ts"
import parseBinaryLoop from "./parseBinaryLoop/index.ts"
import trampoline from "./trampoline/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function parseBinaryExpression(
	ctx: ParserContext,
): (minPrecedence: number) => Result<AstNode, ParseError> {
	return (minPrecedence: number): Result<AstNode, ParseError> => {
		// Parse left side (could be unary expression)
		const leftResult = parseUnaryExpression(ctx)
		if (!leftResult.ok) return leftResult

		// Parse binary operators with precedence climbing using trampoline
		const trampolineComputation = parseBinaryLoop(
			ctx,
			leftResult.value,
			minPrecedence,
			parseBinaryExpression,
		)
		return trampoline(trampolineComputation)
	}
}
