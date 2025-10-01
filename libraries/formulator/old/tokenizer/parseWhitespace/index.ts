import { TOKEN_PATTERNS } from "../../constants/index.ts"

//++ Parses whitespace at the current position and returns the number of characters to skip
export default function parseWhitespace(
	input: string,
	position: number,
): number {
	const whitespaceMatch = TOKEN_PATTERNS.WHITESPACE.exec(
		input.slice(position),
	)
	return whitespaceMatch ? whitespaceMatch[0].length : 0
}
