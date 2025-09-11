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

/*??
 | [EXAMPLE]
 | parseOperator("==", 0)
 | // { ok: true, value: { tokenType: "EQUAL", tokenValue: "==", tokenLength: 2 } }
 |
 | [EXAMPLE]
 | parseOperator("+ 5", 0)
 | // { ok: true, value: { tokenType: "PLUS", tokenValue: "+", tokenLength: 1 } }
 |
 | [EXAMPLE]
 | parseOperator("@", 0)
 | // { ok: false, error: { message: "Unexpected character '@' at position 0", position: 0, found: "@" } }
 |
 | [PRO]
 | Two-character lookahead ensures "==" is parsed as EQUAL, not two separate tokens.
 | This prevents ambiguity and simplifies the parser.
 |
 | [GOTCHA]
 | Order matters: must check two-char operators first, otherwise "<=" would be
 | parsed as LESS_THAN followed by an unexpected "=" character.
 |
*/
