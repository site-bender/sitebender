import type { AstNode, Result, Token } from "../../../types/index.ts"
import type { ParserContext } from "../../types/index.ts"

//+ Parses a number token into a Number AST node
export default function parseNumber(
	token: Token,
	ctx: ParserContext,
): Result<AstNode, never> {
	ctx.advance()
	return {
		ok: true,
		value: {
			type: "Number",
			value: parseFloat(token.value),
		},
	}
}
