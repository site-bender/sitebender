import type { ParseError, Result, Token } from "../../types/index.ts"
import { TOKEN_PATTERNS } from "../../constants/index.ts"

/**
 * Parses a number token at the current position
 * @param input - The input string
 * @param position - Current position
 * @returns Result with token and length, or error
 */
export default function parseNumber(
	input: string, 
	position: number
): Result<{ token: Token; length: number }, ParseError> {
	const numberMatch = TOKEN_PATTERNS.NUMBER.exec(input.slice(position))
	if (!numberMatch) {
		return {
			ok: false,
			error: {
				message: "No number found",
				position,
			},
		}
	}

	// Check for invalid number formats like "3.14.159"
	const afterNumber = input.slice(position + numberMatch[0].length)
	if (afterNumber.startsWith(".") && /^\.\d/.test(afterNumber)) {
		return {
			ok: false,
			error: {
				message: `Invalid number format at position ${position}: ${
					numberMatch[0] + afterNumber.slice(0, 4)
				}`,
				position,
			},
		}
	}

	const token: Token = {
		type: "NUMBER",
		value: numberMatch[0],
		position,
	}

	return {
		ok: true,
		value: { token, length: numberMatch[0].length }
	}
}