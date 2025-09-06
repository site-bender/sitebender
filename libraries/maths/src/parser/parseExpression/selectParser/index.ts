import type { ASTNode, ParseError, Result } from "../../../types/index.ts"
import type { ParserContext } from "../../types/index.ts"
import parseConditionalExpression from "../../parseConditionalExpression/index.ts"
import parseBinaryExpression from "../../parseBinaryExpression/index.ts"

//+ Selects appropriate parser based on minimum precedence
export default function selectParser(
	ctx: ParserContext,
	minPrecedence: number
): Result<ASTNode, ParseError> {
	// For the top-level expression (minPrecedence = 0), parse conditional expressions
	// Otherwise, we're in a sub-expression and should not parse conditionals
	if (minPrecedence === 0) {
		return parseConditionalExpression(ctx)
	}
	// deno-coverage-ignore-next-line
	return parseBinaryExpression(ctx)(minPrecedence)
}