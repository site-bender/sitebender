import type { ParseError, Result, Token } from "../../../types/index.ts"
import type { ParserContext } from "../../parseExpression/index.ts"

//++ Expects a specific token type and consumes it, or returns a descriptive error
export default function expect(
	ctx: ParserContext,
): (type: Token["type"]) => Result<Token, ParseError> {
	return (type: Token["type"]): Result<Token, ParseError> => {
		const token = ctx.current()
		if (token.type !== type) {
			return {
				ok: false,
				error: {
					message:
						`Expected ${type} but found ${token.type} at position ${token.position}`,
					position: token.position,
					expected: type,
					found: token.type,
				},
			}
		}
		return { ok: true, value: ctx.advance() }
	}
}
