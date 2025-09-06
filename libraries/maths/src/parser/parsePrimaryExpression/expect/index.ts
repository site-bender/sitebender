import type { ParseError, Result, Token } from "../../../types/index.ts"
import type { ParserContext } from "../../parseExpression/index.ts"

/**
 * Expects a specific token type at the current position and consumes it.
 * Returns an error if the expected token is not found.
 *
 * @param ctx - Parser context with tokens and position
 * @returns Curried function that takes expected token type
 *
 * @example
 * ```typescript
 * // Example 1: Successfully expect a right parenthesis
 * const ctx = { current: () => ({ type: "RIGHT_PAREN", value: ")", position: 5 }), advance: () => {...} }
 * const result = expect(ctx)("RIGHT_PAREN")
 * // Returns: { ok: true, value: { type: "RIGHT_PAREN", value: ")", position: 5 } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 2: Fail when expecting different token
 * const ctx = { current: () => ({ type: "PLUS", value: "+", position: 3 }), advance: () => {...} }
 * const result = expect(ctx)("RIGHT_PAREN")
 * // Returns: { ok: false, error: { message: "Expected RIGHT_PAREN but found PLUS at position 3" } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 3: Expect EOF token
 * const ctx = { current: () => ({ type: "EOF", value: "", position: 10 }), advance: () => {...} }
 * const result = expect(ctx)("EOF")
 * // Returns: { ok: true, value: { type: "EOF", value: "", position: 10 } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 4: Chain expectations
 * const leftParen = expect(ctx)("LEFT_PAREN")
 * if (!leftParen.ok) return leftParen
 * // ... parse expression ...
 * const rightParen = expect(ctx)("RIGHT_PAREN")
 * ```
 *
 * @example
 * ```typescript
 * // Example 5: Use in operator parsing
 * const plusResult = expect(ctx)("PLUS")
 * if (plusResult.ok) {
 *   // Parse addition operand
 * }
 * ```
 */
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
