import type {
	AstNode,
	ParseError,
	Result,
	Token,
} from "../../../types/index.ts"
import type { ParserContext } from "../../types/index.ts"

import expect from "../expect/index.ts"

//+ Parses a parenthesized expression
export default function parseParenthesized(
	openParen: Token,
	ctx: ParserContext,
	parseExpression: (
		ctx: ParserContext,
	) => (minPrecedence: number) => Result<AstNode, ParseError>,
): Result<AstNode, ParseError> {
	ctx.advance()
	const exprResult = parseExpression(ctx)(0)
	// deno-coverage-ignore
	if (!exprResult.ok) return exprResult

	const rightParenResult = expect(ctx)("RIGHT_PAREN")
	if (!rightParenResult.ok) {
		return {
			ok: false,
			error: {
				message:
					`Missing closing parenthesis for opening at position ${openParen.position}`,
				position: ctx.current().position,
				expected: ")",
				found: ctx.current().value,
			},
		}
	}

	return exprResult
}
