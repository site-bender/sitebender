import type { Token } from "../../types/index.ts"

import { TOKEN_PATTERNS } from "../../constants/index.ts"

//++ Parses an identifier token (variable name) at the current position
export default function parseIdentifier(
	input: string,
	position: number,
): { token: Token; length: number } | null {
	const identifierMatch = TOKEN_PATTERNS.IDENTIFIER.exec(
		input.slice(position),
	)
	if (!identifierMatch) {
		return null
	}

	const token: Token = {
		type: "IDENTIFIER",
		value: identifierMatch[0],
		position,
	}

	return { token, length: identifierMatch[0].length }
}

//?? [EXAMPLE] parseIdentifier("abc + 5", 0) // { token: { type: "IDENTIFIER", value: "abc", position: 0 }, length: 3 }
//?? [EXAMPLE] parseIdentifier("x_1", 0) // { token: { type: "IDENTIFIER", value: "x_1", position: 0 }, length: 3 }
//?? [EXAMPLE] parseIdentifier("123abc", 0) // null (must start with letter)
//?? [GOTCHA] Identifiers must start with a letter (a-z, A-Z) - numbers can't be first character
//?? [GOTCHA] Only alphanumeric and underscore allowed - no hyphens or special characters
//?? [PRO] Case-insensitive pattern matching supports both camelCase and snake_case
