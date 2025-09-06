import type { ParseError, Result, Token } from "../../../types/index.ts"

//+ Creates an error result for unexpected tokens
export default function createErrorResult(token: Token): Result<never, ParseError> {
	return {
		ok: false,
		error: {
			message: `Unexpected token '${token.value}' at position ${token.position}`,
			position: token.position,
			found: token.value,
		},
	}
}