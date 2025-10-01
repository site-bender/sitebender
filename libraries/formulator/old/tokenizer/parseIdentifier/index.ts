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
