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

//?? [EXAMPLE] parseWhitespace("  hello", 0) // 2
//?? [EXAMPLE] parseWhitespace("hello", 0) // 0
//?? [EXAMPLE] parseWhitespace("\t\n world", 0) // 3
//?? [PRO] Zero allocation - returns a simple number instead of creating objects
//?? [PRO] Handles all whitespace types (spaces, tabs, newlines) via regex
