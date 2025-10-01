import type { ParseError, Result, Token } from "../../../types/index.ts"

//++ Creates a standardized error result for unexpected tokens during parsing
export default function createErrorResult(
	token: Token,
): Result<never, ParseError> {
	return {
		ok: false,
		error: {
			message:
				`Unexpected token '${token.value}' at position ${token.position}`,
			position: token.position,
			found: token.value,
		},
	}
}
