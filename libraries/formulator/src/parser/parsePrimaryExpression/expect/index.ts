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

/*??
 | [EXAMPLE]
 | // Successfully expect a right parenthesis
 | const result = expect(ctx)("RIGHT_PAREN")
 | // If current token is ")", returns: { ok: true, value: { type: "RIGHT_PAREN", value: ")", position: 5 } }
 | // If current token is "+", returns: { ok: false, error: { message: "Expected RIGHT_PAREN but found PLUS..." } }
 |
 | [EXAMPLE]
 | // Chain expectations for matching parentheses
 | const leftParen = expect(ctx)("LEFT_PAREN")
 | if (!leftParen.ok) return leftParen
 | const expr = parseExpression(ctx)(0)
 | const rightParen = expect(ctx)("RIGHT_PAREN")
 |
 | [GOTCHA]
 | The function consumes the token if it matches, so calling expect() twice
 | with the same type will fail the second time (token already consumed).
 |
 | [PRO]
 | Provides detailed error messages with position info for better debugging.
 |
 | [PRO]
 | Curried design allows partial application for cleaner code patterns.
 |
*/
