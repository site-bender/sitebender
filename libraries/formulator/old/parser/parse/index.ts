import type { AstNode, ParseError, Result, Token } from "../../types/index.ts"

import parseExpression from "../parseExpression/index.ts"
import createParserContext from "./createParserContext/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function parse(
	tokens: Array<Token>,
): Result<AstNode, ParseError> {
	const ctx = createParserContext(tokens)
	const result = parseExpression(ctx)(0)

	if (!result.ok) return result

	// Ensure we've consumed all tokens except EOF
	if (ctx.current().type !== "EOF") {
		return {
			ok: false,
			error: {
				message:
					`Unexpected token '${ctx.current().value}' at position ${ctx.current().position}`,
				position: ctx.current().position,
			},
		}
	}

	return result
}
