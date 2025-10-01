import type { ParseError, Result, TokenType } from "../../types/index.ts"

import parseOneCharOperator from "./parseOneCharOperator/index.ts"
import parseTwoCharOperator from "./parseTwoCharOperator/index.ts"

//++ Parses mathematical and comparison operators, trying two-character operators before single-character ones
export default function parseOperator(
	input: string,
	position: number,
): Result<
	{ tokenType: TokenType; tokenValue: string; tokenLength: number },
	ParseError
> {
	// Try two-character operators first
	const twoCharResult = parseTwoCharOperator(input, position)
	if (twoCharResult) {
		return { ok: true, value: twoCharResult }
	}

	// Try single-character operators
	const char = input[position]
	const oneCharResult = parseOneCharOperator(char)
	if (oneCharResult) {
		return { ok: true, value: oneCharResult }
	}

	// No valid operator found
	return {
		ok: false,
		error: {
			message: `Unexpected character '${char}' at position ${position}`,
			position,
			found: char,
		},
	}
}
