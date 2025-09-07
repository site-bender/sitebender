import { TOKEN_PATTERNS } from "../../constants/index.ts"

/**
 * Parses whitespace at the current position
 * @param input - The input string
 * @param position - Current position
 * @returns Number of characters to skip, or 0 if no whitespace
 */
export default function parseWhitespace(
	input: string,
	position: number,
): number {
	const whitespaceMatch = TOKEN_PATTERNS.WHITESPACE.exec(
		input.slice(position),
	)
	return whitespaceMatch ? whitespaceMatch[0].length : 0
}
